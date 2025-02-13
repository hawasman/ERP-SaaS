import { activityLog } from "./activity-log";
import {
  account,
  organization,
  session,
  user,
  userRelations,
  verification,
} from "./auth-schema";
import { catogaries } from "./catogaries";
import { customerRelations, customers } from "./customers";
import { employees } from "./employees";
import { orderItemRelations, orderRelations, orders } from "./orders";
import { productRelations, products } from "./products";
import {
  projectMembersRelations,
  projectRelations,
  projects,
  projectTasksRelations,
} from "./projects";
import { sales, salesRelations } from "./sales";
import { transactions } from "./transactions";

export const Schema = {
  projects,
  employees,
  catogaries,
  customers,
  orders,
  products,
  sales,
  transactions,
  user,
  session,
  account,
  verification,
  organization,
  activityLog,
};

export const SchemaRelations = {
  customerRelations,
  orderRelations,
  orderItemRelations,
  productRelations,
  projectRelations,
  projectMembersRelations,
  projectTasksRelations,
  salesRelations,
  userRelations,
};
