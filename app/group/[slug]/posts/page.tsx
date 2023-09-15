import { GroupAndTopics, getGroupTopics } from "@/lib/services/groups"
import { posts, topics, user } from "@/drizzle/schema"
import { desc, eq, inArray } from "drizzle-orm"
import { db } from "@/lib/db"
import { PostsWithUser } from "@/components/modules/PostsWithUser"
import { Suspense } from "react"
import { Loading } from "@/components/gen/Loading"




async function PostList(groupId:number, page:number=0, limit:number=50) {
    let postsFromDB = await 
                        db.select({posts, topics:{slug:topics.slug, name: topics.name}  }).from(posts).
                            innerJoin(topics, eq(posts.topic, topics.id)).
                            where(eq(posts.group, groupId)).
                            orderBy(desc(posts.createdAt)).
                            limit(limit).offset(page*limit)
    let useres = new Set<number>()
    //
    postsFromDB.forEach(p=>useres.add(p.posts.user))
    let usersFromDB = await 
                        db.select({id:user.id, name:user.name, avatar:user.avatar}).
                            from(user).where(inArray(user.id, [...useres]))
    let postListMod = postsFromDB.map(p =>({posts:p.posts, topics:p.topics,  user:usersFromDB.find(u=>u.id==p.posts.user)} ))               
    return postListMod
} 

 

export default async function Page({params}:{params:{slug:string}}) {
    if(!params || !params.slug || params.slug.replaceAll(/[\w|-]/g , ''))
        return <h1>There is a problem with slug</h1>
    const groupAndTopics:GroupAndTopics =     await getGroupTopics(params.slug)
    if(!groupAndTopics)
        return <h1>Groups cant found!</h1>
    const postList = await PostList(groupAndTopics?.group.id) 

    return <div>
        <Suspense fallback=<Loading /> >
        <PostsWithUser posts={postList} type="adminPages" />
        </Suspense>
        </div>

}