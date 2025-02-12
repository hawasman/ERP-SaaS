import { relations } from "drizzle-orm";
import { integer, pgEnum, serial } from "drizzle-orm/pg-core";
import {
  createTable,
  hasOrganization,
  softDelete,
  timestamps,
} from "../columns.helpers";
import { customers } from "./customers";
import { orders } from "./orders";

export const SalesStatusEnum = pgEnum("sales_status", [
  "Completed",
  "Pending",
  "Cancelled",
]);

export const sales = createTable("sales", {
  id: serial("id").primaryKey(),
  orderId: integer("order_id")
    .references(() => orders.id)
    .notNull(),
  customerId: integer("customer_id")
    .references(() => customers.id)
    .notNull(),
  status: SalesStatusEnum("sales_status").default("Pending"),
  ...timestamps,
  ...softDelete,
  ...hasOrganization,
});

export const salesRelations = relations(sales, ({ one }) => ({
  order: one(orders, {
    fields: [sales.orderId],
    references: [orders.id],
  }),
  customer: one(customers, {
    fields: [sales.customerId],
    references: [customers.id],
  }),
}));
