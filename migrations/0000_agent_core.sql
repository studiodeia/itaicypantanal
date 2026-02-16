CREATE EXTENSION IF NOT EXISTS pgcrypto;

CREATE TABLE IF NOT EXISTS faqs (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  question text NOT NULL,
  answer text NOT NULL,
  category varchar(64) NOT NULL,
  lang varchar(8) NOT NULL DEFAULT 'pt',
  source_doc_id varchar(128),
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS faqs_category_idx ON faqs (category);
CREATE INDEX IF NOT EXISTS faqs_lang_idx ON faqs (lang);
CREATE INDEX IF NOT EXISTS faqs_source_doc_id_idx ON faqs (source_doc_id);
CREATE UNIQUE INDEX IF NOT EXISTS faqs_source_doc_lang_uidx ON faqs (source_doc_id, lang);

CREATE TABLE IF NOT EXISTS leads (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  email text NOT NULL,
  phone text,
  consent_lgpd boolean NOT NULL DEFAULT false,
  consent_timestamp timestamptz,
  source_intent varchar(32),
  context jsonb,
  created_at timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS leads_email_idx ON leads (email);
CREATE INDEX IF NOT EXISTS leads_source_intent_idx ON leads (source_intent);

CREATE TABLE IF NOT EXISTS handoffs (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  session_id varchar(64) NOT NULL,
  intent varchar(32) NOT NULL,
  urgency varchar(16) NOT NULL DEFAULT 'normal',
  context_summary text NOT NULL,
  guest_authenticated boolean NOT NULL DEFAULT false,
  channel varchar(16) NOT NULL,
  status varchar(16) NOT NULL DEFAULT 'open',
  created_at timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS handoffs_session_id_idx ON handoffs (session_id);
CREATE INDEX IF NOT EXISTS handoffs_status_idx ON handoffs (status);
CREATE INDEX IF NOT EXISTS handoffs_intent_idx ON handoffs (intent);

CREATE TABLE IF NOT EXISTS agent_logs (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  session_id varchar(64) NOT NULL,
  intent varchar(32),
  tool_used varchar(64),
  prompt_version_hash varchar(128),
  input_summary text,
  output_summary text,
  latency_ms integer,
  confidence_score double precision,
  grounding_level varchar(16) NOT NULL DEFAULT 'none',
  source_refs jsonb NOT NULL DEFAULT '[]'::jsonb,
  fallback_used boolean NOT NULL DEFAULT false,
  status varchar(24) NOT NULL DEFAULT 'success',
  tokens_in integer,
  tokens_out integer,
  created_at timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS agent_logs_session_id_idx ON agent_logs (session_id);
CREATE INDEX IF NOT EXISTS agent_logs_intent_idx ON agent_logs (intent);
CREATE INDEX IF NOT EXISTS agent_logs_status_idx ON agent_logs (status);
CREATE INDEX IF NOT EXISTS agent_logs_created_at_idx ON agent_logs (created_at);

CREATE TABLE IF NOT EXISTS rate_limits (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  session_id varchar(64),
  ip_hash varchar(128),
  action_type varchar(32) NOT NULL,
  count integer NOT NULL DEFAULT 0,
  window_start timestamptz NOT NULL DEFAULT now(),
  created_at timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS rate_limits_action_type_idx ON rate_limits (action_type);
CREATE INDEX IF NOT EXISTS rate_limits_session_id_idx ON rate_limits (session_id);
CREATE INDEX IF NOT EXISTS rate_limits_ip_hash_idx ON rate_limits (ip_hash);
CREATE INDEX IF NOT EXISTS rate_limits_window_start_idx ON rate_limits (window_start);
