import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import { EmployeeInsertSchema, employees } from "~/server/db/schema/employees";
export const employeeRouter = createTRPCRouter({
  //   getAll: publicProcedure.input(z.string()).query(({ ctx }) => {
  //     return ctx.db.query.employees.findMany();
  //   }),
  getAll: publicProcedure.query(async ({ ctx }) => {
    const employees = await ctx.db.query.employees.findMany();
    return employees ?? null;
  }),
  create: publicProcedure
    .input(EmployeeInsertSchema)
    .mutation(async ({ ctx, input }) => {
      const employee = await ctx.db.insert(employees).values(input).returning();
      return employee;
    }),
});
