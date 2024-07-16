"use server"

import { createClient } from "@/utils/supabase/server"

import prismadb from "./prismadb"

const DAY_IN_MS = 86_400_000

export const checkSubscription = async () => {
  const supabase = createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) return false

  const userSubscription = await prismadb.profile.findUnique({
    where: { id: user.id },
    select: {
      stripeSubscriptionId: true,
      stripeCurrentPeriodEnd: true,
      stripeCustomerId: true,
      stripePriceId: true,
    },
  })

  if (!userSubscription) return false

  const isValid =
    userSubscription.stripePriceId &&
    userSubscription.stripeCurrentPeriodEnd?.getTime()! + DAY_IN_MS > Date.now()

  return !!isValid
}
