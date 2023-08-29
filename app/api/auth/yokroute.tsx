import {CredentialsProvider} from 'next-auth/providers/credentials'


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
          if(email !== 'erkintek@gmail.com'  && password !== '123456')
            return null
          const user = await queryBuilder
                  .selectFrom('User')
                  .select(['id', 'name',  'email', 'password'])
                  .where('email', '=', email)
                  .execute();
          console.log('user', user)
          if(!user.length)
            return null
          if(user[0].password !== password)
            return null
          return user[0];
        }
      }),
  
      // Auth0Provider({
      //   clientId: process.env.AUTH0_ID,
      //   clientSecret: process.env.AUTH0_SECRET,
      //   issuer: process.env.AUTH0_ISSUER,
      // }),
      // FacebookProvider({
      //   clientId: process.env.FACEBOOK_ID,
      //   clientSecret: process.env.FACEBOOK_SECRET,
      // }),
      // GithubProvider({
      //   clientId: process.env.GITHUB_ID,
      //   clientSecret: process.env.GITHUB_SECRET,
      // }),
      // GoogleProvider({
      //   clientId: process.env.GOOGLE_ID,
      //   clientSecret: process.env.GOOGLE_SECRET,
      // }),
      // TwitterProvider({
      //   clientId: process.env.TWITTER_ID,
      //   clientSecret: process.env.TWITTER_SECRET,
      //   version: "2.0",
      // }),
    ],
    callbacks: {
      async jwt({ token }) {
        token.userRole = "admin"
        return token
      },
    },
  }
  
  export const handler =  NextAuth(authOptions)
  
  export { handler as GET, handler as POST };