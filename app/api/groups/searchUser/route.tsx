import { user } from "@/drizzle/schema";
import { db, dbUserSelect } from "@/lib/db"; 
import { ReturnNormal } from "@/lib/utils"; 
import { like } from "drizzle-orm";
import { NextRequest } from "next/server";

export async function GET(res:NextRequest ){
    let name =  res.nextUrl.searchParams.get('name');
    console.log('/api/groups/searchUser', name)
    //let name = 'k'
    return ReturnNormal('',  await db.select({
        id:user.id, 
        name:user.name, 
        avatar:user.avatar
    }).from(user).where(like(user.name, name+'%')).limit(10).execute())
}


export async function POST(res:NextRequest ){
    let name =  res.nextUrl.searchParams.get('name');
    console.log('/api/groups/searchUser', name)
    //let name = 'k'
    return ReturnNormal('',  await db.insert({
        id:user.id, 
        name:user.name, 
        avatar:user.avatar
    }).from(user).where(like(user.name, name+'%')).limit(10).execute())
}