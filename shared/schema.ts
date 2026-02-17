import { sql } from "drizzle-orm";
import {
  boolean,
  customType,
  doublePrecision,
  index,
  integer,
  jsonb,
  pgTable,
  text,
  timestamp,
  uniqueIndex,
  uuid,
  varchar,
} from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

const vector = customType<{
  data: string | null;
  driverData: string | null;
  config: { dimensions: number };
}>({
  dataType(config) {
    return `vector(${config?.dimensions ?? 1536})`;
  },
});

export const users = pgTable("users", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
});

export const faqs = pgTable(
  "faqs",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    question: text("question").notNull(),
    answer: text("answer").notNull(),
    category: varchar("category", { length: 64 }).notNull(),
    lang: varchar("lang", { length: 8 }).notNull().default("pt"),
    sourceDocId: varchar("source_doc_id", { length: 128 }),
    embedding: vector("embedding", { dimensions: 1536 }),
    createdAt: timestamp("created_at", { withTimezone: true })
      .notNull()
      .defaultNow(),
    updatedAt: timestamp("updated_at", { withTimezone: true })
      .notNull()
      .defaultNow(),
  },
  (table) => ({
    categoryIdx: index("faqs_category_idx").on(table.category),
    langIdx: index("faqs_lang_idx").on(table.lang),
    sourceDocIdx: index("faqs_source_doc_id_idx").on(table.sourceDocId),
    sourceDocLangUniqueIdx: uniqueIndex("faqs_source_doc_lang_uidx").on(
      table.sourceDocId,
      table.lang,
    ),
  }),
);

export const leads = pgTable(
  "leads",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    name: text("name").notNull(),
    email: text("email").notNull(),
    phone: text("phone"),
    consentLgpd: boolean("consent_lgpd").notNull().default(false),
    consentTimestamp: timestamp("consent_timestamp", { withTimezone: true }),
    sourceIntent: varchar("source_intent", { length: 32 }),
    context: jsonb("context"),
    createdAt: timestamp("created_at", { withTimezone: true })
      .notNull()
      .defaultNow(),
  },
  (table) => ({
    emailIdx: index("leads_email_idx").on(table.email),
    sourceIntentIdx: index("leads_source_intent_idx").on(table.sourceIntent),
  }),
);

export const handoffs = pgTable(
  "handoffs",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    sessionId: varchar("session_id", { length: 64 }).notNull(),
    intent: varchar("intent", { length: 32 }).notNull(),
    urgency: varchar("urgency", { length: 16 }).notNull().default("normal"),
    contextSummary: text("context_summary").notNull(),
    guestAuthenticated: boolean("guest_authenticated").notNull().default(false),
    channel: varchar("channel", { length: 16 }).notNull(),
    status: varchar("status", { length: 16 }).notNull().default("open"),
    createdAt: timestamp("created_at", { withTimezone: true })
      .notNull()
      .defaultNow(),
  },
  (table) => ({
    sessionIdx: index("handoffs_session_id_idx").on(table.sessionId),
    statusIdx: index("handoffs_status_idx").on(table.status),
    intentIdx: index("handoffs_intent_idx").on(table.intent),
  }),
);

export const agentLogs = pgTable(
  "agent_logs",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    sessionId: varchar("session_id", { length: 64 }).notNull(),
    intent: varchar("intent", { length: 32 }),
    toolUsed: varchar("tool_used", { length: 64 }),
    promptVersionHash: varchar("prompt_version_hash", { length: 128 }),
    inputSummary: text("input_summary"),
    outputSummary: text("output_summary"),
    latencyMs: integer("latency_ms"),
    confidenceScore: doublePrecision("confidence_score"),
    groundingLevel: varchar("grounding_level", { length: 16 })
      .notNull()
      .default("none"),
    sourceRefs: jsonb("source_refs").notNull().default(sql`'[]'::jsonb`),
    fallbackUsed: boolean("fallback_used").notNull().default(false),
    status: varchar("status", { length: 24 }).notNull().default("success"),
    tokensIn: integer("tokens_in"),
    tokensOut: integer("tokens_out"),
    createdAt: timestamp("created_at", { withTimezone: true })
      .notNull()
      .defaultNow(),
  },
  (table) => ({
    sessionIdx: index("agent_logs_session_id_idx").on(table.sessionId),
    intentIdx: index("agent_logs_intent_idx").on(table.intent),
    statusIdx: index("agent_logs_status_idx").on(table.status),
    createdAtIdx: index("agent_logs_created_at_idx").on(table.createdAt),
  }),
);

export const rateLimits = pgTable(
  "rate_limits",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    sessionId: varchar("session_id", { length: 64 }),
    ipHash: varchar("ip_hash", { length: 128 }),
    actionType: varchar("action_type", { length: 32 }).notNull(),
    count: integer("count").notNull().default(0),
    windowStart: timestamp("window_start", { withTimezone: true })
      .notNull()
      .defaultNow(),
    createdAt: timestamp("created_at", { withTimezone: true })
      .notNull()
      .defaultNow(),
  },
  (table) => ({
    actionTypeIdx: index("rate_limits_action_type_idx").on(table.actionType),
    sessionIdx: index("rate_limits_session_id_idx").on(table.sessionId),
    ipHashIdx: index("rate_limits_ip_hash_idx").on(table.ipHash),
    windowStartIdx: index("rate_limits_window_start_idx").on(table.windowStart),
  }),
);

export const panelUsers = pgTable(
  "panel_users",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    username: varchar("username", { length: 64 }).notNull(),
    passwordHash: text("password_hash").notNull(),
    role: varchar("role", { length: 16 }).notNull().default("user"),
    displayName: varchar("display_name", { length: 120 }).notNull(),
    enabled: boolean("enabled").notNull().default(true),
    createdAt: timestamp("created_at", { withTimezone: true })
      .notNull()
      .defaultNow(),
    updatedAt: timestamp("updated_at", { withTimezone: true })
      .notNull()
      .defaultNow(),
  },
  (table) => ({
    usernameUniqueIdx: uniqueIndex("panel_users_username_uidx").on(table.username),
    roleIdx: index("panel_users_role_idx").on(table.role),
    enabledIdx: index("panel_users_enabled_idx").on(table.enabled),
  }),
);

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
});

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;
export type Faq = typeof faqs.$inferSelect;
export type Lead = typeof leads.$inferSelect;
export type Handoff = typeof handoffs.$inferSelect;
export type AgentLog = typeof agentLogs.$inferSelect;
export type RateLimit = typeof rateLimits.$inferSelect;
export type PanelUser = typeof panelUsers.$inferSelect;
