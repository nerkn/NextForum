"use client"
 
import * as z from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
  
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
  } from "@/components/ui/form"
  import { Input } from "@/components/ui/input"
import { Button } from "../ui/button"
import { authStore } from "@/lib/context/auth"
import { DropdownMenuItem, DropdownMenuLabel } from "../ui/dropdown-menu"
import useStore from "@/lib/useStore"
import { LikeStore } from "@/lib/context/LikeStore"
 
const formSchema = z.object({
  email: z.string().email().min(2, {
    message: "Email must be at least 2 characters.",
  }),
  password: z.string().min(5).max(32)
})
  
export function UserNavMenuLogin() {
  const auth = useStore( authStore, (s=>({RequestLogin:s.RequestLogin, user:s.user, login:s.login, logout:s.Logout })))
  
  const likes = LikeStore(s=>({initialize: s.initialize}))
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: ""
    },
  })
  
 

if(!auth)
    return <></>

if(auth && auth.user){
  
  console.log('auth.user.userId', auth.user.userId)
  if(auth.user.userId)
    likes.initialize(auth.user.userId)
  return (
  <DropdownMenuLabel className="font-normal">
    <div className="flex flex-col space-y-1">
      <p className="text-sm font-medium leading-none">{auth.user?.email}</p>
      <p className="text-xs leading-none text-muted-foreground">
        {auth.user?.email}
      </p>
    </div>
    <DropdownMenuItem>
      <a onClick={auth.logout} >Log out</a>
    </DropdownMenuItem>
  </DropdownMenuLabel>)
} 
return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(auth.RequestLogin)} className="space-y-2">
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input placeholder="Email" {...field} />
              </FormControl> 
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem> 
              <FormControl>
                <Input placeholder="Password" {...field} />
              </FormControl> 
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  )
          }