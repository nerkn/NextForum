import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { config } from "@/lib/config"
import { PublicGroupsT, publicGroups } from "@/lib/services/groups"
import { userType } from "@/lib/types" 
import { HomeIcon, MessagesSquareIcon } from "lucide-react"
import Link from "next/link"


function RenderUsers({u}:{u: userType[]}){
    let newList = u.filter((o,i)=>u.findIndex(b=>b.id==o.id)==i )

    return newList.map(u=>(
        <div key={u.id} className="group flex px-2 py-4 min-h-20 rounded-sm  hover:scale-150 hover:bg-[hsl(var(--background-hover))]  hover:border border-[var(--border)] ">
            <div className=" w-12 pr-4">
                <img src={u?.avatar||config.avatar } alt="avatar " className="rounded-full   object-cover    "   />
            <span className="invisible group-hover:visible flex justify-evenly"  >
                <a href={`/u/${u.id}`}   title="Profile"><HomeIcon strokeWidth={1} width={12}   /></a>
                <a href={`/messanger/${u.id}`} title='Message' ><MessagesSquareIcon strokeWidth={1}  width={12}  /></a>
            </span>
            </div>
            <div className="flex flex-col">
            <b>{u.name}</b> 
            </div>
        </div>
    ))

}

function RenderTable({groups}: {groups:PublicGroupsT} ){     
    return groups.popularGroups.map(group => (<>
        <Card className="flex flex-col justify-between basis-1/5">
            <CardHeader>
                <CardTitle><Link href={`/group/${group.slug}`}  >{group.name}</Link>  </CardTitle>
                <CardDescription>
                    {group.description}
                </CardDescription>
            </CardHeader>
            <CardContent><RenderUsers u={groups.popularGroupUsers.
            filter(u=>u.user_to_groups.groupId==group.id).map(u=>u.user)} />
            
             </CardContent>
            <CardFooter>{group.createdAt} </CardFooter>
        </Card>

        </>
        ))
}

export default async function Page(){
    const groups = await publicGroups()
    
    return <>
    <h1>Popular groups</h1>
    <div className="flex  justify-between  flex-wrap gap-1">
         <RenderTable groups={groups} />
         </div>
    <form action="/api/images" method="post" encType="multipart/form-data" >
        <input type='file' name='file' />
        <input type="submit" />
    </form>
    </>
}