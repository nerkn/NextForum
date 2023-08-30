import { NextRequest, NextResponse } from "next/server"; 
import { uploadImage } from "@/lib/services/images"; 
import { ReturnError, ReturnNormal } from "@/lib/utils";
import {userAvatarUpdate} from '@/lib/services/user' 
import { getServerSession } from "next-auth";
import { authOptions } from "@/pages/api/auth/[...nextauth]";
import { formDataFileBufferType } from "@/lib/types";


export const POST = async (req:NextRequest, res: any) => {
  let session = await getServerSession(authOptions );
  if(!session || !session.userId)
    return ReturnError('session cant found')
  const formData = await req.formData();
  const file    = formData.get("file") as formDataFileBufferType;
  const fileAim = formData.get("aim") || 'normal' 
  if (!file) {
    return NextResponse.json({ error: "No files received." }, { status: 400 });
  }

  const buffer = Buffer.from(await file.arrayBuffer());
  const uploaded = await uploadImage({
    buffer, 
    app:'groups', 
    fileType: file.type.split('/')[1] , 
    name:'yok', 
    user:+session.userId   
  })
  
  if(!uploaded)
    return ReturnError("Failed");
  console.log('fileAim', fileAim)
  switch(fileAim){
    case 'avatar':
      console.log('session', session);
      let avatar = uploaded.split('/public')[1];
      if(session.user)
        session.user.image = avatar;
      userAvatarUpdate(avatar ,  +session.userId)
  }
    return  ReturnNormal("Success" );
  
};