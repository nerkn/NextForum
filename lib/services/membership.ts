/* Controls         */

import { authOptions } from "@/pages/api/auth/[...nextauth]";
import { getServerSession } from "next-auth/next";




export async function getUserMembership(){
    const session = await getServerSession(authOptions)
    if(!session?.user?.email)
        return null
    
}