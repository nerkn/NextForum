

    
import { db } from "@/lib/db";
import { inArray, eq } from "drizzle-orm";
import { posts, topics, user } from "@/drizzle/schema";
import { ReturnError, ReturnNormal } from "@/lib/utils";
import { NextRequest } from "next/server";



export async function GET(
    request: NextRequest,
    { params }: { params: { app: string }} ){
        const likeIds = request.nextUrl.searchParams.get("likeIds");
        if(!likeIds)
            ReturnError('what')
        switch(params.app){ 
            case 'posts':
                return ReturnNormal("ok",  await db.select({
                    posts:posts,
                    user:{id:user.id, name:user.name, avatar:user.avatar},
                    topics:{name:topics.name,  slug:topics.slug}
                    }).
                    from(posts).                    
                    innerJoin(topics, eq(topics.id, posts.topic)).
                    innerJoin(user, eq(user.id, posts.user)).
                    where(inArray(posts.id, likeIds?.split(',')) ))
            default:
                return ReturnError('cant understand request')
        }
}