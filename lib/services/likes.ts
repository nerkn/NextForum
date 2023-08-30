import { likes, user } from "@/drizzle/schema"
import { db } from "../db"
import { and, eq  } from "drizzle-orm"
import { getSession } from "./user"
import { Now } from "../utils"




export async function likesOfUser(userid:number, app?:string, bin?:string) {
    let chain = db.select().from(likes)
    if(bin)
        chain = chain.where(eq(likes.bin, bin))
    if(app)
        chain = chain.where(eq(likes.app, app))
    return await chain.where(eq(likes.user, user)).execute()
}

export async function likesInsert(likee:number, app:string, bin:string) {    
    const session = await getSession()
    if(!session?.userId)
        return null
    let values = {
        likee, 
        app, 
        bin, 
        user:+session.userId,
        createdAt:Now(), 
        updatedAt:Now()}
        
    let response = await db.insert(likes).
        values(values).execute() 
    return response;
}
export async function likesDelete(likee:number, app:string, bin:string) {  
    const session = await getSession()
    if(!session?.userId)
        return null
    
    let response = await db.delete(likes).
    where(
        and(
        eq(likes.likee, likee),
        eq(likes.app,   app),
        eq(likes.bin,   bin),
        eq(likes.user,  +session.userId)
        )
    ).execute() 
    return response;
}