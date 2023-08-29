
import {default as OriginalPage} from './PostsOfTopic'


export default async function Page({params}:{params:{slug:string}}) {
    if(!params || !params.slug || params.slug.replaceAll(/[\w|-]/g , ''))
        return <h1>There is a problem with slug</h1>
    return OriginalPage({params})
}