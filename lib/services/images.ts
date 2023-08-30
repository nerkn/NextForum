
import { NextResponse } from "next/server";
import path from "path";
import { writeFile, mkdir, access, constants } from "fs/promises";
import { db } from "../db";
import { images } from "@/drizzle/schema";
import { InferInsertModel, eq } from "drizzle-orm";
type ImageNewType = InferInsertModel<typeof images>;



export async  function uploadImage({
    app,  user, name,
    buffer, fileType,description='', directory="public/uploads/" }:
    {
        user:number,
        buffer:Buffer, 
        fileType:string, 
        app: string,
        name:string,
        description?:string,        
        directory?:string }){
    
    const curDate = new Date().toISOString().split('T')[0].replaceAll('-', '')
    
    directory = path.join(
        process.cwd(), 
        directory, 
        curDate
    );
    const values:ImageNewType = {
        user,
        name:name||'',
        filename:directory,
        description,
        app:app, 
        createdAt:new Date().toISOString().replaceAll(/[TZ]/g, ' ') ,
        updatedAt:new Date().toISOString().replaceAll(/[TZ]/g, ' ')
    }

    const [insertResult]  = await db.insert(images)
                            .values(values).execute()
    if(!insertResult || !insertResult.insertId )
        return false
    await access(directory, constants.W_OK  ).then(()=>true).catch(async ()=>{await mkdir(directory)}) 
    try {
        const filename = path.join( directory , ''+insertResult.insertId +'.'+ fileType)
        await writeFile( filename, buffer);
        db.update(images).set({
            filename:filename, 
            updatedAt:new Date().toISOString().replaceAll(/[TZ]/g, ' ')}).
        where(eq(images.id, insertResult.insertId)).execute()
        return filename;
    } catch (error) {
        console.log("Error occured ", error);
        return false
    }

}