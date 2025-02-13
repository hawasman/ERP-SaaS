import { eq } from "drizzle-orm";
import { stripe } from "~/utils/stripe";
import { db } from "../db";
import { organization } from "../db/schema/auth-schema";

export async function getStripeSession(sessionId: string) {
  try {
    const session = await stripe.checkout.sessions.retrieve(sessionId!);
    return session;
  } catch (error) {
    return null;
  }
}

export async function getOrganizationByStripeCustomerId(
  stripeCustomerId: string,
) {
  try {
    const organization = await db.query.organization.findFirst({
      where: (organization, { eq }) =>
        eq(organization.stripeCustomerId, stripeCustomerId),
    });
    return organization;
  } catch (error) {
    console.log(error);
    throw new Error("Organization not found");
  }
}

export async function updateOrganizationSubscription(
  id: string,
  subscriptionData: {
    stripeSubscriptionId: string | null;
    stripeProductId: string | null;
    planName: string | null;
    subscriptionStatus: "active" | "trialing" | "canceled" | "unpaid";
  },
) {
  try {
    await db
      .update(organization)
      .set(subscriptionData)
      .where(eq(organization.id, id));
  } catch (error) {
    console.log(error);
    throw new Error("Error updating organization subscription");
  }
}
