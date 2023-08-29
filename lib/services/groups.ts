import { groups, topics, user, userToGroups } from "@/drizzle/schema"
import { db } from "../db"
import { desc, eq, inArray } from "drizzle-orm"   

/*
const result = await db.select({
    id: users.id,
    lowerName: sql`lower(${users.name})`,
  }).from(users);
  
await db.select().from(users).where(sql`${users.id} >= 42`);

await db.select().from(users).where(not(eq(users.id, 42)));
await db.selectDistinct().from(users).orderBy(usersTable.id, usersTable.name);

await db.select().from(users).orderBy(desc(users.name));


const sq = db.select().from(users).where(eq(users.id, 42)).as('sq');
const result = await db.select().from(sq);

findFirst
*/

export function getGroupsUser(userId:number){
    return db.select().from(userToGroups).where(eq(userToGroups.userId, userId)).execute()
}
export async function getGroupsPopular(){
    return  db.select().from(groups).
                where(eq(groups.secret, 0 )).
                orderBy(desc(groups.updatedAt)).limit(30).
                execute()
    
}

export async function getGroupUsers(groupIds:number[]) {
  return db.select().from(userToGroups).
  innerJoin(groups, eq(userToGroups.groupId, groups.id )).
  innerJoin(user, eq(userToGroups.userId, user.id)).
  where(inArray(userToGroups.groupId, groupIds))
  
}


export async function getGroupTopics(slug:string) {
  console.log('getGroupTopics slug is ', slug)
  const group = await db.select().from(groups).where(eq(groups.slug, slug)).execute()
  if(!group.length)
    return null;
  return {
      group,
      topics: await db.select().from(topics).
        where(eq(topics.group, group[0].id)).
        innerJoin(user, eq(user.id, topics.user) )
  }
  
}

