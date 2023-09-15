import { GroupDefinitionFromSlug } from "@/lib/services/groups"
import Form from "./form";
import ExistingMembers from "./ExistingMembers";
 

export default async function Page({params}:{params:{slug:string}}){
    let group   = await GroupDefinitionFromSlug(params.slug);     
    return <>
            <Form groupId={group.id} />
            <h1>{group.name} Users</h1>
                <ExistingMembers groupId={group.id} />
            </>
    
    
}