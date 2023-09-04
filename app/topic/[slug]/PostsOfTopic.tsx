

import { userType } from "@/lib/types";
import { Editor } from "@/components/gen/editor"; 
import { Places3 } from "@/components/gen/scheletons/Places3"; 
import { PostsWithUser } from "@/components/modules/PostsWithUser";
import { getPosts, getTopic7slug } from "@/lib/services/groups";



export default async function Page({params}:{params:{slug:string}}) {
    if(!params || !params.slug || params.slug.replaceAll(/[\w|-]/g , ''))
        return <h1>There is a problem with slug</h1>
    const currentTopic =  await getTopic7slug(params.slug) 
    if(!currentTopic || !currentTopic.length)
        return <>Topic not found?</>
    console.log('currentTopic', currentTopic)
    const posts = await getPosts(currentTopic[0].id) 
    let   users = [] as userType[]; 
    if(posts)
        users = posts.reduce((users, post  )=>{
            if(post.user)
                if(users.findIndex(u=>u.id==post?.user?.id)==-1)
                    users.push(post.user); 
            return users
        }, [] as userType[])
        console.log('topic posts', posts)
    if(!posts  )
        return <></> 
    return <div>
        <div></div>
        <div className="mb-8">
            <h1>{currentTopic[0].name}</h1>
            <p>{currentTopic[0].description}</p>
            <PostsWithUser posts={posts} type="normal" />
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