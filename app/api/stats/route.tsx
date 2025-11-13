import { NextRequest, NextResponse } from "next/server";
import { db } from "@/configs/db";
import { WireframeToCodeTable } from "@/configs/schema";
import { eq } from "drizzle-orm";
import { verifyToken } from "@/lib/jwt";
import { cookies } from "next/headers";

export async function GET(req: NextRequest) {
    try {
        const cookieStore = await cookies();
        const token = cookieStore.get("token")?.value;

        if (!token) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

        const decoded = verifyToken(token) as { email: string };


        const result = await db
            .select()
            .from(WireframeToCodeTable)
            .where(eq(WireframeToCodeTable.createdBy, decoded.email));

        return NextResponse.json({ totalWireframes: result.length || 0 });
    } catch (err) {
        console.error(err);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}
