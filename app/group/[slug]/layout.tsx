import { GroupAndTopics, getGroupTopics } from "@/lib/services/groups"
import AdminPages from "./adminPages"
import AdminMenu from "./adminMenu"
import { Metadata } from "next"

export const metadata: Metadata = {
  title: 'Group Section',
  description: 'Group Description',
}
 


export  default async function ShopLayout({
    children,
    params,
  }: {
    children: React.ReactNode
    params: {
      slug: string
    }
  }) {
    // URL -> /shop/shoes/nike-air-max-97
    // `params` -> { tag: 'shoes', item: 'nike-air-max-97' }
    
    if(!params || !params.slug || params.slug.replaceAll(/[\w|-]/g , ''))
        return <h1>There is a problem with slug</h1>
    const groupAndTopics:GroupAndTopics =     await getGroupTopics(params.slug)
    if(!groupAndTopics)
        return <></>
    return     <div>
        <div className="flex space-x-2 justify-between " >
        <h1>{groupAndTopics.group.name}</h1>
        <AdminPages 
            groupId={groupAndTopics.group.id}   
            admin  =<AdminMenu root={'/group/'+groupAndTopics.group.slug} type='admin' />
            member =<AdminMenu root={'/group/'+groupAndTopics.group.slug} type='member' />                
            notma  =<div>Join this group</div>
            />
        </div>
        <div className="my-2 py-2 border-b">{groupAndTopics.group.description}</div>
        {children}
    </div>
  }