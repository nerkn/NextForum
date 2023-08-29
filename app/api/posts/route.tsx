import { posts } from "@/drizzle/schema"
import { db } from "@/lib/db"
import { ReturnError, ReturnNormal } from "@/lib/utils"
import { authOptions } from "@/pages/api/auth/[...nextauth]"
import { InferInsertModel, InferSelectModel } from "drizzle-orm"
import { getServerSession } from "next-auth"
import { NextRequest } from "next/server"

type postsType = InferInsertModel<typeof posts>

export async function POST(request:NextRequest) {
    const session = await getServerSession(authOptions)
    if(!session?.userId)
        return ReturnError('session not found')
    const {
        description, 
        group,
        topic
    }:{
        description:string, 
        group:number,
        topic:number} = await request.json()
    let values:postsType = {
        description,
        archive:0, secret:0, starred:0, selected:0,
        group,
        topic,
        user:+session.userId,
        createdAt:new Date().toJSON().replace(/[TZ]/g, ' '), 
        updatedAt:new Date().toJSON().replace(/[TZ]/g, ' ')}
        console.log(values)
    let response = await db.insert(posts).
        values(values).execute() 
return ReturnNormal('', response);
    
}