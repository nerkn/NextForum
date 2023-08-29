
import {  posts, topics, user } from "@/drizzle/schema"; 
import { eq } from "drizzle-orm";  
import { db } from "@/lib/db";
import { userType } from "@/lib/types";
import { Editor } from "@/components/gen/editor"; 
import { Places3 } from "@/components/gen/scheletons/Places3"; 
import { PostsWithUser } from "@/components/modules/PostsWithUser";


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
    if(!posts || !posts.length)
        return <></> 
    return <div>
        <div></div>
        <div className="mb-8">
            <h1>{currentTopic[0].name}</h1>
            <p>{currentTopic[0].description}</p>
            <PostsWithUser posts={posts} />
            <Places3 fillers={[
                <></>, 
                <Editor data={{
                    description:'',             
                    topic:currentTopic[0].id, 
                    group:currentTopic[0].group 
                    
                }} 
                type="posts" 
                mentionUsers={users}
                 />,
                <></>]} 
            />
            
        </div>
    </div>
    
    
}