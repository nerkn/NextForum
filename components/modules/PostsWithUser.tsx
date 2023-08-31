import { fmtDate } from "@/lib/utils";
import { OneUser } from "../user/oneUser";
import { ButtonLike } from "../gen/buttonLike";
import { Button } from "../ui/button";
import { HeartIcon, Trash2Icon, Undo } from "lucide-react";
import { PostsWithUserT } from "@/lib/types";

export function PostsWithUser({posts}:{posts:PostsWithUserT[]}) {
    
    return posts.map(t=><div key={t.posts.id} className="oneTopic justify-end">
        <OneUser u={t.user} className="oneUser basis-1/5" />
        <div className="description">
            <div className="w-full" dangerouslySetInnerHTML={{__html: t.posts.description}} />
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
            <ButtonLike 
                app     = "posts" 
                bin     = "hide" 
                likee   = {t.posts.id}
                positiveChild = <Button variant="secondary" className="shrink-0 px-4">
                        <Undo  />
                    </Button>

                absentChild=<Button variant="secondary" className="shrink-0 px-4">
                        <Trash2Icon  />
                    </Button>
             />
             
        </div>
    </div>)
    
}
