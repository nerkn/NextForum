"use client"

import { authStore } from "@/lib/context/auth";
import useStore from "@/lib/useStore"
import { likeStore } from "@/lib/context/LikeStore";

export default function UserAvatar(){

    const currentUser =   useStore(authStore, (s=>({user: s.user })))

    if(!currentUser?.user)
        return null
    return  <img src={currentUser.user?.avatar} />;
}
