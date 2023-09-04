"use client"

import { Delete, Loader2, Loader2Icon } from "lucide-react";
import { Button } from "../ui/button";
import { toast } from "../ui/use-toast";
import { useState } from "react";


export function ButtonDelete({postId}:{postId:number}){
    const [loading, loadingSet] = useState(false)
    function DeleteFunction(
        postId:number, 
        ){
            return ( )=>{
                loadingSet(true)
                fetch('/api/posts',{
                        method:'DELETE', 
                        body:JSON.stringify({postId})}).
                    then(r=>r.json()).
                    then(r=>{
                        toast({title:r.err?'Error':'Sucess', description:r.msg })
                        loadingSet(false)
                    })
                return false
            }
    }

return <Button  onClick={DeleteFunction(postId)}>
    {loading? <Loader2Icon className="animate-spin" />:<Delete /> }
</Button>
}