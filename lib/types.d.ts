import { topicsTI, topicsT,  likeTI, postsT } from "./types.db"

export type FetchRequestType<T> ={
    err:number,
    msg:string,
    data:T
}

export type formDataFileBufferType = {
  arrayBuffer: () => Promise<ArrayBuffer>,
  size:number         // 116819
  type: string,       // 'image/jpeg'
  name: string,       // 'WhatsApp Image 2023-06-13 at 3.59.22 PM.jpg'
  lastModified:number // 1692654583776
}


interface SessionUserExtended extends User{
  id:number,
  userRole:string[]
}
 
export type userType= {
  id:number,
  name:string,
  avatar:string|null
  image?:string
}

declare global {
    // eslint-disable-next-line @typescript-eslint/no-namespace
    namespace NodeJS {
      interface ProcessEnv {
        JWT_SECRET: string
        MYSQL: string
      }
    }
  }


export * from "next-auth"
declare module "next-auth" {

  interface Session extends DefaultSession {
    userId?: number|string;
    userRoles?:string
  }
}



export type  LikeStoreType ={
    userLikes   : likeTI[],
    userId      : number,
    initStatus  : number,
    stateUpdate : number,
    destorize   :()=>void,
    initialize  :(userId:number)=>{}
    addLike     :(app:string, bin:string, likee:number)=>void
    removeLike  :(app:string, bin:string, likee:number)=>void
    status      :(app:string, bin:string, likee:number)=>boolean

}
export type PostsWithUserT = {
  posts: postsT,
  topics?: topicsT,
  user:  userType|null|undefined
}