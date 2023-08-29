
import { UserType, user } from "@/drizzle/schema";  
import { create } from "zustand"; 


type SuggestionStoreType = {
    friends:UserType[]
    currentPage:UserType[]
    add7CurrentPage:(users:UserType[])=>void,
    gatherFriendList:(users?:UserType[])=>void

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