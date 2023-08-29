
import { user } from '@/drizzle/schema';
import { db } from '@/lib/db';
import { eq } from 'drizzle-orm';
import NextAuth, { NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials'


export const authOptions: NextAuthOptions = { 
    providers: [
      CredentialsProvider ({
        type:"credentials",
        credentials: {
          email: { label: "Username", type: "text", placeholder: "jsmith" },
          password: { label: "Password", type: "password" }
        },
        async authorize(credentials, req){
          const {email, password} = credentials as {email:string, password:string} 
          const userdb = await db.select().from(user).where(eq(user.email, email)).execute();
          console.log('login userdb', userdb)
          if(!userdb.length)
            return null
            console.log('login userdb', userdb[0].password ,  password)
          if(userdb[0].password !== password)
            return null
        let userdata ={...userdb[0], id:''+userdb[0].id, image:userdb[0].avatar};
            console.log('login userdata', userdata)
          return userdata
        }
      }),
   
      // FacebookProvider({
      //   clientId: process.env.FACEBOOK_ID,
      //   clientSecret: process.env.FACEBOOK_SECRET,
      // }),
      // GithubProvider({
      //   clientId: process.env.GITHUB_ID,
      //   clientSecret: process.env.GITHUB_SECRET,
      // }), 
    ],
    callbacks: {
      async jwt({ token, user, account, profile  }) {
        console.log('token, user', token, user,'account', account, 'profile', profile)

        if (user?.id) {
            token.id = user.id
        }
        token.userRole = "admin"
        return token
      },
      async session({session , token}) {
          session.userId = token.id? ''+token.id: '';
          session.userRoles = token.userRole?''+token.userRole:'';
          return session;
      }
    },
    session:{strategy:'jwt'},
    secret: process.env.JWT_SECRET
  }
  
  export default   NextAuth(authOptions)
  
  //export { handler as GET, handler as POST };