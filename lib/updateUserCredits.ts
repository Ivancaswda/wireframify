// lib/update-user-credits.ts
import { db} from "@/configs/db";
import { usersTable } from "@/configs/schema";
import { eq } from "drizzle-orm";

export async function updateUserCredits(email: string, delta: number) {

    const users = await db.select().from(usersTable).where(eq(usersTable.email, email)).limit(1)

    const user = users[0]

    if (!user) throw new Error("Пользователь не найден");

    const newCredits = user.credits + delta;

    if (newCredits < 0) throw new Error("Недостаточно кредитов");

    // Обновляем кредиты
    await db
        .update(usersTable)
        .set({ credits: newCredits })
        .where(eq(usersTable.email, email));

    return newCredits;
}
