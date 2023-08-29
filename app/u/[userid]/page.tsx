import { groups, posts, topics, user } from "@/drizzle/schema";
import { db, dbUserSelect } from "@/lib/db";
import { fmtDate } from "@/lib/utils";
import { desc, eq } from "drizzle-orm";


export default async function Page({ params }: { params: { userid: string} }){
    let userid          = parseInt(params.userid)
    let [userCurrentPromise, postsRecentPromise]     = await Promise.allSettled( [
            dbUserSelect.where(eq(user.id, userid)).execute(),
            db.select({
                description:posts.description,
                postid:posts.id, 
                groupid:posts.group, 
                createdAt:posts.createdAt      ,         
                topicname:topics.name, 
                topicslug:topics.slug
            }).from(posts)
                .where(eq(posts.user, userid))
                .leftJoin(topics, eq(topics.id, posts.topic))
            .orderBy(desc(posts.createdAt)).execute()
        ]);
    if(userCurrentPromise.status == "rejected")
        return <div>Problem with db </div>
    if(postsRecentPromise.status == "rejected")
        return <div>Problem with posts db </div>
    let userCurrent = userCurrentPromise.value[0]
    
    return <div className="flex">
            <div className="border p-2 ">
                <div><h1 className="text-center text-xl  ">{userCurrent.name}</h1></div>
                <div><img src={userCurrent.avatar||''} className="max-w-sm rounded-md" /></div> 
            </div>
            <div className="space-y-6 p-2">
                {postsRecentPromise.value.map(post=><div className="py-2 border-t ">
                    <div className="flex items-end justify-between mt-4 mb-2">
                        <a href={'/topics/'+post.topicslug} className=" font-bold" > {post.topicname}</a>
                        <div>{fmtDate(post.createdAt)}</div>
                    </div>
                    <div className="overflow-hidden bg-[hsl(var(--background2)]">
                        <div className="truncate max-h-32 whitespace-pre-line"
                            dangerouslySetInnerHTML={{__html: post.description}} 
                            />
                    </div>
                    </div>
                    )}
            </div>
        </div>
}