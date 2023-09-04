import { InferSelectModel } from "drizzle-orm"


export type likeTI   = InferSelectModel<typeof likes>
export type topicsTI = InferInsertModel<typeof topics>
export type postsT   = InferSelectModel<typeof posts>
export type postsTI  = InferInsertModel<typeof posts>