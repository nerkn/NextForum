
import {  user } from "@/drizzle/schema";  
import { create } from "zustand"; 
import { userType } from "../types";


type SuggestionStoreType = {
    friends:userType[]
    currentPage:userType[]
    add7CurrentPage:(users:userType[])=>void,
    gatherFriendList:(users?:userType[])=>void

}


export const SuggestionStore = create<SuggestionStoreType>()(
    (set, get)=>({
        friends:[],
        currentPage:[],
        add7CurrentPage:(users)=>{
            set({currentPage:users})
        },
        gatherFriendList:(users)=>{
            if(users){
                set({friends:users})
                return
            }
            fetch('/api/profile/friendList').then(r=>r.json()).then(r=>{
                if(r.err)
                    return console.log(r.err)
                set({friends:r.data})
            })

        }
        
    })
)