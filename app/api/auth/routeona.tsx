/*
import { db } from "@/lib/db";
import { user} from "@/drizzle/schema"
import { eq } from "drizzle-orm";
import { ReturnError, ReturnNormal } from "@/lib/utils"; 
import { NextRequest } from "next/server"; 

export  async function POST(request: NextRequest){ 
    const {email, password} = await request.json()
    let dbuser = await db.select().from(user).where(eq(user.email, email)).limit(1)
    if(!dbuser || !dbuser.length)
        return  ReturnError(  'user not found');
    console.log(dbuser)
    if(dbuser[0].password !== password)
        return  ReturnError(   'password error'); 
    request.cookies.set('Authorization',  token)
    return ReturnNormal(  '', dbuser[0]);

}

export async function GET() {
    const dbusers = await db.select().from(user).execute()
    return ReturnNormal(  'All users', dbusers);
}

*/

