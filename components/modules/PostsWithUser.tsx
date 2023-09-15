import { fmtDate } from "@/lib/utils";
import { OneUser } from "../user/oneUser";
import { ButtonLike } from "../gen/buttonLike";
import { Button } from "../ui/button";
import { HeartIcon, Trash2Icon, Undo } from "lucide-react";
import { PostsWithUserT } from "@/lib/types";  
import { ButtonDelete } from "../gen/buttonDelete";



function TopicHeader({topic}:{topic?:{name:string, slug?:string|null}}){
    if(!topic)
        return <></>
    return <h3><sup>Topic:</sup> <a href={"/topics/"+topic.slug}>{topic.name}</a></h3>
}


export function PostsWithUser({posts, type="normal"}:
    {
        posts:PostsWithUserT[],
        type:"adminPages"|"normal"
    }) {
    
    return posts.map(t=><div key={t.posts.id} className="oneTopic justify-end">
        <OneUser u={t.user} className="oneUser basis-1/5" />
        <div className="description">
            <TopicHeader  topic={t.topics} />
            <div className="w-full" dangerouslySetInnerHTML={{__html: t.posts.description}} />
            <div className="text-right text-xs text-muted-foreground ">
                {fmtDate(t.posts.createdAt, true)}
            </div>
        </div>
        {type=="normal"?
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
            <ButtonLike 
                app     = "posts" 
                bin     = "hide" 
                likee   = {t.posts.id}
                positiveChild = <Button variant="secondary" className="shrink-0 px-4 hideParent">
                        <Undo  />
                    </Button>

                absentChild=<Button variant="secondary" className="shrink-0 px-4">
                        <Trash2Icon  />
                    </Button>
             /> 
        </div>:
        <div className="actions">
            <ButtonDelete postId={t.posts.id} />
        </div>}
    </div>)
    
}
