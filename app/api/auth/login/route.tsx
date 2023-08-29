import { user } from "@/drizzle/schema";
import { db, dbUserSelect } from "@/lib/db";
import { eq } from "drizzle-orm";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request:NextRequest) {
    const {
        email, 
        password
    } = await request.json()
    console.log('api/auth/login  kismi')
    const answer = await dbUserSelect.
        where(eq(user.email, email)).
        where(eq(user.password, password))
        console.log('login kismisina geldi', answer);
    return NextResponse.json(answer)
}