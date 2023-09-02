"use client"

import { LikeStore } from "@/lib/context/LikeStore"
import { ReactElement } from "react"


export default function AdminPages({groupId,member, admin, notma }:{
    groupId:number,member:ReactElement, admin:ReactElement, notma:ReactElement }){
    const membership = LikeStore(s=>({status:s.status, initStatus:s.initStatus}))
    const membershipStatus = membership.status("groups", "member", groupId)
    const adminshipStatus  = membership.status("groups", "admin", groupId)
    console.log('membership.initStatus', membership.initStatus)
    if(adminshipStatus)
        return admin
    if(membershipStatus)
        return member
    return notma

}