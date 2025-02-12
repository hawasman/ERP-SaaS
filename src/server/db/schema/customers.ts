import { relations } from "drizzle-orm";
import { index, serial, varchar } from "drizzle-orm/pg-core";
import {
  createTable,
  hasOrganization,
  softDelete,
  timestamps,
} from "../columns.helpers";
import { orders } from "./orders";

export const customers = createTable(
  "customer",
  {
    id: serial("id").primaryKey(),
    name: varchar("name", { length: 256 }).notNull(),
    email: varchar("email", { length: 256 }),
    phone: varchar("phone", { length: 256 }),
    address: varchar("address", { length: 256 }).notNull(),
    notes: varchar("notes", { length: 256 }),
    ...timestamps,
    ...softDelete,
    ...hasOrganization,
  },
  (customer) => ({
    CustomerNameIndex: index("customer_name_idx").on(customer.name),
  }),
);

export const customerRelations = relations(customers, ({ many }) => ({
  orders: many(orders),
}));
