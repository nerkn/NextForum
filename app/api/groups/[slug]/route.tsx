import { getGroupTopics} from "@/lib/services/groups";
import { ReturnNormal } from "@/lib/utils"; 

export async function GET(request:Request, params:{params:{slug:string}} ){
    //const params = await request.
    console.log('params', params, params.params.slug);
    return ReturnNormal('',  await getGroupTopics(params.params.slug)        );
}