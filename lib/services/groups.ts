import { groups, topics,posts,  user, userToGroups } from "@/drizzle/schema"
import { db } from "../db"
import { InferSelectModel, desc, eq, inArray } from "drizzle-orm"    
import { userType } from "../types"
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
 
type groupType ={
  id:number,
  name:string,
  slug:string|null,
  description:string,
  createdAt:string
}
type groupsWUsers ={
  user_to_groups: {
      "userId": number,
      "groupId": number,
      "description": string|null
  },
  "groups": typeof groups,
  "user": userType
} 
export type PublicGroupsT = {
  popularGroups:groupType[]
  popularGroupUsers:groupsWUsers[]
}
export async function  publicGroups():Promise<PublicGroupsT>{
    let popularGroups       = await getGroupsPopular() 
    let popularGroupIds     = popularGroups.map(p=>p.id)
    let popularGroupUsers   = await getGroupUsers(popularGroupIds)
    return   {
        popularGroups,
        popularGroupUsers        
        }
}
export async function getGroupsPopular(){
    return  db.select().from(groups).
                where(eq(groups.secret, 0 )).
                orderBy(desc(groups.updatedAt)).limit(30).
                execute()
    
}

export async function getGroupUsers(groupIds:number[]):Promise<groupsWUsers[]> {
  // @ts-ignore
  return db.select({
                    user_to_groups:userToGroups, 
                    groups, 
                    user:{id:user.id, avatar:user.avatar, name:user.name }
                  })
          .from(userToGroups).
          innerJoin(groups, eq(userToGroups.groupId, groups.id )).
          innerJoin(user, eq(userToGroups.userId, user.id)).
          where(inArray(userToGroups.groupId, groupIds)).
          execute()
  
}
export async function GroupDefinitionFromSlug(slug:string) {
  let group = await db.select().from(groups).where(eq(groups.slug, slug)).execute()
  return group[0]
}

export type TopicWithUser = {
  topics: InferSelectModel<typeof topics>,
  user:   userType
}

export type GroupAndTopics ={
  group:  InferSelectModel<typeof groups>;
  topics : TopicWithUser[];
} | null


export async function getGroupTopics(slug:string) {
  console.log('getGroupTopics slug is ', slug)
  const group = await db.select().from(groups).where(eq(groups.slug, slug)).execute()
  if(!group.length)
    return null;
  return {
      group:group[0],
      topics: await db.select({
        topics,
        user:{id:user.id, 
          avatar:user.avatar, 
          name:user.name, 
          }
        }).from(topics).
        where(eq(topics.group, group[0].id)).
        innerJoin(user, eq(user.id, topics.user) )
  }
  
}

export async function getTopic7slug(slug:string){
  return await db.select().from(topics).where(eq(topics.slug, slug)).execute()
}
export async function getPosts(topicid:number){
  return await db.select({
      posts:posts,
      user:{id:user.id, name:user.name, avatar:user.avatar}
      }).
      from(posts).
      leftJoin(user, eq(user.id, posts.user)).
      where(eq(posts.topic, topicid)).orderBy(posts.createdAt)
}


