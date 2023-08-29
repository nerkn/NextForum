import { sql } from "drizzle-orm";
import { mysqlTable,  int, varchar, tinyint, datetime, unique, index } from "drizzle-orm/mysql-core" 


export const friendRequest = mysqlTable("FriendRequest", {
	id: int("id").autoincrement().notNull().primaryKey(),
	creatorId: int("creatorId").references(() => user.id),
	receiverId: int("receiverId").references(() => user.id),
});

export const groups = mysqlTable("groups", {
	id: int("id").autoincrement().notNull().primaryKey(),
	name: varchar("name", { length: 255 }).notNull(),
	slug: varchar("slug", { length: 255 }),
	description: varchar("Description", { length: 255 }).notNull(),
	secret: tinyint("secret"),
	createdAt: datetime("createdAt", { mode: 'string'}).notNull(),
	updatedAt: datetime("updatedAt", { mode: 'string'}).notNull(),
});

export const topics = mysqlTable("topics", {
	id: int("id").autoincrement().notNull().primaryKey(),
	group: int("group").notNull(),
	user: int("user").notNull(),
	name: varchar("name", { length: 255 }).notNull(),
	slug: varchar("slug", { length: 255 }),
	description: varchar("Description", { length: 255 }).notNull(),
	secret: tinyint("secret").default(0),
	archive: tinyint("archive").default(0),
	topicType:varchar("topicType", {length: 100}).default('chat'), // chat, question
	createdAt: datetime("createdAt", { mode: 'string'}).notNull().default(sql`CURRENT_TIMESTAMP`),
	updatedAt: datetime("updatedAt", { mode: 'string'}).notNull(),
});

export const posts = mysqlTable("posts", {
	id: int("id").autoincrement().notNull().primaryKey(),
	group: int("group").notNull(),
	topic: int("topic").notNull(),
	user: int("user").notNull(),
	description: varchar("Description", { length: 255 }).notNull(),
	secret: 	tinyint("secret").default(0),
	archive: 	tinyint("archive").default(0),
	starred: 	tinyint("starred").default(0),
	selected: 	tinyint("selected").default(0),
	createdAt: 	datetime("createdAt", { mode: 'string'}).notNull().default(sql`CURRENT_TIMESTAMP`),
	updatedAt: 	datetime("updatedAt", { mode: 'string'}).notNull(),
});

export const images =  mysqlTable("images", {
	id: int("id").autoincrement().notNull().primaryKey(),
	user: int("user").notNull(),
	name: varchar("name", { length: 255 }).notNull(),
	filename: varchar("filename", { length: 255 }).notNull(),
	description: varchar("Description", { length: 255 }).notNull(),
	app: varchar("app", { length: 255 }).notNull(),
	createdAt: datetime("createdAt", { mode: 'string'}).notNull(),
	updatedAt: datetime("updatedAt", { mode: 'string'}).notNull(),
});

export const likes =  mysqlTable("likes", {
	id: int("id").autoincrement().notNull().primaryKey(),
	likee: int("likee").notNull(),
	user: int("user").notNull(),
	app: varchar("app", { length: 255 }).notNull(),
	bin: varchar("bin", { length: 255 }).notNull(),
	createdAt: datetime("createdAt", { mode: 'string'}).notNull(),
	updatedAt: datetime("updatedAt", { mode: 'string'}).notNull(),
});
export const popular = mysqlTable("popular", {
	id: int("id").autoincrement().notNull().primaryKey(),
	table: varchar("table", { length: 255 }).notNull(),
	createdAt: datetime("createdAt", { mode: 'string'}).notNull().default(sql`CURRENT_TIMESTAMP`),
	updatedAt: datetime("updatedAt", { mode: 'string'}).notNull().default(sql`CURRENT_TIMESTAMP`),
});

export const role = mysqlTable("role", {
	id: int("id").autoincrement().notNull().primaryKey(),
	role: varchar("Role", { length: 255 }).notNull(),
});

export const session = mysqlTable("Session", {
	id: int("id").autoincrement().notNull().primaryKey(),
	userId: int("userId").notNull(),
	sessionToken: varchar("sessionToken", { length: 250 }).notNull(),
	expires: datetime("expires", { mode: 'string'}).notNull(),
});

export const user = mysqlTable("user", {
	id: int("id").autoincrement().notNull().primaryKey(),
	name: varchar("name", { length: 255 }).notNull(),
	password: varchar("password", { length: 255 }).notNull(),
	email: varchar("email", { length: 255 }).notNull(),
	avatar: varchar("avatar", {length:120})
},
(table) => {
	return {
		idx4A257D2C9837248D70640B3E36: unique("IDX_4a257d2c9837248d70640b3e36").on(table.email),
	}
});
 

export const userRoles = mysqlTable("user_roles", {
	userId: int("userId").notNull().references(() => user.id, { onDelete: "cascade", onUpdate: "cascade" } ),
	roleId: int("roleId").notNull().references(() => role.id, { onDelete: "cascade", onUpdate: "cascade" } ),
},
(table) => {
	return {
		idx3Ea8Bcae76Ff0B74Bcc1340Af8: index("IDX_3ea8bcae76ff0b74bcc1340af8").on(table.userId),
		idx03C652226Fd376F26B31503D40: index("IDX_03c652226fd376f26b31503d40").on(table.roleId),
	}
});

export const userToGroups = mysqlTable("user_to_groups", {
	userId: int("user_id").notNull().references(() => user.id),
	groupId: int("group_id").notNull().references(() => groups.id),
	description: varchar("description", { length: 20 }),
});