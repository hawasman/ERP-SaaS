import { serial, varchar } from "drizzle-orm/pg-core";
import {
  createTable,
  hasOrganization,
  softDelete,
  timestamps,
} from "../columns.helpers";

export const catogaries = createTable("catogary", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 256 }).notNull(),
  description: varchar("description", { length: 256 }),
  ...timestamps,
  ...softDelete,
  ...hasOrganization,
});
