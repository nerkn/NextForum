import UserAvatar from "@/components/gen/UserAvatar";


export default async function Page(){

    return (
    <div>
        <UserAvatar />
        <form action="/api/images" method="Post" encType="multipart/form-data">
            <input type="file" name='file' accept="image/png, image/gif, image/jpeg"  />
            <input type="hidden" name="aim" value="avatar" />
            <input type="submit" />
        </form>
    </div>
    )


}