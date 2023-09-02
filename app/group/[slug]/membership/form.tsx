"use client"

import { ChangeEvent, MouseEvent,  MouseEventHandler,  useEffect,  useState } from "react" 
import { userType } from "@/lib/types"
import { toast } from "@/components/ui/use-toast" 
import { OneUser } from "@/components/user/oneUser"  
import { useDebounce } from 'usehooks-ts'
import { Input } from "@/components/ui/input" 
import { Button } from "@/components/ui/button"
import { MembershipCUD } from "./memberShipCRUD"
import { Loader2Icon } from "lucide-react"

 

function MemberSearchResult({users, groupId}:{users:userType[], groupId:number}){
    return users.map(u=><div key={u.id}>
        <OneUser u={u}  />
        <div className="flex py-2 gap-2">
            <Button variant={"outline"}  className="  p-2" onClick={MembershipCUD(u, groupId, 'register', 'member')} asChild={false} >Add as Member</Button>
            <Button variant={"link"} className="  p-2" onClick={MembershipCUD(u, groupId, 'register', 'admin')} >Add as Admin</Button>
        </div>
        </div>)
}


export default function Form({groupId}:{groupId:number}){
    const [users, usersSet] =  useState<userType[]>([])
    const [loading, loadingSet] =  useState(false)
    const [searchKey, searchKeySet] =  useState<string>('')
    const debouncedValue = useDebounce<string>(searchKey, 500)

    useEffect(()=>{
        if(!debouncedValue)
            return
        loadingSet(true)
        fetch('/api/groups/members?name='+ debouncedValue).
            then(r=>r.json()).
            then(r=>{
                console.log('formdan gelen' , r)
                loadingSet(false)
                if(r.err)
                    return toast({title:'Error', description:r.msg})
                usersSet(r.data)
            })}
    ,[debouncedValue])
    return  < > 
        <div className="flex items-center gap-6 my-2">
            <label className="text-sm w-1/2 font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">Search among all users</label>
            {loading?<Loader2Icon className="animate-spin" />:<></> }
            <Input name="searchKey" onChange={e=>searchKeySet(e.target.value)}  />
        </div>
        <div className="flex flex-wrap gap-2">
            <MemberSearchResult users={users} groupId={groupId} />
        </div>
            </>
}