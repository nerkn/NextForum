"use client"
import {
    Avatar,
    AvatarFallback,
    AvatarImage,
  } from "@/components/ui/avatar"
  import { Button } from "@/components/ui/button"
  import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuShortcut,
    DropdownMenuTrigger,
  } from "@/components/ui/dropdown-menu" 
import { UserNavMenuLogin } from "./user-nav-menu-login"
import { authStore } from "@/lib/context/auth"
import useStore from "@/lib/useStore"
import { likeStore } from "@/lib/context/LikeStore"
import { useEffect } from "react"
import Link from "next/link"
  
  export function UserNavMenu() {
    const auth = useStore(authStore, (s=>({user:s.user, login:s.login, userId:s?.user?.userId})))
    const likes =  useStore(likeStore, (s=>({initilize: s.initialize, userId: s.userId})))
    useEffect(()=>{
      if(!auth || !likes)
        return
      if(auth?.userId == likes?.userId )
        return
      likes?.initilize(auth?.userId || 0)

    },[auth?.user])
    return (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="relative h-8 w-8 rounded-full">
            <Avatar className="h-8 w-8">
              <AvatarImage src={auth?.user?.avatar} alt="@shadcn" />
              <AvatarFallback >{auth?.user?.email}</AvatarFallback>
            </Avatar>
          </Button>
        </DropdownMenuTrigger> 
        <DropdownMenuContent className="w-56" align="end" forceMount>

          <UserNavMenuLogin />
          <DropdownMenuSeparator />
          <DropdownMenuGroup>
            <DropdownMenuItem >
              <Link href="profile/userinfo"   >Profile
              <DropdownMenuShortcut>⇧⌘P</DropdownMenuShortcut>
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem>
              Billing
              <DropdownMenuShortcut>⌘B</DropdownMenuShortcut>
            </DropdownMenuItem>
            <DropdownMenuItem>
              Settings
              <DropdownMenuShortcut>⌘S</DropdownMenuShortcut>
            </DropdownMenuItem>
            <DropdownMenuItem>New Team</DropdownMenuItem>
          </DropdownMenuGroup>  
        </DropdownMenuContent>
      </DropdownMenu>
    )
  }