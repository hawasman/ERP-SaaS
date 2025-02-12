import { index, integer, pgEnum, serial, varchar } from "drizzle-orm/pg-core";
import {
  createTable,
  hasOrganization,
  softDelete,
  timestamps,
} from "../columns.helpers";

import { createInsertSchema } from "drizzle-zod";

export const EmployeeStatusEnum = pgEnum("employee_status", [
  "Active",
  "Inactive",
  "Terminated",
  "OnLeave",
]);

export const employees = createTable(
  "employee",
  {
    id: serial("id").primaryKey(),
    name: varchar("name", { length: 256 }).notNull(),
    position: varchar("position", { length: 256 }).notNull(),
    department: varchar("department", { length: 256 }).notNull(),
    joinDate: varchar("join_date", { length: 256 }).notNull(),
    salary: integer("salary").notNull(),
    status: EmployeeStatusEnum("employee_status").default("Active").notNull(),
    phone: varchar("phone", { length: 256 }),
    email: varchar("email", { length: 256 }),
    address: varchar("address", { length: 256 }),
    picture: varchar("picture", { length: 256 }),
    notes: varchar("notes", { length: 256 }),
    ...timestamps,
    ...softDelete,
    ...hasOrganization,
  },
  (employee) => ({
    nameIndex: index("name_idx").on(employee.name),
  }),
);

export const EmployeeInsertSchema = createInsertSchema(employees).omit({
  created_at: true,
  updated_at: true,
  deleted: true,
  deleted_at: true,
});
