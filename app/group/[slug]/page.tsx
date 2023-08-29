import { OneUser } from "@/components/user/oneUser";
import { UserType, groups, topics, user } from "@/drizzle/schema";
import { FetchRequestType } from "@/lib/types";
import { fmtDate } from "@/lib/utils";
import { InferSelectModel } from "drizzle-orm"; 
import { format } from "@lukeed/ms";
import { Button } from "@/components/ui/button";

type TopicWithUser = {
    topics: InferSelectModel<typeof topics>,
    user:   UserType
}
type GroupAndTopics ={
    group:  InferSelectModel<typeof groups>;
    topics : TopicWithUser[];
}


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
    const groupAndTopics:FetchRequestType<GroupAndTopics> = 
        await fetch(`http://localhost:3017/api/groups/${params.slug}`, 
                    {cache:"no-cache"})
            .then(r=>r.json())
    if(!groupAndTopics || !groupAndTopics.data)
        return <></>
        console.log(groupAndTopics.data.topics[0])
    return <div>
        <div></div>
        <div>
            <h1>{groupAndTopics.data.group.name}</h1>
            <Topics topics={groupAndTopics.data.topics} />
        </div>
    </div>
    
    
}