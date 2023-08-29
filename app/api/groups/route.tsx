import { getGroupUsers, getGroupsPopular } from "@/lib/services/groups";
import { ReturnNormal } from "@/lib/utils"; 

export async function GET(){
    let popularGroups       = await getGroupsPopular() 
    let popularGroupIds     = popularGroups.map(p=>p.id)
    let popularGroupUsers   = await getGroupUsers(popularGroupIds)
    return ReturnNormal('',  {
        popularGroups,
        popularGroupUsers        
        }
        );
}