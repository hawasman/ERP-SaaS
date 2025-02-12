import {
  account,
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
  projectItemsRelations,
  projectMembersRelations,
  projectRelations,
  projects,
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
};

export const SchemaRelations = {
  customerRelations,
  orderRelations,
  orderItemRelations,
  productRelations,
  projectRelations,
  projectMembersRelations,
  projectItemsRelations,
  salesRelations,
  userRelations,
};
