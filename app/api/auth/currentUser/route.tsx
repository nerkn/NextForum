
import { ReturnError, ReturnNormal } from "@/lib/utils";
import { authOptions } from "@/pages/api/auth/[...nextauth]";
import { getServerSession } from "next-auth/next";
import { NextResponse } from "next/server";
export async function GET() {
 
    try{
        const session = await getServerSession(authOptions)
        console.log('action getServerSEssion', session)
        if(!session?.user?.email)
            return ReturnError('session not found')
        return ReturnNormal('', {...session.user, userId:session.userId});
    }catch(e){
        return ReturnError('session not exists')
    }
    
    
}