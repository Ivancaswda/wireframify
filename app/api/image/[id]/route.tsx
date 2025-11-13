import { db } from "@/configs/db";
import { imagesTable } from "@/configs/schema";
import { eq } from "drizzle-orm";

export async function GET(
    request: Request,
    { params }: { params: { id: string } }
) {
    const [image] = await db
        .select()
        .from(imagesTable)
        .where(eq(imagesTable.id, params.id));

    if (!image) {
        return new Response("Not found", { status: 404 });
    }

    return new Response(image.data, {
        headers: {
            "Content-Type": image.mimetype,
            "Content-Disposition": `inline; filename="${image.filename}"`,
        },
    });
}
