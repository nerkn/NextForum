import UserAvatar from "@/components/gen/UserAvatar"; 
import { Likes } from "./likes";
import ClientOnly from "@/components/ClientOnly";


export default async function Page(){ 
    return (
    <div className="grid grid-cols-[200px_minmax(900px,_1fr)] ">
        <UserAvatar />
        <form action="/api/images" method="Post" encType="multipart/form-data">
            <input type="file" name='file' accept="image/png, image/gif, image/jpeg"  />
            <input type="hidden" name="aim" value="avatar" />
            <input type="submit" />
        </form>
        <div><h1>Likes</h1></div>
        <div><Likes app="posts" bin="like" /></div>
    </div>
    )


}