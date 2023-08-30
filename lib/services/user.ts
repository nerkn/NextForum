import { eq } from "drizzle-orm";
import { db } from "../db";
import { user } from "@/drizzle/schema";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/pages/api/auth/[...nextauth]";

type AvatarAbsolutePath = string;

export function userAvatarUpdate(avatar:AvatarAbsolutePath , userId:number){
    db.update(user).set({avatar:avatar}).where(eq(user.id, userId )).execute()
}

export async function getSession(){
    const session = await getServerSession(authOptions)
    return session
}