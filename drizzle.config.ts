import {Config} from 'drizzle-kit'
import dotenv from 'dotenv'
dotenv.config({path:'.env.local'})
console.log('process.env.MYSQL', process.env.MYSQL)

export default {
    schema: "./drizzle/schema.ts",
    out: "./drizzle",
    driver:"mysql2",
    dbCredentials:{
        connectionString: process.env.MYSQL||''
    }
} satisfies Config;