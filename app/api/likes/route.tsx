import { likes } from "@/drizzle/schema";
import { db } from "@/lib/db";
import { ReturnError, ReturnNormal } from "@/lib/utils";
import { authOptions } from "@/pages/api/auth/[...nextauth]";
import { and, eq } from "drizzle-orm";
import { getServerSession } from "next-auth";
import { NextRequest } from "next/server";

type spType = {
    user:number
}

export async function GET(request:NextRequest) {
    let sp =  request.nextUrl.searchParams
    let user = parseInt(sp.get('user')||'')
    if(!user)
        ReturnError('user?')
    let data = await db.select().from(likes).where(eq(likes.user, user)).execute()
    return ReturnNormal('ok', data)
}

export async function POST(request:NextRequest) {
    const session = await getServerSession(authOptions)
    if(!session?.userId)
        return ReturnError('session not found')
    const {
        likee, 
        app,
        bin
    } = await request.json()
    let values = {
        likee:+likee, 
        app, 
        bin, 
        user:+session.userId,
        createdAt:new Date().toJSON().replace(/[TZ]/g, ' '), 
        updatedAt:new Date().toJSON().replace(/[TZ]/g, ' ')}
        
    let response = await db.insert(likes).
        values(values).execute() 
return ReturnNormal('', response);
    
}

export async function DELETE(request:NextRequest) {
    const session = await getServerSession(authOptions)
    if(!session?.userId)
        return ReturnError('session not found')
    const {
        likee, 
        app,
        bin
    } = await request.json() 
        
    let response = await db.delete(likes).
        where(
            and(
            eq(likes.likee, likee),
            eq(likes.app,   app),
            eq(likes.bin,   bin),
            eq(likes.user,  +session.userId)
            )
        ).execute() 
return ReturnNormal('', response);
    
}