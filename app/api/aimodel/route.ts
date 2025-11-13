import { NextRequest, NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { aiGeminiVersions } from "@/app/constants";
import getServerUser from "@/lib/auth-server";
import {updateUserCredits} from "@/lib/updateUserCredits";

const GEMINI_API_KEY = process.env.GEMINI_API_KEY!;

export async function POST(req: NextRequest) {
    try {
        const { model, description, imageUrl } = await req.json();
        const user = await getServerUser();

        if (!user) {
            return NextResponse.json({ error: "Not authorized" }, { status: 401 });
        }

        if (user.credits <= 0) {
            return NextResponse.json(
                { error: "Недостаточно кредитов", redirect: "/pricing" },
                { status: 403 }
            );
        }

        if (!description || !imageUrl) {
            return NextResponse.json({ error: "Описание и изображение обязательны" }, { status: 400 });
        }

        const modelName = model || "gemini-2.5-flash";
        const fallbackModel = "gemini-2.0-flash";
        const genAI = new GoogleGenerativeAI(GEMINI_API_KEY);
        let aiModel = genAI.getGenerativeModel({ model: modelName });

        // Конвертируем изображение в base64
        let base64Data = "";
        if (imageUrl.startsWith("http")) {
            const res = await fetch(imageUrl);
            const buffer = await res.arrayBuffer();
            base64Data = Buffer.from(buffer).toString("base64");
        } else if (imageUrl.startsWith("data:")) {
            base64Data = imageUrl.split(",")[1];
        } else {
            throw new Error("Неверный формат imageUrl");
        }

        const prompt = `
Ты профессиональный разработчик React и UI/UX дизайнер.
Сгенерируй **React + TailwindCSS** страницу на основе предоставленного изображения макета и описания.
- Дизайн должен быть чистым, современным и адаптивным.
- Используй иконки Lucide React.
- НЕ используй библиотеки кроме Tailwind и Lucide.
Выводи только корректный JSX код.
Описание: ${description}
`;

        let response;
        try {
            response = await aiModel.generateContent([
                { text: prompt },
                { inlineData: { mimeType: "image/png", data: base64Data } },
            ]);
        } catch {
            aiModel = genAI.getGenerativeModel({ model: fallbackModel });
            response = await aiModel.generateContent([
                { text: prompt },
                { inlineData: { mimeType: "image/png", data: base64Data } },
            ]);
        }

        const result = await response.response.text();
        const cleanCode = result.replace(/```[a-zA-Z]*|```/g, "").trim();


        await updateUserCredits(user.email, -1);

        return NextResponse.json({ code: cleanCode, creditsLeft: user?.credits - 1 });
    } catch (error: any) {
        return NextResponse.json({ error: error.message || "Internal Server Error" }, { status: 500 });
    }
}
