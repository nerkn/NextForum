import { InferSelectModel } from "drizzle-orm";
import { create } from "zustand"; 
import {persist} from "zustand/middleware" 
import {likes } from "@/drizzle/schema"
import { FetchRequestType } from "../types";


export type likeType = InferSelectModel<typeof likes>

export type  likeStoreType ={
    userLikes: likeType[],
    userId      : number,
    initStatus  : number,
    stateUpdate : number,
    initialize  :(userId:number)=>{}
    addLike     :(app:string, bin:string, likee:number)=>void
    removeLike  :(app:string, bin:string, likee:number)=>void
    status      :(app:string, bin:string, likee:number)=>boolean

}


export const likeStore = create<likeStoreType>()( 
        (set, get)=>({
            userLikes:[], 
            userId:0,
            initStatus:0,
            stateUpdate:0,
            initialize:async (userId)=>{
                console.log('like store initializing', userId)
                if(get().initStatus != 0)
                    return console.log('initin baska asamasinda')
                set({initStatus:1})
                fetch('/api/likes?user='+userId).
                    then(r=>r.json()).
                    then((r:FetchRequestType<likeType[]>)=>{
                        if(r.err)
                            return console.log('error gethering user likes', r.err, r)
                        set({initStatus:2})
                        console.log('updating likes', r.data)
                        set(s=>({userLikes:r.data}))
                    })
            },
            addLike     :(app:string, bin:string, likee:number)=>{
                fetch('/api/likes', {method:'POST', body:JSON.stringify({
                    app, bin,  likee
                })}).then(r=>r.json()).then((r)=>{                    
                    set(s=>({
                        stateUpdate:s.stateUpdate+1,
                        userLikes:[...s.userLikes, {id: r.data[0].insertId,
                            app,
                            bin, 
                            likee, 
                            user:0, 
                            createdAt:new Date().toJSON().replace(/[TZ]/g, ' '),
                            updatedAt:new Date().toJSON().replace(/[TZ]/g, ' ')
                        }]
                    }))
                })
            },
            removeLike  :(app:string, bin:string, likee:number)=>{
                console.log('removelike', app, bin, likee)
                fetch('/api/likes', {method:'DELETE', body:JSON.stringify({
                    app, bin,  likee
                })}).then(r=>r.json()).then((r)=>{                    
                    set(s=>({
                        stateUpdate:s.stateUpdate+1,
                        userLikes:[...s.userLikes.filter(ul=>!(
                            (ul.app==app) &&
                            (ul.bin==bin) &&
                            (ul.likee==likee) 
                            ))]
                    }))
                })
            },
            status      :(app:string, bin:string, likee:number)=>{
                let element = get().userLikes.filter(ul=>ul.likee==likee).find(ul=>(ul.app==app)&&(ul.bin==bin))
                return !!element
                console.log('some vars of store' , get().userId, get().userLikes)
                return Math.random()>.5
            },
            
        })
    
    )