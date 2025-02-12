import { relations } from "drizzle-orm";
import {
  integer,
  pgEnum,
  serial,
  text,
  timestamp,
  varchar,
} from "drizzle-orm/pg-core";
import {
  createTable,
  hasOrganization,
  softDelete,
  timestamps,
} from "../columns.helpers";
import { user } from "./auth-schema";

export const projectStatus = pgEnum("project_status", [
  "Created",
  "In-Progress",
  "Completed",
  "Cancelled",
]);

export const projects = createTable("project", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 256 }).notNull(),
  description: varchar("description", { length: 256 }),
  startDate: timestamp("start_date", { withTimezone: true }).notNull(),
  endDate: timestamp("end_date", { withTimezone: true }).notNull(),
  status: projectStatus("project_status").default("Created").notNull(),
  ...timestamps,
  ...softDelete,
  ...hasOrganization,
});

export const projectMembers = createTable("project_members", {
  id: serial("id").primaryKey(),
  projectId: integer("project_id")
    .references(() => projects.id)
    .notNull(),
  userId: text("user_id")
    .references(() => user.id)
    .notNull(),
  ...timestamps,
  ...softDelete,
  ...hasOrganization,
});

export const projectItems = createTable("project_items", {
  id: serial("id").primaryKey(),
  projectId: integer("project_id")
    .references(() => projects.id)
    .notNull(),
  name: varchar("name", { length: 256 }).notNull(),
  userId: text("user_id"),
  description: varchar("description", { length: 256 }),
  status: projectStatus("project_item_status").default("Created"),
  startDate: timestamp("start_date", { withTimezone: true }),
  endDate: timestamp("end_date", { withTimezone: true }),
  ...timestamps,
  ...softDelete,
  ...hasOrganization,
});

export const projectRelations = relations(projects, ({ many }) => ({
  projectMembers: many(projectMembers),
  projectItems: many(projectItems),
}));

export const projectMembersRelations = relations(projectMembers, ({ one }) => ({
  project: one(projects, {
    fields: [projectMembers.projectId],
    references: [projects.id],
  }),
  user: one(user, {
    fields: [projectMembers.userId],
    references: [user.id],
  }),
}));

export const projectItemsRelations = relations(projectItems, ({ one }) => ({
  project: one(projects, {
    fields: [projectItems.projectId],
    references: [projects.id],
  }),
  user: one(user, {
    fields: [projectItems.userId],
    references: [user.id],
  }),
}));
