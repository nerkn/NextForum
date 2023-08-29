import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { groups, user } from "@/drizzle/schema"
import { HomeIcon, MessagesSquareIcon } from "lucide-react"
import Link from "next/link"

type userType = {
    id:number,
    name:string, 
    avatar:string
}
type groupType ={
    id:number,
    name:string,
    slug:string,
    description:string,
    createdAt:string
}
type groupsWUsers ={
    user_to_groups: {
        "userId": 1,
        "groupId": 22,
        "description": string
    },
    "groups": typeof groups,
    "user": userType
}
type returnType = {
    err:boolean,
    msg:string,
    data:{
        popularGroups:groupType[]
        popularGroupUsers:groupsWUsers[]
    }
}

function RenderUsers({u}:{u: userType[]}){
    let newList = u.filter((o,i)=>u.findIndex(b=>b.id==o.id)==i )

    return newList.map(u=>(
        <div key={u.id} className="group flex px-2 py-4 min-h-20 rounded-sm  hover:scale-150 hover:bg-[hsl(var(--background-hover))]  hover:border border-[var(--border)] ">
            <div className=" w-12 pr-4">
                <img src={u.avatar} alt="avatar " className="rounded-full   object-cover    "   />
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

function RenderTable({groups}:{groups:returnType}){
    
    console.log('groups', groups.data)
    return groups.data.popularGroups.map(group => (<>
        <Card className="w-56 flex flex-col justify-between">
            <CardHeader>
                <CardTitle><Link href={`/group/${group.slug}`}  >{group.name}</Link>  </CardTitle>
                <CardDescription>
                    {group.description}
                </CardDescription>
            </CardHeader>
            <CardContent><RenderUsers u={groups.data.popularGroupUsers.
            filter(u=>u.user_to_groups.groupId==group.id).map(u=>u.user)} />
            
             </CardContent>
            <CardFooter>{group.createdAt} </CardFooter>
        </Card>

        </>
        ))
}

export default async function Page(){
    const groups = await fetch('http://localhost:3017/api/groups', {next: { revalidate: 30 }}).then(r=>r.json()) 
    
    console.log('groups',  groups )
    return <>
    <h1>Popular groups</h1>
    <div className="flex items-stretch justify-strech  flex-wrap gap-1">
         <RenderTable groups={groups} />
         </div>
    <form action="/api/images" method="post" encType="multipart/form-data" >
        <input type='file' name='file' />
        <input type="submit" />
    </form>
    </>
}