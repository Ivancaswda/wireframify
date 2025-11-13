import { NextResponse } from "next/server";
import { db } from "@/configs/db";
import { imagesTable } from "@/configs/schema";
import { imagekit } from "@/lib/imagekitInstance";

export async function POST(req: Request) {
    const formData = await req.formData();
    const file = formData.get("file") as File | null;

    if (!file) {
        return NextResponse.json({ error: "No file uploaded" }, { status: 400 });
    }

    const buffer = Buffer.from(await file.arrayBuffer());


    const uploadResult = await imagekit.upload({
        file: buffer, // бинарное содержимое
        fileName: file.name,
        folder: "/wireframes", // опционально
    });


    const [image] = await db
        .insert(imagesTable)
        .values({
            filename: file.name,
            url: uploadResult.url,
        })
        .returning({ id: imagesTable.id, url: imagesTable.url });

    return NextResponse.json({
        id: image.id,
        url: image.url,
    });
}
