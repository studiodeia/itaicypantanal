CREATE EXTENSION IF NOT EXISTS vector;

ALTER TABLE faqs
ADD COLUMN IF NOT EXISTS embedding vector(1536);

CREATE INDEX IF NOT EXISTS faqs_embedding_ivfflat_idx
ON faqs
USING ivfflat (embedding vector_cosine_ops)
WITH (lists = 100);
