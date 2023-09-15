import { create } from "zustand"; 
import {persist} from "zustand/middleware"
import {signIn, signOut} from "next-auth/react" 
import { User } from "next-auth";
//import getCurrentUser from "@/actions/getCurrentUser";
export type user = {
    userId:number,
    email:string,
    avatar:string,
    roles:string[]
}
export type userLogin = {
    email:string
    password:string
}

export type  authStoreType ={
    login: boolean
    user : user | null
    jwt  : string
    RequestLogin: (user:userLogin)=>{}
    Logout:()=>{}

}

/*

  const {login,  user } = authStore(s=>({login:s.login, user:s.user}))
  */

export const authStore = create<authStoreType>()(
    persist(
        (set, get)=>({
            login:false, 
            user:null, 
            jwt:'',
            Logout:async ()=>{
                signOut({redirect:false}).then(()=>{
                            set({user:null, login: false})
                            console.log('logout olur mu?')
                         })
            },
            RequestLogin:async ({email,password} )=>{
                //fetch('/api/auth', {method:'POST', body:JSON.stringify ({email, password})}). then(r=>r.json()).
                signIn("credentials", {email, password, redirect:false}).then(async (response)=>{
                    if(response?.ok){
                        console.log("response'dan gect'k", response)
                        let cu = await fetch('/api/auth/currentUser').then(r=>r.json())
                        
                        console.log("response'dan gect'k cudan ", cu)
                        if(cu && !cu.err)
                            set({login: true, user:{...cu.data, avatar:cu.data.image||'', roles:[]}})
                    //    set({user:response?.ok})
                    }
                    
                }).catch(e=>{
                    console.log('login error ', e)
                })
            },
        }), 
        { name:'auth',  }
    )
    )