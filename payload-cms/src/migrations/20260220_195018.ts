import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-sqlite'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.run(sql`CREATE TABLE \`pages\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`title\` text,
  	\`slug\` text NOT NULL,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`pages_slug_idx\` ON \`pages\` (\`slug\`);`)
  await db.run(sql`CREATE INDEX \`pages_updated_at_idx\` ON \`pages\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`pages_created_at_idx\` ON \`pages\` (\`created_at\`);`)
  await db.run(sql`CREATE TABLE \`media\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`url\` text,
  	\`thumbnail_u_r_l\` text,
  	\`filename\` text,
  	\`mime_type\` text,
  	\`filesize\` numeric,
  	\`width\` numeric,
  	\`height\` numeric,
  	\`focal_x\` numeric,
  	\`focal_y\` numeric,
  	\`sizes_thumbnail_url\` text,
  	\`sizes_thumbnail_width\` numeric,
  	\`sizes_thumbnail_height\` numeric,
  	\`sizes_thumbnail_mime_type\` text,
  	\`sizes_thumbnail_filesize\` numeric,
  	\`sizes_thumbnail_filename\` text,
  	\`sizes_card_url\` text,
  	\`sizes_card_width\` numeric,
  	\`sizes_card_height\` numeric,
  	\`sizes_card_mime_type\` text,
  	\`sizes_card_filesize\` numeric,
  	\`sizes_card_filename\` text,
  	\`sizes_hero_url\` text,
  	\`sizes_hero_width\` numeric,
  	\`sizes_hero_height\` numeric,
  	\`sizes_hero_mime_type\` text,
  	\`sizes_hero_filesize\` numeric,
  	\`sizes_hero_filename\` text
  );
  `)
  await db.run(sql`CREATE INDEX \`media_updated_at_idx\` ON \`media\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`media_created_at_idx\` ON \`media\` (\`created_at\`);`)
  await db.run(sql`CREATE UNIQUE INDEX \`media_filename_idx\` ON \`media\` (\`filename\`);`)
  await db.run(sql`CREATE INDEX \`media_sizes_thumbnail_sizes_thumbnail_filename_idx\` ON \`media\` (\`sizes_thumbnail_filename\`);`)
  await db.run(sql`CREATE INDEX \`media_sizes_card_sizes_card_filename_idx\` ON \`media\` (\`sizes_card_filename\`);`)
  await db.run(sql`CREATE INDEX \`media_sizes_hero_sizes_hero_filename_idx\` ON \`media\` (\`sizes_hero_filename\`);`)
  await db.run(sql`CREATE TABLE \`media_locales\` (
  	\`alt\` text NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`media_locales_locale_parent_id_unique\` ON \`media_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`blog_posts_blocks_paragraph\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`blog_posts\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`blog_posts_blocks_paragraph_order_idx\` ON \`blog_posts_blocks_paragraph\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`blog_posts_blocks_paragraph_parent_id_idx\` ON \`blog_posts_blocks_paragraph\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`blog_posts_blocks_paragraph_path_idx\` ON \`blog_posts_blocks_paragraph\` (\`_path\`);`)
  await db.run(sql`CREATE TABLE \`blog_posts_blocks_paragraph_locales\` (
  	\`text\` text NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`blog_posts_blocks_paragraph\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`blog_posts_blocks_paragraph_locales_locale_parent_id_unique\` ON \`blog_posts_blocks_paragraph_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`blog_posts_blocks_heading\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`blog_posts\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`blog_posts_blocks_heading_order_idx\` ON \`blog_posts_blocks_heading\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`blog_posts_blocks_heading_parent_id_idx\` ON \`blog_posts_blocks_heading\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`blog_posts_blocks_heading_path_idx\` ON \`blog_posts_blocks_heading\` (\`_path\`);`)
  await db.run(sql`CREATE TABLE \`blog_posts_blocks_heading_locales\` (
  	\`text\` text NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`blog_posts_blocks_heading\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`blog_posts_blocks_heading_locales_locale_parent_id_unique\` ON \`blog_posts_blocks_heading_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`blog_posts_blocks_species\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`scientific_name\` text NOT NULL,
  	\`image\` text,
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`blog_posts\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`blog_posts_blocks_species_order_idx\` ON \`blog_posts_blocks_species\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`blog_posts_blocks_species_parent_id_idx\` ON \`blog_posts_blocks_species\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`blog_posts_blocks_species_path_idx\` ON \`blog_posts_blocks_species\` (\`_path\`);`)
  await db.run(sql`CREATE TABLE \`blog_posts_blocks_species_locales\` (
  	\`name\` text NOT NULL,
  	\`description\` text NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`blog_posts_blocks_species\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`blog_posts_blocks_species_locales_locale_parent_id_unique\` ON \`blog_posts_blocks_species_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`blog_posts_blocks_ordered_list_items\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`blog_posts_blocks_ordered_list\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`blog_posts_blocks_ordered_list_items_order_idx\` ON \`blog_posts_blocks_ordered_list_items\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`blog_posts_blocks_ordered_list_items_parent_id_idx\` ON \`blog_posts_blocks_ordered_list_items\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`blog_posts_blocks_ordered_list_items_locales\` (
  	\`bold\` text NOT NULL,
  	\`text\` text NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`blog_posts_blocks_ordered_list_items\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`blog_posts_blocks_ordered_list_items_locales_locale_parent_i\` ON \`blog_posts_blocks_ordered_list_items_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`blog_posts_blocks_ordered_list\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`blog_posts\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`blog_posts_blocks_ordered_list_order_idx\` ON \`blog_posts_blocks_ordered_list\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`blog_posts_blocks_ordered_list_parent_id_idx\` ON \`blog_posts_blocks_ordered_list\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`blog_posts_blocks_ordered_list_path_idx\` ON \`blog_posts_blocks_ordered_list\` (\`_path\`);`)
  await db.run(sql`CREATE TABLE \`blog_posts\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`slug\` text NOT NULL,
  	\`primary_category_id\` integer,
  	\`src\` text,
  	\`hero_image\` text,
  	\`author\` text,
  	\`date\` text,
  	\`is_featured\` integer DEFAULT false,
  	\`is_recent\` integer DEFAULT false,
  	\`meta_no_index\` integer DEFAULT false,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	FOREIGN KEY (\`primary_category_id\`) REFERENCES \`blog_categories\`(\`id\`) ON UPDATE no action ON DELETE set null
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`blog_posts_slug_idx\` ON \`blog_posts\` (\`slug\`);`)
  await db.run(sql`CREATE INDEX \`blog_posts_primary_category_idx\` ON \`blog_posts\` (\`primary_category_id\`);`)
  await db.run(sql`CREATE INDEX \`blog_posts_updated_at_idx\` ON \`blog_posts\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`blog_posts_created_at_idx\` ON \`blog_posts\` (\`created_at\`);`)
  await db.run(sql`CREATE TABLE \`blog_posts_locales\` (
  	\`title\` text NOT NULL,
  	\`subtitle\` text,
  	\`description\` text,
  	\`tag\` text,
  	\`reading_time\` text,
  	\`meta_title\` text,
  	\`meta_description\` text,
  	\`meta_image_id\` integer,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	FOREIGN KEY (\`meta_image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`blog_posts\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`blog_posts_meta_meta_image_idx\` ON \`blog_posts_locales\` (\`meta_image_id\`,\`_locale\`);`)
  await db.run(sql`CREATE UNIQUE INDEX \`blog_posts_locales_locale_parent_id_unique\` ON \`blog_posts_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`blog_posts_rels\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`order\` integer,
  	\`parent_id\` integer NOT NULL,
  	\`path\` text NOT NULL,
  	\`blog_categories_id\` integer,
  	\`blog_posts_id\` integer,
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`blog_posts\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`blog_categories_id\`) REFERENCES \`blog_categories\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`blog_posts_id\`) REFERENCES \`blog_posts\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`blog_posts_rels_order_idx\` ON \`blog_posts_rels\` (\`order\`);`)
  await db.run(sql`CREATE INDEX \`blog_posts_rels_parent_idx\` ON \`blog_posts_rels\` (\`parent_id\`);`)
  await db.run(sql`CREATE INDEX \`blog_posts_rels_path_idx\` ON \`blog_posts_rels\` (\`path\`);`)
  await db.run(sql`CREATE INDEX \`blog_posts_rels_blog_categories_id_idx\` ON \`blog_posts_rels\` (\`blog_categories_id\`);`)
  await db.run(sql`CREATE INDEX \`blog_posts_rels_blog_posts_id_idx\` ON \`blog_posts_rels\` (\`blog_posts_id\`);`)
  await db.run(sql`CREATE TABLE \`_blog_posts_v_blocks_paragraph\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_uuid\` text,
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_blog_posts_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_blog_posts_v_blocks_paragraph_order_idx\` ON \`_blog_posts_v_blocks_paragraph\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_blog_posts_v_blocks_paragraph_parent_id_idx\` ON \`_blog_posts_v_blocks_paragraph\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_blog_posts_v_blocks_paragraph_path_idx\` ON \`_blog_posts_v_blocks_paragraph\` (\`_path\`);`)
  await db.run(sql`CREATE TABLE \`_blog_posts_v_blocks_paragraph_locales\` (
  	\`text\` text NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_blog_posts_v_blocks_paragraph\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`_blog_posts_v_blocks_paragraph_locales_locale_parent_id_uniq\` ON \`_blog_posts_v_blocks_paragraph_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`_blog_posts_v_blocks_heading\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_uuid\` text,
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_blog_posts_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_blog_posts_v_blocks_heading_order_idx\` ON \`_blog_posts_v_blocks_heading\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_blog_posts_v_blocks_heading_parent_id_idx\` ON \`_blog_posts_v_blocks_heading\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_blog_posts_v_blocks_heading_path_idx\` ON \`_blog_posts_v_blocks_heading\` (\`_path\`);`)
  await db.run(sql`CREATE TABLE \`_blog_posts_v_blocks_heading_locales\` (
  	\`text\` text NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_blog_posts_v_blocks_heading\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`_blog_posts_v_blocks_heading_locales_locale_parent_id_unique\` ON \`_blog_posts_v_blocks_heading_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`_blog_posts_v_blocks_species\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`scientific_name\` text NOT NULL,
  	\`image\` text,
  	\`_uuid\` text,
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_blog_posts_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_blog_posts_v_blocks_species_order_idx\` ON \`_blog_posts_v_blocks_species\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_blog_posts_v_blocks_species_parent_id_idx\` ON \`_blog_posts_v_blocks_species\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_blog_posts_v_blocks_species_path_idx\` ON \`_blog_posts_v_blocks_species\` (\`_path\`);`)
  await db.run(sql`CREATE TABLE \`_blog_posts_v_blocks_species_locales\` (
  	\`name\` text NOT NULL,
  	\`description\` text NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_blog_posts_v_blocks_species\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`_blog_posts_v_blocks_species_locales_locale_parent_id_unique\` ON \`_blog_posts_v_blocks_species_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`_blog_posts_v_blocks_ordered_list_items\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_uuid\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_blog_posts_v_blocks_ordered_list\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_blog_posts_v_blocks_ordered_list_items_order_idx\` ON \`_blog_posts_v_blocks_ordered_list_items\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_blog_posts_v_blocks_ordered_list_items_parent_id_idx\` ON \`_blog_posts_v_blocks_ordered_list_items\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`_blog_posts_v_blocks_ordered_list_items_locales\` (
  	\`bold\` text NOT NULL,
  	\`text\` text NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_blog_posts_v_blocks_ordered_list_items\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`_blog_posts_v_blocks_ordered_list_items_locales_locale_paren\` ON \`_blog_posts_v_blocks_ordered_list_items_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`_blog_posts_v_blocks_ordered_list\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_uuid\` text,
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_blog_posts_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_blog_posts_v_blocks_ordered_list_order_idx\` ON \`_blog_posts_v_blocks_ordered_list\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_blog_posts_v_blocks_ordered_list_parent_id_idx\` ON \`_blog_posts_v_blocks_ordered_list\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_blog_posts_v_blocks_ordered_list_path_idx\` ON \`_blog_posts_v_blocks_ordered_list\` (\`_path\`);`)
  await db.run(sql`CREATE TABLE \`_blog_posts_v\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`parent_id\` integer,
  	\`version_slug\` text NOT NULL,
  	\`version_primary_category_id\` integer,
  	\`version_src\` text,
  	\`version_hero_image\` text,
  	\`version_author\` text,
  	\`version_date\` text,
  	\`version_is_featured\` integer DEFAULT false,
  	\`version_is_recent\` integer DEFAULT false,
  	\`version_meta_no_index\` integer DEFAULT false,
  	\`version_updated_at\` text,
  	\`version_created_at\` text,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`blog_posts\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`version_primary_category_id\`) REFERENCES \`blog_categories\`(\`id\`) ON UPDATE no action ON DELETE set null
  );
  `)
  await db.run(sql`CREATE INDEX \`_blog_posts_v_parent_idx\` ON \`_blog_posts_v\` (\`parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_blog_posts_v_version_version_slug_idx\` ON \`_blog_posts_v\` (\`version_slug\`);`)
  await db.run(sql`CREATE INDEX \`_blog_posts_v_version_version_primary_category_idx\` ON \`_blog_posts_v\` (\`version_primary_category_id\`);`)
  await db.run(sql`CREATE INDEX \`_blog_posts_v_version_version_updated_at_idx\` ON \`_blog_posts_v\` (\`version_updated_at\`);`)
  await db.run(sql`CREATE INDEX \`_blog_posts_v_version_version_created_at_idx\` ON \`_blog_posts_v\` (\`version_created_at\`);`)
  await db.run(sql`CREATE INDEX \`_blog_posts_v_created_at_idx\` ON \`_blog_posts_v\` (\`created_at\`);`)
  await db.run(sql`CREATE INDEX \`_blog_posts_v_updated_at_idx\` ON \`_blog_posts_v\` (\`updated_at\`);`)
  await db.run(sql`CREATE TABLE \`_blog_posts_v_locales\` (
  	\`version_title\` text NOT NULL,
  	\`version_subtitle\` text,
  	\`version_description\` text,
  	\`version_tag\` text,
  	\`version_reading_time\` text,
  	\`version_meta_title\` text,
  	\`version_meta_description\` text,
  	\`version_meta_image_id\` integer,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	FOREIGN KEY (\`version_meta_image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_blog_posts_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_blog_posts_v_version_meta_version_meta_image_idx\` ON \`_blog_posts_v_locales\` (\`version_meta_image_id\`,\`_locale\`);`)
  await db.run(sql`CREATE UNIQUE INDEX \`_blog_posts_v_locales_locale_parent_id_unique\` ON \`_blog_posts_v_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`_blog_posts_v_rels\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`order\` integer,
  	\`parent_id\` integer NOT NULL,
  	\`path\` text NOT NULL,
  	\`blog_categories_id\` integer,
  	\`blog_posts_id\` integer,
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`_blog_posts_v\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`blog_categories_id\`) REFERENCES \`blog_categories\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`blog_posts_id\`) REFERENCES \`blog_posts\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_blog_posts_v_rels_order_idx\` ON \`_blog_posts_v_rels\` (\`order\`);`)
  await db.run(sql`CREATE INDEX \`_blog_posts_v_rels_parent_idx\` ON \`_blog_posts_v_rels\` (\`parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_blog_posts_v_rels_path_idx\` ON \`_blog_posts_v_rels\` (\`path\`);`)
  await db.run(sql`CREATE INDEX \`_blog_posts_v_rels_blog_categories_id_idx\` ON \`_blog_posts_v_rels\` (\`blog_categories_id\`);`)
  await db.run(sql`CREATE INDEX \`_blog_posts_v_rels_blog_posts_id_idx\` ON \`_blog_posts_v_rels\` (\`blog_posts_id\`);`)
  await db.run(sql`CREATE TABLE \`blog_categories\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`name\` text NOT NULL,
  	\`slug\` text NOT NULL,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`blog_categories_slug_idx\` ON \`blog_categories\` (\`slug\`);`)
  await db.run(sql`CREATE INDEX \`blog_categories_updated_at_idx\` ON \`blog_categories\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`blog_categories_created_at_idx\` ON \`blog_categories\` (\`created_at\`);`)
  await db.run(sql`CREATE TABLE \`bird_species_photography_tips\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`bird_species\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`bird_species_photography_tips_order_idx\` ON \`bird_species_photography_tips\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`bird_species_photography_tips_parent_id_idx\` ON \`bird_species_photography_tips\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`bird_species_photography_tips_locales\` (
  	\`tip\` text NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`bird_species_photography_tips\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`bird_species_photography_tips_locales_locale_parent_id_uniqu\` ON \`bird_species_photography_tips_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`bird_species\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`scientific_name\` text NOT NULL,
  	\`slug\` text NOT NULL,
  	\`taxonomic_order\` text,
  	\`family\` text,
  	\`common_name_e_n\` text,
  	\`category_id\` integer,
  	\`src\` text,
  	\`hero_image\` text,
  	\`author\` text,
  	\`date\` text,
  	\`size\` text,
  	\`is_featured\` integer DEFAULT false,
  	\`meta_no_index\` integer DEFAULT false,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	FOREIGN KEY (\`category_id\`) REFERENCES \`bird_categories\`(\`id\`) ON UPDATE no action ON DELETE set null
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`bird_species_slug_idx\` ON \`bird_species\` (\`slug\`);`)
  await db.run(sql`CREATE INDEX \`bird_species_category_idx\` ON \`bird_species\` (\`category_id\`);`)
  await db.run(sql`CREATE INDEX \`bird_species_updated_at_idx\` ON \`bird_species\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`bird_species_created_at_idx\` ON \`bird_species\` (\`created_at\`);`)
  await db.run(sql`CREATE TABLE \`bird_species_locales\` (
  	\`common_name\` text NOT NULL,
  	\`description\` text,
  	\`tag\` text,
  	\`conservation_status\` text,
  	\`habitat\` text,
  	\`overview\` text,
  	\`diet\` text,
  	\`behavior\` text,
  	\`best_time\` text,
  	\`meta_title\` text,
  	\`meta_description\` text,
  	\`meta_image_id\` integer,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	FOREIGN KEY (\`meta_image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`bird_species\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`bird_species_meta_meta_image_idx\` ON \`bird_species_locales\` (\`meta_image_id\`,\`_locale\`);`)
  await db.run(sql`CREATE UNIQUE INDEX \`bird_species_locales_locale_parent_id_unique\` ON \`bird_species_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`bird_species_rels\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`order\` integer,
  	\`parent_id\` integer NOT NULL,
  	\`path\` text NOT NULL,
  	\`bird_species_id\` integer,
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`bird_species\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`bird_species_id\`) REFERENCES \`bird_species\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`bird_species_rels_order_idx\` ON \`bird_species_rels\` (\`order\`);`)
  await db.run(sql`CREATE INDEX \`bird_species_rels_parent_idx\` ON \`bird_species_rels\` (\`parent_id\`);`)
  await db.run(sql`CREATE INDEX \`bird_species_rels_path_idx\` ON \`bird_species_rels\` (\`path\`);`)
  await db.run(sql`CREATE INDEX \`bird_species_rels_bird_species_id_idx\` ON \`bird_species_rels\` (\`bird_species_id\`);`)
  await db.run(sql`CREATE TABLE \`bird_categories\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`name\` text NOT NULL,
  	\`slug\` text NOT NULL,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`bird_categories_slug_idx\` ON \`bird_categories\` (\`slug\`);`)
  await db.run(sql`CREATE INDEX \`bird_categories_updated_at_idx\` ON \`bird_categories\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`bird_categories_created_at_idx\` ON \`bird_categories\` (\`created_at\`);`)
  await db.run(sql`CREATE TABLE \`users_sessions\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`created_at\` text,
  	\`expires_at\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`users_sessions_order_idx\` ON \`users_sessions\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`users_sessions_parent_id_idx\` ON \`users_sessions\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`users\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`name\` text,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`email\` text NOT NULL,
  	\`reset_password_token\` text,
  	\`reset_password_expiration\` text,
  	\`salt\` text,
  	\`hash\` text,
  	\`login_attempts\` numeric DEFAULT 0,
  	\`lock_until\` text
  );
  `)
  await db.run(sql`CREATE INDEX \`users_updated_at_idx\` ON \`users\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`users_created_at_idx\` ON \`users\` (\`created_at\`);`)
  await db.run(sql`CREATE UNIQUE INDEX \`users_email_idx\` ON \`users\` (\`email\`);`)
  await db.run(sql`CREATE TABLE \`payload_kv\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`key\` text NOT NULL,
  	\`data\` text NOT NULL
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`payload_kv_key_idx\` ON \`payload_kv\` (\`key\`);`)
  await db.run(sql`CREATE TABLE \`payload_locked_documents\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`global_slug\` text,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL
  );
  `)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_global_slug_idx\` ON \`payload_locked_documents\` (\`global_slug\`);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_updated_at_idx\` ON \`payload_locked_documents\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_created_at_idx\` ON \`payload_locked_documents\` (\`created_at\`);`)
  await db.run(sql`CREATE TABLE \`payload_locked_documents_rels\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`order\` integer,
  	\`parent_id\` integer NOT NULL,
  	\`path\` text NOT NULL,
  	\`pages_id\` integer,
  	\`media_id\` integer,
  	\`blog_posts_id\` integer,
  	\`blog_categories_id\` integer,
  	\`bird_species_id\` integer,
  	\`bird_categories_id\` integer,
  	\`users_id\` integer,
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`payload_locked_documents\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`pages_id\`) REFERENCES \`pages\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`media_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`blog_posts_id\`) REFERENCES \`blog_posts\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`blog_categories_id\`) REFERENCES \`blog_categories\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`bird_species_id\`) REFERENCES \`bird_species\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`bird_categories_id\`) REFERENCES \`bird_categories\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`users_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_order_idx\` ON \`payload_locked_documents_rels\` (\`order\`);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_parent_idx\` ON \`payload_locked_documents_rels\` (\`parent_id\`);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_path_idx\` ON \`payload_locked_documents_rels\` (\`path\`);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_pages_id_idx\` ON \`payload_locked_documents_rels\` (\`pages_id\`);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_media_id_idx\` ON \`payload_locked_documents_rels\` (\`media_id\`);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_blog_posts_id_idx\` ON \`payload_locked_documents_rels\` (\`blog_posts_id\`);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_blog_categories_id_idx\` ON \`payload_locked_documents_rels\` (\`blog_categories_id\`);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_bird_species_id_idx\` ON \`payload_locked_documents_rels\` (\`bird_species_id\`);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_bird_categories_id_idx\` ON \`payload_locked_documents_rels\` (\`bird_categories_id\`);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_users_id_idx\` ON \`payload_locked_documents_rels\` (\`users_id\`);`)
  await db.run(sql`CREATE TABLE \`payload_preferences\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`key\` text,
  	\`value\` text,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL
  );
  `)
  await db.run(sql`CREATE INDEX \`payload_preferences_key_idx\` ON \`payload_preferences\` (\`key\`);`)
  await db.run(sql`CREATE INDEX \`payload_preferences_updated_at_idx\` ON \`payload_preferences\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`payload_preferences_created_at_idx\` ON \`payload_preferences\` (\`created_at\`);`)
  await db.run(sql`CREATE TABLE \`payload_preferences_rels\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`order\` integer,
  	\`parent_id\` integer NOT NULL,
  	\`path\` text NOT NULL,
  	\`users_id\` integer,
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`payload_preferences\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`users_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`payload_preferences_rels_order_idx\` ON \`payload_preferences_rels\` (\`order\`);`)
  await db.run(sql`CREATE INDEX \`payload_preferences_rels_parent_idx\` ON \`payload_preferences_rels\` (\`parent_id\`);`)
  await db.run(sql`CREATE INDEX \`payload_preferences_rels_path_idx\` ON \`payload_preferences_rels\` (\`path\`);`)
  await db.run(sql`CREATE INDEX \`payload_preferences_rels_users_id_idx\` ON \`payload_preferences_rels\` (\`users_id\`);`)
  await db.run(sql`CREATE TABLE \`payload_migrations\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`name\` text,
  	\`batch\` numeric,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL
  );
  `)
  await db.run(sql`CREATE INDEX \`payload_migrations_updated_at_idx\` ON \`payload_migrations\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`payload_migrations_created_at_idx\` ON \`payload_migrations\` (\`created_at\`);`)
  await db.run(sql`CREATE TABLE \`agent_config\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`enabled\` integer DEFAULT true,
  	\`assistant_name\` text DEFAULT 'Assistente Itaicy' NOT NULL,
  	\`booking_engine_url\` text DEFAULT 'https://hotels.cloudbeds.com/reservation/ITAICY' NOT NULL,
  	\`faq_confidence_threshold\` numeric DEFAULT 0.75 NOT NULL,
  	\`price_disclaimer_pt\` text NOT NULL,
  	\`price_disclaimer_en\` text NOT NULL,
  	\`price_disclaimer_es\` text NOT NULL,
  	\`availability_disclaimer_pt\` text NOT NULL,
  	\`availability_disclaimer_en\` text NOT NULL,
  	\`availability_disclaimer_es\` text NOT NULL,
  	\`policy_disclaimer_pt\` text NOT NULL,
  	\`policy_disclaimer_en\` text NOT NULL,
  	\`policy_disclaimer_es\` text NOT NULL,
  	\`handoff_email\` text DEFAULT 'itaicy-digital@studiodeia.com.br' NOT NULL,
  	\`handoff_emergency_phone\` text DEFAULT '+55 (67) 99999-9999' NOT NULL,
  	\`handoff_whatsapp\` text DEFAULT '+55 (67) 99999-9999' NOT NULL,
  	\`handoff_service_hours\` text DEFAULT 'Segunda a sexta, 08:00-18:00 (BRT)' NOT NULL,
  	\`handoff_sla_hours\` numeric DEFAULT 24 NOT NULL,
  	\`generic_error_fallback_pt\` text NOT NULL,
  	\`generic_error_fallback_en\` text NOT NULL,
  	\`generic_error_fallback_es\` text NOT NULL,
  	\`api_unavailable_fallback_pt\` text NOT NULL,
  	\`api_unavailable_fallback_en\` text NOT NULL,
  	\`api_unavailable_fallback_es\` text NOT NULL,
  	\`lead_consent_prompt_pt\` text NOT NULL,
  	\`lead_consent_prompt_en\` text NOT NULL,
  	\`lead_consent_prompt_es\` text NOT NULL,
  	\`lead_success_message_pt\` text NOT NULL,
  	\`lead_success_message_en\` text NOT NULL,
  	\`lead_success_message_es\` text NOT NULL,
  	\`welcome_greeting_pt\` text NOT NULL,
  	\`welcome_greeting_en\` text NOT NULL,
  	\`welcome_greeting_es\` text NOT NULL,
  	\`updated_at\` text,
  	\`created_at\` text
  );
  `)
  await db.run(sql`CREATE TABLE \`_agent_config_v\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`version_enabled\` integer DEFAULT true,
  	\`version_assistant_name\` text DEFAULT 'Assistente Itaicy' NOT NULL,
  	\`version_booking_engine_url\` text DEFAULT 'https://hotels.cloudbeds.com/reservation/ITAICY' NOT NULL,
  	\`version_faq_confidence_threshold\` numeric DEFAULT 0.75 NOT NULL,
  	\`version_price_disclaimer_pt\` text NOT NULL,
  	\`version_price_disclaimer_en\` text NOT NULL,
  	\`version_price_disclaimer_es\` text NOT NULL,
  	\`version_availability_disclaimer_pt\` text NOT NULL,
  	\`version_availability_disclaimer_en\` text NOT NULL,
  	\`version_availability_disclaimer_es\` text NOT NULL,
  	\`version_policy_disclaimer_pt\` text NOT NULL,
  	\`version_policy_disclaimer_en\` text NOT NULL,
  	\`version_policy_disclaimer_es\` text NOT NULL,
  	\`version_handoff_email\` text DEFAULT 'itaicy-digital@studiodeia.com.br' NOT NULL,
  	\`version_handoff_emergency_phone\` text DEFAULT '+55 (67) 99999-9999' NOT NULL,
  	\`version_handoff_whatsapp\` text DEFAULT '+55 (67) 99999-9999' NOT NULL,
  	\`version_handoff_service_hours\` text DEFAULT 'Segunda a sexta, 08:00-18:00 (BRT)' NOT NULL,
  	\`version_handoff_sla_hours\` numeric DEFAULT 24 NOT NULL,
  	\`version_generic_error_fallback_pt\` text NOT NULL,
  	\`version_generic_error_fallback_en\` text NOT NULL,
  	\`version_generic_error_fallback_es\` text NOT NULL,
  	\`version_api_unavailable_fallback_pt\` text NOT NULL,
  	\`version_api_unavailable_fallback_en\` text NOT NULL,
  	\`version_api_unavailable_fallback_es\` text NOT NULL,
  	\`version_lead_consent_prompt_pt\` text NOT NULL,
  	\`version_lead_consent_prompt_en\` text NOT NULL,
  	\`version_lead_consent_prompt_es\` text NOT NULL,
  	\`version_lead_success_message_pt\` text NOT NULL,
  	\`version_lead_success_message_en\` text NOT NULL,
  	\`version_lead_success_message_es\` text NOT NULL,
  	\`version_welcome_greeting_pt\` text NOT NULL,
  	\`version_welcome_greeting_en\` text NOT NULL,
  	\`version_welcome_greeting_es\` text NOT NULL,
  	\`version_updated_at\` text,
  	\`version_created_at\` text,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL
  );
  `)
  await db.run(sql`CREATE INDEX \`_agent_config_v_created_at_idx\` ON \`_agent_config_v\` (\`created_at\`);`)
  await db.run(sql`CREATE INDEX \`_agent_config_v_updated_at_idx\` ON \`_agent_config_v\` (\`updated_at\`);`)
  await db.run(sql`CREATE TABLE \`site_settings_faq_items\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`site_settings\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`site_settings_faq_items_order_idx\` ON \`site_settings_faq_items\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`site_settings_faq_items_parent_id_idx\` ON \`site_settings_faq_items\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`site_settings_faq_items_locales\` (
  	\`question\` text NOT NULL,
  	\`answer\` text NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`site_settings_faq_items\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`site_settings_faq_items_locales_locale_parent_id_unique\` ON \`site_settings_faq_items_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`site_settings_testimonial_items\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`author\` text NOT NULL,
  	\`rating\` numeric DEFAULT 5,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`site_settings\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`site_settings_testimonial_items_order_idx\` ON \`site_settings_testimonial_items\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`site_settings_testimonial_items_parent_id_idx\` ON \`site_settings_testimonial_items\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`site_settings_testimonial_items_locales\` (
  	\`quote\` text NOT NULL,
  	\`location\` text,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`site_settings_testimonial_items\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`site_settings_testimonial_items_locales_locale_parent_id_uni\` ON \`site_settings_testimonial_items_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`site_settings_footer_pousada_links\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`url\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`site_settings\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`site_settings_footer_pousada_links_order_idx\` ON \`site_settings_footer_pousada_links\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`site_settings_footer_pousada_links_parent_id_idx\` ON \`site_settings_footer_pousada_links\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`site_settings_footer_pousada_links_locales\` (
  	\`label\` text NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`site_settings_footer_pousada_links\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`site_settings_footer_pousada_links_locales_locale_parent_id_\` ON \`site_settings_footer_pousada_links_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`site_settings_footer_experiencias_links\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`url\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`site_settings\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`site_settings_footer_experiencias_links_order_idx\` ON \`site_settings_footer_experiencias_links\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`site_settings_footer_experiencias_links_parent_id_idx\` ON \`site_settings_footer_experiencias_links\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`site_settings_footer_experiencias_links_locales\` (
  	\`label\` text NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`site_settings_footer_experiencias_links\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`site_settings_footer_experiencias_links_locales_locale_paren\` ON \`site_settings_footer_experiencias_links_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`site_settings_footer_legal_links\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`url\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`site_settings\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`site_settings_footer_legal_links_order_idx\` ON \`site_settings_footer_legal_links\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`site_settings_footer_legal_links_parent_id_idx\` ON \`site_settings_footer_legal_links\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`site_settings_footer_legal_links_locales\` (
  	\`label\` text NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`site_settings_footer_legal_links\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`site_settings_footer_legal_links_locales_locale_parent_id_un\` ON \`site_settings_footer_legal_links_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`site_settings_authors_knows_about\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`topic\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`site_settings_authors\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`site_settings_authors_knows_about_order_idx\` ON \`site_settings_authors_knows_about\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`site_settings_authors_knows_about_parent_id_idx\` ON \`site_settings_authors_knows_about\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`site_settings_authors\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`name\` text NOT NULL,
  	\`url\` text,
  	\`image\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`site_settings\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`site_settings_authors_order_idx\` ON \`site_settings_authors\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`site_settings_authors_parent_id_idx\` ON \`site_settings_authors\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`site_settings_authors_locales\` (
  	\`job_title\` text,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`site_settings_authors\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`site_settings_authors_locales_locale_parent_id_unique\` ON \`site_settings_authors_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`site_settings_seasonal_events\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`start_date\` text,
  	\`end_date\` text,
  	\`image\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`site_settings\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`site_settings_seasonal_events_order_idx\` ON \`site_settings_seasonal_events\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`site_settings_seasonal_events_parent_id_idx\` ON \`site_settings_seasonal_events\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`site_settings_seasonal_events_locales\` (
  	\`name\` text NOT NULL,
  	\`description\` text,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`site_settings_seasonal_events\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`site_settings_seasonal_events_locales_locale_parent_id_uniqu\` ON \`site_settings_seasonal_events_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`site_settings\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`brand_name\` text,
  	\`contact_email\` text,
  	\`contact_phone\` text,
  	\`contact_address\` text,
  	\`cta_background_image\` text,
  	\`default_og_image\` text DEFAULT '/images/og-default.webp',
  	\`site_url\` text,
  	\`google_site_verification\` text,
  	\`aggregate_rating_rating_value\` numeric,
  	\`aggregate_rating_review_count\` numeric,
  	\`aggregate_rating_best_rating\` numeric DEFAULT 5,
  	\`updated_at\` text,
  	\`created_at\` text
  );
  `)
  await db.run(sql`CREATE TABLE \`site_settings_locales\` (
  	\`cta_heading\` text,
  	\`cta_description\` text,
  	\`faq_label\` text DEFAULT 'FAQ',
  	\`faq_heading\` text,
  	\`faq_description\` text,
  	\`testimonials_label\` text DEFAULT 'Depoimentos',
  	\`testimonials_heading\` text,
  	\`testimonials_description\` text,
  	\`footer_copyright\` text,
  	\`default_meta_title\` text DEFAULT 'Itaicy Pantanal Eco Lodge | Ecoturismo no Pantanal',
  	\`default_meta_description\` text DEFAULT 'Descubra o Pantanal em sua forma mais autêntica. Hospedagem premium, pesca esportiva, observação de aves e experiências de ecoturismo no coração do Pantanal.',
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`site_settings\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`site_settings_locales_locale_parent_id_unique\` ON \`site_settings_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`_site_settings_v_version_faq_items\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_uuid\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_site_settings_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_site_settings_v_version_faq_items_order_idx\` ON \`_site_settings_v_version_faq_items\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_site_settings_v_version_faq_items_parent_id_idx\` ON \`_site_settings_v_version_faq_items\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`_site_settings_v_version_faq_items_locales\` (
  	\`question\` text NOT NULL,
  	\`answer\` text NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_site_settings_v_version_faq_items\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`_site_settings_v_version_faq_items_locales_locale_parent_id_\` ON \`_site_settings_v_version_faq_items_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`_site_settings_v_version_testimonial_items\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`author\` text NOT NULL,
  	\`rating\` numeric DEFAULT 5,
  	\`_uuid\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_site_settings_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_site_settings_v_version_testimonial_items_order_idx\` ON \`_site_settings_v_version_testimonial_items\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_site_settings_v_version_testimonial_items_parent_id_idx\` ON \`_site_settings_v_version_testimonial_items\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`_site_settings_v_version_testimonial_items_locales\` (
  	\`quote\` text NOT NULL,
  	\`location\` text,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_site_settings_v_version_testimonial_items\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`_site_settings_v_version_testimonial_items_locales_locale_pa\` ON \`_site_settings_v_version_testimonial_items_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`_site_settings_v_version_footer_pousada_links\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`url\` text NOT NULL,
  	\`_uuid\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_site_settings_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_site_settings_v_version_footer_pousada_links_order_idx\` ON \`_site_settings_v_version_footer_pousada_links\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_site_settings_v_version_footer_pousada_links_parent_id_idx\` ON \`_site_settings_v_version_footer_pousada_links\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`_site_settings_v_version_footer_pousada_links_locales\` (
  	\`label\` text NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_site_settings_v_version_footer_pousada_links\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`_site_settings_v_version_footer_pousada_links_locales_locale\` ON \`_site_settings_v_version_footer_pousada_links_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`_site_settings_v_version_footer_experiencias_links\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`url\` text NOT NULL,
  	\`_uuid\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_site_settings_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_site_settings_v_version_footer_experiencias_links_order_idx\` ON \`_site_settings_v_version_footer_experiencias_links\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_site_settings_v_version_footer_experiencias_links_parent_id_idx\` ON \`_site_settings_v_version_footer_experiencias_links\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`_site_settings_v_version_footer_experiencias_links_locales\` (
  	\`label\` text NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_site_settings_v_version_footer_experiencias_links\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`_site_settings_v_version_footer_experiencias_links_locales_l\` ON \`_site_settings_v_version_footer_experiencias_links_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`_site_settings_v_version_footer_legal_links\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`url\` text NOT NULL,
  	\`_uuid\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_site_settings_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_site_settings_v_version_footer_legal_links_order_idx\` ON \`_site_settings_v_version_footer_legal_links\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_site_settings_v_version_footer_legal_links_parent_id_idx\` ON \`_site_settings_v_version_footer_legal_links\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`_site_settings_v_version_footer_legal_links_locales\` (
  	\`label\` text NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_site_settings_v_version_footer_legal_links\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`_site_settings_v_version_footer_legal_links_locales_locale_p\` ON \`_site_settings_v_version_footer_legal_links_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`_site_settings_v_version_authors_knows_about\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`topic\` text NOT NULL,
  	\`_uuid\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_site_settings_v_version_authors\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_site_settings_v_version_authors_knows_about_order_idx\` ON \`_site_settings_v_version_authors_knows_about\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_site_settings_v_version_authors_knows_about_parent_id_idx\` ON \`_site_settings_v_version_authors_knows_about\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`_site_settings_v_version_authors\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`name\` text NOT NULL,
  	\`url\` text,
  	\`image\` text,
  	\`_uuid\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_site_settings_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_site_settings_v_version_authors_order_idx\` ON \`_site_settings_v_version_authors\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_site_settings_v_version_authors_parent_id_idx\` ON \`_site_settings_v_version_authors\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`_site_settings_v_version_authors_locales\` (
  	\`job_title\` text,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_site_settings_v_version_authors\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`_site_settings_v_version_authors_locales_locale_parent_id_un\` ON \`_site_settings_v_version_authors_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`_site_settings_v_version_seasonal_events\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`start_date\` text,
  	\`end_date\` text,
  	\`image\` text,
  	\`_uuid\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_site_settings_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_site_settings_v_version_seasonal_events_order_idx\` ON \`_site_settings_v_version_seasonal_events\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_site_settings_v_version_seasonal_events_parent_id_idx\` ON \`_site_settings_v_version_seasonal_events\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`_site_settings_v_version_seasonal_events_locales\` (
  	\`name\` text NOT NULL,
  	\`description\` text,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_site_settings_v_version_seasonal_events\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`_site_settings_v_version_seasonal_events_locales_locale_pare\` ON \`_site_settings_v_version_seasonal_events_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`_site_settings_v\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`version_brand_name\` text,
  	\`version_contact_email\` text,
  	\`version_contact_phone\` text,
  	\`version_contact_address\` text,
  	\`version_cta_background_image\` text,
  	\`version_default_og_image\` text DEFAULT '/images/og-default.webp',
  	\`version_site_url\` text,
  	\`version_google_site_verification\` text,
  	\`version_aggregate_rating_rating_value\` numeric,
  	\`version_aggregate_rating_review_count\` numeric,
  	\`version_aggregate_rating_best_rating\` numeric DEFAULT 5,
  	\`version_updated_at\` text,
  	\`version_created_at\` text,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL
  );
  `)
  await db.run(sql`CREATE INDEX \`_site_settings_v_created_at_idx\` ON \`_site_settings_v\` (\`created_at\`);`)
  await db.run(sql`CREATE INDEX \`_site_settings_v_updated_at_idx\` ON \`_site_settings_v\` (\`updated_at\`);`)
  await db.run(sql`CREATE TABLE \`_site_settings_v_locales\` (
  	\`version_cta_heading\` text,
  	\`version_cta_description\` text,
  	\`version_faq_label\` text DEFAULT 'FAQ',
  	\`version_faq_heading\` text,
  	\`version_faq_description\` text,
  	\`version_testimonials_label\` text DEFAULT 'Depoimentos',
  	\`version_testimonials_heading\` text,
  	\`version_testimonials_description\` text,
  	\`version_footer_copyright\` text,
  	\`version_default_meta_title\` text DEFAULT 'Itaicy Pantanal Eco Lodge | Ecoturismo no Pantanal',
  	\`version_default_meta_description\` text DEFAULT 'Descubra o Pantanal em sua forma mais autêntica. Hospedagem premium, pesca esportiva, observação de aves e experiências de ecoturismo no coração do Pantanal.',
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_site_settings_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`_site_settings_v_locales_locale_parent_id_unique\` ON \`_site_settings_v_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`home_content_about_us_body\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`home_content\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`home_content_about_us_body_order_idx\` ON \`home_content_about_us_body\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`home_content_about_us_body_parent_id_idx\` ON \`home_content_about_us_body\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`home_content_about_us_body_locales\` (
  	\`text\` text NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`home_content_about_us_body\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`home_content_about_us_body_locales_locale_parent_id_unique\` ON \`home_content_about_us_body_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`home_content_about_us_features\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`home_content\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`home_content_about_us_features_order_idx\` ON \`home_content_about_us_features\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`home_content_about_us_features_parent_id_idx\` ON \`home_content_about_us_features\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`home_content_about_us_features_locales\` (
  	\`number\` text,
  	\`title\` text,
  	\`description\` text,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`home_content_about_us_features\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`home_content_about_us_features_locales_locale_parent_id_uniq\` ON \`home_content_about_us_features_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`home_content_expeditions_items\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`background_image\` text,
  	\`href\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`home_content\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`home_content_expeditions_items_order_idx\` ON \`home_content_expeditions_items\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`home_content_expeditions_items_parent_id_idx\` ON \`home_content_expeditions_items\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`home_content_expeditions_items_locales\` (
  	\`title\` text NOT NULL,
  	\`description\` text,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`home_content_expeditions_items\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`home_content_expeditions_items_locales_locale_parent_id_uniq\` ON \`home_content_expeditions_items_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`home_content_stats_items\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`target\` numeric NOT NULL,
  	\`has_icon\` integer DEFAULT false,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`home_content\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`home_content_stats_items_order_idx\` ON \`home_content_stats_items\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`home_content_stats_items_parent_id_idx\` ON \`home_content_stats_items\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`home_content_stats_items_locales\` (
  	\`suffix\` text,
  	\`label\` text,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`home_content_stats_items\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`home_content_stats_items_locales_locale_parent_id_unique\` ON \`home_content_stats_items_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`home_content_impact_items\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`home_content\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`home_content_impact_items_order_idx\` ON \`home_content_impact_items\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`home_content_impact_items_parent_id_idx\` ON \`home_content_impact_items\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`home_content_impact_items_locales\` (
  	\`number\` text,
  	\`title\` text,
  	\`description\` text,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`home_content_impact_items\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`home_content_impact_items_locales_locale_parent_id_unique\` ON \`home_content_impact_items_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`home_content_faq_items\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`number\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`home_content\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`home_content_faq_items_order_idx\` ON \`home_content_faq_items\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`home_content_faq_items_parent_id_idx\` ON \`home_content_faq_items\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`home_content_faq_items_locales\` (
  	\`question\` text NOT NULL,
  	\`answer\` text NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`home_content_faq_items\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`home_content_faq_items_locales_locale_parent_id_unique\` ON \`home_content_faq_items_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`home_content\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`about_us_image\` text,
  	\`accommodation_background_image\` text,
  	\`impact_image\` text,
  	\`meta_no_index\` integer DEFAULT false,
  	\`updated_at\` text,
  	\`created_at\` text
  );
  `)
  await db.run(sql`CREATE TABLE \`home_content_locales\` (
  	\`about_us_label\` text,
  	\`about_us_heading\` text,
  	\`expeditions_label\` text,
  	\`expeditions_heading\` text,
  	\`expeditions_description\` text,
  	\`expeditions_button_text\` text,
  	\`accommodation_label\` text,
  	\`accommodation_heading\` text,
  	\`accommodation_body\` text,
  	\`accommodation_button_reserve\` text,
  	\`accommodation_button_details\` text,
  	\`impact_label\` text,
  	\`impact_heading\` text,
  	\`blog_label\` text,
  	\`blog_heading\` text,
  	\`blog_description\` text,
  	\`blog_button_text\` text,
  	\`faq_label\` text DEFAULT 'PERGUNTAS FREQUENTES',
  	\`faq_heading\` text NOT NULL,
  	\`faq_description\` text,
  	\`meta_title\` text,
  	\`meta_description\` text,
  	\`meta_image_id\` integer,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	FOREIGN KEY (\`meta_image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`home_content\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`home_content_meta_meta_image_idx\` ON \`home_content_locales\` (\`meta_image_id\`,\`_locale\`);`)
  await db.run(sql`CREATE UNIQUE INDEX \`home_content_locales_locale_parent_id_unique\` ON \`home_content_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`_home_content_v_version_about_us_body\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_uuid\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_home_content_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_home_content_v_version_about_us_body_order_idx\` ON \`_home_content_v_version_about_us_body\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_home_content_v_version_about_us_body_parent_id_idx\` ON \`_home_content_v_version_about_us_body\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`_home_content_v_version_about_us_body_locales\` (
  	\`text\` text NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_home_content_v_version_about_us_body\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`_home_content_v_version_about_us_body_locales_locale_parent_\` ON \`_home_content_v_version_about_us_body_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`_home_content_v_version_about_us_features\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_uuid\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_home_content_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_home_content_v_version_about_us_features_order_idx\` ON \`_home_content_v_version_about_us_features\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_home_content_v_version_about_us_features_parent_id_idx\` ON \`_home_content_v_version_about_us_features\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`_home_content_v_version_about_us_features_locales\` (
  	\`number\` text,
  	\`title\` text,
  	\`description\` text,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_home_content_v_version_about_us_features\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`_home_content_v_version_about_us_features_locales_locale_par\` ON \`_home_content_v_version_about_us_features_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`_home_content_v_version_expeditions_items\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`background_image\` text,
  	\`href\` text,
  	\`_uuid\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_home_content_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_home_content_v_version_expeditions_items_order_idx\` ON \`_home_content_v_version_expeditions_items\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_home_content_v_version_expeditions_items_parent_id_idx\` ON \`_home_content_v_version_expeditions_items\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`_home_content_v_version_expeditions_items_locales\` (
  	\`title\` text NOT NULL,
  	\`description\` text,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_home_content_v_version_expeditions_items\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`_home_content_v_version_expeditions_items_locales_locale_par\` ON \`_home_content_v_version_expeditions_items_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`_home_content_v_version_stats_items\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`target\` numeric NOT NULL,
  	\`has_icon\` integer DEFAULT false,
  	\`_uuid\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_home_content_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_home_content_v_version_stats_items_order_idx\` ON \`_home_content_v_version_stats_items\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_home_content_v_version_stats_items_parent_id_idx\` ON \`_home_content_v_version_stats_items\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`_home_content_v_version_stats_items_locales\` (
  	\`suffix\` text,
  	\`label\` text,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_home_content_v_version_stats_items\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`_home_content_v_version_stats_items_locales_locale_parent_id\` ON \`_home_content_v_version_stats_items_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`_home_content_v_version_impact_items\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_uuid\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_home_content_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_home_content_v_version_impact_items_order_idx\` ON \`_home_content_v_version_impact_items\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_home_content_v_version_impact_items_parent_id_idx\` ON \`_home_content_v_version_impact_items\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`_home_content_v_version_impact_items_locales\` (
  	\`number\` text,
  	\`title\` text,
  	\`description\` text,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_home_content_v_version_impact_items\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`_home_content_v_version_impact_items_locales_locale_parent_i\` ON \`_home_content_v_version_impact_items_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`_home_content_v_version_faq_items\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_uuid\` text NOT NULL,
  	\`number\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_home_content_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_home_content_v_version_faq_items_order_idx\` ON \`_home_content_v_version_faq_items\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_home_content_v_version_faq_items_parent_id_idx\` ON \`_home_content_v_version_faq_items\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`_home_content_v_version_faq_items_locales\` (
  	\`question\` text NOT NULL,
  	\`answer\` text NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_home_content_v_version_faq_items\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`_home_content_v_version_faq_items_locales_locale_parent_id_u\` ON \`_home_content_v_version_faq_items_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`_home_content_v\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`version_about_us_image\` text,
  	\`version_accommodation_background_image\` text,
  	\`version_impact_image\` text,
  	\`version_meta_no_index\` integer DEFAULT false,
  	\`version_updated_at\` text,
  	\`version_created_at\` text,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL
  );
  `)
  await db.run(sql`CREATE INDEX \`_home_content_v_created_at_idx\` ON \`_home_content_v\` (\`created_at\`);`)
  await db.run(sql`CREATE INDEX \`_home_content_v_updated_at_idx\` ON \`_home_content_v\` (\`updated_at\`);`)
  await db.run(sql`CREATE TABLE \`_home_content_v_locales\` (
  	\`version_about_us_label\` text,
  	\`version_about_us_heading\` text,
  	\`version_expeditions_label\` text,
  	\`version_expeditions_heading\` text,
  	\`version_expeditions_description\` text,
  	\`version_expeditions_button_text\` text,
  	\`version_accommodation_label\` text,
  	\`version_accommodation_heading\` text,
  	\`version_accommodation_body\` text,
  	\`version_accommodation_button_reserve\` text,
  	\`version_accommodation_button_details\` text,
  	\`version_impact_label\` text,
  	\`version_impact_heading\` text,
  	\`version_blog_label\` text,
  	\`version_blog_heading\` text,
  	\`version_blog_description\` text,
  	\`version_blog_button_text\` text,
  	\`version_faq_label\` text DEFAULT 'PERGUNTAS FREQUENTES',
  	\`version_faq_heading\` text NOT NULL,
  	\`version_faq_description\` text,
  	\`version_meta_title\` text,
  	\`version_meta_description\` text,
  	\`version_meta_image_id\` integer,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	FOREIGN KEY (\`version_meta_image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_home_content_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_home_content_v_version_meta_version_meta_image_idx\` ON \`_home_content_v_locales\` (\`version_meta_image_id\`,\`_locale\`);`)
  await db.run(sql`CREATE UNIQUE INDEX \`_home_content_v_locales_locale_parent_id_unique\` ON \`_home_content_v_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`acomodacoes_content_manifesto_segments\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`is_highlight\` integer DEFAULT false,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`acomodacoes_content\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`acomodacoes_content_manifesto_segments_order_idx\` ON \`acomodacoes_content_manifesto_segments\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`acomodacoes_content_manifesto_segments_parent_id_idx\` ON \`acomodacoes_content_manifesto_segments\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`acomodacoes_content_manifesto_segments_locales\` (
  	\`text\` text NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`acomodacoes_content_manifesto_segments\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`acomodacoes_content_manifesto_segments_locales_locale_parent\` ON \`acomodacoes_content_manifesto_segments_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`acomodacoes_content_highlights_items\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`icon_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`acomodacoes_content\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`acomodacoes_content_highlights_items_order_idx\` ON \`acomodacoes_content_highlights_items\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`acomodacoes_content_highlights_items_parent_id_idx\` ON \`acomodacoes_content_highlights_items\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`acomodacoes_content_highlights_items_locales\` (
  	\`title\` text,
  	\`description\` text,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`acomodacoes_content_highlights_items\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`acomodacoes_content_highlights_items_locales_locale_parent_i\` ON \`acomodacoes_content_highlights_items_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`acomodacoes_content_rooms_features\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`icon_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`acomodacoes_content_rooms\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`acomodacoes_content_rooms_features_order_idx\` ON \`acomodacoes_content_rooms_features\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`acomodacoes_content_rooms_features_parent_id_idx\` ON \`acomodacoes_content_rooms_features\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`acomodacoes_content_rooms_features_locales\` (
  	\`label\` text,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`acomodacoes_content_rooms_features\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`acomodacoes_content_rooms_features_locales_locale_parent_id_\` ON \`acomodacoes_content_rooms_features_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`acomodacoes_content_rooms\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`image\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`acomodacoes_content\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`acomodacoes_content_rooms_order_idx\` ON \`acomodacoes_content_rooms\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`acomodacoes_content_rooms_parent_id_idx\` ON \`acomodacoes_content_rooms\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`acomodacoes_content_rooms_locales\` (
  	\`title\` text NOT NULL,
  	\`description\` text,
  	\`cta_text\` text,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`acomodacoes_content_rooms\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`acomodacoes_content_rooms_locales_locale_parent_id_unique\` ON \`acomodacoes_content_rooms_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`acomodacoes_content_culinary_images\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`src\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`acomodacoes_content\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`acomodacoes_content_culinary_images_order_idx\` ON \`acomodacoes_content_culinary_images\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`acomodacoes_content_culinary_images_parent_id_idx\` ON \`acomodacoes_content_culinary_images\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`acomodacoes_content_culinary_images_locales\` (
  	\`alt\` text,
  	\`tag\` text,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`acomodacoes_content_culinary_images\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`acomodacoes_content_culinary_images_locales_locale_parent_id\` ON \`acomodacoes_content_culinary_images_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`acomodacoes_content_faq_items\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`number\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`acomodacoes_content\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`acomodacoes_content_faq_items_order_idx\` ON \`acomodacoes_content_faq_items\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`acomodacoes_content_faq_items_parent_id_idx\` ON \`acomodacoes_content_faq_items\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`acomodacoes_content_faq_items_locales\` (
  	\`question\` text NOT NULL,
  	\`answer\` text NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`acomodacoes_content_faq_items\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`acomodacoes_content_faq_items_locales_locale_parent_id_uniqu\` ON \`acomodacoes_content_faq_items_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`acomodacoes_content\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`hero_background_image\` text,
  	\`hero_video_mp4\` text,
  	\`hero_video_webm\` text,
  	\`hero_video_mp4_low\` text,
  	\`hero_video_webm_low\` text,
  	\`hero_video_poster\` text,
  	\`culinary_cta_href\` text,
  	\`meta_no_index\` integer DEFAULT false,
  	\`updated_at\` text,
  	\`created_at\` text
  );
  `)
  await db.run(sql`CREATE TABLE \`acomodacoes_content_locales\` (
  	\`hero_label\` text,
  	\`hero_heading\` text NOT NULL,
  	\`hero_subtitle\` text,
  	\`hero_description\` text,
  	\`hero_scroll_hint\` text DEFAULT 'Deslize para baixo',
  	\`highlights_heading\` text,
  	\`culinary_label\` text,
  	\`culinary_heading\` text,
  	\`culinary_description\` text,
  	\`culinary_cta_text\` text,
  	\`faq_label\` text DEFAULT 'PERGUNTAS FREQUENTES',
  	\`faq_heading\` text NOT NULL,
  	\`faq_description\` text,
  	\`meta_title\` text,
  	\`meta_description\` text,
  	\`meta_image_id\` integer,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	FOREIGN KEY (\`meta_image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`acomodacoes_content\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`acomodacoes_content_meta_meta_image_idx\` ON \`acomodacoes_content_locales\` (\`meta_image_id\`,\`_locale\`);`)
  await db.run(sql`CREATE UNIQUE INDEX \`acomodacoes_content_locales_locale_parent_id_unique\` ON \`acomodacoes_content_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`_acomodacoes_content_v_version_manifesto_segments\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`is_highlight\` integer DEFAULT false,
  	\`_uuid\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_acomodacoes_content_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_acomodacoes_content_v_version_manifesto_segments_order_idx\` ON \`_acomodacoes_content_v_version_manifesto_segments\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_acomodacoes_content_v_version_manifesto_segments_parent_id_idx\` ON \`_acomodacoes_content_v_version_manifesto_segments\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`_acomodacoes_content_v_version_manifesto_segments_locales\` (
  	\`text\` text NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_acomodacoes_content_v_version_manifesto_segments\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`_acomodacoes_content_v_version_manifesto_segments_locales_lo\` ON \`_acomodacoes_content_v_version_manifesto_segments_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`_acomodacoes_content_v_version_highlights_items\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`icon_name\` text,
  	\`_uuid\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_acomodacoes_content_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_acomodacoes_content_v_version_highlights_items_order_idx\` ON \`_acomodacoes_content_v_version_highlights_items\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_acomodacoes_content_v_version_highlights_items_parent_id_idx\` ON \`_acomodacoes_content_v_version_highlights_items\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`_acomodacoes_content_v_version_highlights_items_locales\` (
  	\`title\` text,
  	\`description\` text,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_acomodacoes_content_v_version_highlights_items\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`_acomodacoes_content_v_version_highlights_items_locales_loca\` ON \`_acomodacoes_content_v_version_highlights_items_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`_acomodacoes_content_v_version_rooms_features\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`icon_name\` text,
  	\`_uuid\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_acomodacoes_content_v_version_rooms\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_acomodacoes_content_v_version_rooms_features_order_idx\` ON \`_acomodacoes_content_v_version_rooms_features\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_acomodacoes_content_v_version_rooms_features_parent_id_idx\` ON \`_acomodacoes_content_v_version_rooms_features\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`_acomodacoes_content_v_version_rooms_features_locales\` (
  	\`label\` text,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_acomodacoes_content_v_version_rooms_features\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`_acomodacoes_content_v_version_rooms_features_locales_locale\` ON \`_acomodacoes_content_v_version_rooms_features_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`_acomodacoes_content_v_version_rooms\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`image\` text,
  	\`_uuid\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_acomodacoes_content_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_acomodacoes_content_v_version_rooms_order_idx\` ON \`_acomodacoes_content_v_version_rooms\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_acomodacoes_content_v_version_rooms_parent_id_idx\` ON \`_acomodacoes_content_v_version_rooms\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`_acomodacoes_content_v_version_rooms_locales\` (
  	\`title\` text NOT NULL,
  	\`description\` text,
  	\`cta_text\` text,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_acomodacoes_content_v_version_rooms\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`_acomodacoes_content_v_version_rooms_locales_locale_parent_i\` ON \`_acomodacoes_content_v_version_rooms_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`_acomodacoes_content_v_version_culinary_images\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`src\` text NOT NULL,
  	\`_uuid\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_acomodacoes_content_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_acomodacoes_content_v_version_culinary_images_order_idx\` ON \`_acomodacoes_content_v_version_culinary_images\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_acomodacoes_content_v_version_culinary_images_parent_id_idx\` ON \`_acomodacoes_content_v_version_culinary_images\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`_acomodacoes_content_v_version_culinary_images_locales\` (
  	\`alt\` text,
  	\`tag\` text,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_acomodacoes_content_v_version_culinary_images\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`_acomodacoes_content_v_version_culinary_images_locales_local\` ON \`_acomodacoes_content_v_version_culinary_images_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`_acomodacoes_content_v_version_faq_items\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_uuid\` text NOT NULL,
  	\`number\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_acomodacoes_content_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_acomodacoes_content_v_version_faq_items_order_idx\` ON \`_acomodacoes_content_v_version_faq_items\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_acomodacoes_content_v_version_faq_items_parent_id_idx\` ON \`_acomodacoes_content_v_version_faq_items\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`_acomodacoes_content_v_version_faq_items_locales\` (
  	\`question\` text NOT NULL,
  	\`answer\` text NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_acomodacoes_content_v_version_faq_items\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`_acomodacoes_content_v_version_faq_items_locales_locale_pare\` ON \`_acomodacoes_content_v_version_faq_items_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`_acomodacoes_content_v\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`version_hero_background_image\` text,
  	\`version_hero_video_mp4\` text,
  	\`version_hero_video_webm\` text,
  	\`version_hero_video_mp4_low\` text,
  	\`version_hero_video_webm_low\` text,
  	\`version_hero_video_poster\` text,
  	\`version_culinary_cta_href\` text,
  	\`version_meta_no_index\` integer DEFAULT false,
  	\`version_updated_at\` text,
  	\`version_created_at\` text,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL
  );
  `)
  await db.run(sql`CREATE INDEX \`_acomodacoes_content_v_created_at_idx\` ON \`_acomodacoes_content_v\` (\`created_at\`);`)
  await db.run(sql`CREATE INDEX \`_acomodacoes_content_v_updated_at_idx\` ON \`_acomodacoes_content_v\` (\`updated_at\`);`)
  await db.run(sql`CREATE TABLE \`_acomodacoes_content_v_locales\` (
  	\`version_hero_label\` text,
  	\`version_hero_heading\` text NOT NULL,
  	\`version_hero_subtitle\` text,
  	\`version_hero_description\` text,
  	\`version_hero_scroll_hint\` text DEFAULT 'Deslize para baixo',
  	\`version_highlights_heading\` text,
  	\`version_culinary_label\` text,
  	\`version_culinary_heading\` text,
  	\`version_culinary_description\` text,
  	\`version_culinary_cta_text\` text,
  	\`version_faq_label\` text DEFAULT 'PERGUNTAS FREQUENTES',
  	\`version_faq_heading\` text NOT NULL,
  	\`version_faq_description\` text,
  	\`version_meta_title\` text,
  	\`version_meta_description\` text,
  	\`version_meta_image_id\` integer,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	FOREIGN KEY (\`version_meta_image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_acomodacoes_content_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_acomodacoes_content_v_version_meta_version_meta_image_idx\` ON \`_acomodacoes_content_v_locales\` (\`version_meta_image_id\`,\`_locale\`);`)
  await db.run(sql`CREATE UNIQUE INDEX \`_acomodacoes_content_v_locales_locale_parent_id_unique\` ON \`_acomodacoes_content_v_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`culinaria_content_manifesto_segments\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`is_highlight\` integer DEFAULT false,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`culinaria_content\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`culinaria_content_manifesto_segments_order_idx\` ON \`culinaria_content_manifesto_segments\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`culinaria_content_manifesto_segments_parent_id_idx\` ON \`culinaria_content_manifesto_segments\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`culinaria_content_manifesto_segments_locales\` (
  	\`text\` text NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`culinaria_content_manifesto_segments\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`culinaria_content_manifesto_segments_locales_locale_parent_i\` ON \`culinaria_content_manifesto_segments_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`culinaria_content_menu_body\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`culinaria_content\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`culinaria_content_menu_body_order_idx\` ON \`culinaria_content_menu_body\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`culinaria_content_menu_body_parent_id_idx\` ON \`culinaria_content_menu_body\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`culinaria_content_menu_body_locales\` (
  	\`text\` text NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`culinaria_content_menu_body\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`culinaria_content_menu_body_locales_locale_parent_id_unique\` ON \`culinaria_content_menu_body_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`culinaria_content_menu_features\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`culinaria_content\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`culinaria_content_menu_features_order_idx\` ON \`culinaria_content_menu_features\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`culinaria_content_menu_features_parent_id_idx\` ON \`culinaria_content_menu_features\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`culinaria_content_menu_features_locales\` (
  	\`number\` text,
  	\`title\` text,
  	\`description\` text,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`culinaria_content_menu_features\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`culinaria_content_menu_features_locales_locale_parent_id_uni\` ON \`culinaria_content_menu_features_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`culinaria_content_highlights_items\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`icon_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`culinaria_content\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`culinaria_content_highlights_items_order_idx\` ON \`culinaria_content_highlights_items\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`culinaria_content_highlights_items_parent_id_idx\` ON \`culinaria_content_highlights_items\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`culinaria_content_highlights_items_locales\` (
  	\`title\` text,
  	\`description\` text,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`culinaria_content_highlights_items\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`culinaria_content_highlights_items_locales_locale_parent_id_\` ON \`culinaria_content_highlights_items_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`culinaria_content_services_items\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`image\` text,
  	\`href\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`culinaria_content\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`culinaria_content_services_items_order_idx\` ON \`culinaria_content_services_items\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`culinaria_content_services_items_parent_id_idx\` ON \`culinaria_content_services_items\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`culinaria_content_services_items_locales\` (
  	\`title\` text NOT NULL,
  	\`description\` text,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`culinaria_content_services_items\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`culinaria_content_services_items_locales_locale_parent_id_un\` ON \`culinaria_content_services_items_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`culinaria_content_experience_body\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`culinaria_content\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`culinaria_content_experience_body_order_idx\` ON \`culinaria_content_experience_body\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`culinaria_content_experience_body_parent_id_idx\` ON \`culinaria_content_experience_body\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`culinaria_content_experience_body_locales\` (
  	\`text\` text NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`culinaria_content_experience_body\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`culinaria_content_experience_body_locales_locale_parent_id_u\` ON \`culinaria_content_experience_body_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`culinaria_content_faq_items\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`number\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`culinaria_content\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`culinaria_content_faq_items_order_idx\` ON \`culinaria_content_faq_items\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`culinaria_content_faq_items_parent_id_idx\` ON \`culinaria_content_faq_items\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`culinaria_content_faq_items_locales\` (
  	\`question\` text NOT NULL,
  	\`answer\` text NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`culinaria_content_faq_items\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`culinaria_content_faq_items_locales_locale_parent_id_unique\` ON \`culinaria_content_faq_items_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`culinaria_content\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`hero_background_image\` text,
  	\`menu_image\` text,
  	\`services_button_href\` text,
  	\`experience_image\` text,
  	\`cross_sell_button_href\` text,
  	\`cross_sell_image\` text,
  	\`meta_no_index\` integer DEFAULT false,
  	\`updated_at\` text,
  	\`created_at\` text
  );
  `)
  await db.run(sql`CREATE TABLE \`culinaria_content_locales\` (
  	\`hero_label\` text,
  	\`hero_heading\` text NOT NULL,
  	\`hero_subtitle\` text,
  	\`hero_description\` text,
  	\`hero_scroll_hint\` text DEFAULT 'Deslize para baixo',
  	\`menu_label\` text,
  	\`menu_heading\` text,
  	\`highlights_heading\` text,
  	\`services_label\` text,
  	\`services_heading\` text,
  	\`services_description\` text,
  	\`services_button_text\` text,
  	\`experience_heading\` text,
  	\`cross_sell_heading\` text,
  	\`cross_sell_description\` text,
  	\`cross_sell_button_text\` text,
  	\`faq_label\` text DEFAULT 'PERGUNTAS FREQUENTES',
  	\`faq_heading\` text NOT NULL,
  	\`faq_description\` text,
  	\`meta_title\` text,
  	\`meta_description\` text,
  	\`meta_image_id\` integer,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	FOREIGN KEY (\`meta_image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`culinaria_content\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`culinaria_content_meta_meta_image_idx\` ON \`culinaria_content_locales\` (\`meta_image_id\`,\`_locale\`);`)
  await db.run(sql`CREATE UNIQUE INDEX \`culinaria_content_locales_locale_parent_id_unique\` ON \`culinaria_content_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`_culinaria_content_v_version_manifesto_segments\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`is_highlight\` integer DEFAULT false,
  	\`_uuid\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_culinaria_content_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_culinaria_content_v_version_manifesto_segments_order_idx\` ON \`_culinaria_content_v_version_manifesto_segments\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_culinaria_content_v_version_manifesto_segments_parent_id_idx\` ON \`_culinaria_content_v_version_manifesto_segments\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`_culinaria_content_v_version_manifesto_segments_locales\` (
  	\`text\` text NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_culinaria_content_v_version_manifesto_segments\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`_culinaria_content_v_version_manifesto_segments_locales_loca\` ON \`_culinaria_content_v_version_manifesto_segments_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`_culinaria_content_v_version_menu_body\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_uuid\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_culinaria_content_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_culinaria_content_v_version_menu_body_order_idx\` ON \`_culinaria_content_v_version_menu_body\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_culinaria_content_v_version_menu_body_parent_id_idx\` ON \`_culinaria_content_v_version_menu_body\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`_culinaria_content_v_version_menu_body_locales\` (
  	\`text\` text NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_culinaria_content_v_version_menu_body\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`_culinaria_content_v_version_menu_body_locales_locale_parent\` ON \`_culinaria_content_v_version_menu_body_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`_culinaria_content_v_version_menu_features\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_uuid\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_culinaria_content_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_culinaria_content_v_version_menu_features_order_idx\` ON \`_culinaria_content_v_version_menu_features\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_culinaria_content_v_version_menu_features_parent_id_idx\` ON \`_culinaria_content_v_version_menu_features\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`_culinaria_content_v_version_menu_features_locales\` (
  	\`number\` text,
  	\`title\` text,
  	\`description\` text,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_culinaria_content_v_version_menu_features\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`_culinaria_content_v_version_menu_features_locales_locale_pa\` ON \`_culinaria_content_v_version_menu_features_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`_culinaria_content_v_version_highlights_items\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`icon_name\` text,
  	\`_uuid\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_culinaria_content_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_culinaria_content_v_version_highlights_items_order_idx\` ON \`_culinaria_content_v_version_highlights_items\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_culinaria_content_v_version_highlights_items_parent_id_idx\` ON \`_culinaria_content_v_version_highlights_items\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`_culinaria_content_v_version_highlights_items_locales\` (
  	\`title\` text,
  	\`description\` text,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_culinaria_content_v_version_highlights_items\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`_culinaria_content_v_version_highlights_items_locales_locale\` ON \`_culinaria_content_v_version_highlights_items_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`_culinaria_content_v_version_services_items\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`image\` text,
  	\`href\` text,
  	\`_uuid\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_culinaria_content_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_culinaria_content_v_version_services_items_order_idx\` ON \`_culinaria_content_v_version_services_items\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_culinaria_content_v_version_services_items_parent_id_idx\` ON \`_culinaria_content_v_version_services_items\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`_culinaria_content_v_version_services_items_locales\` (
  	\`title\` text NOT NULL,
  	\`description\` text,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_culinaria_content_v_version_services_items\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`_culinaria_content_v_version_services_items_locales_locale_p\` ON \`_culinaria_content_v_version_services_items_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`_culinaria_content_v_version_experience_body\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_uuid\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_culinaria_content_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_culinaria_content_v_version_experience_body_order_idx\` ON \`_culinaria_content_v_version_experience_body\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_culinaria_content_v_version_experience_body_parent_id_idx\` ON \`_culinaria_content_v_version_experience_body\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`_culinaria_content_v_version_experience_body_locales\` (
  	\`text\` text NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_culinaria_content_v_version_experience_body\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`_culinaria_content_v_version_experience_body_locales_locale_\` ON \`_culinaria_content_v_version_experience_body_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`_culinaria_content_v_version_faq_items\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_uuid\` text NOT NULL,
  	\`number\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_culinaria_content_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_culinaria_content_v_version_faq_items_order_idx\` ON \`_culinaria_content_v_version_faq_items\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_culinaria_content_v_version_faq_items_parent_id_idx\` ON \`_culinaria_content_v_version_faq_items\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`_culinaria_content_v_version_faq_items_locales\` (
  	\`question\` text NOT NULL,
  	\`answer\` text NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_culinaria_content_v_version_faq_items\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`_culinaria_content_v_version_faq_items_locales_locale_parent\` ON \`_culinaria_content_v_version_faq_items_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`_culinaria_content_v\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`version_hero_background_image\` text,
  	\`version_menu_image\` text,
  	\`version_services_button_href\` text,
  	\`version_experience_image\` text,
  	\`version_cross_sell_button_href\` text,
  	\`version_cross_sell_image\` text,
  	\`version_meta_no_index\` integer DEFAULT false,
  	\`version_updated_at\` text,
  	\`version_created_at\` text,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL
  );
  `)
  await db.run(sql`CREATE INDEX \`_culinaria_content_v_created_at_idx\` ON \`_culinaria_content_v\` (\`created_at\`);`)
  await db.run(sql`CREATE INDEX \`_culinaria_content_v_updated_at_idx\` ON \`_culinaria_content_v\` (\`updated_at\`);`)
  await db.run(sql`CREATE TABLE \`_culinaria_content_v_locales\` (
  	\`version_hero_label\` text,
  	\`version_hero_heading\` text NOT NULL,
  	\`version_hero_subtitle\` text,
  	\`version_hero_description\` text,
  	\`version_hero_scroll_hint\` text DEFAULT 'Deslize para baixo',
  	\`version_menu_label\` text,
  	\`version_menu_heading\` text,
  	\`version_highlights_heading\` text,
  	\`version_services_label\` text,
  	\`version_services_heading\` text,
  	\`version_services_description\` text,
  	\`version_services_button_text\` text,
  	\`version_experience_heading\` text,
  	\`version_cross_sell_heading\` text,
  	\`version_cross_sell_description\` text,
  	\`version_cross_sell_button_text\` text,
  	\`version_faq_label\` text DEFAULT 'PERGUNTAS FREQUENTES',
  	\`version_faq_heading\` text NOT NULL,
  	\`version_faq_description\` text,
  	\`version_meta_title\` text,
  	\`version_meta_description\` text,
  	\`version_meta_image_id\` integer,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	FOREIGN KEY (\`version_meta_image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_culinaria_content_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_culinaria_content_v_version_meta_version_meta_image_idx\` ON \`_culinaria_content_v_locales\` (\`version_meta_image_id\`,\`_locale\`);`)
  await db.run(sql`CREATE UNIQUE INDEX \`_culinaria_content_v_locales_locale_parent_id_unique\` ON \`_culinaria_content_v_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`pesca_content_manifesto_segments\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`is_highlight\` integer DEFAULT false,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`pesca_content\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`pesca_content_manifesto_segments_order_idx\` ON \`pesca_content_manifesto_segments\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`pesca_content_manifesto_segments_parent_id_idx\` ON \`pesca_content_manifesto_segments\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`pesca_content_manifesto_segments_locales\` (
  	\`text\` text NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`pesca_content_manifesto_segments\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`pesca_content_manifesto_segments_locales_locale_parent_id_un\` ON \`pesca_content_manifesto_segments_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`pesca_content_sobre_nos_body\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`pesca_content\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`pesca_content_sobre_nos_body_order_idx\` ON \`pesca_content_sobre_nos_body\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`pesca_content_sobre_nos_body_parent_id_idx\` ON \`pesca_content_sobre_nos_body\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`pesca_content_sobre_nos_body_locales\` (
  	\`text\` text NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`pesca_content_sobre_nos_body\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`pesca_content_sobre_nos_body_locales_locale_parent_id_unique\` ON \`pesca_content_sobre_nos_body_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`pesca_content_sobre_nos_features\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`pesca_content\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`pesca_content_sobre_nos_features_order_idx\` ON \`pesca_content_sobre_nos_features\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`pesca_content_sobre_nos_features_parent_id_idx\` ON \`pesca_content_sobre_nos_features\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`pesca_content_sobre_nos_features_locales\` (
  	\`number\` text,
  	\`title\` text,
  	\`description\` text,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`pesca_content_sobre_nos_features\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`pesca_content_sobre_nos_features_locales_locale_parent_id_un\` ON \`pesca_content_sobre_nos_features_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`pesca_content_highlights_items\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`icon_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`pesca_content\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`pesca_content_highlights_items_order_idx\` ON \`pesca_content_highlights_items\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`pesca_content_highlights_items_parent_id_idx\` ON \`pesca_content_highlights_items\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`pesca_content_highlights_items_locales\` (
  	\`title\` text,
  	\`description\` text,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`pesca_content_highlights_items\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`pesca_content_highlights_items_locales_locale_parent_id_uniq\` ON \`pesca_content_highlights_items_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`pesca_content_services_items\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`image\` text,
  	\`href\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`pesca_content\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`pesca_content_services_items_order_idx\` ON \`pesca_content_services_items\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`pesca_content_services_items_parent_id_idx\` ON \`pesca_content_services_items\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`pesca_content_services_items_locales\` (
  	\`title\` text NOT NULL,
  	\`description\` text,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`pesca_content_services_items\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`pesca_content_services_items_locales_locale_parent_id_unique\` ON \`pesca_content_services_items_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`pesca_content_faq_items\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`number\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`pesca_content\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`pesca_content_faq_items_order_idx\` ON \`pesca_content_faq_items\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`pesca_content_faq_items_parent_id_idx\` ON \`pesca_content_faq_items\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`pesca_content_faq_items_locales\` (
  	\`question\` text NOT NULL,
  	\`answer\` text NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`pesca_content_faq_items\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`pesca_content_faq_items_locales_locale_parent_id_unique\` ON \`pesca_content_faq_items_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`pesca_content\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`hero_background_image\` text,
  	\`sobre_nos_image\` text,
  	\`services_button_href\` text,
  	\`meta_no_index\` integer DEFAULT false,
  	\`updated_at\` text,
  	\`created_at\` text
  );
  `)
  await db.run(sql`CREATE TABLE \`pesca_content_locales\` (
  	\`hero_label\` text,
  	\`hero_heading\` text NOT NULL,
  	\`hero_subtitle\` text,
  	\`hero_description\` text,
  	\`hero_scroll_hint\` text DEFAULT 'Deslize para baixo',
  	\`sobre_nos_label\` text,
  	\`sobre_nos_heading\` text,
  	\`highlights_heading\` text,
  	\`services_label\` text,
  	\`services_heading\` text,
  	\`services_description\` text,
  	\`services_button_text\` text,
  	\`faq_label\` text DEFAULT 'PERGUNTAS FREQUENTES',
  	\`faq_heading\` text NOT NULL,
  	\`faq_description\` text,
  	\`meta_title\` text,
  	\`meta_description\` text,
  	\`meta_image_id\` integer,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	FOREIGN KEY (\`meta_image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`pesca_content\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`pesca_content_meta_meta_image_idx\` ON \`pesca_content_locales\` (\`meta_image_id\`,\`_locale\`);`)
  await db.run(sql`CREATE UNIQUE INDEX \`pesca_content_locales_locale_parent_id_unique\` ON \`pesca_content_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`_pesca_content_v_version_manifesto_segments\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`is_highlight\` integer DEFAULT false,
  	\`_uuid\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_pesca_content_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_pesca_content_v_version_manifesto_segments_order_idx\` ON \`_pesca_content_v_version_manifesto_segments\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_pesca_content_v_version_manifesto_segments_parent_id_idx\` ON \`_pesca_content_v_version_manifesto_segments\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`_pesca_content_v_version_manifesto_segments_locales\` (
  	\`text\` text NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_pesca_content_v_version_manifesto_segments\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`_pesca_content_v_version_manifesto_segments_locales_locale_p\` ON \`_pesca_content_v_version_manifesto_segments_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`_pesca_content_v_version_sobre_nos_body\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_uuid\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_pesca_content_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_pesca_content_v_version_sobre_nos_body_order_idx\` ON \`_pesca_content_v_version_sobre_nos_body\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_pesca_content_v_version_sobre_nos_body_parent_id_idx\` ON \`_pesca_content_v_version_sobre_nos_body\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`_pesca_content_v_version_sobre_nos_body_locales\` (
  	\`text\` text NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_pesca_content_v_version_sobre_nos_body\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`_pesca_content_v_version_sobre_nos_body_locales_locale_paren\` ON \`_pesca_content_v_version_sobre_nos_body_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`_pesca_content_v_version_sobre_nos_features\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_uuid\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_pesca_content_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_pesca_content_v_version_sobre_nos_features_order_idx\` ON \`_pesca_content_v_version_sobre_nos_features\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_pesca_content_v_version_sobre_nos_features_parent_id_idx\` ON \`_pesca_content_v_version_sobre_nos_features\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`_pesca_content_v_version_sobre_nos_features_locales\` (
  	\`number\` text,
  	\`title\` text,
  	\`description\` text,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_pesca_content_v_version_sobre_nos_features\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`_pesca_content_v_version_sobre_nos_features_locales_locale_p\` ON \`_pesca_content_v_version_sobre_nos_features_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`_pesca_content_v_version_highlights_items\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`icon_name\` text,
  	\`_uuid\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_pesca_content_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_pesca_content_v_version_highlights_items_order_idx\` ON \`_pesca_content_v_version_highlights_items\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_pesca_content_v_version_highlights_items_parent_id_idx\` ON \`_pesca_content_v_version_highlights_items\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`_pesca_content_v_version_highlights_items_locales\` (
  	\`title\` text,
  	\`description\` text,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_pesca_content_v_version_highlights_items\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`_pesca_content_v_version_highlights_items_locales_locale_par\` ON \`_pesca_content_v_version_highlights_items_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`_pesca_content_v_version_services_items\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`image\` text,
  	\`href\` text,
  	\`_uuid\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_pesca_content_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_pesca_content_v_version_services_items_order_idx\` ON \`_pesca_content_v_version_services_items\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_pesca_content_v_version_services_items_parent_id_idx\` ON \`_pesca_content_v_version_services_items\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`_pesca_content_v_version_services_items_locales\` (
  	\`title\` text NOT NULL,
  	\`description\` text,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_pesca_content_v_version_services_items\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`_pesca_content_v_version_services_items_locales_locale_paren\` ON \`_pesca_content_v_version_services_items_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`_pesca_content_v_version_faq_items\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_uuid\` text NOT NULL,
  	\`number\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_pesca_content_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_pesca_content_v_version_faq_items_order_idx\` ON \`_pesca_content_v_version_faq_items\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_pesca_content_v_version_faq_items_parent_id_idx\` ON \`_pesca_content_v_version_faq_items\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`_pesca_content_v_version_faq_items_locales\` (
  	\`question\` text NOT NULL,
  	\`answer\` text NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_pesca_content_v_version_faq_items\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`_pesca_content_v_version_faq_items_locales_locale_parent_id_\` ON \`_pesca_content_v_version_faq_items_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`_pesca_content_v\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`version_hero_background_image\` text,
  	\`version_sobre_nos_image\` text,
  	\`version_services_button_href\` text,
  	\`version_meta_no_index\` integer DEFAULT false,
  	\`version_updated_at\` text,
  	\`version_created_at\` text,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL
  );
  `)
  await db.run(sql`CREATE INDEX \`_pesca_content_v_created_at_idx\` ON \`_pesca_content_v\` (\`created_at\`);`)
  await db.run(sql`CREATE INDEX \`_pesca_content_v_updated_at_idx\` ON \`_pesca_content_v\` (\`updated_at\`);`)
  await db.run(sql`CREATE TABLE \`_pesca_content_v_locales\` (
  	\`version_hero_label\` text,
  	\`version_hero_heading\` text NOT NULL,
  	\`version_hero_subtitle\` text,
  	\`version_hero_description\` text,
  	\`version_hero_scroll_hint\` text DEFAULT 'Deslize para baixo',
  	\`version_sobre_nos_label\` text,
  	\`version_sobre_nos_heading\` text,
  	\`version_highlights_heading\` text,
  	\`version_services_label\` text,
  	\`version_services_heading\` text,
  	\`version_services_description\` text,
  	\`version_services_button_text\` text,
  	\`version_faq_label\` text DEFAULT 'PERGUNTAS FREQUENTES',
  	\`version_faq_heading\` text NOT NULL,
  	\`version_faq_description\` text,
  	\`version_meta_title\` text,
  	\`version_meta_description\` text,
  	\`version_meta_image_id\` integer,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	FOREIGN KEY (\`version_meta_image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_pesca_content_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_pesca_content_v_version_meta_version_meta_image_idx\` ON \`_pesca_content_v_locales\` (\`version_meta_image_id\`,\`_locale\`);`)
  await db.run(sql`CREATE UNIQUE INDEX \`_pesca_content_v_locales_locale_parent_id_unique\` ON \`_pesca_content_v_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`ecoturismo_content_manifesto_segments\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`is_highlight\` integer DEFAULT false,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`ecoturismo_content\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`ecoturismo_content_manifesto_segments_order_idx\` ON \`ecoturismo_content_manifesto_segments\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`ecoturismo_content_manifesto_segments_parent_id_idx\` ON \`ecoturismo_content_manifesto_segments\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`ecoturismo_content_manifesto_segments_locales\` (
  	\`text\` text NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`ecoturismo_content_manifesto_segments\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`ecoturismo_content_manifesto_segments_locales_locale_parent_\` ON \`ecoturismo_content_manifesto_segments_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`ecoturismo_content_sobre_nos_body\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`ecoturismo_content\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`ecoturismo_content_sobre_nos_body_order_idx\` ON \`ecoturismo_content_sobre_nos_body\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`ecoturismo_content_sobre_nos_body_parent_id_idx\` ON \`ecoturismo_content_sobre_nos_body\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`ecoturismo_content_sobre_nos_body_locales\` (
  	\`text\` text NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`ecoturismo_content_sobre_nos_body\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`ecoturismo_content_sobre_nos_body_locales_locale_parent_id_u\` ON \`ecoturismo_content_sobre_nos_body_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`ecoturismo_content_sobre_nos_features\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`ecoturismo_content\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`ecoturismo_content_sobre_nos_features_order_idx\` ON \`ecoturismo_content_sobre_nos_features\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`ecoturismo_content_sobre_nos_features_parent_id_idx\` ON \`ecoturismo_content_sobre_nos_features\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`ecoturismo_content_sobre_nos_features_locales\` (
  	\`number\` text,
  	\`title\` text,
  	\`description\` text,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`ecoturismo_content_sobre_nos_features\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`ecoturismo_content_sobre_nos_features_locales_locale_parent_\` ON \`ecoturismo_content_sobre_nos_features_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`ecoturismo_content_highlights_items\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`icon_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`ecoturismo_content\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`ecoturismo_content_highlights_items_order_idx\` ON \`ecoturismo_content_highlights_items\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`ecoturismo_content_highlights_items_parent_id_idx\` ON \`ecoturismo_content_highlights_items\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`ecoturismo_content_highlights_items_locales\` (
  	\`title\` text,
  	\`description\` text,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`ecoturismo_content_highlights_items\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`ecoturismo_content_highlights_items_locales_locale_parent_id\` ON \`ecoturismo_content_highlights_items_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`ecoturismo_content_services_items\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`image\` text,
  	\`href\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`ecoturismo_content\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`ecoturismo_content_services_items_order_idx\` ON \`ecoturismo_content_services_items\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`ecoturismo_content_services_items_parent_id_idx\` ON \`ecoturismo_content_services_items\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`ecoturismo_content_services_items_locales\` (
  	\`title\` text NOT NULL,
  	\`description\` text,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`ecoturismo_content_services_items\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`ecoturismo_content_services_items_locales_locale_parent_id_u\` ON \`ecoturismo_content_services_items_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`ecoturismo_content_faq_items\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`number\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`ecoturismo_content\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`ecoturismo_content_faq_items_order_idx\` ON \`ecoturismo_content_faq_items\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`ecoturismo_content_faq_items_parent_id_idx\` ON \`ecoturismo_content_faq_items\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`ecoturismo_content_faq_items_locales\` (
  	\`question\` text NOT NULL,
  	\`answer\` text NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`ecoturismo_content_faq_items\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`ecoturismo_content_faq_items_locales_locale_parent_id_unique\` ON \`ecoturismo_content_faq_items_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`ecoturismo_content\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`hero_background_image\` text,
  	\`sobre_nos_image\` text,
  	\`services_button_href\` text,
  	\`meta_no_index\` integer DEFAULT false,
  	\`updated_at\` text,
  	\`created_at\` text
  );
  `)
  await db.run(sql`CREATE TABLE \`ecoturismo_content_locales\` (
  	\`hero_label\` text,
  	\`hero_heading\` text NOT NULL,
  	\`hero_subtitle\` text,
  	\`hero_description\` text,
  	\`hero_scroll_hint\` text DEFAULT 'Deslize para baixo',
  	\`sobre_nos_label\` text,
  	\`sobre_nos_heading\` text,
  	\`highlights_heading\` text,
  	\`services_label\` text,
  	\`services_heading\` text,
  	\`services_description\` text,
  	\`services_button_text\` text,
  	\`faq_label\` text DEFAULT 'PERGUNTAS FREQUENTES',
  	\`faq_heading\` text NOT NULL,
  	\`faq_description\` text,
  	\`meta_title\` text,
  	\`meta_description\` text,
  	\`meta_image_id\` integer,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	FOREIGN KEY (\`meta_image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`ecoturismo_content\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`ecoturismo_content_meta_meta_image_idx\` ON \`ecoturismo_content_locales\` (\`meta_image_id\`,\`_locale\`);`)
  await db.run(sql`CREATE UNIQUE INDEX \`ecoturismo_content_locales_locale_parent_id_unique\` ON \`ecoturismo_content_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`_ecoturismo_content_v_version_manifesto_segments\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`is_highlight\` integer DEFAULT false,
  	\`_uuid\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_ecoturismo_content_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_ecoturismo_content_v_version_manifesto_segments_order_idx\` ON \`_ecoturismo_content_v_version_manifesto_segments\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_ecoturismo_content_v_version_manifesto_segments_parent_id_idx\` ON \`_ecoturismo_content_v_version_manifesto_segments\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`_ecoturismo_content_v_version_manifesto_segments_locales\` (
  	\`text\` text NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_ecoturismo_content_v_version_manifesto_segments\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`_ecoturismo_content_v_version_manifesto_segments_locales_loc\` ON \`_ecoturismo_content_v_version_manifesto_segments_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`_ecoturismo_content_v_version_sobre_nos_body\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_uuid\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_ecoturismo_content_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_ecoturismo_content_v_version_sobre_nos_body_order_idx\` ON \`_ecoturismo_content_v_version_sobre_nos_body\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_ecoturismo_content_v_version_sobre_nos_body_parent_id_idx\` ON \`_ecoturismo_content_v_version_sobre_nos_body\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`_ecoturismo_content_v_version_sobre_nos_body_locales\` (
  	\`text\` text NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_ecoturismo_content_v_version_sobre_nos_body\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`_ecoturismo_content_v_version_sobre_nos_body_locales_locale_\` ON \`_ecoturismo_content_v_version_sobre_nos_body_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`_ecoturismo_content_v_version_sobre_nos_features\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_uuid\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_ecoturismo_content_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_ecoturismo_content_v_version_sobre_nos_features_order_idx\` ON \`_ecoturismo_content_v_version_sobre_nos_features\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_ecoturismo_content_v_version_sobre_nos_features_parent_id_idx\` ON \`_ecoturismo_content_v_version_sobre_nos_features\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`_ecoturismo_content_v_version_sobre_nos_features_locales\` (
  	\`number\` text,
  	\`title\` text,
  	\`description\` text,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_ecoturismo_content_v_version_sobre_nos_features\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`_ecoturismo_content_v_version_sobre_nos_features_locales_loc\` ON \`_ecoturismo_content_v_version_sobre_nos_features_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`_ecoturismo_content_v_version_highlights_items\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`icon_name\` text,
  	\`_uuid\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_ecoturismo_content_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_ecoturismo_content_v_version_highlights_items_order_idx\` ON \`_ecoturismo_content_v_version_highlights_items\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_ecoturismo_content_v_version_highlights_items_parent_id_idx\` ON \`_ecoturismo_content_v_version_highlights_items\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`_ecoturismo_content_v_version_highlights_items_locales\` (
  	\`title\` text,
  	\`description\` text,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_ecoturismo_content_v_version_highlights_items\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`_ecoturismo_content_v_version_highlights_items_locales_local\` ON \`_ecoturismo_content_v_version_highlights_items_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`_ecoturismo_content_v_version_services_items\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`image\` text,
  	\`href\` text,
  	\`_uuid\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_ecoturismo_content_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_ecoturismo_content_v_version_services_items_order_idx\` ON \`_ecoturismo_content_v_version_services_items\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_ecoturismo_content_v_version_services_items_parent_id_idx\` ON \`_ecoturismo_content_v_version_services_items\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`_ecoturismo_content_v_version_services_items_locales\` (
  	\`title\` text NOT NULL,
  	\`description\` text,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_ecoturismo_content_v_version_services_items\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`_ecoturismo_content_v_version_services_items_locales_locale_\` ON \`_ecoturismo_content_v_version_services_items_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`_ecoturismo_content_v_version_faq_items\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_uuid\` text NOT NULL,
  	\`number\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_ecoturismo_content_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_ecoturismo_content_v_version_faq_items_order_idx\` ON \`_ecoturismo_content_v_version_faq_items\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_ecoturismo_content_v_version_faq_items_parent_id_idx\` ON \`_ecoturismo_content_v_version_faq_items\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`_ecoturismo_content_v_version_faq_items_locales\` (
  	\`question\` text NOT NULL,
  	\`answer\` text NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_ecoturismo_content_v_version_faq_items\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`_ecoturismo_content_v_version_faq_items_locales_locale_paren\` ON \`_ecoturismo_content_v_version_faq_items_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`_ecoturismo_content_v\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`version_hero_background_image\` text,
  	\`version_sobre_nos_image\` text,
  	\`version_services_button_href\` text,
  	\`version_meta_no_index\` integer DEFAULT false,
  	\`version_updated_at\` text,
  	\`version_created_at\` text,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL
  );
  `)
  await db.run(sql`CREATE INDEX \`_ecoturismo_content_v_created_at_idx\` ON \`_ecoturismo_content_v\` (\`created_at\`);`)
  await db.run(sql`CREATE INDEX \`_ecoturismo_content_v_updated_at_idx\` ON \`_ecoturismo_content_v\` (\`updated_at\`);`)
  await db.run(sql`CREATE TABLE \`_ecoturismo_content_v_locales\` (
  	\`version_hero_label\` text,
  	\`version_hero_heading\` text NOT NULL,
  	\`version_hero_subtitle\` text,
  	\`version_hero_description\` text,
  	\`version_hero_scroll_hint\` text DEFAULT 'Deslize para baixo',
  	\`version_sobre_nos_label\` text,
  	\`version_sobre_nos_heading\` text,
  	\`version_highlights_heading\` text,
  	\`version_services_label\` text,
  	\`version_services_heading\` text,
  	\`version_services_description\` text,
  	\`version_services_button_text\` text,
  	\`version_faq_label\` text DEFAULT 'PERGUNTAS FREQUENTES',
  	\`version_faq_heading\` text NOT NULL,
  	\`version_faq_description\` text,
  	\`version_meta_title\` text,
  	\`version_meta_description\` text,
  	\`version_meta_image_id\` integer,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	FOREIGN KEY (\`version_meta_image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_ecoturismo_content_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_ecoturismo_content_v_version_meta_version_meta_image_idx\` ON \`_ecoturismo_content_v_locales\` (\`version_meta_image_id\`,\`_locale\`);`)
  await db.run(sql`CREATE UNIQUE INDEX \`_ecoturismo_content_v_locales_locale_parent_id_unique\` ON \`_ecoturismo_content_v_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`birdwatching_content_manifesto_segments\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`is_highlight\` integer DEFAULT false,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`birdwatching_content\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`birdwatching_content_manifesto_segments_order_idx\` ON \`birdwatching_content_manifesto_segments\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`birdwatching_content_manifesto_segments_parent_id_idx\` ON \`birdwatching_content_manifesto_segments\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`birdwatching_content_manifesto_segments_locales\` (
  	\`text\` text NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`birdwatching_content_manifesto_segments\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`birdwatching_content_manifesto_segments_locales_locale_paren\` ON \`birdwatching_content_manifesto_segments_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`birdwatching_content_sobre_nos_body\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`birdwatching_content\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`birdwatching_content_sobre_nos_body_order_idx\` ON \`birdwatching_content_sobre_nos_body\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`birdwatching_content_sobre_nos_body_parent_id_idx\` ON \`birdwatching_content_sobre_nos_body\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`birdwatching_content_sobre_nos_body_locales\` (
  	\`text\` text NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`birdwatching_content_sobre_nos_body\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`birdwatching_content_sobre_nos_body_locales_locale_parent_id\` ON \`birdwatching_content_sobre_nos_body_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`birdwatching_content_sobre_nos_features\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`birdwatching_content\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`birdwatching_content_sobre_nos_features_order_idx\` ON \`birdwatching_content_sobre_nos_features\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`birdwatching_content_sobre_nos_features_parent_id_idx\` ON \`birdwatching_content_sobre_nos_features\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`birdwatching_content_sobre_nos_features_locales\` (
  	\`number\` text,
  	\`title\` text,
  	\`description\` text,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`birdwatching_content_sobre_nos_features\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`birdwatching_content_sobre_nos_features_locales_locale_paren\` ON \`birdwatching_content_sobre_nos_features_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`birdwatching_content_highlights_items\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`icon_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`birdwatching_content\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`birdwatching_content_highlights_items_order_idx\` ON \`birdwatching_content_highlights_items\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`birdwatching_content_highlights_items_parent_id_idx\` ON \`birdwatching_content_highlights_items\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`birdwatching_content_highlights_items_locales\` (
  	\`title\` text,
  	\`description\` text,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`birdwatching_content_highlights_items\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`birdwatching_content_highlights_items_locales_locale_parent_\` ON \`birdwatching_content_highlights_items_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`birdwatching_content_faq_items\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`number\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`birdwatching_content\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`birdwatching_content_faq_items_order_idx\` ON \`birdwatching_content_faq_items\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`birdwatching_content_faq_items_parent_id_idx\` ON \`birdwatching_content_faq_items\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`birdwatching_content_faq_items_locales\` (
  	\`question\` text NOT NULL,
  	\`answer\` text NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`birdwatching_content_faq_items\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`birdwatching_content_faq_items_locales_locale_parent_id_uniq\` ON \`birdwatching_content_faq_items_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`birdwatching_content\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`hero_background_image\` text,
  	\`sobre_nos_image\` text,
  	\`meta_no_index\` integer DEFAULT false,
  	\`updated_at\` text,
  	\`created_at\` text
  );
  `)
  await db.run(sql`CREATE TABLE \`birdwatching_content_locales\` (
  	\`hero_label\` text,
  	\`hero_heading\` text NOT NULL,
  	\`hero_subtitle\` text,
  	\`hero_description\` text,
  	\`hero_scroll_hint\` text DEFAULT 'Deslize para baixo',
  	\`sobre_nos_label\` text,
  	\`sobre_nos_heading\` text,
  	\`highlights_heading\` text,
  	\`faq_label\` text DEFAULT 'PERGUNTAS FREQUENTES',
  	\`faq_heading\` text NOT NULL,
  	\`faq_description\` text,
  	\`meta_title\` text,
  	\`meta_description\` text,
  	\`meta_image_id\` integer,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	FOREIGN KEY (\`meta_image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`birdwatching_content\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`birdwatching_content_meta_meta_image_idx\` ON \`birdwatching_content_locales\` (\`meta_image_id\`,\`_locale\`);`)
  await db.run(sql`CREATE UNIQUE INDEX \`birdwatching_content_locales_locale_parent_id_unique\` ON \`birdwatching_content_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`_birdwatching_content_v_version_manifesto_segments\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`is_highlight\` integer DEFAULT false,
  	\`_uuid\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_birdwatching_content_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_birdwatching_content_v_version_manifesto_segments_order_idx\` ON \`_birdwatching_content_v_version_manifesto_segments\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_birdwatching_content_v_version_manifesto_segments_parent_id_idx\` ON \`_birdwatching_content_v_version_manifesto_segments\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`_birdwatching_content_v_version_manifesto_segments_locales\` (
  	\`text\` text NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_birdwatching_content_v_version_manifesto_segments\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`_birdwatching_content_v_version_manifesto_segments_locales_l\` ON \`_birdwatching_content_v_version_manifesto_segments_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`_birdwatching_content_v_version_sobre_nos_body\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_uuid\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_birdwatching_content_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_birdwatching_content_v_version_sobre_nos_body_order_idx\` ON \`_birdwatching_content_v_version_sobre_nos_body\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_birdwatching_content_v_version_sobre_nos_body_parent_id_idx\` ON \`_birdwatching_content_v_version_sobre_nos_body\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`_birdwatching_content_v_version_sobre_nos_body_locales\` (
  	\`text\` text NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_birdwatching_content_v_version_sobre_nos_body\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`_birdwatching_content_v_version_sobre_nos_body_locales_local\` ON \`_birdwatching_content_v_version_sobre_nos_body_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`_birdwatching_content_v_version_sobre_nos_features\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_uuid\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_birdwatching_content_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_birdwatching_content_v_version_sobre_nos_features_order_idx\` ON \`_birdwatching_content_v_version_sobre_nos_features\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_birdwatching_content_v_version_sobre_nos_features_parent_id_idx\` ON \`_birdwatching_content_v_version_sobre_nos_features\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`_birdwatching_content_v_version_sobre_nos_features_locales\` (
  	\`number\` text,
  	\`title\` text,
  	\`description\` text,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_birdwatching_content_v_version_sobre_nos_features\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`_birdwatching_content_v_version_sobre_nos_features_locales_l\` ON \`_birdwatching_content_v_version_sobre_nos_features_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`_birdwatching_content_v_version_highlights_items\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`icon_name\` text,
  	\`_uuid\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_birdwatching_content_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_birdwatching_content_v_version_highlights_items_order_idx\` ON \`_birdwatching_content_v_version_highlights_items\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_birdwatching_content_v_version_highlights_items_parent_id_idx\` ON \`_birdwatching_content_v_version_highlights_items\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`_birdwatching_content_v_version_highlights_items_locales\` (
  	\`title\` text,
  	\`description\` text,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_birdwatching_content_v_version_highlights_items\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`_birdwatching_content_v_version_highlights_items_locales_loc\` ON \`_birdwatching_content_v_version_highlights_items_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`_birdwatching_content_v_version_faq_items\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_uuid\` text NOT NULL,
  	\`number\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_birdwatching_content_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_birdwatching_content_v_version_faq_items_order_idx\` ON \`_birdwatching_content_v_version_faq_items\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_birdwatching_content_v_version_faq_items_parent_id_idx\` ON \`_birdwatching_content_v_version_faq_items\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`_birdwatching_content_v_version_faq_items_locales\` (
  	\`question\` text NOT NULL,
  	\`answer\` text NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_birdwatching_content_v_version_faq_items\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`_birdwatching_content_v_version_faq_items_locales_locale_par\` ON \`_birdwatching_content_v_version_faq_items_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`_birdwatching_content_v\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`version_hero_background_image\` text,
  	\`version_sobre_nos_image\` text,
  	\`version_meta_no_index\` integer DEFAULT false,
  	\`version_updated_at\` text,
  	\`version_created_at\` text,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL
  );
  `)
  await db.run(sql`CREATE INDEX \`_birdwatching_content_v_created_at_idx\` ON \`_birdwatching_content_v\` (\`created_at\`);`)
  await db.run(sql`CREATE INDEX \`_birdwatching_content_v_updated_at_idx\` ON \`_birdwatching_content_v\` (\`updated_at\`);`)
  await db.run(sql`CREATE TABLE \`_birdwatching_content_v_locales\` (
  	\`version_hero_label\` text,
  	\`version_hero_heading\` text NOT NULL,
  	\`version_hero_subtitle\` text,
  	\`version_hero_description\` text,
  	\`version_hero_scroll_hint\` text DEFAULT 'Deslize para baixo',
  	\`version_sobre_nos_label\` text,
  	\`version_sobre_nos_heading\` text,
  	\`version_highlights_heading\` text,
  	\`version_faq_label\` text DEFAULT 'PERGUNTAS FREQUENTES',
  	\`version_faq_heading\` text NOT NULL,
  	\`version_faq_description\` text,
  	\`version_meta_title\` text,
  	\`version_meta_description\` text,
  	\`version_meta_image_id\` integer,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	FOREIGN KEY (\`version_meta_image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_birdwatching_content_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_birdwatching_content_v_version_meta_version_meta_image_idx\` ON \`_birdwatching_content_v_locales\` (\`version_meta_image_id\`,\`_locale\`);`)
  await db.run(sql`CREATE UNIQUE INDEX \`_birdwatching_content_v_locales_locale_parent_id_unique\` ON \`_birdwatching_content_v_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`contato_content_steps_placeholders\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`contato_content\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`contato_content_steps_placeholders_order_idx\` ON \`contato_content_steps_placeholders\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`contato_content_steps_placeholders_parent_id_idx\` ON \`contato_content_steps_placeholders\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`contato_content_steps_placeholders_locales\` (
  	\`text\` text NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`contato_content_steps_placeholders\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`contato_content_steps_placeholders_locales_locale_parent_id_\` ON \`contato_content_steps_placeholders_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`contato_content_channels_items\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`icon_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`contato_content\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`contato_content_channels_items_order_idx\` ON \`contato_content_channels_items\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`contato_content_channels_items_parent_id_idx\` ON \`contato_content_channels_items\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`contato_content_channels_items_locales\` (
  	\`title\` text,
  	\`info\` text,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`contato_content_channels_items\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`contato_content_channels_items_locales_locale_parent_id_uniq\` ON \`contato_content_channels_items_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`contato_content\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`hero_background_image\` text,
  	\`map_coords_lat\` numeric,
  	\`map_coords_lng\` numeric,
  	\`meta_no_index\` integer DEFAULT false,
  	\`updated_at\` text,
  	\`created_at\` text
  );
  `)
  await db.run(sql`CREATE TABLE \`contato_content_locales\` (
  	\`hero_label\` text,
  	\`hero_heading\` text NOT NULL,
  	\`hero_subtitle\` text,
  	\`hero_description\` text,
  	\`hero_scroll_hint\` text DEFAULT 'Deslize para baixo',
  	\`form_title\` text,
  	\`steps_button_next\` text,
  	\`steps_button_back\` text,
  	\`steps_button_submit\` text,
  	\`channels_heading\` text,
  	\`meta_title\` text,
  	\`meta_description\` text,
  	\`meta_image_id\` integer,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	FOREIGN KEY (\`meta_image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`contato_content\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`contato_content_meta_meta_image_idx\` ON \`contato_content_locales\` (\`meta_image_id\`,\`_locale\`);`)
  await db.run(sql`CREATE UNIQUE INDEX \`contato_content_locales_locale_parent_id_unique\` ON \`contato_content_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`_contato_content_v_version_steps_placeholders\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_uuid\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_contato_content_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_contato_content_v_version_steps_placeholders_order_idx\` ON \`_contato_content_v_version_steps_placeholders\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_contato_content_v_version_steps_placeholders_parent_id_idx\` ON \`_contato_content_v_version_steps_placeholders\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`_contato_content_v_version_steps_placeholders_locales\` (
  	\`text\` text NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_contato_content_v_version_steps_placeholders\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`_contato_content_v_version_steps_placeholders_locales_locale\` ON \`_contato_content_v_version_steps_placeholders_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`_contato_content_v_version_channels_items\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`icon_name\` text,
  	\`_uuid\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_contato_content_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_contato_content_v_version_channels_items_order_idx\` ON \`_contato_content_v_version_channels_items\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_contato_content_v_version_channels_items_parent_id_idx\` ON \`_contato_content_v_version_channels_items\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`_contato_content_v_version_channels_items_locales\` (
  	\`title\` text,
  	\`info\` text,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_contato_content_v_version_channels_items\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`_contato_content_v_version_channels_items_locales_locale_par\` ON \`_contato_content_v_version_channels_items_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`_contato_content_v\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`version_hero_background_image\` text,
  	\`version_map_coords_lat\` numeric,
  	\`version_map_coords_lng\` numeric,
  	\`version_meta_no_index\` integer DEFAULT false,
  	\`version_updated_at\` text,
  	\`version_created_at\` text,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL
  );
  `)
  await db.run(sql`CREATE INDEX \`_contato_content_v_created_at_idx\` ON \`_contato_content_v\` (\`created_at\`);`)
  await db.run(sql`CREATE INDEX \`_contato_content_v_updated_at_idx\` ON \`_contato_content_v\` (\`updated_at\`);`)
  await db.run(sql`CREATE TABLE \`_contato_content_v_locales\` (
  	\`version_hero_label\` text,
  	\`version_hero_heading\` text NOT NULL,
  	\`version_hero_subtitle\` text,
  	\`version_hero_description\` text,
  	\`version_hero_scroll_hint\` text DEFAULT 'Deslize para baixo',
  	\`version_form_title\` text,
  	\`version_steps_button_next\` text,
  	\`version_steps_button_back\` text,
  	\`version_steps_button_submit\` text,
  	\`version_channels_heading\` text,
  	\`version_meta_title\` text,
  	\`version_meta_description\` text,
  	\`version_meta_image_id\` integer,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	FOREIGN KEY (\`version_meta_image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_contato_content_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_contato_content_v_version_meta_version_meta_image_idx\` ON \`_contato_content_v_locales\` (\`version_meta_image_id\`,\`_locale\`);`)
  await db.run(sql`CREATE UNIQUE INDEX \`_contato_content_v_locales_locale_parent_id_unique\` ON \`_contato_content_v_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`nosso_impacto_content_manifesto_segments\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`is_highlight\` integer DEFAULT false,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`nosso_impacto_content\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`nosso_impacto_content_manifesto_segments_order_idx\` ON \`nosso_impacto_content_manifesto_segments\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`nosso_impacto_content_manifesto_segments_parent_id_idx\` ON \`nosso_impacto_content_manifesto_segments\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`nosso_impacto_content_manifesto_segments_locales\` (
  	\`text\` text NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`nosso_impacto_content_manifesto_segments\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`nosso_impacto_content_manifesto_segments_locales_locale_pare\` ON \`nosso_impacto_content_manifesto_segments_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`nosso_impacto_content_rio_vivo_steps\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`icon_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`nosso_impacto_content\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`nosso_impacto_content_rio_vivo_steps_order_idx\` ON \`nosso_impacto_content_rio_vivo_steps\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`nosso_impacto_content_rio_vivo_steps_parent_id_idx\` ON \`nosso_impacto_content_rio_vivo_steps\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`nosso_impacto_content_rio_vivo_steps_locales\` (
  	\`title\` text,
  	\`description\` text,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`nosso_impacto_content_rio_vivo_steps\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`nosso_impacto_content_rio_vivo_steps_locales_locale_parent_i\` ON \`nosso_impacto_content_rio_vivo_steps_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`nosso_impacto_content_biodiversidade_counters\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`target\` numeric NOT NULL,
  	\`has_icon\` integer DEFAULT false,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`nosso_impacto_content\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`nosso_impacto_content_biodiversidade_counters_order_idx\` ON \`nosso_impacto_content_biodiversidade_counters\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`nosso_impacto_content_biodiversidade_counters_parent_id_idx\` ON \`nosso_impacto_content_biodiversidade_counters\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`nosso_impacto_content_biodiversidade_counters_locales\` (
  	\`suffix\` text,
  	\`label\` text,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`nosso_impacto_content_biodiversidade_counters\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`nosso_impacto_content_biodiversidade_counters_locales_locale\` ON \`nosso_impacto_content_biodiversidade_counters_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`nosso_impacto_content_comunidade_body\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`nosso_impacto_content\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`nosso_impacto_content_comunidade_body_order_idx\` ON \`nosso_impacto_content_comunidade_body\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`nosso_impacto_content_comunidade_body_parent_id_idx\` ON \`nosso_impacto_content_comunidade_body\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`nosso_impacto_content_comunidade_body_locales\` (
  	\`text\` text NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`nosso_impacto_content_comunidade_body\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`nosso_impacto_content_comunidade_body_locales_locale_parent_\` ON \`nosso_impacto_content_comunidade_body_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`nosso_impacto_content_operacao_practices\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`icon_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`nosso_impacto_content\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`nosso_impacto_content_operacao_practices_order_idx\` ON \`nosso_impacto_content_operacao_practices\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`nosso_impacto_content_operacao_practices_parent_id_idx\` ON \`nosso_impacto_content_operacao_practices\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`nosso_impacto_content_operacao_practices_locales\` (
  	\`title\` text,
  	\`description\` text,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`nosso_impacto_content_operacao_practices\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`nosso_impacto_content_operacao_practices_locales_locale_pare\` ON \`nosso_impacto_content_operacao_practices_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`nosso_impacto_content\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`hero_background_image\` text,
  	\`comunidade_image\` text,
  	\`meta_no_index\` integer DEFAULT false,
  	\`updated_at\` text,
  	\`created_at\` text
  );
  `)
  await db.run(sql`CREATE TABLE \`nosso_impacto_content_locales\` (
  	\`hero_label\` text,
  	\`hero_heading\` text NOT NULL,
  	\`hero_subtitle\` text,
  	\`hero_description\` text,
  	\`hero_scroll_hint\` text DEFAULT 'Deslize para baixo',
  	\`rio_vivo_heading\` text,
  	\`rio_vivo_description\` text,
  	\`biodiversidade_heading\` text,
  	\`biodiversidade_description\` text,
  	\`comunidade_heading\` text,
  	\`comunidade_description\` text,
  	\`operacao_heading\` text,
  	\`operacao_description\` text,
  	\`engagement_heading\` text,
  	\`engagement_description\` text,
  	\`engagement_button_text\` text,
  	\`meta_title\` text,
  	\`meta_description\` text,
  	\`meta_image_id\` integer,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	FOREIGN KEY (\`meta_image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`nosso_impacto_content\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`nosso_impacto_content_meta_meta_image_idx\` ON \`nosso_impacto_content_locales\` (\`meta_image_id\`,\`_locale\`);`)
  await db.run(sql`CREATE UNIQUE INDEX \`nosso_impacto_content_locales_locale_parent_id_unique\` ON \`nosso_impacto_content_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`_nosso_impacto_content_v_version_manifesto_segments\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`is_highlight\` integer DEFAULT false,
  	\`_uuid\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_nosso_impacto_content_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_nosso_impacto_content_v_version_manifesto_segments_order_idx\` ON \`_nosso_impacto_content_v_version_manifesto_segments\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_nosso_impacto_content_v_version_manifesto_segments_parent_id_idx\` ON \`_nosso_impacto_content_v_version_manifesto_segments\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`_nosso_impacto_content_v_version_manifesto_segments_locales\` (
  	\`text\` text NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_nosso_impacto_content_v_version_manifesto_segments\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`_nosso_impacto_content_v_version_manifesto_segments_locales_\` ON \`_nosso_impacto_content_v_version_manifesto_segments_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`_nosso_impacto_content_v_version_rio_vivo_steps\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`icon_name\` text,
  	\`_uuid\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_nosso_impacto_content_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_nosso_impacto_content_v_version_rio_vivo_steps_order_idx\` ON \`_nosso_impacto_content_v_version_rio_vivo_steps\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_nosso_impacto_content_v_version_rio_vivo_steps_parent_id_idx\` ON \`_nosso_impacto_content_v_version_rio_vivo_steps\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`_nosso_impacto_content_v_version_rio_vivo_steps_locales\` (
  	\`title\` text,
  	\`description\` text,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_nosso_impacto_content_v_version_rio_vivo_steps\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`_nosso_impacto_content_v_version_rio_vivo_steps_locales_loca\` ON \`_nosso_impacto_content_v_version_rio_vivo_steps_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`_nosso_impacto_content_v_version_biodiversidade_counters\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`target\` numeric NOT NULL,
  	\`has_icon\` integer DEFAULT false,
  	\`_uuid\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_nosso_impacto_content_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_nosso_impacto_content_v_version_biodiversidade_counters_order_idx\` ON \`_nosso_impacto_content_v_version_biodiversidade_counters\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_nosso_impacto_content_v_version_biodiversidade_counters_parent_id_idx\` ON \`_nosso_impacto_content_v_version_biodiversidade_counters\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`_nosso_impacto_content_v_version_biodiversidade_counters_locales\` (
  	\`suffix\` text,
  	\`label\` text,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_nosso_impacto_content_v_version_biodiversidade_counters\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`_nosso_impacto_content_v_version_biodiversidade_counters_loc\` ON \`_nosso_impacto_content_v_version_biodiversidade_counters_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`_nosso_impacto_content_v_version_comunidade_body\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_uuid\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_nosso_impacto_content_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_nosso_impacto_content_v_version_comunidade_body_order_idx\` ON \`_nosso_impacto_content_v_version_comunidade_body\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_nosso_impacto_content_v_version_comunidade_body_parent_id_idx\` ON \`_nosso_impacto_content_v_version_comunidade_body\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`_nosso_impacto_content_v_version_comunidade_body_locales\` (
  	\`text\` text NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_nosso_impacto_content_v_version_comunidade_body\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`_nosso_impacto_content_v_version_comunidade_body_locales_loc\` ON \`_nosso_impacto_content_v_version_comunidade_body_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`_nosso_impacto_content_v_version_operacao_practices\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`icon_name\` text,
  	\`_uuid\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_nosso_impacto_content_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_nosso_impacto_content_v_version_operacao_practices_order_idx\` ON \`_nosso_impacto_content_v_version_operacao_practices\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_nosso_impacto_content_v_version_operacao_practices_parent_id_idx\` ON \`_nosso_impacto_content_v_version_operacao_practices\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`_nosso_impacto_content_v_version_operacao_practices_locales\` (
  	\`title\` text,
  	\`description\` text,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_nosso_impacto_content_v_version_operacao_practices\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`_nosso_impacto_content_v_version_operacao_practices_locales_\` ON \`_nosso_impacto_content_v_version_operacao_practices_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`_nosso_impacto_content_v\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`version_hero_background_image\` text,
  	\`version_comunidade_image\` text,
  	\`version_meta_no_index\` integer DEFAULT false,
  	\`version_updated_at\` text,
  	\`version_created_at\` text,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL
  );
  `)
  await db.run(sql`CREATE INDEX \`_nosso_impacto_content_v_created_at_idx\` ON \`_nosso_impacto_content_v\` (\`created_at\`);`)
  await db.run(sql`CREATE INDEX \`_nosso_impacto_content_v_updated_at_idx\` ON \`_nosso_impacto_content_v\` (\`updated_at\`);`)
  await db.run(sql`CREATE TABLE \`_nosso_impacto_content_v_locales\` (
  	\`version_hero_label\` text,
  	\`version_hero_heading\` text NOT NULL,
  	\`version_hero_subtitle\` text,
  	\`version_hero_description\` text,
  	\`version_hero_scroll_hint\` text DEFAULT 'Deslize para baixo',
  	\`version_rio_vivo_heading\` text,
  	\`version_rio_vivo_description\` text,
  	\`version_biodiversidade_heading\` text,
  	\`version_biodiversidade_description\` text,
  	\`version_comunidade_heading\` text,
  	\`version_comunidade_description\` text,
  	\`version_operacao_heading\` text,
  	\`version_operacao_description\` text,
  	\`version_engagement_heading\` text,
  	\`version_engagement_description\` text,
  	\`version_engagement_button_text\` text,
  	\`version_meta_title\` text,
  	\`version_meta_description\` text,
  	\`version_meta_image_id\` integer,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	FOREIGN KEY (\`version_meta_image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_nosso_impacto_content_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_nosso_impacto_content_v_version_meta_version_meta_image_idx\` ON \`_nosso_impacto_content_v_locales\` (\`version_meta_image_id\`,\`_locale\`);`)
  await db.run(sql`CREATE UNIQUE INDEX \`_nosso_impacto_content_v_locales_locale_parent_id_unique\` ON \`_nosso_impacto_content_v_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`privacidade_content_sections_content\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`privacidade_content_sections\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`privacidade_content_sections_content_order_idx\` ON \`privacidade_content_sections_content\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`privacidade_content_sections_content_parent_id_idx\` ON \`privacidade_content_sections_content\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`privacidade_content_sections_content_locales\` (
  	\`text\` text NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`privacidade_content_sections_content\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`privacidade_content_sections_content_locales_locale_parent_i\` ON \`privacidade_content_sections_content_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`privacidade_content_sections\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`privacidade_content\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`privacidade_content_sections_order_idx\` ON \`privacidade_content_sections\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`privacidade_content_sections_parent_id_idx\` ON \`privacidade_content_sections\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`privacidade_content_sections_locales\` (
  	\`title\` text NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`privacidade_content_sections\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`privacidade_content_sections_locales_locale_parent_id_unique\` ON \`privacidade_content_sections_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`privacidade_content\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`meta_no_index\` integer DEFAULT false,
  	\`updated_at\` text,
  	\`created_at\` text
  );
  `)
  await db.run(sql`CREATE TABLE \`privacidade_content_locales\` (
  	\`hero_title\` text,
  	\`hero_last_updated\` text,
  	\`meta_title\` text,
  	\`meta_description\` text,
  	\`meta_image_id\` integer,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	FOREIGN KEY (\`meta_image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`privacidade_content\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`privacidade_content_meta_meta_image_idx\` ON \`privacidade_content_locales\` (\`meta_image_id\`,\`_locale\`);`)
  await db.run(sql`CREATE UNIQUE INDEX \`privacidade_content_locales_locale_parent_id_unique\` ON \`privacidade_content_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`_privacidade_content_v_version_sections_content\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_uuid\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_privacidade_content_v_version_sections\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_privacidade_content_v_version_sections_content_order_idx\` ON \`_privacidade_content_v_version_sections_content\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_privacidade_content_v_version_sections_content_parent_id_idx\` ON \`_privacidade_content_v_version_sections_content\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`_privacidade_content_v_version_sections_content_locales\` (
  	\`text\` text NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_privacidade_content_v_version_sections_content\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`_privacidade_content_v_version_sections_content_locales_loca\` ON \`_privacidade_content_v_version_sections_content_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`_privacidade_content_v_version_sections\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_uuid\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_privacidade_content_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_privacidade_content_v_version_sections_order_idx\` ON \`_privacidade_content_v_version_sections\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_privacidade_content_v_version_sections_parent_id_idx\` ON \`_privacidade_content_v_version_sections\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`_privacidade_content_v_version_sections_locales\` (
  	\`title\` text NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_privacidade_content_v_version_sections\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`_privacidade_content_v_version_sections_locales_locale_paren\` ON \`_privacidade_content_v_version_sections_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`_privacidade_content_v\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`version_meta_no_index\` integer DEFAULT false,
  	\`version_updated_at\` text,
  	\`version_created_at\` text,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL
  );
  `)
  await db.run(sql`CREATE INDEX \`_privacidade_content_v_created_at_idx\` ON \`_privacidade_content_v\` (\`created_at\`);`)
  await db.run(sql`CREATE INDEX \`_privacidade_content_v_updated_at_idx\` ON \`_privacidade_content_v\` (\`updated_at\`);`)
  await db.run(sql`CREATE TABLE \`_privacidade_content_v_locales\` (
  	\`version_hero_title\` text,
  	\`version_hero_last_updated\` text,
  	\`version_meta_title\` text,
  	\`version_meta_description\` text,
  	\`version_meta_image_id\` integer,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	FOREIGN KEY (\`version_meta_image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_privacidade_content_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_privacidade_content_v_version_meta_version_meta_image_idx\` ON \`_privacidade_content_v_locales\` (\`version_meta_image_id\`,\`_locale\`);`)
  await db.run(sql`CREATE UNIQUE INDEX \`_privacidade_content_v_locales_locale_parent_id_unique\` ON \`_privacidade_content_v_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`not_found_content\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`hero_background_image\` text,
  	\`meta_no_index\` integer DEFAULT false,
  	\`updated_at\` text,
  	\`created_at\` text
  );
  `)
  await db.run(sql`CREATE TABLE \`not_found_content_locales\` (
  	\`hero_label\` text,
  	\`hero_heading\` text NOT NULL,
  	\`hero_subtitle\` text,
  	\`hero_description\` text,
  	\`hero_scroll_hint\` text DEFAULT 'Deslize para baixo',
  	\`button_text\` text,
  	\`meta_title\` text,
  	\`meta_description\` text,
  	\`meta_image_id\` integer,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	FOREIGN KEY (\`meta_image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`not_found_content\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`not_found_content_meta_meta_image_idx\` ON \`not_found_content_locales\` (\`meta_image_id\`,\`_locale\`);`)
  await db.run(sql`CREATE UNIQUE INDEX \`not_found_content_locales_locale_parent_id_unique\` ON \`not_found_content_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`_not_found_content_v\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`version_hero_background_image\` text,
  	\`version_meta_no_index\` integer DEFAULT false,
  	\`version_updated_at\` text,
  	\`version_created_at\` text,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL
  );
  `)
  await db.run(sql`CREATE INDEX \`_not_found_content_v_created_at_idx\` ON \`_not_found_content_v\` (\`created_at\`);`)
  await db.run(sql`CREATE INDEX \`_not_found_content_v_updated_at_idx\` ON \`_not_found_content_v\` (\`updated_at\`);`)
  await db.run(sql`CREATE TABLE \`_not_found_content_v_locales\` (
  	\`version_hero_label\` text,
  	\`version_hero_heading\` text NOT NULL,
  	\`version_hero_subtitle\` text,
  	\`version_hero_description\` text,
  	\`version_hero_scroll_hint\` text DEFAULT 'Deslize para baixo',
  	\`version_button_text\` text,
  	\`version_meta_title\` text,
  	\`version_meta_description\` text,
  	\`version_meta_image_id\` integer,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	FOREIGN KEY (\`version_meta_image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_not_found_content_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_not_found_content_v_version_meta_version_meta_image_idx\` ON \`_not_found_content_v_locales\` (\`version_meta_image_id\`,\`_locale\`);`)
  await db.run(sql`CREATE UNIQUE INDEX \`_not_found_content_v_locales_locale_parent_id_unique\` ON \`_not_found_content_v_locales\` (\`_locale\`,\`_parent_id\`);`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.run(sql`DROP TABLE \`pages\`;`)
  await db.run(sql`DROP TABLE \`media\`;`)
  await db.run(sql`DROP TABLE \`media_locales\`;`)
  await db.run(sql`DROP TABLE \`blog_posts_blocks_paragraph\`;`)
  await db.run(sql`DROP TABLE \`blog_posts_blocks_paragraph_locales\`;`)
  await db.run(sql`DROP TABLE \`blog_posts_blocks_heading\`;`)
  await db.run(sql`DROP TABLE \`blog_posts_blocks_heading_locales\`;`)
  await db.run(sql`DROP TABLE \`blog_posts_blocks_species\`;`)
  await db.run(sql`DROP TABLE \`blog_posts_blocks_species_locales\`;`)
  await db.run(sql`DROP TABLE \`blog_posts_blocks_ordered_list_items\`;`)
  await db.run(sql`DROP TABLE \`blog_posts_blocks_ordered_list_items_locales\`;`)
  await db.run(sql`DROP TABLE \`blog_posts_blocks_ordered_list\`;`)
  await db.run(sql`DROP TABLE \`blog_posts\`;`)
  await db.run(sql`DROP TABLE \`blog_posts_locales\`;`)
  await db.run(sql`DROP TABLE \`blog_posts_rels\`;`)
  await db.run(sql`DROP TABLE \`_blog_posts_v_blocks_paragraph\`;`)
  await db.run(sql`DROP TABLE \`_blog_posts_v_blocks_paragraph_locales\`;`)
  await db.run(sql`DROP TABLE \`_blog_posts_v_blocks_heading\`;`)
  await db.run(sql`DROP TABLE \`_blog_posts_v_blocks_heading_locales\`;`)
  await db.run(sql`DROP TABLE \`_blog_posts_v_blocks_species\`;`)
  await db.run(sql`DROP TABLE \`_blog_posts_v_blocks_species_locales\`;`)
  await db.run(sql`DROP TABLE \`_blog_posts_v_blocks_ordered_list_items\`;`)
  await db.run(sql`DROP TABLE \`_blog_posts_v_blocks_ordered_list_items_locales\`;`)
  await db.run(sql`DROP TABLE \`_blog_posts_v_blocks_ordered_list\`;`)
  await db.run(sql`DROP TABLE \`_blog_posts_v\`;`)
  await db.run(sql`DROP TABLE \`_blog_posts_v_locales\`;`)
  await db.run(sql`DROP TABLE \`_blog_posts_v_rels\`;`)
  await db.run(sql`DROP TABLE \`blog_categories\`;`)
  await db.run(sql`DROP TABLE \`bird_species_photography_tips\`;`)
  await db.run(sql`DROP TABLE \`bird_species_photography_tips_locales\`;`)
  await db.run(sql`DROP TABLE \`bird_species\`;`)
  await db.run(sql`DROP TABLE \`bird_species_locales\`;`)
  await db.run(sql`DROP TABLE \`bird_species_rels\`;`)
  await db.run(sql`DROP TABLE \`bird_categories\`;`)
  await db.run(sql`DROP TABLE \`users_sessions\`;`)
  await db.run(sql`DROP TABLE \`users\`;`)
  await db.run(sql`DROP TABLE \`payload_kv\`;`)
  await db.run(sql`DROP TABLE \`payload_locked_documents\`;`)
  await db.run(sql`DROP TABLE \`payload_locked_documents_rels\`;`)
  await db.run(sql`DROP TABLE \`payload_preferences\`;`)
  await db.run(sql`DROP TABLE \`payload_preferences_rels\`;`)
  await db.run(sql`DROP TABLE \`payload_migrations\`;`)
  await db.run(sql`DROP TABLE \`agent_config\`;`)
  await db.run(sql`DROP TABLE \`_agent_config_v\`;`)
  await db.run(sql`DROP TABLE \`site_settings_faq_items\`;`)
  await db.run(sql`DROP TABLE \`site_settings_faq_items_locales\`;`)
  await db.run(sql`DROP TABLE \`site_settings_testimonial_items\`;`)
  await db.run(sql`DROP TABLE \`site_settings_testimonial_items_locales\`;`)
  await db.run(sql`DROP TABLE \`site_settings_footer_pousada_links\`;`)
  await db.run(sql`DROP TABLE \`site_settings_footer_pousada_links_locales\`;`)
  await db.run(sql`DROP TABLE \`site_settings_footer_experiencias_links\`;`)
  await db.run(sql`DROP TABLE \`site_settings_footer_experiencias_links_locales\`;`)
  await db.run(sql`DROP TABLE \`site_settings_footer_legal_links\`;`)
  await db.run(sql`DROP TABLE \`site_settings_footer_legal_links_locales\`;`)
  await db.run(sql`DROP TABLE \`site_settings_authors_knows_about\`;`)
  await db.run(sql`DROP TABLE \`site_settings_authors\`;`)
  await db.run(sql`DROP TABLE \`site_settings_authors_locales\`;`)
  await db.run(sql`DROP TABLE \`site_settings_seasonal_events\`;`)
  await db.run(sql`DROP TABLE \`site_settings_seasonal_events_locales\`;`)
  await db.run(sql`DROP TABLE \`site_settings\`;`)
  await db.run(sql`DROP TABLE \`site_settings_locales\`;`)
  await db.run(sql`DROP TABLE \`_site_settings_v_version_faq_items\`;`)
  await db.run(sql`DROP TABLE \`_site_settings_v_version_faq_items_locales\`;`)
  await db.run(sql`DROP TABLE \`_site_settings_v_version_testimonial_items\`;`)
  await db.run(sql`DROP TABLE \`_site_settings_v_version_testimonial_items_locales\`;`)
  await db.run(sql`DROP TABLE \`_site_settings_v_version_footer_pousada_links\`;`)
  await db.run(sql`DROP TABLE \`_site_settings_v_version_footer_pousada_links_locales\`;`)
  await db.run(sql`DROP TABLE \`_site_settings_v_version_footer_experiencias_links\`;`)
  await db.run(sql`DROP TABLE \`_site_settings_v_version_footer_experiencias_links_locales\`;`)
  await db.run(sql`DROP TABLE \`_site_settings_v_version_footer_legal_links\`;`)
  await db.run(sql`DROP TABLE \`_site_settings_v_version_footer_legal_links_locales\`;`)
  await db.run(sql`DROP TABLE \`_site_settings_v_version_authors_knows_about\`;`)
  await db.run(sql`DROP TABLE \`_site_settings_v_version_authors\`;`)
  await db.run(sql`DROP TABLE \`_site_settings_v_version_authors_locales\`;`)
  await db.run(sql`DROP TABLE \`_site_settings_v_version_seasonal_events\`;`)
  await db.run(sql`DROP TABLE \`_site_settings_v_version_seasonal_events_locales\`;`)
  await db.run(sql`DROP TABLE \`_site_settings_v\`;`)
  await db.run(sql`DROP TABLE \`_site_settings_v_locales\`;`)
  await db.run(sql`DROP TABLE \`home_content_about_us_body\`;`)
  await db.run(sql`DROP TABLE \`home_content_about_us_body_locales\`;`)
  await db.run(sql`DROP TABLE \`home_content_about_us_features\`;`)
  await db.run(sql`DROP TABLE \`home_content_about_us_features_locales\`;`)
  await db.run(sql`DROP TABLE \`home_content_expeditions_items\`;`)
  await db.run(sql`DROP TABLE \`home_content_expeditions_items_locales\`;`)
  await db.run(sql`DROP TABLE \`home_content_stats_items\`;`)
  await db.run(sql`DROP TABLE \`home_content_stats_items_locales\`;`)
  await db.run(sql`DROP TABLE \`home_content_impact_items\`;`)
  await db.run(sql`DROP TABLE \`home_content_impact_items_locales\`;`)
  await db.run(sql`DROP TABLE \`home_content_faq_items\`;`)
  await db.run(sql`DROP TABLE \`home_content_faq_items_locales\`;`)
  await db.run(sql`DROP TABLE \`home_content\`;`)
  await db.run(sql`DROP TABLE \`home_content_locales\`;`)
  await db.run(sql`DROP TABLE \`_home_content_v_version_about_us_body\`;`)
  await db.run(sql`DROP TABLE \`_home_content_v_version_about_us_body_locales\`;`)
  await db.run(sql`DROP TABLE \`_home_content_v_version_about_us_features\`;`)
  await db.run(sql`DROP TABLE \`_home_content_v_version_about_us_features_locales\`;`)
  await db.run(sql`DROP TABLE \`_home_content_v_version_expeditions_items\`;`)
  await db.run(sql`DROP TABLE \`_home_content_v_version_expeditions_items_locales\`;`)
  await db.run(sql`DROP TABLE \`_home_content_v_version_stats_items\`;`)
  await db.run(sql`DROP TABLE \`_home_content_v_version_stats_items_locales\`;`)
  await db.run(sql`DROP TABLE \`_home_content_v_version_impact_items\`;`)
  await db.run(sql`DROP TABLE \`_home_content_v_version_impact_items_locales\`;`)
  await db.run(sql`DROP TABLE \`_home_content_v_version_faq_items\`;`)
  await db.run(sql`DROP TABLE \`_home_content_v_version_faq_items_locales\`;`)
  await db.run(sql`DROP TABLE \`_home_content_v\`;`)
  await db.run(sql`DROP TABLE \`_home_content_v_locales\`;`)
  await db.run(sql`DROP TABLE \`acomodacoes_content_manifesto_segments\`;`)
  await db.run(sql`DROP TABLE \`acomodacoes_content_manifesto_segments_locales\`;`)
  await db.run(sql`DROP TABLE \`acomodacoes_content_highlights_items\`;`)
  await db.run(sql`DROP TABLE \`acomodacoes_content_highlights_items_locales\`;`)
  await db.run(sql`DROP TABLE \`acomodacoes_content_rooms_features\`;`)
  await db.run(sql`DROP TABLE \`acomodacoes_content_rooms_features_locales\`;`)
  await db.run(sql`DROP TABLE \`acomodacoes_content_rooms\`;`)
  await db.run(sql`DROP TABLE \`acomodacoes_content_rooms_locales\`;`)
  await db.run(sql`DROP TABLE \`acomodacoes_content_culinary_images\`;`)
  await db.run(sql`DROP TABLE \`acomodacoes_content_culinary_images_locales\`;`)
  await db.run(sql`DROP TABLE \`acomodacoes_content_faq_items\`;`)
  await db.run(sql`DROP TABLE \`acomodacoes_content_faq_items_locales\`;`)
  await db.run(sql`DROP TABLE \`acomodacoes_content\`;`)
  await db.run(sql`DROP TABLE \`acomodacoes_content_locales\`;`)
  await db.run(sql`DROP TABLE \`_acomodacoes_content_v_version_manifesto_segments\`;`)
  await db.run(sql`DROP TABLE \`_acomodacoes_content_v_version_manifesto_segments_locales\`;`)
  await db.run(sql`DROP TABLE \`_acomodacoes_content_v_version_highlights_items\`;`)
  await db.run(sql`DROP TABLE \`_acomodacoes_content_v_version_highlights_items_locales\`;`)
  await db.run(sql`DROP TABLE \`_acomodacoes_content_v_version_rooms_features\`;`)
  await db.run(sql`DROP TABLE \`_acomodacoes_content_v_version_rooms_features_locales\`;`)
  await db.run(sql`DROP TABLE \`_acomodacoes_content_v_version_rooms\`;`)
  await db.run(sql`DROP TABLE \`_acomodacoes_content_v_version_rooms_locales\`;`)
  await db.run(sql`DROP TABLE \`_acomodacoes_content_v_version_culinary_images\`;`)
  await db.run(sql`DROP TABLE \`_acomodacoes_content_v_version_culinary_images_locales\`;`)
  await db.run(sql`DROP TABLE \`_acomodacoes_content_v_version_faq_items\`;`)
  await db.run(sql`DROP TABLE \`_acomodacoes_content_v_version_faq_items_locales\`;`)
  await db.run(sql`DROP TABLE \`_acomodacoes_content_v\`;`)
  await db.run(sql`DROP TABLE \`_acomodacoes_content_v_locales\`;`)
  await db.run(sql`DROP TABLE \`culinaria_content_manifesto_segments\`;`)
  await db.run(sql`DROP TABLE \`culinaria_content_manifesto_segments_locales\`;`)
  await db.run(sql`DROP TABLE \`culinaria_content_menu_body\`;`)
  await db.run(sql`DROP TABLE \`culinaria_content_menu_body_locales\`;`)
  await db.run(sql`DROP TABLE \`culinaria_content_menu_features\`;`)
  await db.run(sql`DROP TABLE \`culinaria_content_menu_features_locales\`;`)
  await db.run(sql`DROP TABLE \`culinaria_content_highlights_items\`;`)
  await db.run(sql`DROP TABLE \`culinaria_content_highlights_items_locales\`;`)
  await db.run(sql`DROP TABLE \`culinaria_content_services_items\`;`)
  await db.run(sql`DROP TABLE \`culinaria_content_services_items_locales\`;`)
  await db.run(sql`DROP TABLE \`culinaria_content_experience_body\`;`)
  await db.run(sql`DROP TABLE \`culinaria_content_experience_body_locales\`;`)
  await db.run(sql`DROP TABLE \`culinaria_content_faq_items\`;`)
  await db.run(sql`DROP TABLE \`culinaria_content_faq_items_locales\`;`)
  await db.run(sql`DROP TABLE \`culinaria_content\`;`)
  await db.run(sql`DROP TABLE \`culinaria_content_locales\`;`)
  await db.run(sql`DROP TABLE \`_culinaria_content_v_version_manifesto_segments\`;`)
  await db.run(sql`DROP TABLE \`_culinaria_content_v_version_manifesto_segments_locales\`;`)
  await db.run(sql`DROP TABLE \`_culinaria_content_v_version_menu_body\`;`)
  await db.run(sql`DROP TABLE \`_culinaria_content_v_version_menu_body_locales\`;`)
  await db.run(sql`DROP TABLE \`_culinaria_content_v_version_menu_features\`;`)
  await db.run(sql`DROP TABLE \`_culinaria_content_v_version_menu_features_locales\`;`)
  await db.run(sql`DROP TABLE \`_culinaria_content_v_version_highlights_items\`;`)
  await db.run(sql`DROP TABLE \`_culinaria_content_v_version_highlights_items_locales\`;`)
  await db.run(sql`DROP TABLE \`_culinaria_content_v_version_services_items\`;`)
  await db.run(sql`DROP TABLE \`_culinaria_content_v_version_services_items_locales\`;`)
  await db.run(sql`DROP TABLE \`_culinaria_content_v_version_experience_body\`;`)
  await db.run(sql`DROP TABLE \`_culinaria_content_v_version_experience_body_locales\`;`)
  await db.run(sql`DROP TABLE \`_culinaria_content_v_version_faq_items\`;`)
  await db.run(sql`DROP TABLE \`_culinaria_content_v_version_faq_items_locales\`;`)
  await db.run(sql`DROP TABLE \`_culinaria_content_v\`;`)
  await db.run(sql`DROP TABLE \`_culinaria_content_v_locales\`;`)
  await db.run(sql`DROP TABLE \`pesca_content_manifesto_segments\`;`)
  await db.run(sql`DROP TABLE \`pesca_content_manifesto_segments_locales\`;`)
  await db.run(sql`DROP TABLE \`pesca_content_sobre_nos_body\`;`)
  await db.run(sql`DROP TABLE \`pesca_content_sobre_nos_body_locales\`;`)
  await db.run(sql`DROP TABLE \`pesca_content_sobre_nos_features\`;`)
  await db.run(sql`DROP TABLE \`pesca_content_sobre_nos_features_locales\`;`)
  await db.run(sql`DROP TABLE \`pesca_content_highlights_items\`;`)
  await db.run(sql`DROP TABLE \`pesca_content_highlights_items_locales\`;`)
  await db.run(sql`DROP TABLE \`pesca_content_services_items\`;`)
  await db.run(sql`DROP TABLE \`pesca_content_services_items_locales\`;`)
  await db.run(sql`DROP TABLE \`pesca_content_faq_items\`;`)
  await db.run(sql`DROP TABLE \`pesca_content_faq_items_locales\`;`)
  await db.run(sql`DROP TABLE \`pesca_content\`;`)
  await db.run(sql`DROP TABLE \`pesca_content_locales\`;`)
  await db.run(sql`DROP TABLE \`_pesca_content_v_version_manifesto_segments\`;`)
  await db.run(sql`DROP TABLE \`_pesca_content_v_version_manifesto_segments_locales\`;`)
  await db.run(sql`DROP TABLE \`_pesca_content_v_version_sobre_nos_body\`;`)
  await db.run(sql`DROP TABLE \`_pesca_content_v_version_sobre_nos_body_locales\`;`)
  await db.run(sql`DROP TABLE \`_pesca_content_v_version_sobre_nos_features\`;`)
  await db.run(sql`DROP TABLE \`_pesca_content_v_version_sobre_nos_features_locales\`;`)
  await db.run(sql`DROP TABLE \`_pesca_content_v_version_highlights_items\`;`)
  await db.run(sql`DROP TABLE \`_pesca_content_v_version_highlights_items_locales\`;`)
  await db.run(sql`DROP TABLE \`_pesca_content_v_version_services_items\`;`)
  await db.run(sql`DROP TABLE \`_pesca_content_v_version_services_items_locales\`;`)
  await db.run(sql`DROP TABLE \`_pesca_content_v_version_faq_items\`;`)
  await db.run(sql`DROP TABLE \`_pesca_content_v_version_faq_items_locales\`;`)
  await db.run(sql`DROP TABLE \`_pesca_content_v\`;`)
  await db.run(sql`DROP TABLE \`_pesca_content_v_locales\`;`)
  await db.run(sql`DROP TABLE \`ecoturismo_content_manifesto_segments\`;`)
  await db.run(sql`DROP TABLE \`ecoturismo_content_manifesto_segments_locales\`;`)
  await db.run(sql`DROP TABLE \`ecoturismo_content_sobre_nos_body\`;`)
  await db.run(sql`DROP TABLE \`ecoturismo_content_sobre_nos_body_locales\`;`)
  await db.run(sql`DROP TABLE \`ecoturismo_content_sobre_nos_features\`;`)
  await db.run(sql`DROP TABLE \`ecoturismo_content_sobre_nos_features_locales\`;`)
  await db.run(sql`DROP TABLE \`ecoturismo_content_highlights_items\`;`)
  await db.run(sql`DROP TABLE \`ecoturismo_content_highlights_items_locales\`;`)
  await db.run(sql`DROP TABLE \`ecoturismo_content_services_items\`;`)
  await db.run(sql`DROP TABLE \`ecoturismo_content_services_items_locales\`;`)
  await db.run(sql`DROP TABLE \`ecoturismo_content_faq_items\`;`)
  await db.run(sql`DROP TABLE \`ecoturismo_content_faq_items_locales\`;`)
  await db.run(sql`DROP TABLE \`ecoturismo_content\`;`)
  await db.run(sql`DROP TABLE \`ecoturismo_content_locales\`;`)
  await db.run(sql`DROP TABLE \`_ecoturismo_content_v_version_manifesto_segments\`;`)
  await db.run(sql`DROP TABLE \`_ecoturismo_content_v_version_manifesto_segments_locales\`;`)
  await db.run(sql`DROP TABLE \`_ecoturismo_content_v_version_sobre_nos_body\`;`)
  await db.run(sql`DROP TABLE \`_ecoturismo_content_v_version_sobre_nos_body_locales\`;`)
  await db.run(sql`DROP TABLE \`_ecoturismo_content_v_version_sobre_nos_features\`;`)
  await db.run(sql`DROP TABLE \`_ecoturismo_content_v_version_sobre_nos_features_locales\`;`)
  await db.run(sql`DROP TABLE \`_ecoturismo_content_v_version_highlights_items\`;`)
  await db.run(sql`DROP TABLE \`_ecoturismo_content_v_version_highlights_items_locales\`;`)
  await db.run(sql`DROP TABLE \`_ecoturismo_content_v_version_services_items\`;`)
  await db.run(sql`DROP TABLE \`_ecoturismo_content_v_version_services_items_locales\`;`)
  await db.run(sql`DROP TABLE \`_ecoturismo_content_v_version_faq_items\`;`)
  await db.run(sql`DROP TABLE \`_ecoturismo_content_v_version_faq_items_locales\`;`)
  await db.run(sql`DROP TABLE \`_ecoturismo_content_v\`;`)
  await db.run(sql`DROP TABLE \`_ecoturismo_content_v_locales\`;`)
  await db.run(sql`DROP TABLE \`birdwatching_content_manifesto_segments\`;`)
  await db.run(sql`DROP TABLE \`birdwatching_content_manifesto_segments_locales\`;`)
  await db.run(sql`DROP TABLE \`birdwatching_content_sobre_nos_body\`;`)
  await db.run(sql`DROP TABLE \`birdwatching_content_sobre_nos_body_locales\`;`)
  await db.run(sql`DROP TABLE \`birdwatching_content_sobre_nos_features\`;`)
  await db.run(sql`DROP TABLE \`birdwatching_content_sobre_nos_features_locales\`;`)
  await db.run(sql`DROP TABLE \`birdwatching_content_highlights_items\`;`)
  await db.run(sql`DROP TABLE \`birdwatching_content_highlights_items_locales\`;`)
  await db.run(sql`DROP TABLE \`birdwatching_content_faq_items\`;`)
  await db.run(sql`DROP TABLE \`birdwatching_content_faq_items_locales\`;`)
  await db.run(sql`DROP TABLE \`birdwatching_content\`;`)
  await db.run(sql`DROP TABLE \`birdwatching_content_locales\`;`)
  await db.run(sql`DROP TABLE \`_birdwatching_content_v_version_manifesto_segments\`;`)
  await db.run(sql`DROP TABLE \`_birdwatching_content_v_version_manifesto_segments_locales\`;`)
  await db.run(sql`DROP TABLE \`_birdwatching_content_v_version_sobre_nos_body\`;`)
  await db.run(sql`DROP TABLE \`_birdwatching_content_v_version_sobre_nos_body_locales\`;`)
  await db.run(sql`DROP TABLE \`_birdwatching_content_v_version_sobre_nos_features\`;`)
  await db.run(sql`DROP TABLE \`_birdwatching_content_v_version_sobre_nos_features_locales\`;`)
  await db.run(sql`DROP TABLE \`_birdwatching_content_v_version_highlights_items\`;`)
  await db.run(sql`DROP TABLE \`_birdwatching_content_v_version_highlights_items_locales\`;`)
  await db.run(sql`DROP TABLE \`_birdwatching_content_v_version_faq_items\`;`)
  await db.run(sql`DROP TABLE \`_birdwatching_content_v_version_faq_items_locales\`;`)
  await db.run(sql`DROP TABLE \`_birdwatching_content_v\`;`)
  await db.run(sql`DROP TABLE \`_birdwatching_content_v_locales\`;`)
  await db.run(sql`DROP TABLE \`contato_content_steps_placeholders\`;`)
  await db.run(sql`DROP TABLE \`contato_content_steps_placeholders_locales\`;`)
  await db.run(sql`DROP TABLE \`contato_content_channels_items\`;`)
  await db.run(sql`DROP TABLE \`contato_content_channels_items_locales\`;`)
  await db.run(sql`DROP TABLE \`contato_content\`;`)
  await db.run(sql`DROP TABLE \`contato_content_locales\`;`)
  await db.run(sql`DROP TABLE \`_contato_content_v_version_steps_placeholders\`;`)
  await db.run(sql`DROP TABLE \`_contato_content_v_version_steps_placeholders_locales\`;`)
  await db.run(sql`DROP TABLE \`_contato_content_v_version_channels_items\`;`)
  await db.run(sql`DROP TABLE \`_contato_content_v_version_channels_items_locales\`;`)
  await db.run(sql`DROP TABLE \`_contato_content_v\`;`)
  await db.run(sql`DROP TABLE \`_contato_content_v_locales\`;`)
  await db.run(sql`DROP TABLE \`nosso_impacto_content_manifesto_segments\`;`)
  await db.run(sql`DROP TABLE \`nosso_impacto_content_manifesto_segments_locales\`;`)
  await db.run(sql`DROP TABLE \`nosso_impacto_content_rio_vivo_steps\`;`)
  await db.run(sql`DROP TABLE \`nosso_impacto_content_rio_vivo_steps_locales\`;`)
  await db.run(sql`DROP TABLE \`nosso_impacto_content_biodiversidade_counters\`;`)
  await db.run(sql`DROP TABLE \`nosso_impacto_content_biodiversidade_counters_locales\`;`)
  await db.run(sql`DROP TABLE \`nosso_impacto_content_comunidade_body\`;`)
  await db.run(sql`DROP TABLE \`nosso_impacto_content_comunidade_body_locales\`;`)
  await db.run(sql`DROP TABLE \`nosso_impacto_content_operacao_practices\`;`)
  await db.run(sql`DROP TABLE \`nosso_impacto_content_operacao_practices_locales\`;`)
  await db.run(sql`DROP TABLE \`nosso_impacto_content\`;`)
  await db.run(sql`DROP TABLE \`nosso_impacto_content_locales\`;`)
  await db.run(sql`DROP TABLE \`_nosso_impacto_content_v_version_manifesto_segments\`;`)
  await db.run(sql`DROP TABLE \`_nosso_impacto_content_v_version_manifesto_segments_locales\`;`)
  await db.run(sql`DROP TABLE \`_nosso_impacto_content_v_version_rio_vivo_steps\`;`)
  await db.run(sql`DROP TABLE \`_nosso_impacto_content_v_version_rio_vivo_steps_locales\`;`)
  await db.run(sql`DROP TABLE \`_nosso_impacto_content_v_version_biodiversidade_counters\`;`)
  await db.run(sql`DROP TABLE \`_nosso_impacto_content_v_version_biodiversidade_counters_locales\`;`)
  await db.run(sql`DROP TABLE \`_nosso_impacto_content_v_version_comunidade_body\`;`)
  await db.run(sql`DROP TABLE \`_nosso_impacto_content_v_version_comunidade_body_locales\`;`)
  await db.run(sql`DROP TABLE \`_nosso_impacto_content_v_version_operacao_practices\`;`)
  await db.run(sql`DROP TABLE \`_nosso_impacto_content_v_version_operacao_practices_locales\`;`)
  await db.run(sql`DROP TABLE \`_nosso_impacto_content_v\`;`)
  await db.run(sql`DROP TABLE \`_nosso_impacto_content_v_locales\`;`)
  await db.run(sql`DROP TABLE \`privacidade_content_sections_content\`;`)
  await db.run(sql`DROP TABLE \`privacidade_content_sections_content_locales\`;`)
  await db.run(sql`DROP TABLE \`privacidade_content_sections\`;`)
  await db.run(sql`DROP TABLE \`privacidade_content_sections_locales\`;`)
  await db.run(sql`DROP TABLE \`privacidade_content\`;`)
  await db.run(sql`DROP TABLE \`privacidade_content_locales\`;`)
  await db.run(sql`DROP TABLE \`_privacidade_content_v_version_sections_content\`;`)
  await db.run(sql`DROP TABLE \`_privacidade_content_v_version_sections_content_locales\`;`)
  await db.run(sql`DROP TABLE \`_privacidade_content_v_version_sections\`;`)
  await db.run(sql`DROP TABLE \`_privacidade_content_v_version_sections_locales\`;`)
  await db.run(sql`DROP TABLE \`_privacidade_content_v\`;`)
  await db.run(sql`DROP TABLE \`_privacidade_content_v_locales\`;`)
  await db.run(sql`DROP TABLE \`not_found_content\`;`)
  await db.run(sql`DROP TABLE \`not_found_content_locales\`;`)
  await db.run(sql`DROP TABLE \`_not_found_content_v\`;`)
  await db.run(sql`DROP TABLE \`_not_found_content_v_locales\`;`)
}
