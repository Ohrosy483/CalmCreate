import { pgTable, varchar, integer, date, timestamp, pgEnum, uniqueIndex, text, bigint } from "drizzle-orm/pg-core";
import { usersTable } from "./auth";

export const planTierEnum = pgEnum("plan_tier", ["free", "premium"]);

export const profilesTable = pgTable("profiles", {
  userId: varchar("user_id").primaryKey().references(() => usersTable.id, { onDelete: "cascade" }),
  displayName: varchar("display_name"),
  planTier: planTierEnum("plan_tier").notNull().default("free"),
  city: varchar("city"),
  country: varchar("country"),
  ethnicBackground: varchar("ethnic_background"),
  targetCustomer: varchar("target_customer"),
  ageRange: varchar("age_range"),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
  updatedAt: timestamp("updated_at", { withTimezone: true }).notNull().defaultNow().$onUpdate(() => new Date()),
});

export const usageTrackingTable = pgTable("usage_tracking", {
  userId: varchar("user_id").notNull().references(() => usersTable.id, { onDelete: "cascade" }),
  usageDate: date("usage_date").notNull(),
  postsUsed: integer("posts_used").notNull().default(0),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
}, (table) => [
  uniqueIndex("usage_user_date_idx").on(table.userId, table.usageDate),
]);

export const socialPlatformEnum = pgEnum("social_platform", ["instagram", "facebook", "tiktok", "youtube"]);

export const socialTokensTable = pgTable("social_tokens", {
  userId: varchar("user_id").notNull().references(() => usersTable.id, { onDelete: "cascade" }),
  platform: socialPlatformEnum("platform").notNull(),
  accessToken: text("access_token").notNull(),
  refreshToken: text("refresh_token"),
  expiresAt: bigint("expires_at", { mode: "number" }),
  platformUserId: varchar("platform_user_id"),
  platformUsername: varchar("platform_username"),
  mediaCount: integer("media_count"),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
  updatedAt: timestamp("updated_at", { withTimezone: true }).notNull().defaultNow().$onUpdate(() => new Date()),
}, (table) => [
  uniqueIndex("social_tokens_user_platform_idx").on(table.userId, table.platform),
]);

export type Profile = typeof profilesTable.$inferSelect;
export type UpsertProfile = typeof profilesTable.$inferInsert;
export type UsageTracking = typeof usageTrackingTable.$inferSelect;
export type SocialToken = typeof socialTokensTable.$inferSelect;
