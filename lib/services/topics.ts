import { groups, topics, user } from "@/drizzle/schema"; 
import { db } from "../db";
import { eq } from "drizzle-orm"   

export async function getTopic(slug:string) {
  const topic = await db.select().from(topics).
                leftJoin(groups, eq(groups.id, topics.id)).
                where(eq(topics.slug, slug)).execute()

    if(!topic.length)
      return null;
    return topic[0];
    
  }