
import { OneUser } from "@/components/user/oneUser";
import { groups, posts, topics, user } from "@/drizzle/schema"; 
import { fmtDate } from "@/lib/utils";
import { InferSelectModel, eq } from "drizzle-orm";  
import { db } from "@/lib/db";
import { userType } from "@/lib/types";
import { ButtonLike } from "@/components/gen/buttonLike";
import { HeartIcon } from "lucide-react";
import { Editor } from "@/components/gen/editor";
import { FormEvent, FormEventHandler, SyntheticEvent } from "react";
import { Button } from "@/components/ui/button";
import { Places3 } from "@/components/gen/scheletons/Places3";


type PostsWithUser = {
    posts: InferSelectModel<typeof posts>,
    user:  userType|null
}
async function getTopic7slug(slug:string){
    return await db.select().from(topics).where(eq(topics.slug, slug)).execute()
}
async function getPosts(topicid:number){
    return await db.select({
        posts:posts,
        user:{id:user.id, name:user.name, avatar:user.avatar}
        }).
        from(posts).
        leftJoin(user, eq(user.id, posts.user)).
        where(eq(posts.topic, topicid)).orderBy(posts.createdAt)
}

function Posts({posts}:{posts:PostsWithUser[]}) {
    
    return posts.map(t=><div key={t.posts.id} className="oneTopic justify-end">
        <OneUser u={t.user} className="oneUser basis-1/5" />
        <div className="description">
            <div className="w-full">
                {t.posts.description}
            </div>         
            <div className="text-right text-xs text-muted-foreground ">
                {fmtDate(t.posts.createdAt, true)}
            </div>
        </div>
        <div className="actions">
            <div className="hideable">
            <ButtonLike app="posts" bin="like" likee={t.posts.id} 
                positiveChild=<Button variant="secondary" className="shrink-0 px-4">
                                    <HeartIcon fill="red" color="red" />
                              </Button>
                absentChild = <Button variant="secondary" className="shrink-0  px-4">
                                    <HeartIcon  strokeWidth={1} />
                               </Button>
                />
            </div>
            <ButtonLike app="posts" bin="hide" likee={t.posts.id}
                positiveChild=<Button variant="secondary" className="shrink-0 hideParent px-4">Revive</Button>
                absentChild=<Button variant="secondary" className="shrink-0 px-4">X</Button>
             />
             
        </div>
    </div>)
    
}


export default async function Page({params}:{params:{slug:string}}) {
    if(!params || !params.slug || params.slug.replaceAll(/[\w|-]/g , ''))
        return <h1>There is a problem with slug</h1>
    const currentTopic =  await getTopic7slug(params.slug) 
    if(!currentTopic || !currentTopic.length)
        return <>Topic not found?</>

    const posts = await getPosts(currentTopic[0].id) 
    let   users = [] as userType[]; 
    if(posts)
        users = posts.reduce((users, post  )=>{
            if(post.user)
                if(users.findIndex(u=>u.id==post?.user?.id)==-1)
                    users.push(post.user); 
            return users
        }, [] as userType[])
    console.log('users', users)
    if(!posts || !posts.length)
        return <></> 
    return <div>
        <div></div>
        <div className="mb-8">
            <h1>{currentTopic[0].name}</h1>
            <p>{currentTopic[0].description}</p>
            <Posts posts={posts} />
            <Places3 fillers={[
                <></>, 
                <Editor data={{
                    description:'',             
                    topic:currentTopic[0].id, 
                    group:currentTopic[0].group 
                    
                }} type="posts" 
                mentionUsers={users}
                 />,
                <></>]} 
            />
            
        </div>
    </div>
    
    
}