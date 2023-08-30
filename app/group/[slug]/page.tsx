import { OneUser } from "@/components/user/oneUser";
import { groups, topics } from "@/drizzle/schema";
import { getGroupTopics } from "@/lib/services/groups";
import { userType, FetchRequestType } from "@/lib/types";
import { fmtDate } from "@/lib/utils";
import { InferSelectModel } from "drizzle-orm";  

type TopicWithUser = {
    topics: InferSelectModel<typeof topics>,
    user:   userType
}
type GroupAndTopics ={
    group:  InferSelectModel<typeof groups>;
    topics : TopicWithUser[];
} | null


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
    
    console.log('groupAndTopics', groupAndTopics)
    if(!groupAndTopics)
        return <></>
    return <div>
        <div></div>
        <div>
            <h1>{groupAndTopics.group.name}</h1>
            <div className="my-2 py-2 border-b">{groupAndTopics.group.description}</div>
            <Topics topics={groupAndTopics.topics} />
        </div>
    </div>
    
    
}