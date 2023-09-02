import { userType } from "@/lib/types"
import { cn } from "@/lib/utils"
import { HomeIcon, MessagesSquareIcon } from "lucide-react"




export function OneUser({u, className}:{u: userType|null, className?:string}){
    if(!u)
        u= {id:0, avatar:'https://cdn.auth0.com/avatars/default.png', name:'Deleted User', }
    let img = u.image?u.image:(u.avatar?u.avatar:'https://i.pravatar.cc/150?img='+ (u.id %70))
    
    return (
            <div key={u.id} className={cn("group flex px-2 py-4 h-24 rounded-sm hover:animation1 hover:scale-150 hover:bg-[hsl(var(--background-hover))] border  hover:border-[var(--border)] ", className)} style={{transition: "all .2s ease-in-out" }} >
            <div className=" w-12 pr-4">
                <img src={img} alt="avatar " className="rounded-full   object-cover    "   />
            <span className="invisible group-hover:visible flex justify-evenly"  >
                <a href={`/u/${u.id}`}   title="Profile"><HomeIcon strokeWidth={1} width={12}   /></a>
                <a href={`/messanger/${u.id}`} title='Message' ><MessagesSquareIcon strokeWidth={1}  width={12}  /></a>
            </span>
            </div>
            <div className="flex flex-col">
            <b>{u.name}</b> 
            </div>
            </div>
    )
}