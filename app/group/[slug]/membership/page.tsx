import { OneUser } from "@/components/user/oneUser";
import { user } from "@/drizzle/schema";
import {  dbUserSelect } from "@/lib/db";
import { usersOfGroup } from "@/lib/services/groupUsers"
import { GroupDefinitionFromSlug } from "@/lib/services/groups"
import { userType } from "@/lib/types";
import {  inArray, like } from "drizzle-orm";
import Form from "./form";
 

export default async function Page({params}:{params:{slug:string}}){
    let group   = await GroupDefinitionFromSlug(params.slug);
    let userIds = await usersOfGroup(group.id)
    let users:userType[] = []
    if(userIds.length)
         users   = await dbUserSelect.where(inArray(user.id, userIds)).execute()
    return <>
    <Form />
    <div className="flex">
     {users.map(user=><OneUser u={user} key={user.id} /> )}  
     </div>
    </>
    
    
}