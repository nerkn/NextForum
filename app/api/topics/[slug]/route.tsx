import { getTopic } from "@/lib/services/topics";
import { ReturnNormal } from "@/lib/utils"; 

export async function GET(request:Request, params:{params:{slug:string}} ){ 
    return ReturnNormal('',  await getTopic(params.params.slug)        );
}