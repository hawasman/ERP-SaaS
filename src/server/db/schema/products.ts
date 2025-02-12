import { relations } from "drizzle-orm";
import { integer, serial, varchar } from "drizzle-orm/pg-core";
import {
  createTable,
  hasOrganization,
  softDelete,
  timestamps,
} from "../columns.helpers";
import { orderItems } from "./orders";

export const products = createTable("product", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 256 }).notNull(),
  price: integer("price").notNull(),
  catogery: varchar("cateogery", { length: 256 }).notNull(),
  description: varchar("description", { length: 256 }).notNull(),
  quantity: integer("quantity").notNull(),
  image: varchar("image", { length: 256 }),
  ...timestamps,
  ...softDelete,
  ...hasOrganization,
});

export const productRelations = relations(products, ({ many }) => ({
  orderItems: many(orderItems),
}));
