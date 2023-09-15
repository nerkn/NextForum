"use client" 

import { useEffect,  useState } from "react" 
import { userType } from "@/lib/types"  
import { OneUser } from "@/components/user/oneUser"   
import { Button } from "@/components/ui/button"
import { MembershipCUD, MembershipR } from "./memberShipCRUD"
import { apiGroupsMembersMembershipAllUsersType } from "@/app/api/groups/members/route"
import { Loading } from "@/components/gen/Loading"




function MemberSearchResult({users, membership, groupId}:{
    users       : apiGroupsMembersMembershipAllUsersType["users"][], 
    membership  : apiGroupsMembersMembershipAllUsersType["membership"], 
    groupId     : number}){
        let musers = users.map(u=>{
            //currently 2 states, admin, member, but can be extended
            let usermemship =  membership.filter(m=>m.user==u.id)
            if(usermemship.find(ms=>ms.membership=="admin"))
                return {...u, membership:'admin'}
            return {...u, membership:'member'}
            }
            )
    return musers.map(u=><div key={u.id}>
        <OneUser u={u}  />
        <div className="flex py-2 gap-2">
            {u.membership=="member"?<Button variant={"outline"}  className="  p-2" 
                onClick={MembershipCUD(u, groupId, 'remove', 'member')} >Remove from Member</Button>:''}
            {u.membership=="admin"?<Button variant={"link"} className="  p-2" 
                onClick={MembershipCUD(u, groupId, 'remove', 'admin')} >Remove Admin</Button>:''}
        </div>
        </div>)
}


export default function ExistingMembers({groupId}:{groupId:number}){
    const [users, usersSet] =  useState<{users:userType[], membership:{user:number, membership:string}[]}>() 

    useEffect(()=>{
                MembershipR(groupId).then(r=>usersSet(r))
    } ,[])
 
    if(!users)
        return <div className="flex mt-2 flex-wrap gap-2">
                    <Loading />
                </div> 
    return <div className="flex mt-2 flex-wrap gap-2"> 
                <MemberSearchResult users={users.users} membership={users.membership} groupId={groupId} />
           </div> 
}