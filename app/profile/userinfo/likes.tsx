
import { PostsWithUser } from "@/components/modules/PostsWithUser";
import { posts, user } from "@/drizzle/schema";
import { LikeStore } from "@/lib/context/LikeStore";
import { db } from "@/lib/db";
import { inArray, eq } from "drizzle-orm";

async function getLikedPosts(likes:number[]){
    return await db.select({
        posts:posts,
        user:{id:user.id, name:user.name, avatar:user.avatar}
        }).
        from(posts).
        leftJoin(user, eq(user.id, posts.user)).where(inArray(posts.id, likes) )
}


export async function Likes({app, bin}:{app:string, bin?:string}){
    const likeStore =  LikeStore(s=>({userLikes:s.userLikes}))
    let likes:number[];
    if(bin){
        likes = likeStore.userLikes.filter(ul=>(ul.app==app)&&(ul.bin==bin)).map(ul=>ul.likee)
    }else{
        likes = likeStore.userLikes.filter(ul=>(ul.app==app)).map(ul=>ul.likee)
    }
    let likedPosts = await getLikedPosts(likes)
    return <PostsWithUser posts={likedPosts} />
}