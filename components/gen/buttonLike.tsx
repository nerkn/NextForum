"use client"
import { LikeStore } from "@/lib/context/LikeStore"
import { Button } from "../ui/button"
import { HeartIcon } from "lucide-react"
import { ReactNode } from "react"

async function getLike(){
    //await db.select().from(lists).where
}

export function ButtonLike({app, bin, likee, positiveChild, absentChild}:
    {app:string, bin:string, likee:number, positiveChild:ReactNode, absentChild:ReactNode}){
    const likes = LikeStore(s=>({
        stateUpdate:s.stateUpdate, 
        status:s.status, 
        initStatus:s.initStatus,
        addLike:s.addLike,
        removeLike:s.removeLike
    }))

    if(!likes.initStatus)
        return <></>
    

    const likeStatus = likes.status(app, bin, likee)

    if(likeStatus){
        return <a onClick={()=>likes.removeLike(app,bin, likee)} className="">
            {positiveChild}
            </a>
    }
    
    return <a onClick={()=>likes.addLike(app,bin, likee)} className="">         
        {absentChild}
    </a>
}