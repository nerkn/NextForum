import { toast } from "@/components/ui/use-toast"
import { GroupMemberShipType } from "@/lib/services/groupUsers"
import { userType } from "@/lib/types"

export function MembershipCUD(
    user:userType, 
    groupId:number, 
    action:'register'|'remove',
    membership?:GroupMemberShipType
    ){
return ( )=>{
    fetch('/api/groups/members',{
            method:(action=='register')?'POST':'DELETE', 
            body:JSON.stringify({userId:user.id, groupId, membership})}).
        then(r=>r.json()).
        then(r=>toast({title:r.err?'Error':'Sucess', description:r.msg }))
    return false
}
}

export async function MembershipR( 
    groupId:number,  
    ){
return   await fetch('/api/groups/members?groupId='+groupId).
        then(r=>r.json()).
        then(r=>{
            toast({title:r.err?'Error':'Sucess', description:r.msg })
            return r.data
            })
}