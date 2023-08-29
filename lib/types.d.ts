import { InferSelectModel } from "drizzle-orm"

export type FetchRequestType<T> ={
    err:number,
    msg:string,
    data:T
}
interface SessionUserExtended extends User{
  id:number,
  userRole:string[]
}

//export type userType= InferSelectModel<typeof user>
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