"use client"
import { PostsWithUser } from "@/components/modules/PostsWithUser";
import { LikeStore } from "@/lib/context/LikeStore";
import useStore from "@/lib/useStore";
import { useEffect, useState } from "react";



export  function Likes({app, bin}:{app:string, bin?:string}){
    console.log('likes 1')
    const likeStore =  useStore(LikeStore, (s=>({userLikes:s.userLikes})))
    let [likedPosts,likedPostsSet] = useState([])
    let likes = []
    useEffect(()=>{
        console.log('likes 2')
        if(!likeStore)
            return
        if(bin){
            likes = likeStore.userLikes.filter(ul=>(ul.app==app)&&(ul.bin==bin)).map(ul=>ul.likee)
        }else{
            likes = likeStore.userLikes.filter(ul=>(ul.app==app)).map(ul=>ul.likee)
        }
        if(likes)
        fetch('/api/likes/posts?likeIds='+likes.join(',')).then(r=>r.json()).then((r)=>{
            if(!r.err)
                likedPostsSet(r.data)
        })
    }, [likeStore])
    
    if(!likedPosts.length)
        return <>No likes</>
    return <PostsWithUser posts={likedPosts} />
}