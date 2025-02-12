import {
  boolean,
  pgTableCreator,
  timestamp,
  varchar,
} from "drizzle-orm/pg-core";

export const createTable = pgTableCreator((name) => `erp-saas_${name}`);

export const timestamps = {
  updated_at: timestamp("updated_at", {
    withTimezone: true,
    mode: "string",
  })
    .defaultNow()
    .notNull()
    .$onUpdate(() => new Date().toDateString()),
  created_at: timestamp("created_at", { withTimezone: true, mode: "string" })
    .defaultNow()
    .notNull(),
};

export const softDelete = {
  deleted: boolean("deleted").default(false).notNull(),
  deleted_at: timestamp("deleted_at", { withTimezone: true, mode: "string" }),
};

export const hasOrganization = {
  organizationId: varchar("organization_id"),
};
