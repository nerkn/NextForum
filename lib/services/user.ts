import { eq } from "drizzle-orm";
import { db } from "../db";
import { user } from "@/drizzle/schema";

type AvatarAbsolutePath = string;

export function userAvatarUpdate(avatar:AvatarAbsolutePath , userId:number){
    db.update(user).set({avatar:avatar}).where(eq(user.id, userId )).execute()
}