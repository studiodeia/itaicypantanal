import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "cms"."enum_fish_species_category" AS ENUM('Predadores', 'Médio Porte', 'Esportivo');
  CREATE TABLE "cms"."fish_species_fishing_tips" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL
  );
  
  CREATE TABLE "cms"."fish_species_fishing_tips_locales" (
  	"tip" varchar NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "cms"."_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "cms"."fish_species" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"scientific_name" varchar NOT NULL,
  	"slug" varchar NOT NULL,
  	"family" varchar,
  	"common_name_e_n" varchar,
  	"common_name_e_s" varchar,
  	"category" "cms"."enum_fish_species_category",
  	"src" varchar,
  	"hero_image" varchar,
  	"author" varchar,
  	"date" varchar,
  	"size" varchar,
  	"is_featured" boolean DEFAULT false,
  	"meta_no_index" boolean DEFAULT false,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "cms"."fish_species_locales" (
  	"common_name" varchar NOT NULL,
  	"description" varchar,
  	"tag" varchar DEFAULT 'Fauna',
  	"conservation_status" varchar,
  	"habitat" varchar,
  	"overview" varchar,
  	"diet" varchar,
  	"behavior" varchar,
  	"best_time" varchar,
  	"meta_title" varchar,
  	"meta_description" varchar,
  	"meta_image_id" integer,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "cms"."_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "cms"."fish_species_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"fish_species_id" integer
  );
  
  ALTER TABLE "cms"."payload_locked_documents_rels" ADD COLUMN "fish_species_id" integer;
  ALTER TABLE "cms"."fish_species_fishing_tips" ADD CONSTRAINT "fish_species_fishing_tips_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "cms"."fish_species"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "cms"."fish_species_fishing_tips_locales" ADD CONSTRAINT "fish_species_fishing_tips_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "cms"."fish_species_fishing_tips"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "cms"."fish_species_locales" ADD CONSTRAINT "fish_species_locales_meta_image_id_media_id_fk" FOREIGN KEY ("meta_image_id") REFERENCES "cms"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "cms"."fish_species_locales" ADD CONSTRAINT "fish_species_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "cms"."fish_species"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "cms"."fish_species_rels" ADD CONSTRAINT "fish_species_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "cms"."fish_species"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "cms"."fish_species_rels" ADD CONSTRAINT "fish_species_rels_fish_species_fk" FOREIGN KEY ("fish_species_id") REFERENCES "cms"."fish_species"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "fish_species_fishing_tips_order_idx" ON "cms"."fish_species_fishing_tips" USING btree ("_order");
  CREATE INDEX "fish_species_fishing_tips_parent_id_idx" ON "cms"."fish_species_fishing_tips" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "fish_species_fishing_tips_locales_locale_parent_id_unique" ON "cms"."fish_species_fishing_tips_locales" USING btree ("_locale","_parent_id");
  CREATE UNIQUE INDEX "fish_species_slug_idx" ON "cms"."fish_species" USING btree ("slug");
  CREATE INDEX "fish_species_updated_at_idx" ON "cms"."fish_species" USING btree ("updated_at");
  CREATE INDEX "fish_species_created_at_idx" ON "cms"."fish_species" USING btree ("created_at");
  CREATE INDEX "fish_species_meta_meta_image_idx" ON "cms"."fish_species_locales" USING btree ("meta_image_id","_locale");
  CREATE UNIQUE INDEX "fish_species_locales_locale_parent_id_unique" ON "cms"."fish_species_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "fish_species_rels_order_idx" ON "cms"."fish_species_rels" USING btree ("order");
  CREATE INDEX "fish_species_rels_parent_idx" ON "cms"."fish_species_rels" USING btree ("parent_id");
  CREATE INDEX "fish_species_rels_path_idx" ON "cms"."fish_species_rels" USING btree ("path");
  CREATE INDEX "fish_species_rels_fish_species_id_idx" ON "cms"."fish_species_rels" USING btree ("fish_species_id");
  ALTER TABLE "cms"."payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_fish_species_fk" FOREIGN KEY ("fish_species_id") REFERENCES "cms"."fish_species"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "payload_locked_documents_rels_fish_species_id_idx" ON "cms"."payload_locked_documents_rels" USING btree ("fish_species_id");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "cms"."fish_species_fishing_tips" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "cms"."fish_species_fishing_tips_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "cms"."fish_species" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "cms"."fish_species_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "cms"."fish_species_rels" DISABLE ROW LEVEL SECURITY;
  DROP TABLE "cms"."fish_species_fishing_tips" CASCADE;
  DROP TABLE "cms"."fish_species_fishing_tips_locales" CASCADE;
  DROP TABLE "cms"."fish_species" CASCADE;
  DROP TABLE "cms"."fish_species_locales" CASCADE;
  DROP TABLE "cms"."fish_species_rels" CASCADE;
  ALTER TABLE "cms"."payload_locked_documents_rels" DROP CONSTRAINT "payload_locked_documents_rels_fish_species_fk";
  
  DROP INDEX "cms"."payload_locked_documents_rels_fish_species_id_idx";
  ALTER TABLE "cms"."payload_locked_documents_rels" DROP COLUMN "fish_species_id";
  DROP TYPE "cms"."enum_fish_species_category";`)
}
