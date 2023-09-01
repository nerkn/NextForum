"use client"

import { ChangeEvent,  MouseEventHandler,  useState } from "react" 
import { userType } from "@/lib/types"
import { toast } from "@/components/ui/use-toast" 
import { OneUser } from "@/components/user/oneUser"
import { Button } from "@/components/ui/button"
import { title } from "process"


function Membership(user:userType, action:'register'|'remove'){
    return (e:MouseEventHandler<HTMLAnchorElement>)=>{
        
        fetch('/api/groups/searchUser',{
                method:(action=='register')?'POST':'DELETE', 
                body:JSON.stringify({userId:user.id})}).
            then(r=>r.json()).
            then(r=>toast({title:r.err?'Error':'Sucess', description:r.msg }))
    }
}

function MemberSearchResult({users}:{users:userType[]}){
    return users.map(u=><div>
        <OneUser key={u.id} u={u}  />
        <a className="button" onClick={Membership(u, 'register')} >Add to Group</a>
        </div>)
}


export default function Form(){
    const [users, usersSet] =  useState<userType[]>([])
    function onChange(e: ChangeEvent<HTMLInputElement>){
        console.log('kedinin baskasi',e)
        fetch('/api/groups/searchUser?name='+ e.target.value).
            then(r=>r.json()).
            then(r=>{
                console.log('formdan gelen' , r)
                if(r.err)
                    return toast({title:'Error', description:r.msg})
                usersSet(r.data)
            })
    }

    return  <form > 
                <input name="searchKey" onChange={onChange}  />
                <div className="flex gap-2">
                <MemberSearchResult users={users} />
                </div>
            </form>
}