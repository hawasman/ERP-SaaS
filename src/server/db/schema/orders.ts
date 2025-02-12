import { relations } from "drizzle-orm";
import { integer, pgEnum, serial } from "drizzle-orm/pg-core";
import {
  createTable,
  hasOrganization,
  softDelete,
  timestamps,
} from "../columns.helpers";
import { customers } from "./customers";
import { products } from "./products";

export const OrderStatusEnum = pgEnum("order_status", [
  "Pending",
  "Shipped",
  "Delivered",
]);

export const orders = createTable("orders", {
  id: serial("id").primaryKey(),
  customerId: integer("customer_id")
    .references(() => customers.id)
    .notNull(),
  status: OrderStatusEnum("order_status").default("Pending").notNull(),
  ...timestamps,
  ...softDelete,
  ...hasOrganization,
});

export const orderItems = createTable("order_items", {
  id: serial("id").primaryKey(),
  orderId: integer("order_id")
    .references(() => orders.id)
    .notNull(),
  productId: integer("product_id")
    .references(() => products.id)
    .notNull(),
  price: integer("price").notNull(),
  quantity: integer("quantity").default(1).notNull(),
  ...timestamps,
  ...softDelete,
  ...hasOrganization,
});

export const orderRelations = relations(orders, ({ one, many }) => ({
  customer: one(customers, {
    fields: [orders.customerId],
    references: [customers.id],
  }),
  orderItems: many(orderItems),
}));

export const orderItemRelations = relations(orderItems, ({ one }) => ({
  order: one(orders, {
    fields: [orderItems.orderId],
    references: [orders.id],
  }),
  product: one(products, {
    fields: [orderItems.productId],
    references: [products.id],
  }),
}));
