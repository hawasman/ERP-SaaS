import { pgEnum, serial, text } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";
import { createTable, timestamps } from "../columns.helpers";
import { organization, user } from "./auth-schema";

export const ActionType = pgEnum("action_type", [
  "SIGN_UP",
  "SIGN_IN",
  "SIGN_OUT",
  "UPDATE_PASSWORD",
  "DELETE_ACCOUNT",
  "UPDATE_ACCOUNT",
  "CREATE_TEAM",
  "REMOVE_TEAM_MEMBER",
  "INVITE_TEAM_MEMBER",
  "ACCEPT_INVITATION",
  "ASSIGN_TEAM_MEMBER",
  "CREATE_PROJECT",
  "UPDATE_PROJECT",
  "DELETE_PROJECT",
  "CREATE_PROJECT_TASK",
  "UPDATE_PROJECT_TASK",
  "DELETE_PROJECT_TASK",
  "ADD_PROJECT_MEMBER",
  "UPDATE_PROJECT_MEMBER",
  "REMOVE_PROJECT_MEMBER",
  "CREATE_ORDER",
  "UPDATE_ORDER",
  "DELETE_ORDER",
]);

export const activityLog = createTable("activity_log", {
  id: serial("id").primaryKey(),
  userId: text("user_id")
    .notNull()
    .references(() => user.id),
  organizationId: text("organization_id")
    .notNull()
    .references(() => organization.id),
  actionType: ActionType("action_type").notNull(),
  details: text("details").notNull(),
  ...timestamps,
});

export const ActivityLogInsertSchema = createInsertSchema(activityLog);
export type ActivityLogType = z.infer<typeof ActivityLogInsertSchema>;
