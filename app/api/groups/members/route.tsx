import { user } from "@/drizzle/schema";
import { db, dbUserSelect } from "@/lib/db"; 
import { UsersOfGroupUserIdsMembership, addUserToGroup, removeMemberShip, usersOfGroup } from "@/lib/services/groupUsers";
import { userType } from "@/lib/types";
import { ReturnError, ReturnNormal } from "@/lib/utils"; 
import { inArray, like, or } from "drizzle-orm";
import { NextRequest } from "next/server";


export type apiGroupsMembersMembershipAllUsersType = {
    users: userType,
    membership:UsersOfGroupUserIdsMembership
}


export async function GET(res:NextRequest ){
    let name =  res.nextUrl.searchParams.get('name');
    /* Search for members */
    if(name){ 
        return ReturnNormal('',  await db.select({
            id:user.id, 
            name:user.name, 
            avatar:user.avatar
        }).from(user).where(
            or(
                like(user.name, name+'%'),
                like(user.name, '% '+name+'%')
            )
                ).limit(10).execute())
    }else{
        /* Get all member */
        let groupId =  res.nextUrl.searchParams.get('groupId')||'';
        let userIds = await usersOfGroup(+groupId, "UserIdsMembership") as UsersOfGroupUserIdsMembership
        let users:userType[] = []
        if(userIds.length)
        users   = await dbUserSelect.where(inArray(user.id, userIds.map(u=>u.user))).execute()
        return ReturnNormal('Ok', {users, membership:userIds})
    }
}
 

/* @todo check if user is admin to group
*/

export async function POST(res:NextRequest ){
    const { userId,  groupId, membership } = await res.json() 
    if(await addUserToGroup(groupId, userId, membership))
        return ReturnNormal('Added')
    return ReturnError('Error') 
}

export async function DELETE(res:NextRequest ){
    const { userId,  groupId, membership } = await res.json() 
    
    if(await removeMemberShip(groupId, userId, membership))
        return ReturnNormal('Removed')
    return ReturnError('Error') 
}