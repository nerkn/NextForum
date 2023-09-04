import { likesDelete, likesInsert, likesOfUser } from "@/lib/services/likes";
import { ReturnError, ReturnNormal } from "@/lib/utils"; 
import { NextRequest } from "next/server";

 export async function GET(request:NextRequest) {
    let sp =  request.nextUrl.searchParams
    let user = parseInt(sp.get('user')||'')
    console.log('likes of user user ', user)
    if(!user)
        ReturnError('user?')
    let data = await likesOfUser(user)
    return ReturnNormal('ok', data)
}

export async function POST(request:NextRequest) { 
    const { likee,  app,  bin } = await request.json()
    let values = await likesInsert(likee, app, bin);
    if(!values)
        return ReturnError('no confirmation')
    return ReturnNormal('', values);
}

export async function DELETE(request:NextRequest) { 
    const { likee,  app, bin } = await request.json() 
    let values = await likesDelete(likee, app, bin);
    if(!values)
        return ReturnError('no confirmation on delete')
    return ReturnNormal('', values);
}