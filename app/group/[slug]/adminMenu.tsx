import Link from "next/link";



export default function AdminMenu({root}:{root:string, type:"admin"|"member"}){
    return <nav className="flex items-center space-x-4 lg:space-x-6">
    <Link href={root+'/membership'} className="button borderOver">Members</Link>
    <Link href={root+'/topics'    } className="button borderOver">Topics</Link>
    <Link href={root+'/posts'     } className="button borderOver">Posts</Link>
    </nav>
}