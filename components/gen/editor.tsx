"use client"
import { formSubmit, slugify } from "@/lib/utils"
import { ChangeEvent, FormEventHandler, useState } from "react"
import { useToast } from "../ui/use-toast"
import { Button } from "../ui/button"
import Tiptap from "./tiktapEditor/tiktapEditor" 
import { FetchRequestType, userType } from "@/lib/types"
import { revalidatePath } from "next/cache"
import { usePathname } from "next/navigation"

type formData = {
    id?:number
    name?:string
    slug?:string
    description:string
    topic?:number
    group?:number
}



export function Editor({ type, data, mentionUsers}:{
    type    :"posts"|"topics", 
    data    : formData
    mentionUsers:userType[]
    }){
       const[slugger,   sluggerSet] = useState(data?.slug||'')
       const[desc,      descSet] = useState(data?.description||'')
       const onNameChange = () =>(e:ChangeEvent<HTMLInputElement>)=>sluggerSet(slugify(e.target.value))
       const onSlugChange = () =>(e:ChangeEvent<HTMLInputElement>)=>sluggerSet(slugify(e.target.value))
       const action = `/api/${type}`
       const {toast} = useToast() 
       const currentPath =  usePathname()
       console.log('currentPath', currentPath)
       //revalidatePath()
       function formSubmitSuccess(r:FetchRequestType<any>){
        console.log(r)
            toast({title:'Added', description:r?r.msg:'Post has been added'})
            return true;
       }
       
       
    return <form 
                onSubmit={formSubmit(
                    formSubmitSuccess,
                    (e)=>{toast({title:'Error', description:e}) }
                    )} 
                key={data?.id||new Date().toString().slice(0,18)} 
                action={action}
                className="  mb-2 p-4 flex flex-col space-y-2"
                >
        <input type="hidden" name="id" value={data.id} />
        {(type=="topics")?<input name="name" defaultValue={data?.name}  onChange={onNameChange}/>:<></>}
        {(type=="topics" && !data.id)?<input name="slug" value={slugger} />:<></>}
        {(data?.topic)?<input type='hidden' name="topic" value={data.topic} />:<></>}
        {(data?.group)?<input type='hidden' name="group" value={data.group} />:<></>}
        
        <Tiptap  
            content=''
            mentionUsers={mentionUsers}
            onUpdate={({editor})=>descSet(JSON.stringify(editor.getJSON()))}
            readOnly={false}
             />
        <textarea value={desc} readOnly={true} name="description" className="flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"></textarea>
        <Button type="submit" value="Submit" className="" variant="default" > Submit</Button>
        <a onClick={()=>toast({title:"where is it", description:"where is toaster"})} >Oh toaster</a>
    </form>
}