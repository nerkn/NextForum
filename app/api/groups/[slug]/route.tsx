import { getGroupTopics} from "@/lib/services/groups";
import { ReturnNormal } from "@/lib/utils"; 

export async function GET(request:Request, params:{params:{slug:string}} ){ 
    return ReturnNormal('',  await getGroupTopics(params.params.slug)        );
}