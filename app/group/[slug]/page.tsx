import { OneUser } from "@/components/user/oneUser"; 
import { GroupAndTopics, TopicWithUser, getGroupTopics } from "@/lib/services/groups"; 
import { fmtDate } from "@/lib/utils"; 
import AdminPages from "./adminPages";
import AdminMenu from "./adminMenu";


function Topics({topics}:{topics:TopicWithUser[]}) {
    
    return topics.map(t=><div key={t.topics.id} className="oneTopic">
        <OneUser u={t.user} className="basis-1/5" />
        <div className="description">
            <a href={"/topic/"+t.topics.slug}   > {t.topics.name.trim()?t.topics.name:"Nonamed topic "}</a><br />
            
            {t.topics.description}</div>
        <div className="actions">
            {fmtDate(t.topics.createdAt, true)}
            <div>
            </div>
        </div>
    </div>)
    
}


export default async function Page({params}:{params:{slug:string}}) {
    if(!params || !params.slug || params.slug.replaceAll(/[\w|-]/g , ''))
        return <h1>There is a problem with slug</h1>
    const groupAndTopics:GroupAndTopics =     await getGroupTopics(params.slug)
    
    if(!groupAndTopics)
        return <></>
    return <div>
        <div></div>
        <div>
            <div className="flex space-x-2 justify-between " >
            <h1>{groupAndTopics.group.name}</h1>
            <AdminPages 
                groupId={groupAndTopics.group.id}   
                admin  =<AdminMenu root={'/group/'+groupAndTopics.group.slug} type='admin' />
                member =<AdminMenu root={'/group/'+groupAndTopics.group.slug} type='member' />                
                notma  =<div>Join this group</div>
                />
            </div>
            <div className="my-2 py-2 border-b">{groupAndTopics.group.description}</div>
            <Topics topics={groupAndTopics.topics} />
        </div>
    </div>
    
    
}