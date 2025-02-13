import { db } from "../db";
import { activityLog, ActivityLogType } from "../db/schema/activity-log";

export const getActivityLogs = async (orgId: string) => {};

export const createActivityLog = async (newActivityLogs: ActivityLogType[]) => {
  try {
    const result = await db
      .insert(activityLog)
      .values(newActivityLogs)
      .returning();
    return result;
  } catch (error) {
    console.log(error);
    throw new Error("Error creating activity log");
  }
};
