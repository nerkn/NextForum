
import mysql from "mysql2/promise";
import {drizzle } from "drizzle-orm/mysql2"
import { user } from "@/drizzle/schema";
 
const poolConnection = mysql.createPool(process.env.MYSQL||'');
export const db             = drizzle(poolConnection, { logger: true });
export const dbUserSelect   = db.select({
    id:user.id, 
    avatar:user.avatar,
    email:user.email,  
    name:user.name }).from(user)