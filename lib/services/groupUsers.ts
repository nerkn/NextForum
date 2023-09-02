import { likes, user, userToGroups } from "@/drizzle/schema"
import { db } from "../db"
import { and, eq, like  } from "drizzle-orm"
import { getSession } from "./user"
import { Now } from "../utils"
import { boolean } from "drizzle-orm/mysql-core"
import { likesOfUser } from "./likes"

/*
userCanAccessGroup(userid):boolean
addUserToGroup(userid):boolean
userToGroups()
*/


/* Returns user groups
*/
export type GroupMemberShipType = 'member'| 'admin'
type UserToGroupsReturn = "OnlyUserIds"|"UserIdsMembership"|"All"

export async function groupsOfUser(userId:number) {
    return await likesOfUser(userId, 'groups', 'member')
}

export type UsersOfGroupOnlyUserIds         = number[]
export type UsersOfGroupUserIdsMembership = {
        user: number;
        membership: string;
    }[]

export async function usersOfGroup(groupId:number, userToGroupsReturn:UserToGroupsReturn="OnlyUserIds"):Promise<UsersOfGroupOnlyUserIds|UsersOfGroupUserIdsMembership> {
    let result  = (await db.select({user:likes.user, bin:likes.bin}).
                    from(likes).
                    where(eq(likes.app,'groups')).
                    where(eq(likes.likee, groupId)))
    switch(userToGroupsReturn){
        default:
        case "OnlyUserIds":
                return result.map(u=>u.user)
        case "UserIdsMembership":
            return result.map(u=>({user:u.user, membership:u.bin}))
            
    }
    
}
export async function adminOfGroup(groupid:number, userId:number){
    let admins = await likesOfUser(userId, 'groups', 'admin')
    return admins.findIndex(myGroups=>myGroups.likee == groupid)>-1        
}
export async function addUserToGroup(groupid:number, userId:number , membership:GroupMemberShipType ) {    
    const session = await getSession()
    if(!session || !session.userId )
        return null

    if(!adminOfGroup(groupid, +session.userId))
        return null

    let values = {
        likee:groupid, 
        app:'groups', 
        bin:membership, 
        user:userId,
        createdAt:Now(), 
        updatedAt:Now()}
        
    let response = await db.insert(likes).
        values(values).execute() 
    if(membership=='admin'){
        values.bin ='member'
        await db.insert(likes).values(values).execute() 
    }
        
    return response;
}
export async function removeMemberShip(groupId:number, userId:number, membership:GroupMemberShipType) {  
    const session = await getSession()
    if(!session?.userId)
        return null
    
    let response = await db.delete(likes).
    where(
        and(
        eq(likes.likee, groupId),
        eq(likes.app,   'groups'),
        eq(likes.bin,   membership),
        eq(likes.user,  userId)
        )
    ).execute() 
    return response;
}