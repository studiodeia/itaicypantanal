CREATE TABLE IF NOT EXISTS panel_users (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  username varchar(64) NOT NULL,
  password_hash text NOT NULL,
  role varchar(16) NOT NULL DEFAULT 'user',
  display_name varchar(120) NOT NULL,
  enabled boolean NOT NULL DEFAULT true,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

CREATE UNIQUE INDEX IF NOT EXISTS panel_users_username_uidx ON panel_users (username);
CREATE INDEX IF NOT EXISTS panel_users_role_idx ON panel_users (role);
CREATE INDEX IF NOT EXISTS panel_users_enabled_idx ON panel_users (enabled);
