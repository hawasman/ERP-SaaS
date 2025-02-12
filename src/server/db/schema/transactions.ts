import { integer, pgEnum, serial, varchar } from "drizzle-orm/pg-core";
import {
  createTable,
  hasOrganization,
  softDelete,
  timestamps,
} from "../columns.helpers";

export const TransactionTypeEnum = pgEnum("type", [
  "Income",
  "Expense",
  "Transfer",
  "Deposit",
  "Withdrawal",
]);

export const transactions = createTable("transactions", {
  id: serial("id").primaryKey(),
  amount: integer("amount").notNull(),
  notes: varchar("notes", { length: 256 }),
  type: TransactionTypeEnum("transation_type").default("Income"),
  ...timestamps,
  ...softDelete,
  ...hasOrganization,
});
