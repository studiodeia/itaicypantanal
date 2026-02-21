import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "cms"."_locales" AS ENUM('pt', 'en', 'es');
  CREATE TABLE "cms"."pages" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"slug" varchar NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "cms"."media" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"url" varchar,
  	"thumbnail_u_r_l" varchar,
  	"filename" varchar,
  	"mime_type" varchar,
  	"filesize" numeric,
  	"width" numeric,
  	"height" numeric,
  	"focal_x" numeric,
  	"focal_y" numeric,
  	"sizes_thumbnail_url" varchar,
  	"sizes_thumbnail_width" numeric,
  	"sizes_thumbnail_height" numeric,
  	"sizes_thumbnail_mime_type" varchar,
  	"sizes_thumbnail_filesize" numeric,
  	"sizes_thumbnail_filename" varchar,
  	"sizes_card_url" varchar,
  	"sizes_card_width" numeric,
  	"sizes_card_height" numeric,
  	"sizes_card_mime_type" varchar,
  	"sizes_card_filesize" numeric,
  	"sizes_card_filename" varchar,
  	"sizes_hero_url" varchar,
  	"sizes_hero_width" numeric,
  	"sizes_hero_height" numeric,
  	"sizes_hero_mime_type" varchar,
  	"sizes_hero_filesize" numeric,
  	"sizes_hero_filename" varchar
  );
  
  CREATE TABLE "cms"."media_locales" (
  	"alt" varchar NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "cms"."_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "cms"."blog_posts_blocks_paragraph" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"block_name" varchar
  );
  
  CREATE TABLE "cms"."blog_posts_blocks_paragraph_locales" (
  	"text" varchar NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "cms"."_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "cms"."blog_posts_blocks_heading" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"block_name" varchar
  );
  
  CREATE TABLE "cms"."blog_posts_blocks_heading_locales" (
  	"text" varchar NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "cms"."_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "cms"."blog_posts_blocks_species" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"scientific_name" varchar NOT NULL,
  	"image" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "cms"."blog_posts_blocks_species_locales" (
  	"name" varchar NOT NULL,
  	"description" varchar NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "cms"."_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "cms"."blog_posts_blocks_ordered_list_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL
  );
  
  CREATE TABLE "cms"."blog_posts_blocks_ordered_list_items_locales" (
  	"bold" varchar NOT NULL,
  	"text" varchar NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "cms"."_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "cms"."blog_posts_blocks_ordered_list" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"block_name" varchar
  );
  
  CREATE TABLE "cms"."blog_posts" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"slug" varchar NOT NULL,
  	"primary_category_id" integer,
  	"src" varchar,
  	"hero_image" varchar,
  	"author" varchar,
  	"date" varchar,
  	"is_featured" boolean DEFAULT false,
  	"is_recent" boolean DEFAULT false,
  	"meta_no_index" boolean DEFAULT false,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "cms"."blog_posts_locales" (
  	"title" varchar NOT NULL,
  	"subtitle" varchar,
  	"description" varchar,
  	"tag" varchar,
  	"reading_time" varchar,
  	"meta_title" varchar,
  	"meta_description" varchar,
  	"meta_image_id" integer,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "cms"."_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "cms"."blog_posts_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"blog_categories_id" integer,
  	"blog_posts_id" integer
  );
  
  CREATE TABLE "cms"."_blog_posts_v_blocks_paragraph" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "cms"."_blog_posts_v_blocks_paragraph_locales" (
  	"text" varchar NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "cms"."_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "cms"."_blog_posts_v_blocks_heading" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "cms"."_blog_posts_v_blocks_heading_locales" (
  	"text" varchar NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "cms"."_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "cms"."_blog_posts_v_blocks_species" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"scientific_name" varchar NOT NULL,
  	"image" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "cms"."_blog_posts_v_blocks_species_locales" (
  	"name" varchar NOT NULL,
  	"description" varchar NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "cms"."_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "cms"."_blog_posts_v_blocks_ordered_list_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_uuid" varchar
  );
  
  CREATE TABLE "cms"."_blog_posts_v_blocks_ordered_list_items_locales" (
  	"bold" varchar NOT NULL,
  	"text" varchar NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "cms"."_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "cms"."_blog_posts_v_blocks_ordered_list" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "cms"."_blog_posts_v" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"parent_id" integer,
  	"version_slug" varchar NOT NULL,
  	"version_primary_category_id" integer,
  	"version_src" varchar,
  	"version_hero_image" varchar,
  	"version_author" varchar,
  	"version_date" varchar,
  	"version_is_featured" boolean DEFAULT false,
  	"version_is_recent" boolean DEFAULT false,
  	"version_meta_no_index" boolean DEFAULT false,
  	"version_updated_at" timestamp(3) with time zone,
  	"version_created_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "cms"."_blog_posts_v_locales" (
  	"version_title" varchar NOT NULL,
  	"version_subtitle" varchar,
  	"version_description" varchar,
  	"version_tag" varchar,
  	"version_reading_time" varchar,
  	"version_meta_title" varchar,
  	"version_meta_description" varchar,
  	"version_meta_image_id" integer,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "cms"."_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "cms"."_blog_posts_v_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"blog_categories_id" integer,
  	"blog_posts_id" integer
  );
  
  CREATE TABLE "cms"."blog_categories" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"name" varchar NOT NULL,
  	"slug" varchar NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "cms"."bird_species_photography_tips" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL
  );
  
  CREATE TABLE "cms"."bird_species_photography_tips_locales" (
  	"tip" varchar NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "cms"."_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "cms"."bird_species" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"scientific_name" varchar NOT NULL,
  	"slug" varchar NOT NULL,
  	"taxonomic_order" varchar,
  	"family" varchar,
  	"common_name_e_n" varchar,
  	"category_id" integer,
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
  
  CREATE TABLE "cms"."bird_species_locales" (
  	"common_name" varchar NOT NULL,
  	"description" varchar,
  	"tag" varchar,
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
  
  CREATE TABLE "cms"."bird_species_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"bird_species_id" integer
  );
  
  CREATE TABLE "cms"."bird_categories" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"name" varchar NOT NULL,
  	"slug" varchar NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "cms"."users_sessions" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"created_at" timestamp(3) with time zone,
  	"expires_at" timestamp(3) with time zone NOT NULL
  );
  
  CREATE TABLE "cms"."users" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"name" varchar,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"email" varchar NOT NULL,
  	"reset_password_token" varchar,
  	"reset_password_expiration" timestamp(3) with time zone,
  	"salt" varchar,
  	"hash" varchar,
  	"login_attempts" numeric DEFAULT 0,
  	"lock_until" timestamp(3) with time zone
  );
  
  CREATE TABLE "cms"."payload_kv" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"key" varchar NOT NULL,
  	"data" jsonb NOT NULL
  );
  
  CREATE TABLE "cms"."payload_locked_documents" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"global_slug" varchar,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "cms"."payload_locked_documents_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"pages_id" integer,
  	"media_id" integer,
  	"blog_posts_id" integer,
  	"blog_categories_id" integer,
  	"bird_species_id" integer,
  	"bird_categories_id" integer,
  	"users_id" integer
  );
  
  CREATE TABLE "cms"."payload_preferences" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"key" varchar,
  	"value" jsonb,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "cms"."payload_preferences_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"users_id" integer
  );
  
  CREATE TABLE "cms"."payload_migrations" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"name" varchar,
  	"batch" numeric,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "cms"."agent_config" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"enabled" boolean DEFAULT true,
  	"assistant_name" varchar DEFAULT 'Assistente Itaicy' NOT NULL,
  	"booking_engine_url" varchar DEFAULT 'https://hotels.cloudbeds.com/reservation/ITAICY' NOT NULL,
  	"faq_confidence_threshold" numeric DEFAULT 0.75 NOT NULL,
  	"price_disclaimer_pt" varchar NOT NULL,
  	"price_disclaimer_en" varchar NOT NULL,
  	"price_disclaimer_es" varchar NOT NULL,
  	"availability_disclaimer_pt" varchar NOT NULL,
  	"availability_disclaimer_en" varchar NOT NULL,
  	"availability_disclaimer_es" varchar NOT NULL,
  	"policy_disclaimer_pt" varchar NOT NULL,
  	"policy_disclaimer_en" varchar NOT NULL,
  	"policy_disclaimer_es" varchar NOT NULL,
  	"handoff_email" varchar DEFAULT 'itaicy-digital@studiodeia.com.br' NOT NULL,
  	"handoff_emergency_phone" varchar DEFAULT '+55 (67) 99999-9999' NOT NULL,
  	"handoff_whatsapp" varchar DEFAULT '+55 (67) 99999-9999' NOT NULL,
  	"handoff_service_hours" varchar DEFAULT 'Segunda a sexta, 08:00-18:00 (BRT)' NOT NULL,
  	"handoff_sla_hours" numeric DEFAULT 24 NOT NULL,
  	"generic_error_fallback_pt" varchar NOT NULL,
  	"generic_error_fallback_en" varchar NOT NULL,
  	"generic_error_fallback_es" varchar NOT NULL,
  	"api_unavailable_fallback_pt" varchar NOT NULL,
  	"api_unavailable_fallback_en" varchar NOT NULL,
  	"api_unavailable_fallback_es" varchar NOT NULL,
  	"lead_consent_prompt_pt" varchar NOT NULL,
  	"lead_consent_prompt_en" varchar NOT NULL,
  	"lead_consent_prompt_es" varchar NOT NULL,
  	"lead_success_message_pt" varchar NOT NULL,
  	"lead_success_message_en" varchar NOT NULL,
  	"lead_success_message_es" varchar NOT NULL,
  	"welcome_greeting_pt" varchar NOT NULL,
  	"welcome_greeting_en" varchar NOT NULL,
  	"welcome_greeting_es" varchar NOT NULL,
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE "cms"."_agent_config_v" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"version_enabled" boolean DEFAULT true,
  	"version_assistant_name" varchar DEFAULT 'Assistente Itaicy' NOT NULL,
  	"version_booking_engine_url" varchar DEFAULT 'https://hotels.cloudbeds.com/reservation/ITAICY' NOT NULL,
  	"version_faq_confidence_threshold" numeric DEFAULT 0.75 NOT NULL,
  	"version_price_disclaimer_pt" varchar NOT NULL,
  	"version_price_disclaimer_en" varchar NOT NULL,
  	"version_price_disclaimer_es" varchar NOT NULL,
  	"version_availability_disclaimer_pt" varchar NOT NULL,
  	"version_availability_disclaimer_en" varchar NOT NULL,
  	"version_availability_disclaimer_es" varchar NOT NULL,
  	"version_policy_disclaimer_pt" varchar NOT NULL,
  	"version_policy_disclaimer_en" varchar NOT NULL,
  	"version_policy_disclaimer_es" varchar NOT NULL,
  	"version_handoff_email" varchar DEFAULT 'itaicy-digital@studiodeia.com.br' NOT NULL,
  	"version_handoff_emergency_phone" varchar DEFAULT '+55 (67) 99999-9999' NOT NULL,
  	"version_handoff_whatsapp" varchar DEFAULT '+55 (67) 99999-9999' NOT NULL,
  	"version_handoff_service_hours" varchar DEFAULT 'Segunda a sexta, 08:00-18:00 (BRT)' NOT NULL,
  	"version_handoff_sla_hours" numeric DEFAULT 24 NOT NULL,
  	"version_generic_error_fallback_pt" varchar NOT NULL,
  	"version_generic_error_fallback_en" varchar NOT NULL,
  	"version_generic_error_fallback_es" varchar NOT NULL,
  	"version_api_unavailable_fallback_pt" varchar NOT NULL,
  	"version_api_unavailable_fallback_en" varchar NOT NULL,
  	"version_api_unavailable_fallback_es" varchar NOT NULL,
  	"version_lead_consent_prompt_pt" varchar NOT NULL,
  	"version_lead_consent_prompt_en" varchar NOT NULL,
  	"version_lead_consent_prompt_es" varchar NOT NULL,
  	"version_lead_success_message_pt" varchar NOT NULL,
  	"version_lead_success_message_en" varchar NOT NULL,
  	"version_lead_success_message_es" varchar NOT NULL,
  	"version_welcome_greeting_pt" varchar NOT NULL,
  	"version_welcome_greeting_en" varchar NOT NULL,
  	"version_welcome_greeting_es" varchar NOT NULL,
  	"version_updated_at" timestamp(3) with time zone,
  	"version_created_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "cms"."site_settings_faq_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL
  );
  
  CREATE TABLE "cms"."site_settings_faq_items_locales" (
  	"question" varchar NOT NULL,
  	"answer" varchar NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "cms"."_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "cms"."site_settings_testimonial_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"author" varchar NOT NULL,
  	"rating" numeric DEFAULT 5
  );
  
  CREATE TABLE "cms"."site_settings_testimonial_items_locales" (
  	"quote" varchar NOT NULL,
  	"location" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "cms"."_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "cms"."site_settings_footer_pousada_links" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"url" varchar NOT NULL
  );
  
  CREATE TABLE "cms"."site_settings_footer_pousada_links_locales" (
  	"label" varchar NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "cms"."_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "cms"."site_settings_footer_experiencias_links" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"url" varchar NOT NULL
  );
  
  CREATE TABLE "cms"."site_settings_footer_experiencias_links_locales" (
  	"label" varchar NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "cms"."_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "cms"."site_settings_footer_legal_links" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"url" varchar NOT NULL
  );
  
  CREATE TABLE "cms"."site_settings_footer_legal_links_locales" (
  	"label" varchar NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "cms"."_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "cms"."site_settings_authors_knows_about" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"topic" varchar NOT NULL
  );
  
  CREATE TABLE "cms"."site_settings_authors" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"name" varchar NOT NULL,
  	"url" varchar,
  	"image" varchar
  );
  
  CREATE TABLE "cms"."site_settings_authors_locales" (
  	"job_title" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "cms"."_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "cms"."site_settings_seasonal_events" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"start_date" varchar,
  	"end_date" varchar,
  	"image" varchar
  );
  
  CREATE TABLE "cms"."site_settings_seasonal_events_locales" (
  	"name" varchar NOT NULL,
  	"description" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "cms"."_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "cms"."site_settings" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"brand_name" varchar,
  	"contact_email" varchar,
  	"contact_phone" varchar,
  	"contact_address" varchar,
  	"cta_background_image" varchar,
  	"default_og_image" varchar DEFAULT '/images/og-default.webp',
  	"site_url" varchar,
  	"google_site_verification" varchar,
  	"aggregate_rating_rating_value" numeric,
  	"aggregate_rating_review_count" numeric,
  	"aggregate_rating_best_rating" numeric DEFAULT 5,
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE "cms"."site_settings_locales" (
  	"cta_heading" varchar,
  	"cta_description" varchar,
  	"faq_label" varchar DEFAULT 'FAQ',
  	"faq_heading" varchar,
  	"faq_description" varchar,
  	"testimonials_label" varchar DEFAULT 'Depoimentos',
  	"testimonials_heading" varchar,
  	"testimonials_description" varchar,
  	"footer_copyright" varchar,
  	"default_meta_title" varchar DEFAULT 'Itaicy Pantanal Eco Lodge | Ecoturismo no Pantanal',
  	"default_meta_description" varchar DEFAULT 'Descubra o Pantanal em sua forma mais autêntica. Hospedagem premium, pesca esportiva, observação de aves e experiências de ecoturismo no coração do Pantanal.',
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "cms"."_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "cms"."_site_settings_v_version_faq_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_uuid" varchar
  );
  
  CREATE TABLE "cms"."_site_settings_v_version_faq_items_locales" (
  	"question" varchar NOT NULL,
  	"answer" varchar NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "cms"."_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "cms"."_site_settings_v_version_testimonial_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"author" varchar NOT NULL,
  	"rating" numeric DEFAULT 5,
  	"_uuid" varchar
  );
  
  CREATE TABLE "cms"."_site_settings_v_version_testimonial_items_locales" (
  	"quote" varchar NOT NULL,
  	"location" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "cms"."_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "cms"."_site_settings_v_version_footer_pousada_links" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"url" varchar NOT NULL,
  	"_uuid" varchar
  );
  
  CREATE TABLE "cms"."_site_settings_v_version_footer_pousada_links_locales" (
  	"label" varchar NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "cms"."_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "cms"."_site_settings_v_version_footer_experiencias_links" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"url" varchar NOT NULL,
  	"_uuid" varchar
  );
  
  CREATE TABLE "cms"."_site_settings_v_version_footer_experiencias_links_locales" (
  	"label" varchar NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "cms"."_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "cms"."_site_settings_v_version_footer_legal_links" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"url" varchar NOT NULL,
  	"_uuid" varchar
  );
  
  CREATE TABLE "cms"."_site_settings_v_version_footer_legal_links_locales" (
  	"label" varchar NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "cms"."_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "cms"."_site_settings_v_version_authors_knows_about" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"topic" varchar NOT NULL,
  	"_uuid" varchar
  );
  
  CREATE TABLE "cms"."_site_settings_v_version_authors" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"name" varchar NOT NULL,
  	"url" varchar,
  	"image" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "cms"."_site_settings_v_version_authors_locales" (
  	"job_title" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "cms"."_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "cms"."_site_settings_v_version_seasonal_events" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"start_date" varchar,
  	"end_date" varchar,
  	"image" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "cms"."_site_settings_v_version_seasonal_events_locales" (
  	"name" varchar NOT NULL,
  	"description" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "cms"."_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "cms"."_site_settings_v" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"version_brand_name" varchar,
  	"version_contact_email" varchar,
  	"version_contact_phone" varchar,
  	"version_contact_address" varchar,
  	"version_cta_background_image" varchar,
  	"version_default_og_image" varchar DEFAULT '/images/og-default.webp',
  	"version_site_url" varchar,
  	"version_google_site_verification" varchar,
  	"version_aggregate_rating_rating_value" numeric,
  	"version_aggregate_rating_review_count" numeric,
  	"version_aggregate_rating_best_rating" numeric DEFAULT 5,
  	"version_updated_at" timestamp(3) with time zone,
  	"version_created_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "cms"."_site_settings_v_locales" (
  	"version_cta_heading" varchar,
  	"version_cta_description" varchar,
  	"version_faq_label" varchar DEFAULT 'FAQ',
  	"version_faq_heading" varchar,
  	"version_faq_description" varchar,
  	"version_testimonials_label" varchar DEFAULT 'Depoimentos',
  	"version_testimonials_heading" varchar,
  	"version_testimonials_description" varchar,
  	"version_footer_copyright" varchar,
  	"version_default_meta_title" varchar DEFAULT 'Itaicy Pantanal Eco Lodge | Ecoturismo no Pantanal',
  	"version_default_meta_description" varchar DEFAULT 'Descubra o Pantanal em sua forma mais autêntica. Hospedagem premium, pesca esportiva, observação de aves e experiências de ecoturismo no coração do Pantanal.',
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "cms"."_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "cms"."home_content_about_us_body" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL
  );
  
  CREATE TABLE "cms"."home_content_about_us_body_locales" (
  	"text" varchar NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "cms"."_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "cms"."home_content_about_us_features" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL
  );
  
  CREATE TABLE "cms"."home_content_about_us_features_locales" (
  	"number" varchar,
  	"title" varchar,
  	"description" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "cms"."_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "cms"."home_content_expeditions_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"background_image" varchar,
  	"href" varchar
  );
  
  CREATE TABLE "cms"."home_content_expeditions_items_locales" (
  	"title" varchar NOT NULL,
  	"description" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "cms"."_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "cms"."home_content_stats_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"target" numeric NOT NULL,
  	"has_icon" boolean DEFAULT false
  );
  
  CREATE TABLE "cms"."home_content_stats_items_locales" (
  	"suffix" varchar,
  	"label" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "cms"."_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "cms"."home_content_impact_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL
  );
  
  CREATE TABLE "cms"."home_content_impact_items_locales" (
  	"number" varchar,
  	"title" varchar,
  	"description" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "cms"."_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "cms"."home_content_faq_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"number" varchar NOT NULL
  );
  
  CREATE TABLE "cms"."home_content_faq_items_locales" (
  	"question" varchar NOT NULL,
  	"answer" varchar NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "cms"."_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "cms"."home_content" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"about_us_image" varchar,
  	"accommodation_background_image" varchar,
  	"impact_image" varchar,
  	"meta_no_index" boolean DEFAULT false,
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE "cms"."home_content_locales" (
  	"about_us_label" varchar,
  	"about_us_heading" varchar,
  	"expeditions_label" varchar,
  	"expeditions_heading" varchar,
  	"expeditions_description" varchar,
  	"expeditions_button_text" varchar,
  	"accommodation_label" varchar,
  	"accommodation_heading" varchar,
  	"accommodation_body" varchar,
  	"accommodation_button_reserve" varchar,
  	"accommodation_button_details" varchar,
  	"impact_label" varchar,
  	"impact_heading" varchar,
  	"blog_label" varchar,
  	"blog_heading" varchar,
  	"blog_description" varchar,
  	"blog_button_text" varchar,
  	"faq_label" varchar DEFAULT 'PERGUNTAS FREQUENTES',
  	"faq_heading" varchar NOT NULL,
  	"faq_description" varchar,
  	"meta_title" varchar,
  	"meta_description" varchar,
  	"meta_image_id" integer,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "cms"."_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "cms"."_home_content_v_version_about_us_body" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_uuid" varchar
  );
  
  CREATE TABLE "cms"."_home_content_v_version_about_us_body_locales" (
  	"text" varchar NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "cms"."_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "cms"."_home_content_v_version_about_us_features" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_uuid" varchar
  );
  
  CREATE TABLE "cms"."_home_content_v_version_about_us_features_locales" (
  	"number" varchar,
  	"title" varchar,
  	"description" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "cms"."_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "cms"."_home_content_v_version_expeditions_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"background_image" varchar,
  	"href" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "cms"."_home_content_v_version_expeditions_items_locales" (
  	"title" varchar NOT NULL,
  	"description" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "cms"."_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "cms"."_home_content_v_version_stats_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"target" numeric NOT NULL,
  	"has_icon" boolean DEFAULT false,
  	"_uuid" varchar
  );
  
  CREATE TABLE "cms"."_home_content_v_version_stats_items_locales" (
  	"suffix" varchar,
  	"label" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "cms"."_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "cms"."_home_content_v_version_impact_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_uuid" varchar
  );
  
  CREATE TABLE "cms"."_home_content_v_version_impact_items_locales" (
  	"number" varchar,
  	"title" varchar,
  	"description" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "cms"."_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "cms"."_home_content_v_version_faq_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_uuid" varchar NOT NULL,
  	"number" varchar NOT NULL
  );
  
  CREATE TABLE "cms"."_home_content_v_version_faq_items_locales" (
  	"question" varchar NOT NULL,
  	"answer" varchar NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "cms"."_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "cms"."_home_content_v" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"version_about_us_image" varchar,
  	"version_accommodation_background_image" varchar,
  	"version_impact_image" varchar,
  	"version_meta_no_index" boolean DEFAULT false,
  	"version_updated_at" timestamp(3) with time zone,
  	"version_created_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "cms"."_home_content_v_locales" (
  	"version_about_us_label" varchar,
  	"version_about_us_heading" varchar,
  	"version_expeditions_label" varchar,
  	"version_expeditions_heading" varchar,
  	"version_expeditions_description" varchar,
  	"version_expeditions_button_text" varchar,
  	"version_accommodation_label" varchar,
  	"version_accommodation_heading" varchar,
  	"version_accommodation_body" varchar,
  	"version_accommodation_button_reserve" varchar,
  	"version_accommodation_button_details" varchar,
  	"version_impact_label" varchar,
  	"version_impact_heading" varchar,
  	"version_blog_label" varchar,
  	"version_blog_heading" varchar,
  	"version_blog_description" varchar,
  	"version_blog_button_text" varchar,
  	"version_faq_label" varchar DEFAULT 'PERGUNTAS FREQUENTES',
  	"version_faq_heading" varchar NOT NULL,
  	"version_faq_description" varchar,
  	"version_meta_title" varchar,
  	"version_meta_description" varchar,
  	"version_meta_image_id" integer,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "cms"."_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "cms"."acomodacoes_content_manifesto_segments" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"is_highlight" boolean DEFAULT false
  );
  
  CREATE TABLE "cms"."acomodacoes_content_manifesto_segments_locales" (
  	"text" varchar NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "cms"."_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "cms"."acomodacoes_content_highlights_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"icon_name" varchar
  );
  
  CREATE TABLE "cms"."acomodacoes_content_highlights_items_locales" (
  	"title" varchar,
  	"description" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "cms"."_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "cms"."acomodacoes_content_rooms_features" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"icon_name" varchar
  );
  
  CREATE TABLE "cms"."acomodacoes_content_rooms_features_locales" (
  	"label" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "cms"."_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "cms"."acomodacoes_content_rooms" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"image" varchar
  );
  
  CREATE TABLE "cms"."acomodacoes_content_rooms_locales" (
  	"title" varchar NOT NULL,
  	"description" varchar,
  	"cta_text" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "cms"."_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "cms"."acomodacoes_content_culinary_images" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"src" varchar NOT NULL
  );
  
  CREATE TABLE "cms"."acomodacoes_content_culinary_images_locales" (
  	"alt" varchar,
  	"tag" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "cms"."_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "cms"."acomodacoes_content_faq_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"number" varchar NOT NULL
  );
  
  CREATE TABLE "cms"."acomodacoes_content_faq_items_locales" (
  	"question" varchar NOT NULL,
  	"answer" varchar NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "cms"."_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "cms"."acomodacoes_content" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"hero_background_image" varchar,
  	"hero_video_mp4" varchar,
  	"hero_video_webm" varchar,
  	"hero_video_mp4_low" varchar,
  	"hero_video_webm_low" varchar,
  	"hero_video_poster" varchar,
  	"culinary_cta_href" varchar,
  	"meta_no_index" boolean DEFAULT false,
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE "cms"."acomodacoes_content_locales" (
  	"hero_label" varchar,
  	"hero_heading" varchar NOT NULL,
  	"hero_subtitle" varchar,
  	"hero_description" varchar,
  	"hero_scroll_hint" varchar DEFAULT 'Deslize para baixo',
  	"highlights_heading" varchar,
  	"culinary_label" varchar,
  	"culinary_heading" varchar,
  	"culinary_description" varchar,
  	"culinary_cta_text" varchar,
  	"faq_label" varchar DEFAULT 'PERGUNTAS FREQUENTES',
  	"faq_heading" varchar NOT NULL,
  	"faq_description" varchar,
  	"meta_title" varchar,
  	"meta_description" varchar,
  	"meta_image_id" integer,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "cms"."_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "cms"."_acomodacoes_content_v_version_manifesto_segments" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"is_highlight" boolean DEFAULT false,
  	"_uuid" varchar
  );
  
  CREATE TABLE "cms"."_acomodacoes_content_v_version_manifesto_segments_locales" (
  	"text" varchar NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "cms"."_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "cms"."_acomodacoes_content_v_version_highlights_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"icon_name" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "cms"."_acomodacoes_content_v_version_highlights_items_locales" (
  	"title" varchar,
  	"description" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "cms"."_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "cms"."_acomodacoes_content_v_version_rooms_features" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"icon_name" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "cms"."_acomodacoes_content_v_version_rooms_features_locales" (
  	"label" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "cms"."_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "cms"."_acomodacoes_content_v_version_rooms" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"image" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "cms"."_acomodacoes_content_v_version_rooms_locales" (
  	"title" varchar NOT NULL,
  	"description" varchar,
  	"cta_text" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "cms"."_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "cms"."_acomodacoes_content_v_version_culinary_images" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"src" varchar NOT NULL,
  	"_uuid" varchar
  );
  
  CREATE TABLE "cms"."_acomodacoes_content_v_version_culinary_images_locales" (
  	"alt" varchar,
  	"tag" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "cms"."_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "cms"."_acomodacoes_content_v_version_faq_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_uuid" varchar NOT NULL,
  	"number" varchar NOT NULL
  );
  
  CREATE TABLE "cms"."_acomodacoes_content_v_version_faq_items_locales" (
  	"question" varchar NOT NULL,
  	"answer" varchar NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "cms"."_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "cms"."_acomodacoes_content_v" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"version_hero_background_image" varchar,
  	"version_hero_video_mp4" varchar,
  	"version_hero_video_webm" varchar,
  	"version_hero_video_mp4_low" varchar,
  	"version_hero_video_webm_low" varchar,
  	"version_hero_video_poster" varchar,
  	"version_culinary_cta_href" varchar,
  	"version_meta_no_index" boolean DEFAULT false,
  	"version_updated_at" timestamp(3) with time zone,
  	"version_created_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "cms"."_acomodacoes_content_v_locales" (
  	"version_hero_label" varchar,
  	"version_hero_heading" varchar NOT NULL,
  	"version_hero_subtitle" varchar,
  	"version_hero_description" varchar,
  	"version_hero_scroll_hint" varchar DEFAULT 'Deslize para baixo',
  	"version_highlights_heading" varchar,
  	"version_culinary_label" varchar,
  	"version_culinary_heading" varchar,
  	"version_culinary_description" varchar,
  	"version_culinary_cta_text" varchar,
  	"version_faq_label" varchar DEFAULT 'PERGUNTAS FREQUENTES',
  	"version_faq_heading" varchar NOT NULL,
  	"version_faq_description" varchar,
  	"version_meta_title" varchar,
  	"version_meta_description" varchar,
  	"version_meta_image_id" integer,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "cms"."_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "cms"."culinaria_content_manifesto_segments" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"is_highlight" boolean DEFAULT false
  );
  
  CREATE TABLE "cms"."culinaria_content_manifesto_segments_locales" (
  	"text" varchar NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "cms"."_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "cms"."culinaria_content_menu_body" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL
  );
  
  CREATE TABLE "cms"."culinaria_content_menu_body_locales" (
  	"text" varchar NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "cms"."_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "cms"."culinaria_content_menu_features" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL
  );
  
  CREATE TABLE "cms"."culinaria_content_menu_features_locales" (
  	"number" varchar,
  	"title" varchar,
  	"description" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "cms"."_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "cms"."culinaria_content_highlights_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"icon_name" varchar
  );
  
  CREATE TABLE "cms"."culinaria_content_highlights_items_locales" (
  	"title" varchar,
  	"description" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "cms"."_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "cms"."culinaria_content_services_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"image" varchar,
  	"href" varchar
  );
  
  CREATE TABLE "cms"."culinaria_content_services_items_locales" (
  	"title" varchar NOT NULL,
  	"description" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "cms"."_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "cms"."culinaria_content_experience_body" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL
  );
  
  CREATE TABLE "cms"."culinaria_content_experience_body_locales" (
  	"text" varchar NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "cms"."_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "cms"."culinaria_content_faq_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"number" varchar NOT NULL
  );
  
  CREATE TABLE "cms"."culinaria_content_faq_items_locales" (
  	"question" varchar NOT NULL,
  	"answer" varchar NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "cms"."_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "cms"."culinaria_content" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"hero_background_image" varchar,
  	"menu_image" varchar,
  	"services_button_href" varchar,
  	"experience_image" varchar,
  	"cross_sell_button_href" varchar,
  	"cross_sell_image" varchar,
  	"meta_no_index" boolean DEFAULT false,
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE "cms"."culinaria_content_locales" (
  	"hero_label" varchar,
  	"hero_heading" varchar NOT NULL,
  	"hero_subtitle" varchar,
  	"hero_description" varchar,
  	"hero_scroll_hint" varchar DEFAULT 'Deslize para baixo',
  	"menu_label" varchar,
  	"menu_heading" varchar,
  	"highlights_heading" varchar,
  	"services_label" varchar,
  	"services_heading" varchar,
  	"services_description" varchar,
  	"services_button_text" varchar,
  	"experience_heading" varchar,
  	"cross_sell_heading" varchar,
  	"cross_sell_description" varchar,
  	"cross_sell_button_text" varchar,
  	"faq_label" varchar DEFAULT 'PERGUNTAS FREQUENTES',
  	"faq_heading" varchar NOT NULL,
  	"faq_description" varchar,
  	"meta_title" varchar,
  	"meta_description" varchar,
  	"meta_image_id" integer,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "cms"."_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "cms"."_culinaria_content_v_version_manifesto_segments" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"is_highlight" boolean DEFAULT false,
  	"_uuid" varchar
  );
  
  CREATE TABLE "cms"."_culinaria_content_v_version_manifesto_segments_locales" (
  	"text" varchar NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "cms"."_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "cms"."_culinaria_content_v_version_menu_body" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_uuid" varchar
  );
  
  CREATE TABLE "cms"."_culinaria_content_v_version_menu_body_locales" (
  	"text" varchar NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "cms"."_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "cms"."_culinaria_content_v_version_menu_features" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_uuid" varchar
  );
  
  CREATE TABLE "cms"."_culinaria_content_v_version_menu_features_locales" (
  	"number" varchar,
  	"title" varchar,
  	"description" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "cms"."_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "cms"."_culinaria_content_v_version_highlights_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"icon_name" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "cms"."_culinaria_content_v_version_highlights_items_locales" (
  	"title" varchar,
  	"description" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "cms"."_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "cms"."_culinaria_content_v_version_services_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"image" varchar,
  	"href" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "cms"."_culinaria_content_v_version_services_items_locales" (
  	"title" varchar NOT NULL,
  	"description" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "cms"."_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "cms"."_culinaria_content_v_version_experience_body" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_uuid" varchar
  );
  
  CREATE TABLE "cms"."_culinaria_content_v_version_experience_body_locales" (
  	"text" varchar NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "cms"."_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "cms"."_culinaria_content_v_version_faq_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_uuid" varchar NOT NULL,
  	"number" varchar NOT NULL
  );
  
  CREATE TABLE "cms"."_culinaria_content_v_version_faq_items_locales" (
  	"question" varchar NOT NULL,
  	"answer" varchar NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "cms"."_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "cms"."_culinaria_content_v" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"version_hero_background_image" varchar,
  	"version_menu_image" varchar,
  	"version_services_button_href" varchar,
  	"version_experience_image" varchar,
  	"version_cross_sell_button_href" varchar,
  	"version_cross_sell_image" varchar,
  	"version_meta_no_index" boolean DEFAULT false,
  	"version_updated_at" timestamp(3) with time zone,
  	"version_created_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "cms"."_culinaria_content_v_locales" (
  	"version_hero_label" varchar,
  	"version_hero_heading" varchar NOT NULL,
  	"version_hero_subtitle" varchar,
  	"version_hero_description" varchar,
  	"version_hero_scroll_hint" varchar DEFAULT 'Deslize para baixo',
  	"version_menu_label" varchar,
  	"version_menu_heading" varchar,
  	"version_highlights_heading" varchar,
  	"version_services_label" varchar,
  	"version_services_heading" varchar,
  	"version_services_description" varchar,
  	"version_services_button_text" varchar,
  	"version_experience_heading" varchar,
  	"version_cross_sell_heading" varchar,
  	"version_cross_sell_description" varchar,
  	"version_cross_sell_button_text" varchar,
  	"version_faq_label" varchar DEFAULT 'PERGUNTAS FREQUENTES',
  	"version_faq_heading" varchar NOT NULL,
  	"version_faq_description" varchar,
  	"version_meta_title" varchar,
  	"version_meta_description" varchar,
  	"version_meta_image_id" integer,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "cms"."_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "cms"."pesca_content_manifesto_segments" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"is_highlight" boolean DEFAULT false
  );
  
  CREATE TABLE "cms"."pesca_content_manifesto_segments_locales" (
  	"text" varchar NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "cms"."_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "cms"."pesca_content_sobre_nos_body" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL
  );
  
  CREATE TABLE "cms"."pesca_content_sobre_nos_body_locales" (
  	"text" varchar NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "cms"."_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "cms"."pesca_content_sobre_nos_features" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL
  );
  
  CREATE TABLE "cms"."pesca_content_sobre_nos_features_locales" (
  	"number" varchar,
  	"title" varchar,
  	"description" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "cms"."_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "cms"."pesca_content_highlights_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"icon_name" varchar
  );
  
  CREATE TABLE "cms"."pesca_content_highlights_items_locales" (
  	"title" varchar,
  	"description" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "cms"."_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "cms"."pesca_content_services_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"image" varchar,
  	"href" varchar
  );
  
  CREATE TABLE "cms"."pesca_content_services_items_locales" (
  	"title" varchar NOT NULL,
  	"description" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "cms"."_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "cms"."pesca_content_faq_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"number" varchar NOT NULL
  );
  
  CREATE TABLE "cms"."pesca_content_faq_items_locales" (
  	"question" varchar NOT NULL,
  	"answer" varchar NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "cms"."_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "cms"."pesca_content" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"hero_background_image" varchar,
  	"sobre_nos_image" varchar,
  	"services_button_href" varchar,
  	"meta_no_index" boolean DEFAULT false,
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE "cms"."pesca_content_locales" (
  	"hero_label" varchar,
  	"hero_heading" varchar NOT NULL,
  	"hero_subtitle" varchar,
  	"hero_description" varchar,
  	"hero_scroll_hint" varchar DEFAULT 'Deslize para baixo',
  	"sobre_nos_label" varchar,
  	"sobre_nos_heading" varchar,
  	"highlights_heading" varchar,
  	"services_label" varchar,
  	"services_heading" varchar,
  	"services_description" varchar,
  	"services_button_text" varchar,
  	"faq_label" varchar DEFAULT 'PERGUNTAS FREQUENTES',
  	"faq_heading" varchar NOT NULL,
  	"faq_description" varchar,
  	"meta_title" varchar,
  	"meta_description" varchar,
  	"meta_image_id" integer,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "cms"."_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "cms"."_pesca_content_v_version_manifesto_segments" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"is_highlight" boolean DEFAULT false,
  	"_uuid" varchar
  );
  
  CREATE TABLE "cms"."_pesca_content_v_version_manifesto_segments_locales" (
  	"text" varchar NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "cms"."_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "cms"."_pesca_content_v_version_sobre_nos_body" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_uuid" varchar
  );
  
  CREATE TABLE "cms"."_pesca_content_v_version_sobre_nos_body_locales" (
  	"text" varchar NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "cms"."_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "cms"."_pesca_content_v_version_sobre_nos_features" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_uuid" varchar
  );
  
  CREATE TABLE "cms"."_pesca_content_v_version_sobre_nos_features_locales" (
  	"number" varchar,
  	"title" varchar,
  	"description" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "cms"."_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "cms"."_pesca_content_v_version_highlights_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"icon_name" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "cms"."_pesca_content_v_version_highlights_items_locales" (
  	"title" varchar,
  	"description" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "cms"."_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "cms"."_pesca_content_v_version_services_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"image" varchar,
  	"href" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "cms"."_pesca_content_v_version_services_items_locales" (
  	"title" varchar NOT NULL,
  	"description" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "cms"."_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "cms"."_pesca_content_v_version_faq_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_uuid" varchar NOT NULL,
  	"number" varchar NOT NULL
  );
  
  CREATE TABLE "cms"."_pesca_content_v_version_faq_items_locales" (
  	"question" varchar NOT NULL,
  	"answer" varchar NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "cms"."_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "cms"."_pesca_content_v" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"version_hero_background_image" varchar,
  	"version_sobre_nos_image" varchar,
  	"version_services_button_href" varchar,
  	"version_meta_no_index" boolean DEFAULT false,
  	"version_updated_at" timestamp(3) with time zone,
  	"version_created_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "cms"."_pesca_content_v_locales" (
  	"version_hero_label" varchar,
  	"version_hero_heading" varchar NOT NULL,
  	"version_hero_subtitle" varchar,
  	"version_hero_description" varchar,
  	"version_hero_scroll_hint" varchar DEFAULT 'Deslize para baixo',
  	"version_sobre_nos_label" varchar,
  	"version_sobre_nos_heading" varchar,
  	"version_highlights_heading" varchar,
  	"version_services_label" varchar,
  	"version_services_heading" varchar,
  	"version_services_description" varchar,
  	"version_services_button_text" varchar,
  	"version_faq_label" varchar DEFAULT 'PERGUNTAS FREQUENTES',
  	"version_faq_heading" varchar NOT NULL,
  	"version_faq_description" varchar,
  	"version_meta_title" varchar,
  	"version_meta_description" varchar,
  	"version_meta_image_id" integer,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "cms"."_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "cms"."ecoturismo_content_manifesto_segments" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"is_highlight" boolean DEFAULT false
  );
  
  CREATE TABLE "cms"."ecoturismo_content_manifesto_segments_locales" (
  	"text" varchar NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "cms"."_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "cms"."ecoturismo_content_sobre_nos_body" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL
  );
  
  CREATE TABLE "cms"."ecoturismo_content_sobre_nos_body_locales" (
  	"text" varchar NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "cms"."_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "cms"."ecoturismo_content_sobre_nos_features" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL
  );
  
  CREATE TABLE "cms"."ecoturismo_content_sobre_nos_features_locales" (
  	"number" varchar,
  	"title" varchar,
  	"description" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "cms"."_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "cms"."ecoturismo_content_highlights_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"icon_name" varchar
  );
  
  CREATE TABLE "cms"."ecoturismo_content_highlights_items_locales" (
  	"title" varchar,
  	"description" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "cms"."_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "cms"."ecoturismo_content_services_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"image" varchar,
  	"href" varchar
  );
  
  CREATE TABLE "cms"."ecoturismo_content_services_items_locales" (
  	"title" varchar NOT NULL,
  	"description" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "cms"."_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "cms"."ecoturismo_content_faq_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"number" varchar NOT NULL
  );
  
  CREATE TABLE "cms"."ecoturismo_content_faq_items_locales" (
  	"question" varchar NOT NULL,
  	"answer" varchar NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "cms"."_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "cms"."ecoturismo_content" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"hero_background_image" varchar,
  	"sobre_nos_image" varchar,
  	"services_button_href" varchar,
  	"meta_no_index" boolean DEFAULT false,
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE "cms"."ecoturismo_content_locales" (
  	"hero_label" varchar,
  	"hero_heading" varchar NOT NULL,
  	"hero_subtitle" varchar,
  	"hero_description" varchar,
  	"hero_scroll_hint" varchar DEFAULT 'Deslize para baixo',
  	"sobre_nos_label" varchar,
  	"sobre_nos_heading" varchar,
  	"highlights_heading" varchar,
  	"services_label" varchar,
  	"services_heading" varchar,
  	"services_description" varchar,
  	"services_button_text" varchar,
  	"faq_label" varchar DEFAULT 'PERGUNTAS FREQUENTES',
  	"faq_heading" varchar NOT NULL,
  	"faq_description" varchar,
  	"meta_title" varchar,
  	"meta_description" varchar,
  	"meta_image_id" integer,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "cms"."_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "cms"."_ecoturismo_content_v_version_manifesto_segments" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"is_highlight" boolean DEFAULT false,
  	"_uuid" varchar
  );
  
  CREATE TABLE "cms"."_ecoturismo_content_v_version_manifesto_segments_locales" (
  	"text" varchar NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "cms"."_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "cms"."_ecoturismo_content_v_version_sobre_nos_body" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_uuid" varchar
  );
  
  CREATE TABLE "cms"."_ecoturismo_content_v_version_sobre_nos_body_locales" (
  	"text" varchar NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "cms"."_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "cms"."_ecoturismo_content_v_version_sobre_nos_features" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_uuid" varchar
  );
  
  CREATE TABLE "cms"."_ecoturismo_content_v_version_sobre_nos_features_locales" (
  	"number" varchar,
  	"title" varchar,
  	"description" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "cms"."_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "cms"."_ecoturismo_content_v_version_highlights_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"icon_name" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "cms"."_ecoturismo_content_v_version_highlights_items_locales" (
  	"title" varchar,
  	"description" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "cms"."_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "cms"."_ecoturismo_content_v_version_services_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"image" varchar,
  	"href" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "cms"."_ecoturismo_content_v_version_services_items_locales" (
  	"title" varchar NOT NULL,
  	"description" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "cms"."_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "cms"."_ecoturismo_content_v_version_faq_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_uuid" varchar NOT NULL,
  	"number" varchar NOT NULL
  );
  
  CREATE TABLE "cms"."_ecoturismo_content_v_version_faq_items_locales" (
  	"question" varchar NOT NULL,
  	"answer" varchar NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "cms"."_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "cms"."_ecoturismo_content_v" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"version_hero_background_image" varchar,
  	"version_sobre_nos_image" varchar,
  	"version_services_button_href" varchar,
  	"version_meta_no_index" boolean DEFAULT false,
  	"version_updated_at" timestamp(3) with time zone,
  	"version_created_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "cms"."_ecoturismo_content_v_locales" (
  	"version_hero_label" varchar,
  	"version_hero_heading" varchar NOT NULL,
  	"version_hero_subtitle" varchar,
  	"version_hero_description" varchar,
  	"version_hero_scroll_hint" varchar DEFAULT 'Deslize para baixo',
  	"version_sobre_nos_label" varchar,
  	"version_sobre_nos_heading" varchar,
  	"version_highlights_heading" varchar,
  	"version_services_label" varchar,
  	"version_services_heading" varchar,
  	"version_services_description" varchar,
  	"version_services_button_text" varchar,
  	"version_faq_label" varchar DEFAULT 'PERGUNTAS FREQUENTES',
  	"version_faq_heading" varchar NOT NULL,
  	"version_faq_description" varchar,
  	"version_meta_title" varchar,
  	"version_meta_description" varchar,
  	"version_meta_image_id" integer,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "cms"."_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "cms"."birdwatching_content_manifesto_segments" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"is_highlight" boolean DEFAULT false
  );
  
  CREATE TABLE "cms"."birdwatching_content_manifesto_segments_locales" (
  	"text" varchar NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "cms"."_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "cms"."birdwatching_content_sobre_nos_body" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL
  );
  
  CREATE TABLE "cms"."birdwatching_content_sobre_nos_body_locales" (
  	"text" varchar NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "cms"."_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "cms"."birdwatching_content_sobre_nos_features" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL
  );
  
  CREATE TABLE "cms"."birdwatching_content_sobre_nos_features_locales" (
  	"number" varchar,
  	"title" varchar,
  	"description" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "cms"."_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "cms"."birdwatching_content_highlights_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"icon_name" varchar
  );
  
  CREATE TABLE "cms"."birdwatching_content_highlights_items_locales" (
  	"title" varchar,
  	"description" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "cms"."_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "cms"."birdwatching_content_faq_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"number" varchar NOT NULL
  );
  
  CREATE TABLE "cms"."birdwatching_content_faq_items_locales" (
  	"question" varchar NOT NULL,
  	"answer" varchar NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "cms"."_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "cms"."birdwatching_content" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"hero_background_image" varchar,
  	"sobre_nos_image" varchar,
  	"meta_no_index" boolean DEFAULT false,
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE "cms"."birdwatching_content_locales" (
  	"hero_label" varchar,
  	"hero_heading" varchar NOT NULL,
  	"hero_subtitle" varchar,
  	"hero_description" varchar,
  	"hero_scroll_hint" varchar DEFAULT 'Deslize para baixo',
  	"sobre_nos_label" varchar,
  	"sobre_nos_heading" varchar,
  	"highlights_heading" varchar,
  	"faq_label" varchar DEFAULT 'PERGUNTAS FREQUENTES',
  	"faq_heading" varchar NOT NULL,
  	"faq_description" varchar,
  	"meta_title" varchar,
  	"meta_description" varchar,
  	"meta_image_id" integer,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "cms"."_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "cms"."_birdwatching_content_v_version_manifesto_segments" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"is_highlight" boolean DEFAULT false,
  	"_uuid" varchar
  );
  
  CREATE TABLE "cms"."_birdwatching_content_v_version_manifesto_segments_locales" (
  	"text" varchar NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "cms"."_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "cms"."_birdwatching_content_v_version_sobre_nos_body" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_uuid" varchar
  );
  
  CREATE TABLE "cms"."_birdwatching_content_v_version_sobre_nos_body_locales" (
  	"text" varchar NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "cms"."_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "cms"."_birdwatching_content_v_version_sobre_nos_features" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_uuid" varchar
  );
  
  CREATE TABLE "cms"."_birdwatching_content_v_version_sobre_nos_features_locales" (
  	"number" varchar,
  	"title" varchar,
  	"description" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "cms"."_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "cms"."_birdwatching_content_v_version_highlights_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"icon_name" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "cms"."_birdwatching_content_v_version_highlights_items_locales" (
  	"title" varchar,
  	"description" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "cms"."_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "cms"."_birdwatching_content_v_version_faq_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_uuid" varchar NOT NULL,
  	"number" varchar NOT NULL
  );
  
  CREATE TABLE "cms"."_birdwatching_content_v_version_faq_items_locales" (
  	"question" varchar NOT NULL,
  	"answer" varchar NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "cms"."_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "cms"."_birdwatching_content_v" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"version_hero_background_image" varchar,
  	"version_sobre_nos_image" varchar,
  	"version_meta_no_index" boolean DEFAULT false,
  	"version_updated_at" timestamp(3) with time zone,
  	"version_created_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "cms"."_birdwatching_content_v_locales" (
  	"version_hero_label" varchar,
  	"version_hero_heading" varchar NOT NULL,
  	"version_hero_subtitle" varchar,
  	"version_hero_description" varchar,
  	"version_hero_scroll_hint" varchar DEFAULT 'Deslize para baixo',
  	"version_sobre_nos_label" varchar,
  	"version_sobre_nos_heading" varchar,
  	"version_highlights_heading" varchar,
  	"version_faq_label" varchar DEFAULT 'PERGUNTAS FREQUENTES',
  	"version_faq_heading" varchar NOT NULL,
  	"version_faq_description" varchar,
  	"version_meta_title" varchar,
  	"version_meta_description" varchar,
  	"version_meta_image_id" integer,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "cms"."_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "cms"."contato_content_steps_placeholders" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL
  );
  
  CREATE TABLE "cms"."contato_content_steps_placeholders_locales" (
  	"text" varchar NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "cms"."_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "cms"."contato_content_channels_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"icon_name" varchar
  );
  
  CREATE TABLE "cms"."contato_content_channels_items_locales" (
  	"title" varchar,
  	"info" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "cms"."_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "cms"."contato_content" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"hero_background_image" varchar,
  	"map_coords_lat" numeric,
  	"map_coords_lng" numeric,
  	"meta_no_index" boolean DEFAULT false,
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE "cms"."contato_content_locales" (
  	"hero_label" varchar,
  	"hero_heading" varchar NOT NULL,
  	"hero_subtitle" varchar,
  	"hero_description" varchar,
  	"hero_scroll_hint" varchar DEFAULT 'Deslize para baixo',
  	"form_title" varchar,
  	"steps_button_next" varchar,
  	"steps_button_back" varchar,
  	"steps_button_submit" varchar,
  	"channels_heading" varchar,
  	"meta_title" varchar,
  	"meta_description" varchar,
  	"meta_image_id" integer,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "cms"."_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "cms"."_contato_content_v_version_steps_placeholders" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_uuid" varchar
  );
  
  CREATE TABLE "cms"."_contato_content_v_version_steps_placeholders_locales" (
  	"text" varchar NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "cms"."_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "cms"."_contato_content_v_version_channels_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"icon_name" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "cms"."_contato_content_v_version_channels_items_locales" (
  	"title" varchar,
  	"info" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "cms"."_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "cms"."_contato_content_v" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"version_hero_background_image" varchar,
  	"version_map_coords_lat" numeric,
  	"version_map_coords_lng" numeric,
  	"version_meta_no_index" boolean DEFAULT false,
  	"version_updated_at" timestamp(3) with time zone,
  	"version_created_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "cms"."_contato_content_v_locales" (
  	"version_hero_label" varchar,
  	"version_hero_heading" varchar NOT NULL,
  	"version_hero_subtitle" varchar,
  	"version_hero_description" varchar,
  	"version_hero_scroll_hint" varchar DEFAULT 'Deslize para baixo',
  	"version_form_title" varchar,
  	"version_steps_button_next" varchar,
  	"version_steps_button_back" varchar,
  	"version_steps_button_submit" varchar,
  	"version_channels_heading" varchar,
  	"version_meta_title" varchar,
  	"version_meta_description" varchar,
  	"version_meta_image_id" integer,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "cms"."_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "cms"."nosso_impacto_content_manifesto_segments" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"is_highlight" boolean DEFAULT false
  );
  
  CREATE TABLE "cms"."nosso_impacto_content_manifesto_segments_locales" (
  	"text" varchar NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "cms"."_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "cms"."nosso_impacto_content_rio_vivo_steps" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"icon_name" varchar
  );
  
  CREATE TABLE "cms"."nosso_impacto_content_rio_vivo_steps_locales" (
  	"title" varchar,
  	"description" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "cms"."_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "cms"."nosso_impacto_content_biodiversidade_counters" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"target" numeric NOT NULL,
  	"has_icon" boolean DEFAULT false
  );
  
  CREATE TABLE "cms"."nosso_impacto_content_biodiversidade_counters_locales" (
  	"suffix" varchar,
  	"label" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "cms"."_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "cms"."nosso_impacto_content_comunidade_body" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL
  );
  
  CREATE TABLE "cms"."nosso_impacto_content_comunidade_body_locales" (
  	"text" varchar NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "cms"."_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "cms"."nosso_impacto_content_operacao_practices" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"icon_name" varchar
  );
  
  CREATE TABLE "cms"."nosso_impacto_content_operacao_practices_locales" (
  	"title" varchar,
  	"description" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "cms"."_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "cms"."nosso_impacto_content" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"hero_background_image" varchar,
  	"comunidade_image" varchar,
  	"meta_no_index" boolean DEFAULT false,
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE "cms"."nosso_impacto_content_locales" (
  	"hero_label" varchar,
  	"hero_heading" varchar NOT NULL,
  	"hero_subtitle" varchar,
  	"hero_description" varchar,
  	"hero_scroll_hint" varchar DEFAULT 'Deslize para baixo',
  	"rio_vivo_heading" varchar,
  	"rio_vivo_description" varchar,
  	"biodiversidade_heading" varchar,
  	"biodiversidade_description" varchar,
  	"comunidade_heading" varchar,
  	"comunidade_description" varchar,
  	"operacao_heading" varchar,
  	"operacao_description" varchar,
  	"engagement_heading" varchar,
  	"engagement_description" varchar,
  	"engagement_button_text" varchar,
  	"meta_title" varchar,
  	"meta_description" varchar,
  	"meta_image_id" integer,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "cms"."_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "cms"."_nosso_impacto_content_v_version_manifesto_segments" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"is_highlight" boolean DEFAULT false,
  	"_uuid" varchar
  );
  
  CREATE TABLE "cms"."_nosso_impacto_content_v_version_manifesto_segments_locales" (
  	"text" varchar NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "cms"."_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "cms"."_nosso_impacto_content_v_version_rio_vivo_steps" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"icon_name" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "cms"."_nosso_impacto_content_v_version_rio_vivo_steps_locales" (
  	"title" varchar,
  	"description" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "cms"."_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "cms"."_nosso_impacto_content_v_version_biodiversidade_counters" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"target" numeric NOT NULL,
  	"has_icon" boolean DEFAULT false,
  	"_uuid" varchar
  );
  
  CREATE TABLE "cms"."_nosso_impacto_content_v_version_biodiversidade_counters_locales" (
  	"suffix" varchar,
  	"label" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "cms"."_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "cms"."_nosso_impacto_content_v_version_comunidade_body" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_uuid" varchar
  );
  
  CREATE TABLE "cms"."_nosso_impacto_content_v_version_comunidade_body_locales" (
  	"text" varchar NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "cms"."_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "cms"."_nosso_impacto_content_v_version_operacao_practices" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"icon_name" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "cms"."_nosso_impacto_content_v_version_operacao_practices_locales" (
  	"title" varchar,
  	"description" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "cms"."_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "cms"."_nosso_impacto_content_v" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"version_hero_background_image" varchar,
  	"version_comunidade_image" varchar,
  	"version_meta_no_index" boolean DEFAULT false,
  	"version_updated_at" timestamp(3) with time zone,
  	"version_created_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "cms"."_nosso_impacto_content_v_locales" (
  	"version_hero_label" varchar,
  	"version_hero_heading" varchar NOT NULL,
  	"version_hero_subtitle" varchar,
  	"version_hero_description" varchar,
  	"version_hero_scroll_hint" varchar DEFAULT 'Deslize para baixo',
  	"version_rio_vivo_heading" varchar,
  	"version_rio_vivo_description" varchar,
  	"version_biodiversidade_heading" varchar,
  	"version_biodiversidade_description" varchar,
  	"version_comunidade_heading" varchar,
  	"version_comunidade_description" varchar,
  	"version_operacao_heading" varchar,
  	"version_operacao_description" varchar,
  	"version_engagement_heading" varchar,
  	"version_engagement_description" varchar,
  	"version_engagement_button_text" varchar,
  	"version_meta_title" varchar,
  	"version_meta_description" varchar,
  	"version_meta_image_id" integer,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "cms"."_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "cms"."privacidade_content_sections_content" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL
  );
  
  CREATE TABLE "cms"."privacidade_content_sections_content_locales" (
  	"text" varchar NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "cms"."_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "cms"."privacidade_content_sections" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL
  );
  
  CREATE TABLE "cms"."privacidade_content_sections_locales" (
  	"title" varchar NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "cms"."_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "cms"."privacidade_content" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"meta_no_index" boolean DEFAULT false,
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE "cms"."privacidade_content_locales" (
  	"hero_title" varchar,
  	"hero_last_updated" varchar,
  	"meta_title" varchar,
  	"meta_description" varchar,
  	"meta_image_id" integer,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "cms"."_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "cms"."_privacidade_content_v_version_sections_content" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_uuid" varchar
  );
  
  CREATE TABLE "cms"."_privacidade_content_v_version_sections_content_locales" (
  	"text" varchar NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "cms"."_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "cms"."_privacidade_content_v_version_sections" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_uuid" varchar NOT NULL
  );
  
  CREATE TABLE "cms"."_privacidade_content_v_version_sections_locales" (
  	"title" varchar NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "cms"."_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "cms"."_privacidade_content_v" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"version_meta_no_index" boolean DEFAULT false,
  	"version_updated_at" timestamp(3) with time zone,
  	"version_created_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "cms"."_privacidade_content_v_locales" (
  	"version_hero_title" varchar,
  	"version_hero_last_updated" varchar,
  	"version_meta_title" varchar,
  	"version_meta_description" varchar,
  	"version_meta_image_id" integer,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "cms"."_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "cms"."not_found_content" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"hero_background_image" varchar,
  	"meta_no_index" boolean DEFAULT false,
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE "cms"."not_found_content_locales" (
  	"hero_label" varchar,
  	"hero_heading" varchar NOT NULL,
  	"hero_subtitle" varchar,
  	"hero_description" varchar,
  	"hero_scroll_hint" varchar DEFAULT 'Deslize para baixo',
  	"button_text" varchar,
  	"meta_title" varchar,
  	"meta_description" varchar,
  	"meta_image_id" integer,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "cms"."_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "cms"."_not_found_content_v" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"version_hero_background_image" varchar,
  	"version_meta_no_index" boolean DEFAULT false,
  	"version_updated_at" timestamp(3) with time zone,
  	"version_created_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "cms"."_not_found_content_v_locales" (
  	"version_hero_label" varchar,
  	"version_hero_heading" varchar NOT NULL,
  	"version_hero_subtitle" varchar,
  	"version_hero_description" varchar,
  	"version_hero_scroll_hint" varchar DEFAULT 'Deslize para baixo',
  	"version_button_text" varchar,
  	"version_meta_title" varchar,
  	"version_meta_description" varchar,
  	"version_meta_image_id" integer,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "cms"."_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  ALTER TABLE "cms"."media_locales" ADD CONSTRAINT "media_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "cms"."media"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "cms"."blog_posts_blocks_paragraph" ADD CONSTRAINT "blog_posts_blocks_paragraph_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "cms"."blog_posts"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "cms"."blog_posts_blocks_paragraph_locales" ADD CONSTRAINT "blog_posts_blocks_paragraph_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "cms"."blog_posts_blocks_paragraph"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "cms"."blog_posts_blocks_heading" ADD CONSTRAINT "blog_posts_blocks_heading_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "cms"."blog_posts"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "cms"."blog_posts_blocks_heading_locales" ADD CONSTRAINT "blog_posts_blocks_heading_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "cms"."blog_posts_blocks_heading"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "cms"."blog_posts_blocks_species" ADD CONSTRAINT "blog_posts_blocks_species_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "cms"."blog_posts"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "cms"."blog_posts_blocks_species_locales" ADD CONSTRAINT "blog_posts_blocks_species_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "cms"."blog_posts_blocks_species"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "cms"."blog_posts_blocks_ordered_list_items" ADD CONSTRAINT "blog_posts_blocks_ordered_list_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "cms"."blog_posts_blocks_ordered_list"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "cms"."blog_posts_blocks_ordered_list_items_locales" ADD CONSTRAINT "blog_posts_blocks_ordered_list_items_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "cms"."blog_posts_blocks_ordered_list_items"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "cms"."blog_posts_blocks_ordered_list" ADD CONSTRAINT "blog_posts_blocks_ordered_list_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "cms"."blog_posts"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "cms"."blog_posts" ADD CONSTRAINT "blog_posts_primary_category_id_blog_categories_id_fk" FOREIGN KEY ("primary_category_id") REFERENCES "cms"."blog_categories"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "cms"."blog_posts_locales" ADD CONSTRAINT "blog_posts_locales_meta_image_id_media_id_fk" FOREIGN KEY ("meta_image_id") REFERENCES "cms"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "cms"."blog_posts_locales" ADD CONSTRAINT "blog_posts_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "cms"."blog_posts"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "cms"."blog_posts_rels" ADD CONSTRAINT "blog_posts_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "cms"."blog_posts"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "cms"."blog_posts_rels" ADD CONSTRAINT "blog_posts_rels_blog_categories_fk" FOREIGN KEY ("blog_categories_id") REFERENCES "cms"."blog_categories"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "cms"."blog_posts_rels" ADD CONSTRAINT "blog_posts_rels_blog_posts_fk" FOREIGN KEY ("blog_posts_id") REFERENCES "cms"."blog_posts"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "cms"."_blog_posts_v_blocks_paragraph" ADD CONSTRAINT "_blog_posts_v_blocks_paragraph_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "cms"."_blog_posts_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "cms"."_blog_posts_v_blocks_paragraph_locales" ADD CONSTRAINT "_blog_posts_v_blocks_paragraph_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "cms"."_blog_posts_v_blocks_paragraph"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "cms"."_blog_posts_v_blocks_heading" ADD CONSTRAINT "_blog_posts_v_blocks_heading_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "cms"."_blog_posts_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "cms"."_blog_posts_v_blocks_heading_locales" ADD CONSTRAINT "_blog_posts_v_blocks_heading_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "cms"."_blog_posts_v_blocks_heading"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "cms"."_blog_posts_v_blocks_species" ADD CONSTRAINT "_blog_posts_v_blocks_species_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "cms"."_blog_posts_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "cms"."_blog_posts_v_blocks_species_locales" ADD CONSTRAINT "_blog_posts_v_blocks_species_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "cms"."_blog_posts_v_blocks_species"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "cms"."_blog_posts_v_blocks_ordered_list_items" ADD CONSTRAINT "_blog_posts_v_blocks_ordered_list_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "cms"."_blog_posts_v_blocks_ordered_list"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "cms"."_blog_posts_v_blocks_ordered_list_items_locales" ADD CONSTRAINT "_blog_posts_v_blocks_ordered_list_items_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "cms"."_blog_posts_v_blocks_ordered_list_items"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "cms"."_blog_posts_v_blocks_ordered_list" ADD CONSTRAINT "_blog_posts_v_blocks_ordered_list_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "cms"."_blog_posts_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "cms"."_blog_posts_v" ADD CONSTRAINT "_blog_posts_v_parent_id_blog_posts_id_fk" FOREIGN KEY ("parent_id") REFERENCES "cms"."blog_posts"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "cms"."_blog_posts_v" ADD CONSTRAINT "_blog_posts_v_version_primary_category_id_blog_categories_id_fk" FOREIGN KEY ("version_primary_category_id") REFERENCES "cms"."blog_categories"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "cms"."_blog_posts_v_locales" ADD CONSTRAINT "_blog_posts_v_locales_version_meta_image_id_media_id_fk" FOREIGN KEY ("version_meta_image_id") REFERENCES "cms"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "cms"."_blog_posts_v_locales" ADD CONSTRAINT "_blog_posts_v_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "cms"."_blog_posts_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "cms"."_blog_posts_v_rels" ADD CONSTRAINT "_blog_posts_v_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "cms"."_blog_posts_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "cms"."_blog_posts_v_rels" ADD CONSTRAINT "_blog_posts_v_rels_blog_categories_fk" FOREIGN KEY ("blog_categories_id") REFERENCES "cms"."blog_categories"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "cms"."_blog_posts_v_rels" ADD CONSTRAINT "_blog_posts_v_rels_blog_posts_fk" FOREIGN KEY ("blog_posts_id") REFERENCES "cms"."blog_posts"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "cms"."bird_species_photography_tips" ADD CONSTRAINT "bird_species_photography_tips_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "cms"."bird_species"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "cms"."bird_species_photography_tips_locales" ADD CONSTRAINT "bird_species_photography_tips_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "cms"."bird_species_photography_tips"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "cms"."bird_species" ADD CONSTRAINT "bird_species_category_id_bird_categories_id_fk" FOREIGN KEY ("category_id") REFERENCES "cms"."bird_categories"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "cms"."bird_species_locales" ADD CONSTRAINT "bird_species_locales_meta_image_id_media_id_fk" FOREIGN KEY ("meta_image_id") REFERENCES "cms"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "cms"."bird_species_locales" ADD CONSTRAINT "bird_species_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "cms"."bird_species"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "cms"."bird_species_rels" ADD CONSTRAINT "bird_species_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "cms"."bird_species"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "cms"."bird_species_rels" ADD CONSTRAINT "bird_species_rels_bird_species_fk" FOREIGN KEY ("bird_species_id") REFERENCES "cms"."bird_species"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "cms"."users_sessions" ADD CONSTRAINT "users_sessions_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "cms"."users"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "cms"."payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "cms"."payload_locked_documents"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "cms"."payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_pages_fk" FOREIGN KEY ("pages_id") REFERENCES "cms"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "cms"."payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_media_fk" FOREIGN KEY ("media_id") REFERENCES "cms"."media"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "cms"."payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_blog_posts_fk" FOREIGN KEY ("blog_posts_id") REFERENCES "cms"."blog_posts"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "cms"."payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_blog_categories_fk" FOREIGN KEY ("blog_categories_id") REFERENCES "cms"."blog_categories"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "cms"."payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_bird_species_fk" FOREIGN KEY ("bird_species_id") REFERENCES "cms"."bird_species"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "cms"."payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_bird_categories_fk" FOREIGN KEY ("bird_categories_id") REFERENCES "cms"."bird_categories"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "cms"."payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_users_fk" FOREIGN KEY ("users_id") REFERENCES "cms"."users"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "cms"."payload_preferences_rels" ADD CONSTRAINT "payload_preferences_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "cms"."payload_preferences"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "cms"."payload_preferences_rels" ADD CONSTRAINT "payload_preferences_rels_users_fk" FOREIGN KEY ("users_id") REFERENCES "cms"."users"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "cms"."site_settings_faq_items" ADD CONSTRAINT "site_settings_faq_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "cms"."site_settings"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "cms"."site_settings_faq_items_locales" ADD CONSTRAINT "site_settings_faq_items_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "cms"."site_settings_faq_items"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "cms"."site_settings_testimonial_items" ADD CONSTRAINT "site_settings_testimonial_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "cms"."site_settings"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "cms"."site_settings_testimonial_items_locales" ADD CONSTRAINT "site_settings_testimonial_items_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "cms"."site_settings_testimonial_items"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "cms"."site_settings_footer_pousada_links" ADD CONSTRAINT "site_settings_footer_pousada_links_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "cms"."site_settings"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "cms"."site_settings_footer_pousada_links_locales" ADD CONSTRAINT "site_settings_footer_pousada_links_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "cms"."site_settings_footer_pousada_links"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "cms"."site_settings_footer_experiencias_links" ADD CONSTRAINT "site_settings_footer_experiencias_links_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "cms"."site_settings"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "cms"."site_settings_footer_experiencias_links_locales" ADD CONSTRAINT "site_settings_footer_experiencias_links_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "cms"."site_settings_footer_experiencias_links"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "cms"."site_settings_footer_legal_links" ADD CONSTRAINT "site_settings_footer_legal_links_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "cms"."site_settings"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "cms"."site_settings_footer_legal_links_locales" ADD CONSTRAINT "site_settings_footer_legal_links_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "cms"."site_settings_footer_legal_links"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "cms"."site_settings_authors_knows_about" ADD CONSTRAINT "site_settings_authors_knows_about_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "cms"."site_settings_authors"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "cms"."site_settings_authors" ADD CONSTRAINT "site_settings_authors_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "cms"."site_settings"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "cms"."site_settings_authors_locales" ADD CONSTRAINT "site_settings_authors_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "cms"."site_settings_authors"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "cms"."site_settings_seasonal_events" ADD CONSTRAINT "site_settings_seasonal_events_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "cms"."site_settings"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "cms"."site_settings_seasonal_events_locales" ADD CONSTRAINT "site_settings_seasonal_events_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "cms"."site_settings_seasonal_events"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "cms"."site_settings_locales" ADD CONSTRAINT "site_settings_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "cms"."site_settings"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "cms"."_site_settings_v_version_faq_items" ADD CONSTRAINT "_site_settings_v_version_faq_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "cms"."_site_settings_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "cms"."_site_settings_v_version_faq_items_locales" ADD CONSTRAINT "_site_settings_v_version_faq_items_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "cms"."_site_settings_v_version_faq_items"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "cms"."_site_settings_v_version_testimonial_items" ADD CONSTRAINT "_site_settings_v_version_testimonial_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "cms"."_site_settings_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "cms"."_site_settings_v_version_testimonial_items_locales" ADD CONSTRAINT "_site_settings_v_version_testimonial_items_locales_parent_fk" FOREIGN KEY ("_parent_id") REFERENCES "cms"."_site_settings_v_version_testimonial_items"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "cms"."_site_settings_v_version_footer_pousada_links" ADD CONSTRAINT "_site_settings_v_version_footer_pousada_links_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "cms"."_site_settings_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "cms"."_site_settings_v_version_footer_pousada_links_locales" ADD CONSTRAINT "_site_settings_v_version_footer_pousada_links_locales_par_fk" FOREIGN KEY ("_parent_id") REFERENCES "cms"."_site_settings_v_version_footer_pousada_links"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "cms"."_site_settings_v_version_footer_experiencias_links" ADD CONSTRAINT "_site_settings_v_version_footer_experiencias_links_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "cms"."_site_settings_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "cms"."_site_settings_v_version_footer_experiencias_links_locales" ADD CONSTRAINT "_site_settings_v_version_footer_experiencias_links_locale_fk" FOREIGN KEY ("_parent_id") REFERENCES "cms"."_site_settings_v_version_footer_experiencias_links"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "cms"."_site_settings_v_version_footer_legal_links" ADD CONSTRAINT "_site_settings_v_version_footer_legal_links_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "cms"."_site_settings_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "cms"."_site_settings_v_version_footer_legal_links_locales" ADD CONSTRAINT "_site_settings_v_version_footer_legal_links_locales_paren_fk" FOREIGN KEY ("_parent_id") REFERENCES "cms"."_site_settings_v_version_footer_legal_links"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "cms"."_site_settings_v_version_authors_knows_about" ADD CONSTRAINT "_site_settings_v_version_authors_knows_about_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "cms"."_site_settings_v_version_authors"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "cms"."_site_settings_v_version_authors" ADD CONSTRAINT "_site_settings_v_version_authors_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "cms"."_site_settings_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "cms"."_site_settings_v_version_authors_locales" ADD CONSTRAINT "_site_settings_v_version_authors_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "cms"."_site_settings_v_version_authors"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "cms"."_site_settings_v_version_seasonal_events" ADD CONSTRAINT "_site_settings_v_version_seasonal_events_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "cms"."_site_settings_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "cms"."_site_settings_v_version_seasonal_events_locales" ADD CONSTRAINT "_site_settings_v_version_seasonal_events_locales_parent_i_fk" FOREIGN KEY ("_parent_id") REFERENCES "cms"."_site_settings_v_version_seasonal_events"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "cms"."_site_settings_v_locales" ADD CONSTRAINT "_site_settings_v_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "cms"."_site_settings_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "cms"."home_content_about_us_body" ADD CONSTRAINT "home_content_about_us_body_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "cms"."home_content"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "cms"."home_content_about_us_body_locales" ADD CONSTRAINT "home_content_about_us_body_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "cms"."home_content_about_us_body"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "cms"."home_content_about_us_features" ADD CONSTRAINT "home_content_about_us_features_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "cms"."home_content"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "cms"."home_content_about_us_features_locales" ADD CONSTRAINT "home_content_about_us_features_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "cms"."home_content_about_us_features"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "cms"."home_content_expeditions_items" ADD CONSTRAINT "home_content_expeditions_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "cms"."home_content"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "cms"."home_content_expeditions_items_locales" ADD CONSTRAINT "home_content_expeditions_items_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "cms"."home_content_expeditions_items"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "cms"."home_content_stats_items" ADD CONSTRAINT "home_content_stats_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "cms"."home_content"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "cms"."home_content_stats_items_locales" ADD CONSTRAINT "home_content_stats_items_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "cms"."home_content_stats_items"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "cms"."home_content_impact_items" ADD CONSTRAINT "home_content_impact_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "cms"."home_content"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "cms"."home_content_impact_items_locales" ADD CONSTRAINT "home_content_impact_items_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "cms"."home_content_impact_items"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "cms"."home_content_faq_items" ADD CONSTRAINT "home_content_faq_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "cms"."home_content"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "cms"."home_content_faq_items_locales" ADD CONSTRAINT "home_content_faq_items_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "cms"."home_content_faq_items"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "cms"."home_content_locales" ADD CONSTRAINT "home_content_locales_meta_image_id_media_id_fk" FOREIGN KEY ("meta_image_id") REFERENCES "cms"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "cms"."home_content_locales" ADD CONSTRAINT "home_content_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "cms"."home_content"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "cms"."_home_content_v_version_about_us_body" ADD CONSTRAINT "_home_content_v_version_about_us_body_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "cms"."_home_content_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "cms"."_home_content_v_version_about_us_body_locales" ADD CONSTRAINT "_home_content_v_version_about_us_body_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "cms"."_home_content_v_version_about_us_body"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "cms"."_home_content_v_version_about_us_features" ADD CONSTRAINT "_home_content_v_version_about_us_features_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "cms"."_home_content_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "cms"."_home_content_v_version_about_us_features_locales" ADD CONSTRAINT "_home_content_v_version_about_us_features_locales_parent__fk" FOREIGN KEY ("_parent_id") REFERENCES "cms"."_home_content_v_version_about_us_features"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "cms"."_home_content_v_version_expeditions_items" ADD CONSTRAINT "_home_content_v_version_expeditions_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "cms"."_home_content_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "cms"."_home_content_v_version_expeditions_items_locales" ADD CONSTRAINT "_home_content_v_version_expeditions_items_locales_parent__fk" FOREIGN KEY ("_parent_id") REFERENCES "cms"."_home_content_v_version_expeditions_items"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "cms"."_home_content_v_version_stats_items" ADD CONSTRAINT "_home_content_v_version_stats_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "cms"."_home_content_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "cms"."_home_content_v_version_stats_items_locales" ADD CONSTRAINT "_home_content_v_version_stats_items_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "cms"."_home_content_v_version_stats_items"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "cms"."_home_content_v_version_impact_items" ADD CONSTRAINT "_home_content_v_version_impact_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "cms"."_home_content_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "cms"."_home_content_v_version_impact_items_locales" ADD CONSTRAINT "_home_content_v_version_impact_items_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "cms"."_home_content_v_version_impact_items"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "cms"."_home_content_v_version_faq_items" ADD CONSTRAINT "_home_content_v_version_faq_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "cms"."_home_content_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "cms"."_home_content_v_version_faq_items_locales" ADD CONSTRAINT "_home_content_v_version_faq_items_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "cms"."_home_content_v_version_faq_items"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "cms"."_home_content_v_locales" ADD CONSTRAINT "_home_content_v_locales_version_meta_image_id_media_id_fk" FOREIGN KEY ("version_meta_image_id") REFERENCES "cms"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "cms"."_home_content_v_locales" ADD CONSTRAINT "_home_content_v_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "cms"."_home_content_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "cms"."acomodacoes_content_manifesto_segments" ADD CONSTRAINT "acomodacoes_content_manifesto_segments_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "cms"."acomodacoes_content"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "cms"."acomodacoes_content_manifesto_segments_locales" ADD CONSTRAINT "acomodacoes_content_manifesto_segments_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "cms"."acomodacoes_content_manifesto_segments"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "cms"."acomodacoes_content_highlights_items" ADD CONSTRAINT "acomodacoes_content_highlights_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "cms"."acomodacoes_content"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "cms"."acomodacoes_content_highlights_items_locales" ADD CONSTRAINT "acomodacoes_content_highlights_items_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "cms"."acomodacoes_content_highlights_items"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "cms"."acomodacoes_content_rooms_features" ADD CONSTRAINT "acomodacoes_content_rooms_features_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "cms"."acomodacoes_content_rooms"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "cms"."acomodacoes_content_rooms_features_locales" ADD CONSTRAINT "acomodacoes_content_rooms_features_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "cms"."acomodacoes_content_rooms_features"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "cms"."acomodacoes_content_rooms" ADD CONSTRAINT "acomodacoes_content_rooms_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "cms"."acomodacoes_content"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "cms"."acomodacoes_content_rooms_locales" ADD CONSTRAINT "acomodacoes_content_rooms_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "cms"."acomodacoes_content_rooms"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "cms"."acomodacoes_content_culinary_images" ADD CONSTRAINT "acomodacoes_content_culinary_images_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "cms"."acomodacoes_content"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "cms"."acomodacoes_content_culinary_images_locales" ADD CONSTRAINT "acomodacoes_content_culinary_images_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "cms"."acomodacoes_content_culinary_images"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "cms"."acomodacoes_content_faq_items" ADD CONSTRAINT "acomodacoes_content_faq_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "cms"."acomodacoes_content"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "cms"."acomodacoes_content_faq_items_locales" ADD CONSTRAINT "acomodacoes_content_faq_items_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "cms"."acomodacoes_content_faq_items"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "cms"."acomodacoes_content_locales" ADD CONSTRAINT "acomodacoes_content_locales_meta_image_id_media_id_fk" FOREIGN KEY ("meta_image_id") REFERENCES "cms"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "cms"."acomodacoes_content_locales" ADD CONSTRAINT "acomodacoes_content_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "cms"."acomodacoes_content"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "cms"."_acomodacoes_content_v_version_manifesto_segments" ADD CONSTRAINT "_acomodacoes_content_v_version_manifesto_segments_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "cms"."_acomodacoes_content_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "cms"."_acomodacoes_content_v_version_manifesto_segments_locales" ADD CONSTRAINT "_acomodacoes_content_v_version_manifesto_segments_locales_fk" FOREIGN KEY ("_parent_id") REFERENCES "cms"."_acomodacoes_content_v_version_manifesto_segments"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "cms"."_acomodacoes_content_v_version_highlights_items" ADD CONSTRAINT "_acomodacoes_content_v_version_highlights_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "cms"."_acomodacoes_content_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "cms"."_acomodacoes_content_v_version_highlights_items_locales" ADD CONSTRAINT "_acomodacoes_content_v_version_highlights_items_locales_p_fk" FOREIGN KEY ("_parent_id") REFERENCES "cms"."_acomodacoes_content_v_version_highlights_items"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "cms"."_acomodacoes_content_v_version_rooms_features" ADD CONSTRAINT "_acomodacoes_content_v_version_rooms_features_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "cms"."_acomodacoes_content_v_version_rooms"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "cms"."_acomodacoes_content_v_version_rooms_features_locales" ADD CONSTRAINT "_acomodacoes_content_v_version_rooms_features_locales_par_fk" FOREIGN KEY ("_parent_id") REFERENCES "cms"."_acomodacoes_content_v_version_rooms_features"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "cms"."_acomodacoes_content_v_version_rooms" ADD CONSTRAINT "_acomodacoes_content_v_version_rooms_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "cms"."_acomodacoes_content_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "cms"."_acomodacoes_content_v_version_rooms_locales" ADD CONSTRAINT "_acomodacoes_content_v_version_rooms_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "cms"."_acomodacoes_content_v_version_rooms"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "cms"."_acomodacoes_content_v_version_culinary_images" ADD CONSTRAINT "_acomodacoes_content_v_version_culinary_images_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "cms"."_acomodacoes_content_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "cms"."_acomodacoes_content_v_version_culinary_images_locales" ADD CONSTRAINT "_acomodacoes_content_v_version_culinary_images_locales_pa_fk" FOREIGN KEY ("_parent_id") REFERENCES "cms"."_acomodacoes_content_v_version_culinary_images"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "cms"."_acomodacoes_content_v_version_faq_items" ADD CONSTRAINT "_acomodacoes_content_v_version_faq_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "cms"."_acomodacoes_content_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "cms"."_acomodacoes_content_v_version_faq_items_locales" ADD CONSTRAINT "_acomodacoes_content_v_version_faq_items_locales_parent_i_fk" FOREIGN KEY ("_parent_id") REFERENCES "cms"."_acomodacoes_content_v_version_faq_items"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "cms"."_acomodacoes_content_v_locales" ADD CONSTRAINT "_acomodacoes_content_v_locales_version_meta_image_id_media_id_fk" FOREIGN KEY ("version_meta_image_id") REFERENCES "cms"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "cms"."_acomodacoes_content_v_locales" ADD CONSTRAINT "_acomodacoes_content_v_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "cms"."_acomodacoes_content_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "cms"."culinaria_content_manifesto_segments" ADD CONSTRAINT "culinaria_content_manifesto_segments_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "cms"."culinaria_content"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "cms"."culinaria_content_manifesto_segments_locales" ADD CONSTRAINT "culinaria_content_manifesto_segments_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "cms"."culinaria_content_manifesto_segments"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "cms"."culinaria_content_menu_body" ADD CONSTRAINT "culinaria_content_menu_body_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "cms"."culinaria_content"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "cms"."culinaria_content_menu_body_locales" ADD CONSTRAINT "culinaria_content_menu_body_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "cms"."culinaria_content_menu_body"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "cms"."culinaria_content_menu_features" ADD CONSTRAINT "culinaria_content_menu_features_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "cms"."culinaria_content"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "cms"."culinaria_content_menu_features_locales" ADD CONSTRAINT "culinaria_content_menu_features_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "cms"."culinaria_content_menu_features"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "cms"."culinaria_content_highlights_items" ADD CONSTRAINT "culinaria_content_highlights_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "cms"."culinaria_content"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "cms"."culinaria_content_highlights_items_locales" ADD CONSTRAINT "culinaria_content_highlights_items_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "cms"."culinaria_content_highlights_items"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "cms"."culinaria_content_services_items" ADD CONSTRAINT "culinaria_content_services_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "cms"."culinaria_content"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "cms"."culinaria_content_services_items_locales" ADD CONSTRAINT "culinaria_content_services_items_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "cms"."culinaria_content_services_items"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "cms"."culinaria_content_experience_body" ADD CONSTRAINT "culinaria_content_experience_body_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "cms"."culinaria_content"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "cms"."culinaria_content_experience_body_locales" ADD CONSTRAINT "culinaria_content_experience_body_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "cms"."culinaria_content_experience_body"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "cms"."culinaria_content_faq_items" ADD CONSTRAINT "culinaria_content_faq_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "cms"."culinaria_content"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "cms"."culinaria_content_faq_items_locales" ADD CONSTRAINT "culinaria_content_faq_items_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "cms"."culinaria_content_faq_items"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "cms"."culinaria_content_locales" ADD CONSTRAINT "culinaria_content_locales_meta_image_id_media_id_fk" FOREIGN KEY ("meta_image_id") REFERENCES "cms"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "cms"."culinaria_content_locales" ADD CONSTRAINT "culinaria_content_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "cms"."culinaria_content"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "cms"."_culinaria_content_v_version_manifesto_segments" ADD CONSTRAINT "_culinaria_content_v_version_manifesto_segments_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "cms"."_culinaria_content_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "cms"."_culinaria_content_v_version_manifesto_segments_locales" ADD CONSTRAINT "_culinaria_content_v_version_manifesto_segments_locales_p_fk" FOREIGN KEY ("_parent_id") REFERENCES "cms"."_culinaria_content_v_version_manifesto_segments"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "cms"."_culinaria_content_v_version_menu_body" ADD CONSTRAINT "_culinaria_content_v_version_menu_body_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "cms"."_culinaria_content_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "cms"."_culinaria_content_v_version_menu_body_locales" ADD CONSTRAINT "_culinaria_content_v_version_menu_body_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "cms"."_culinaria_content_v_version_menu_body"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "cms"."_culinaria_content_v_version_menu_features" ADD CONSTRAINT "_culinaria_content_v_version_menu_features_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "cms"."_culinaria_content_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "cms"."_culinaria_content_v_version_menu_features_locales" ADD CONSTRAINT "_culinaria_content_v_version_menu_features_locales_parent_fk" FOREIGN KEY ("_parent_id") REFERENCES "cms"."_culinaria_content_v_version_menu_features"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "cms"."_culinaria_content_v_version_highlights_items" ADD CONSTRAINT "_culinaria_content_v_version_highlights_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "cms"."_culinaria_content_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "cms"."_culinaria_content_v_version_highlights_items_locales" ADD CONSTRAINT "_culinaria_content_v_version_highlights_items_locales_par_fk" FOREIGN KEY ("_parent_id") REFERENCES "cms"."_culinaria_content_v_version_highlights_items"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "cms"."_culinaria_content_v_version_services_items" ADD CONSTRAINT "_culinaria_content_v_version_services_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "cms"."_culinaria_content_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "cms"."_culinaria_content_v_version_services_items_locales" ADD CONSTRAINT "_culinaria_content_v_version_services_items_locales_paren_fk" FOREIGN KEY ("_parent_id") REFERENCES "cms"."_culinaria_content_v_version_services_items"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "cms"."_culinaria_content_v_version_experience_body" ADD CONSTRAINT "_culinaria_content_v_version_experience_body_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "cms"."_culinaria_content_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "cms"."_culinaria_content_v_version_experience_body_locales" ADD CONSTRAINT "_culinaria_content_v_version_experience_body_locales_pare_fk" FOREIGN KEY ("_parent_id") REFERENCES "cms"."_culinaria_content_v_version_experience_body"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "cms"."_culinaria_content_v_version_faq_items" ADD CONSTRAINT "_culinaria_content_v_version_faq_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "cms"."_culinaria_content_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "cms"."_culinaria_content_v_version_faq_items_locales" ADD CONSTRAINT "_culinaria_content_v_version_faq_items_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "cms"."_culinaria_content_v_version_faq_items"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "cms"."_culinaria_content_v_locales" ADD CONSTRAINT "_culinaria_content_v_locales_version_meta_image_id_media_id_fk" FOREIGN KEY ("version_meta_image_id") REFERENCES "cms"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "cms"."_culinaria_content_v_locales" ADD CONSTRAINT "_culinaria_content_v_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "cms"."_culinaria_content_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "cms"."pesca_content_manifesto_segments" ADD CONSTRAINT "pesca_content_manifesto_segments_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "cms"."pesca_content"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "cms"."pesca_content_manifesto_segments_locales" ADD CONSTRAINT "pesca_content_manifesto_segments_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "cms"."pesca_content_manifesto_segments"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "cms"."pesca_content_sobre_nos_body" ADD CONSTRAINT "pesca_content_sobre_nos_body_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "cms"."pesca_content"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "cms"."pesca_content_sobre_nos_body_locales" ADD CONSTRAINT "pesca_content_sobre_nos_body_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "cms"."pesca_content_sobre_nos_body"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "cms"."pesca_content_sobre_nos_features" ADD CONSTRAINT "pesca_content_sobre_nos_features_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "cms"."pesca_content"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "cms"."pesca_content_sobre_nos_features_locales" ADD CONSTRAINT "pesca_content_sobre_nos_features_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "cms"."pesca_content_sobre_nos_features"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "cms"."pesca_content_highlights_items" ADD CONSTRAINT "pesca_content_highlights_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "cms"."pesca_content"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "cms"."pesca_content_highlights_items_locales" ADD CONSTRAINT "pesca_content_highlights_items_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "cms"."pesca_content_highlights_items"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "cms"."pesca_content_services_items" ADD CONSTRAINT "pesca_content_services_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "cms"."pesca_content"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "cms"."pesca_content_services_items_locales" ADD CONSTRAINT "pesca_content_services_items_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "cms"."pesca_content_services_items"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "cms"."pesca_content_faq_items" ADD CONSTRAINT "pesca_content_faq_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "cms"."pesca_content"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "cms"."pesca_content_faq_items_locales" ADD CONSTRAINT "pesca_content_faq_items_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "cms"."pesca_content_faq_items"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "cms"."pesca_content_locales" ADD CONSTRAINT "pesca_content_locales_meta_image_id_media_id_fk" FOREIGN KEY ("meta_image_id") REFERENCES "cms"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "cms"."pesca_content_locales" ADD CONSTRAINT "pesca_content_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "cms"."pesca_content"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "cms"."_pesca_content_v_version_manifesto_segments" ADD CONSTRAINT "_pesca_content_v_version_manifesto_segments_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "cms"."_pesca_content_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "cms"."_pesca_content_v_version_manifesto_segments_locales" ADD CONSTRAINT "_pesca_content_v_version_manifesto_segments_locales_paren_fk" FOREIGN KEY ("_parent_id") REFERENCES "cms"."_pesca_content_v_version_manifesto_segments"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "cms"."_pesca_content_v_version_sobre_nos_body" ADD CONSTRAINT "_pesca_content_v_version_sobre_nos_body_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "cms"."_pesca_content_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "cms"."_pesca_content_v_version_sobre_nos_body_locales" ADD CONSTRAINT "_pesca_content_v_version_sobre_nos_body_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "cms"."_pesca_content_v_version_sobre_nos_body"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "cms"."_pesca_content_v_version_sobre_nos_features" ADD CONSTRAINT "_pesca_content_v_version_sobre_nos_features_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "cms"."_pesca_content_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "cms"."_pesca_content_v_version_sobre_nos_features_locales" ADD CONSTRAINT "_pesca_content_v_version_sobre_nos_features_locales_paren_fk" FOREIGN KEY ("_parent_id") REFERENCES "cms"."_pesca_content_v_version_sobre_nos_features"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "cms"."_pesca_content_v_version_highlights_items" ADD CONSTRAINT "_pesca_content_v_version_highlights_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "cms"."_pesca_content_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "cms"."_pesca_content_v_version_highlights_items_locales" ADD CONSTRAINT "_pesca_content_v_version_highlights_items_locales_parent__fk" FOREIGN KEY ("_parent_id") REFERENCES "cms"."_pesca_content_v_version_highlights_items"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "cms"."_pesca_content_v_version_services_items" ADD CONSTRAINT "_pesca_content_v_version_services_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "cms"."_pesca_content_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "cms"."_pesca_content_v_version_services_items_locales" ADD CONSTRAINT "_pesca_content_v_version_services_items_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "cms"."_pesca_content_v_version_services_items"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "cms"."_pesca_content_v_version_faq_items" ADD CONSTRAINT "_pesca_content_v_version_faq_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "cms"."_pesca_content_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "cms"."_pesca_content_v_version_faq_items_locales" ADD CONSTRAINT "_pesca_content_v_version_faq_items_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "cms"."_pesca_content_v_version_faq_items"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "cms"."_pesca_content_v_locales" ADD CONSTRAINT "_pesca_content_v_locales_version_meta_image_id_media_id_fk" FOREIGN KEY ("version_meta_image_id") REFERENCES "cms"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "cms"."_pesca_content_v_locales" ADD CONSTRAINT "_pesca_content_v_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "cms"."_pesca_content_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "cms"."ecoturismo_content_manifesto_segments" ADD CONSTRAINT "ecoturismo_content_manifesto_segments_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "cms"."ecoturismo_content"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "cms"."ecoturismo_content_manifesto_segments_locales" ADD CONSTRAINT "ecoturismo_content_manifesto_segments_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "cms"."ecoturismo_content_manifesto_segments"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "cms"."ecoturismo_content_sobre_nos_body" ADD CONSTRAINT "ecoturismo_content_sobre_nos_body_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "cms"."ecoturismo_content"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "cms"."ecoturismo_content_sobre_nos_body_locales" ADD CONSTRAINT "ecoturismo_content_sobre_nos_body_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "cms"."ecoturismo_content_sobre_nos_body"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "cms"."ecoturismo_content_sobre_nos_features" ADD CONSTRAINT "ecoturismo_content_sobre_nos_features_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "cms"."ecoturismo_content"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "cms"."ecoturismo_content_sobre_nos_features_locales" ADD CONSTRAINT "ecoturismo_content_sobre_nos_features_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "cms"."ecoturismo_content_sobre_nos_features"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "cms"."ecoturismo_content_highlights_items" ADD CONSTRAINT "ecoturismo_content_highlights_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "cms"."ecoturismo_content"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "cms"."ecoturismo_content_highlights_items_locales" ADD CONSTRAINT "ecoturismo_content_highlights_items_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "cms"."ecoturismo_content_highlights_items"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "cms"."ecoturismo_content_services_items" ADD CONSTRAINT "ecoturismo_content_services_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "cms"."ecoturismo_content"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "cms"."ecoturismo_content_services_items_locales" ADD CONSTRAINT "ecoturismo_content_services_items_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "cms"."ecoturismo_content_services_items"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "cms"."ecoturismo_content_faq_items" ADD CONSTRAINT "ecoturismo_content_faq_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "cms"."ecoturismo_content"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "cms"."ecoturismo_content_faq_items_locales" ADD CONSTRAINT "ecoturismo_content_faq_items_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "cms"."ecoturismo_content_faq_items"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "cms"."ecoturismo_content_locales" ADD CONSTRAINT "ecoturismo_content_locales_meta_image_id_media_id_fk" FOREIGN KEY ("meta_image_id") REFERENCES "cms"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "cms"."ecoturismo_content_locales" ADD CONSTRAINT "ecoturismo_content_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "cms"."ecoturismo_content"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "cms"."_ecoturismo_content_v_version_manifesto_segments" ADD CONSTRAINT "_ecoturismo_content_v_version_manifesto_segments_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "cms"."_ecoturismo_content_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "cms"."_ecoturismo_content_v_version_manifesto_segments_locales" ADD CONSTRAINT "_ecoturismo_content_v_version_manifesto_segments_locales__fk" FOREIGN KEY ("_parent_id") REFERENCES "cms"."_ecoturismo_content_v_version_manifesto_segments"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "cms"."_ecoturismo_content_v_version_sobre_nos_body" ADD CONSTRAINT "_ecoturismo_content_v_version_sobre_nos_body_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "cms"."_ecoturismo_content_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "cms"."_ecoturismo_content_v_version_sobre_nos_body_locales" ADD CONSTRAINT "_ecoturismo_content_v_version_sobre_nos_body_locales_pare_fk" FOREIGN KEY ("_parent_id") REFERENCES "cms"."_ecoturismo_content_v_version_sobre_nos_body"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "cms"."_ecoturismo_content_v_version_sobre_nos_features" ADD CONSTRAINT "_ecoturismo_content_v_version_sobre_nos_features_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "cms"."_ecoturismo_content_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "cms"."_ecoturismo_content_v_version_sobre_nos_features_locales" ADD CONSTRAINT "_ecoturismo_content_v_version_sobre_nos_features_locales__fk" FOREIGN KEY ("_parent_id") REFERENCES "cms"."_ecoturismo_content_v_version_sobre_nos_features"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "cms"."_ecoturismo_content_v_version_highlights_items" ADD CONSTRAINT "_ecoturismo_content_v_version_highlights_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "cms"."_ecoturismo_content_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "cms"."_ecoturismo_content_v_version_highlights_items_locales" ADD CONSTRAINT "_ecoturismo_content_v_version_highlights_items_locales_pa_fk" FOREIGN KEY ("_parent_id") REFERENCES "cms"."_ecoturismo_content_v_version_highlights_items"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "cms"."_ecoturismo_content_v_version_services_items" ADD CONSTRAINT "_ecoturismo_content_v_version_services_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "cms"."_ecoturismo_content_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "cms"."_ecoturismo_content_v_version_services_items_locales" ADD CONSTRAINT "_ecoturismo_content_v_version_services_items_locales_pare_fk" FOREIGN KEY ("_parent_id") REFERENCES "cms"."_ecoturismo_content_v_version_services_items"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "cms"."_ecoturismo_content_v_version_faq_items" ADD CONSTRAINT "_ecoturismo_content_v_version_faq_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "cms"."_ecoturismo_content_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "cms"."_ecoturismo_content_v_version_faq_items_locales" ADD CONSTRAINT "_ecoturismo_content_v_version_faq_items_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "cms"."_ecoturismo_content_v_version_faq_items"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "cms"."_ecoturismo_content_v_locales" ADD CONSTRAINT "_ecoturismo_content_v_locales_version_meta_image_id_media_id_fk" FOREIGN KEY ("version_meta_image_id") REFERENCES "cms"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "cms"."_ecoturismo_content_v_locales" ADD CONSTRAINT "_ecoturismo_content_v_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "cms"."_ecoturismo_content_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "cms"."birdwatching_content_manifesto_segments" ADD CONSTRAINT "birdwatching_content_manifesto_segments_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "cms"."birdwatching_content"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "cms"."birdwatching_content_manifesto_segments_locales" ADD CONSTRAINT "birdwatching_content_manifesto_segments_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "cms"."birdwatching_content_manifesto_segments"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "cms"."birdwatching_content_sobre_nos_body" ADD CONSTRAINT "birdwatching_content_sobre_nos_body_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "cms"."birdwatching_content"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "cms"."birdwatching_content_sobre_nos_body_locales" ADD CONSTRAINT "birdwatching_content_sobre_nos_body_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "cms"."birdwatching_content_sobre_nos_body"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "cms"."birdwatching_content_sobre_nos_features" ADD CONSTRAINT "birdwatching_content_sobre_nos_features_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "cms"."birdwatching_content"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "cms"."birdwatching_content_sobre_nos_features_locales" ADD CONSTRAINT "birdwatching_content_sobre_nos_features_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "cms"."birdwatching_content_sobre_nos_features"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "cms"."birdwatching_content_highlights_items" ADD CONSTRAINT "birdwatching_content_highlights_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "cms"."birdwatching_content"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "cms"."birdwatching_content_highlights_items_locales" ADD CONSTRAINT "birdwatching_content_highlights_items_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "cms"."birdwatching_content_highlights_items"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "cms"."birdwatching_content_faq_items" ADD CONSTRAINT "birdwatching_content_faq_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "cms"."birdwatching_content"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "cms"."birdwatching_content_faq_items_locales" ADD CONSTRAINT "birdwatching_content_faq_items_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "cms"."birdwatching_content_faq_items"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "cms"."birdwatching_content_locales" ADD CONSTRAINT "birdwatching_content_locales_meta_image_id_media_id_fk" FOREIGN KEY ("meta_image_id") REFERENCES "cms"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "cms"."birdwatching_content_locales" ADD CONSTRAINT "birdwatching_content_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "cms"."birdwatching_content"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "cms"."_birdwatching_content_v_version_manifesto_segments" ADD CONSTRAINT "_birdwatching_content_v_version_manifesto_segments_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "cms"."_birdwatching_content_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "cms"."_birdwatching_content_v_version_manifesto_segments_locales" ADD CONSTRAINT "_birdwatching_content_v_version_manifesto_segments_locale_fk" FOREIGN KEY ("_parent_id") REFERENCES "cms"."_birdwatching_content_v_version_manifesto_segments"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "cms"."_birdwatching_content_v_version_sobre_nos_body" ADD CONSTRAINT "_birdwatching_content_v_version_sobre_nos_body_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "cms"."_birdwatching_content_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "cms"."_birdwatching_content_v_version_sobre_nos_body_locales" ADD CONSTRAINT "_birdwatching_content_v_version_sobre_nos_body_locales_pa_fk" FOREIGN KEY ("_parent_id") REFERENCES "cms"."_birdwatching_content_v_version_sobre_nos_body"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "cms"."_birdwatching_content_v_version_sobre_nos_features" ADD CONSTRAINT "_birdwatching_content_v_version_sobre_nos_features_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "cms"."_birdwatching_content_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "cms"."_birdwatching_content_v_version_sobre_nos_features_locales" ADD CONSTRAINT "_birdwatching_content_v_version_sobre_nos_features_locale_fk" FOREIGN KEY ("_parent_id") REFERENCES "cms"."_birdwatching_content_v_version_sobre_nos_features"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "cms"."_birdwatching_content_v_version_highlights_items" ADD CONSTRAINT "_birdwatching_content_v_version_highlights_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "cms"."_birdwatching_content_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "cms"."_birdwatching_content_v_version_highlights_items_locales" ADD CONSTRAINT "_birdwatching_content_v_version_highlights_items_locales__fk" FOREIGN KEY ("_parent_id") REFERENCES "cms"."_birdwatching_content_v_version_highlights_items"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "cms"."_birdwatching_content_v_version_faq_items" ADD CONSTRAINT "_birdwatching_content_v_version_faq_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "cms"."_birdwatching_content_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "cms"."_birdwatching_content_v_version_faq_items_locales" ADD CONSTRAINT "_birdwatching_content_v_version_faq_items_locales_parent__fk" FOREIGN KEY ("_parent_id") REFERENCES "cms"."_birdwatching_content_v_version_faq_items"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "cms"."_birdwatching_content_v_locales" ADD CONSTRAINT "_birdwatching_content_v_locales_version_meta_image_id_media_id_fk" FOREIGN KEY ("version_meta_image_id") REFERENCES "cms"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "cms"."_birdwatching_content_v_locales" ADD CONSTRAINT "_birdwatching_content_v_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "cms"."_birdwatching_content_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "cms"."contato_content_steps_placeholders" ADD CONSTRAINT "contato_content_steps_placeholders_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "cms"."contato_content"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "cms"."contato_content_steps_placeholders_locales" ADD CONSTRAINT "contato_content_steps_placeholders_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "cms"."contato_content_steps_placeholders"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "cms"."contato_content_channels_items" ADD CONSTRAINT "contato_content_channels_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "cms"."contato_content"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "cms"."contato_content_channels_items_locales" ADD CONSTRAINT "contato_content_channels_items_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "cms"."contato_content_channels_items"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "cms"."contato_content_locales" ADD CONSTRAINT "contato_content_locales_meta_image_id_media_id_fk" FOREIGN KEY ("meta_image_id") REFERENCES "cms"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "cms"."contato_content_locales" ADD CONSTRAINT "contato_content_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "cms"."contato_content"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "cms"."_contato_content_v_version_steps_placeholders" ADD CONSTRAINT "_contato_content_v_version_steps_placeholders_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "cms"."_contato_content_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "cms"."_contato_content_v_version_steps_placeholders_locales" ADD CONSTRAINT "_contato_content_v_version_steps_placeholders_locales_par_fk" FOREIGN KEY ("_parent_id") REFERENCES "cms"."_contato_content_v_version_steps_placeholders"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "cms"."_contato_content_v_version_channels_items" ADD CONSTRAINT "_contato_content_v_version_channels_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "cms"."_contato_content_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "cms"."_contato_content_v_version_channels_items_locales" ADD CONSTRAINT "_contato_content_v_version_channels_items_locales_parent__fk" FOREIGN KEY ("_parent_id") REFERENCES "cms"."_contato_content_v_version_channels_items"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "cms"."_contato_content_v_locales" ADD CONSTRAINT "_contato_content_v_locales_version_meta_image_id_media_id_fk" FOREIGN KEY ("version_meta_image_id") REFERENCES "cms"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "cms"."_contato_content_v_locales" ADD CONSTRAINT "_contato_content_v_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "cms"."_contato_content_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "cms"."nosso_impacto_content_manifesto_segments" ADD CONSTRAINT "nosso_impacto_content_manifesto_segments_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "cms"."nosso_impacto_content"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "cms"."nosso_impacto_content_manifesto_segments_locales" ADD CONSTRAINT "nosso_impacto_content_manifesto_segments_locales_parent_i_fk" FOREIGN KEY ("_parent_id") REFERENCES "cms"."nosso_impacto_content_manifesto_segments"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "cms"."nosso_impacto_content_rio_vivo_steps" ADD CONSTRAINT "nosso_impacto_content_rio_vivo_steps_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "cms"."nosso_impacto_content"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "cms"."nosso_impacto_content_rio_vivo_steps_locales" ADD CONSTRAINT "nosso_impacto_content_rio_vivo_steps_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "cms"."nosso_impacto_content_rio_vivo_steps"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "cms"."nosso_impacto_content_biodiversidade_counters" ADD CONSTRAINT "nosso_impacto_content_biodiversidade_counters_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "cms"."nosso_impacto_content"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "cms"."nosso_impacto_content_biodiversidade_counters_locales" ADD CONSTRAINT "nosso_impacto_content_biodiversidade_counters_locales_par_fk" FOREIGN KEY ("_parent_id") REFERENCES "cms"."nosso_impacto_content_biodiversidade_counters"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "cms"."nosso_impacto_content_comunidade_body" ADD CONSTRAINT "nosso_impacto_content_comunidade_body_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "cms"."nosso_impacto_content"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "cms"."nosso_impacto_content_comunidade_body_locales" ADD CONSTRAINT "nosso_impacto_content_comunidade_body_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "cms"."nosso_impacto_content_comunidade_body"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "cms"."nosso_impacto_content_operacao_practices" ADD CONSTRAINT "nosso_impacto_content_operacao_practices_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "cms"."nosso_impacto_content"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "cms"."nosso_impacto_content_operacao_practices_locales" ADD CONSTRAINT "nosso_impacto_content_operacao_practices_locales_parent_i_fk" FOREIGN KEY ("_parent_id") REFERENCES "cms"."nosso_impacto_content_operacao_practices"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "cms"."nosso_impacto_content_locales" ADD CONSTRAINT "nosso_impacto_content_locales_meta_image_id_media_id_fk" FOREIGN KEY ("meta_image_id") REFERENCES "cms"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "cms"."nosso_impacto_content_locales" ADD CONSTRAINT "nosso_impacto_content_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "cms"."nosso_impacto_content"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "cms"."_nosso_impacto_content_v_version_manifesto_segments" ADD CONSTRAINT "_nosso_impacto_content_v_version_manifesto_segments_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "cms"."_nosso_impacto_content_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "cms"."_nosso_impacto_content_v_version_manifesto_segments_locales" ADD CONSTRAINT "_nosso_impacto_content_v_version_manifesto_segments_local_fk" FOREIGN KEY ("_parent_id") REFERENCES "cms"."_nosso_impacto_content_v_version_manifesto_segments"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "cms"."_nosso_impacto_content_v_version_rio_vivo_steps" ADD CONSTRAINT "_nosso_impacto_content_v_version_rio_vivo_steps_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "cms"."_nosso_impacto_content_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "cms"."_nosso_impacto_content_v_version_rio_vivo_steps_locales" ADD CONSTRAINT "_nosso_impacto_content_v_version_rio_vivo_steps_locales_p_fk" FOREIGN KEY ("_parent_id") REFERENCES "cms"."_nosso_impacto_content_v_version_rio_vivo_steps"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "cms"."_nosso_impacto_content_v_version_biodiversidade_counters" ADD CONSTRAINT "_nosso_impacto_content_v_version_biodiversidade_counters_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "cms"."_nosso_impacto_content_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "cms"."_nosso_impacto_content_v_version_biodiversidade_counters_locales" ADD CONSTRAINT "_nosso_impacto_content_v_version_biodiversidade_counters__fk" FOREIGN KEY ("_parent_id") REFERENCES "cms"."_nosso_impacto_content_v_version_biodiversidade_counters"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "cms"."_nosso_impacto_content_v_version_comunidade_body" ADD CONSTRAINT "_nosso_impacto_content_v_version_comunidade_body_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "cms"."_nosso_impacto_content_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "cms"."_nosso_impacto_content_v_version_comunidade_body_locales" ADD CONSTRAINT "_nosso_impacto_content_v_version_comunidade_body_locales__fk" FOREIGN KEY ("_parent_id") REFERENCES "cms"."_nosso_impacto_content_v_version_comunidade_body"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "cms"."_nosso_impacto_content_v_version_operacao_practices" ADD CONSTRAINT "_nosso_impacto_content_v_version_operacao_practices_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "cms"."_nosso_impacto_content_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "cms"."_nosso_impacto_content_v_version_operacao_practices_locales" ADD CONSTRAINT "_nosso_impacto_content_v_version_operacao_practices_local_fk" FOREIGN KEY ("_parent_id") REFERENCES "cms"."_nosso_impacto_content_v_version_operacao_practices"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "cms"."_nosso_impacto_content_v_locales" ADD CONSTRAINT "_nosso_impacto_content_v_locales_version_meta_image_id_media_id_fk" FOREIGN KEY ("version_meta_image_id") REFERENCES "cms"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "cms"."_nosso_impacto_content_v_locales" ADD CONSTRAINT "_nosso_impacto_content_v_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "cms"."_nosso_impacto_content_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "cms"."privacidade_content_sections_content" ADD CONSTRAINT "privacidade_content_sections_content_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "cms"."privacidade_content_sections"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "cms"."privacidade_content_sections_content_locales" ADD CONSTRAINT "privacidade_content_sections_content_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "cms"."privacidade_content_sections_content"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "cms"."privacidade_content_sections" ADD CONSTRAINT "privacidade_content_sections_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "cms"."privacidade_content"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "cms"."privacidade_content_sections_locales" ADD CONSTRAINT "privacidade_content_sections_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "cms"."privacidade_content_sections"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "cms"."privacidade_content_locales" ADD CONSTRAINT "privacidade_content_locales_meta_image_id_media_id_fk" FOREIGN KEY ("meta_image_id") REFERENCES "cms"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "cms"."privacidade_content_locales" ADD CONSTRAINT "privacidade_content_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "cms"."privacidade_content"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "cms"."_privacidade_content_v_version_sections_content" ADD CONSTRAINT "_privacidade_content_v_version_sections_content_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "cms"."_privacidade_content_v_version_sections"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "cms"."_privacidade_content_v_version_sections_content_locales" ADD CONSTRAINT "_privacidade_content_v_version_sections_content_locales_p_fk" FOREIGN KEY ("_parent_id") REFERENCES "cms"."_privacidade_content_v_version_sections_content"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "cms"."_privacidade_content_v_version_sections" ADD CONSTRAINT "_privacidade_content_v_version_sections_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "cms"."_privacidade_content_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "cms"."_privacidade_content_v_version_sections_locales" ADD CONSTRAINT "_privacidade_content_v_version_sections_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "cms"."_privacidade_content_v_version_sections"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "cms"."_privacidade_content_v_locales" ADD CONSTRAINT "_privacidade_content_v_locales_version_meta_image_id_media_id_fk" FOREIGN KEY ("version_meta_image_id") REFERENCES "cms"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "cms"."_privacidade_content_v_locales" ADD CONSTRAINT "_privacidade_content_v_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "cms"."_privacidade_content_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "cms"."not_found_content_locales" ADD CONSTRAINT "not_found_content_locales_meta_image_id_media_id_fk" FOREIGN KEY ("meta_image_id") REFERENCES "cms"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "cms"."not_found_content_locales" ADD CONSTRAINT "not_found_content_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "cms"."not_found_content"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "cms"."_not_found_content_v_locales" ADD CONSTRAINT "_not_found_content_v_locales_version_meta_image_id_media_id_fk" FOREIGN KEY ("version_meta_image_id") REFERENCES "cms"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "cms"."_not_found_content_v_locales" ADD CONSTRAINT "_not_found_content_v_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "cms"."_not_found_content_v"("id") ON DELETE cascade ON UPDATE no action;
  CREATE UNIQUE INDEX "pages_slug_idx" ON "cms"."pages" USING btree ("slug");
  CREATE INDEX "pages_updated_at_idx" ON "cms"."pages" USING btree ("updated_at");
  CREATE INDEX "pages_created_at_idx" ON "cms"."pages" USING btree ("created_at");
  CREATE INDEX "media_updated_at_idx" ON "cms"."media" USING btree ("updated_at");
  CREATE INDEX "media_created_at_idx" ON "cms"."media" USING btree ("created_at");
  CREATE UNIQUE INDEX "media_filename_idx" ON "cms"."media" USING btree ("filename");
  CREATE INDEX "media_sizes_thumbnail_sizes_thumbnail_filename_idx" ON "cms"."media" USING btree ("sizes_thumbnail_filename");
  CREATE INDEX "media_sizes_card_sizes_card_filename_idx" ON "cms"."media" USING btree ("sizes_card_filename");
  CREATE INDEX "media_sizes_hero_sizes_hero_filename_idx" ON "cms"."media" USING btree ("sizes_hero_filename");
  CREATE UNIQUE INDEX "media_locales_locale_parent_id_unique" ON "cms"."media_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "blog_posts_blocks_paragraph_order_idx" ON "cms"."blog_posts_blocks_paragraph" USING btree ("_order");
  CREATE INDEX "blog_posts_blocks_paragraph_parent_id_idx" ON "cms"."blog_posts_blocks_paragraph" USING btree ("_parent_id");
  CREATE INDEX "blog_posts_blocks_paragraph_path_idx" ON "cms"."blog_posts_blocks_paragraph" USING btree ("_path");
  CREATE UNIQUE INDEX "blog_posts_blocks_paragraph_locales_locale_parent_id_unique" ON "cms"."blog_posts_blocks_paragraph_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "blog_posts_blocks_heading_order_idx" ON "cms"."blog_posts_blocks_heading" USING btree ("_order");
  CREATE INDEX "blog_posts_blocks_heading_parent_id_idx" ON "cms"."blog_posts_blocks_heading" USING btree ("_parent_id");
  CREATE INDEX "blog_posts_blocks_heading_path_idx" ON "cms"."blog_posts_blocks_heading" USING btree ("_path");
  CREATE UNIQUE INDEX "blog_posts_blocks_heading_locales_locale_parent_id_unique" ON "cms"."blog_posts_blocks_heading_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "blog_posts_blocks_species_order_idx" ON "cms"."blog_posts_blocks_species" USING btree ("_order");
  CREATE INDEX "blog_posts_blocks_species_parent_id_idx" ON "cms"."blog_posts_blocks_species" USING btree ("_parent_id");
  CREATE INDEX "blog_posts_blocks_species_path_idx" ON "cms"."blog_posts_blocks_species" USING btree ("_path");
  CREATE UNIQUE INDEX "blog_posts_blocks_species_locales_locale_parent_id_unique" ON "cms"."blog_posts_blocks_species_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "blog_posts_blocks_ordered_list_items_order_idx" ON "cms"."blog_posts_blocks_ordered_list_items" USING btree ("_order");
  CREATE INDEX "blog_posts_blocks_ordered_list_items_parent_id_idx" ON "cms"."blog_posts_blocks_ordered_list_items" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "blog_posts_blocks_ordered_list_items_locales_locale_parent_i" ON "cms"."blog_posts_blocks_ordered_list_items_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "blog_posts_blocks_ordered_list_order_idx" ON "cms"."blog_posts_blocks_ordered_list" USING btree ("_order");
  CREATE INDEX "blog_posts_blocks_ordered_list_parent_id_idx" ON "cms"."blog_posts_blocks_ordered_list" USING btree ("_parent_id");
  CREATE INDEX "blog_posts_blocks_ordered_list_path_idx" ON "cms"."blog_posts_blocks_ordered_list" USING btree ("_path");
  CREATE UNIQUE INDEX "blog_posts_slug_idx" ON "cms"."blog_posts" USING btree ("slug");
  CREATE INDEX "blog_posts_primary_category_idx" ON "cms"."blog_posts" USING btree ("primary_category_id");
  CREATE INDEX "blog_posts_updated_at_idx" ON "cms"."blog_posts" USING btree ("updated_at");
  CREATE INDEX "blog_posts_created_at_idx" ON "cms"."blog_posts" USING btree ("created_at");
  CREATE INDEX "blog_posts_meta_meta_image_idx" ON "cms"."blog_posts_locales" USING btree ("meta_image_id","_locale");
  CREATE UNIQUE INDEX "blog_posts_locales_locale_parent_id_unique" ON "cms"."blog_posts_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "blog_posts_rels_order_idx" ON "cms"."blog_posts_rels" USING btree ("order");
  CREATE INDEX "blog_posts_rels_parent_idx" ON "cms"."blog_posts_rels" USING btree ("parent_id");
  CREATE INDEX "blog_posts_rels_path_idx" ON "cms"."blog_posts_rels" USING btree ("path");
  CREATE INDEX "blog_posts_rels_blog_categories_id_idx" ON "cms"."blog_posts_rels" USING btree ("blog_categories_id");
  CREATE INDEX "blog_posts_rels_blog_posts_id_idx" ON "cms"."blog_posts_rels" USING btree ("blog_posts_id");
  CREATE INDEX "_blog_posts_v_blocks_paragraph_order_idx" ON "cms"."_blog_posts_v_blocks_paragraph" USING btree ("_order");
  CREATE INDEX "_blog_posts_v_blocks_paragraph_parent_id_idx" ON "cms"."_blog_posts_v_blocks_paragraph" USING btree ("_parent_id");
  CREATE INDEX "_blog_posts_v_blocks_paragraph_path_idx" ON "cms"."_blog_posts_v_blocks_paragraph" USING btree ("_path");
  CREATE UNIQUE INDEX "_blog_posts_v_blocks_paragraph_locales_locale_parent_id_uniq" ON "cms"."_blog_posts_v_blocks_paragraph_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_blog_posts_v_blocks_heading_order_idx" ON "cms"."_blog_posts_v_blocks_heading" USING btree ("_order");
  CREATE INDEX "_blog_posts_v_blocks_heading_parent_id_idx" ON "cms"."_blog_posts_v_blocks_heading" USING btree ("_parent_id");
  CREATE INDEX "_blog_posts_v_blocks_heading_path_idx" ON "cms"."_blog_posts_v_blocks_heading" USING btree ("_path");
  CREATE UNIQUE INDEX "_blog_posts_v_blocks_heading_locales_locale_parent_id_unique" ON "cms"."_blog_posts_v_blocks_heading_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_blog_posts_v_blocks_species_order_idx" ON "cms"."_blog_posts_v_blocks_species" USING btree ("_order");
  CREATE INDEX "_blog_posts_v_blocks_species_parent_id_idx" ON "cms"."_blog_posts_v_blocks_species" USING btree ("_parent_id");
  CREATE INDEX "_blog_posts_v_blocks_species_path_idx" ON "cms"."_blog_posts_v_blocks_species" USING btree ("_path");
  CREATE UNIQUE INDEX "_blog_posts_v_blocks_species_locales_locale_parent_id_unique" ON "cms"."_blog_posts_v_blocks_species_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_blog_posts_v_blocks_ordered_list_items_order_idx" ON "cms"."_blog_posts_v_blocks_ordered_list_items" USING btree ("_order");
  CREATE INDEX "_blog_posts_v_blocks_ordered_list_items_parent_id_idx" ON "cms"."_blog_posts_v_blocks_ordered_list_items" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "_blog_posts_v_blocks_ordered_list_items_locales_locale_paren" ON "cms"."_blog_posts_v_blocks_ordered_list_items_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_blog_posts_v_blocks_ordered_list_order_idx" ON "cms"."_blog_posts_v_blocks_ordered_list" USING btree ("_order");
  CREATE INDEX "_blog_posts_v_blocks_ordered_list_parent_id_idx" ON "cms"."_blog_posts_v_blocks_ordered_list" USING btree ("_parent_id");
  CREATE INDEX "_blog_posts_v_blocks_ordered_list_path_idx" ON "cms"."_blog_posts_v_blocks_ordered_list" USING btree ("_path");
  CREATE INDEX "_blog_posts_v_parent_idx" ON "cms"."_blog_posts_v" USING btree ("parent_id");
  CREATE INDEX "_blog_posts_v_version_version_slug_idx" ON "cms"."_blog_posts_v" USING btree ("version_slug");
  CREATE INDEX "_blog_posts_v_version_version_primary_category_idx" ON "cms"."_blog_posts_v" USING btree ("version_primary_category_id");
  CREATE INDEX "_blog_posts_v_version_version_updated_at_idx" ON "cms"."_blog_posts_v" USING btree ("version_updated_at");
  CREATE INDEX "_blog_posts_v_version_version_created_at_idx" ON "cms"."_blog_posts_v" USING btree ("version_created_at");
  CREATE INDEX "_blog_posts_v_created_at_idx" ON "cms"."_blog_posts_v" USING btree ("created_at");
  CREATE INDEX "_blog_posts_v_updated_at_idx" ON "cms"."_blog_posts_v" USING btree ("updated_at");
  CREATE INDEX "_blog_posts_v_version_meta_version_meta_image_idx" ON "cms"."_blog_posts_v_locales" USING btree ("version_meta_image_id","_locale");
  CREATE UNIQUE INDEX "_blog_posts_v_locales_locale_parent_id_unique" ON "cms"."_blog_posts_v_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_blog_posts_v_rels_order_idx" ON "cms"."_blog_posts_v_rels" USING btree ("order");
  CREATE INDEX "_blog_posts_v_rels_parent_idx" ON "cms"."_blog_posts_v_rels" USING btree ("parent_id");
  CREATE INDEX "_blog_posts_v_rels_path_idx" ON "cms"."_blog_posts_v_rels" USING btree ("path");
  CREATE INDEX "_blog_posts_v_rels_blog_categories_id_idx" ON "cms"."_blog_posts_v_rels" USING btree ("blog_categories_id");
  CREATE INDEX "_blog_posts_v_rels_blog_posts_id_idx" ON "cms"."_blog_posts_v_rels" USING btree ("blog_posts_id");
  CREATE UNIQUE INDEX "blog_categories_slug_idx" ON "cms"."blog_categories" USING btree ("slug");
  CREATE INDEX "blog_categories_updated_at_idx" ON "cms"."blog_categories" USING btree ("updated_at");
  CREATE INDEX "blog_categories_created_at_idx" ON "cms"."blog_categories" USING btree ("created_at");
  CREATE INDEX "bird_species_photography_tips_order_idx" ON "cms"."bird_species_photography_tips" USING btree ("_order");
  CREATE INDEX "bird_species_photography_tips_parent_id_idx" ON "cms"."bird_species_photography_tips" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "bird_species_photography_tips_locales_locale_parent_id_uniqu" ON "cms"."bird_species_photography_tips_locales" USING btree ("_locale","_parent_id");
  CREATE UNIQUE INDEX "bird_species_slug_idx" ON "cms"."bird_species" USING btree ("slug");
  CREATE INDEX "bird_species_category_idx" ON "cms"."bird_species" USING btree ("category_id");
  CREATE INDEX "bird_species_updated_at_idx" ON "cms"."bird_species" USING btree ("updated_at");
  CREATE INDEX "bird_species_created_at_idx" ON "cms"."bird_species" USING btree ("created_at");
  CREATE INDEX "bird_species_meta_meta_image_idx" ON "cms"."bird_species_locales" USING btree ("meta_image_id","_locale");
  CREATE UNIQUE INDEX "bird_species_locales_locale_parent_id_unique" ON "cms"."bird_species_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "bird_species_rels_order_idx" ON "cms"."bird_species_rels" USING btree ("order");
  CREATE INDEX "bird_species_rels_parent_idx" ON "cms"."bird_species_rels" USING btree ("parent_id");
  CREATE INDEX "bird_species_rels_path_idx" ON "cms"."bird_species_rels" USING btree ("path");
  CREATE INDEX "bird_species_rels_bird_species_id_idx" ON "cms"."bird_species_rels" USING btree ("bird_species_id");
  CREATE UNIQUE INDEX "bird_categories_slug_idx" ON "cms"."bird_categories" USING btree ("slug");
  CREATE INDEX "bird_categories_updated_at_idx" ON "cms"."bird_categories" USING btree ("updated_at");
  CREATE INDEX "bird_categories_created_at_idx" ON "cms"."bird_categories" USING btree ("created_at");
  CREATE INDEX "users_sessions_order_idx" ON "cms"."users_sessions" USING btree ("_order");
  CREATE INDEX "users_sessions_parent_id_idx" ON "cms"."users_sessions" USING btree ("_parent_id");
  CREATE INDEX "users_updated_at_idx" ON "cms"."users" USING btree ("updated_at");
  CREATE INDEX "users_created_at_idx" ON "cms"."users" USING btree ("created_at");
  CREATE UNIQUE INDEX "users_email_idx" ON "cms"."users" USING btree ("email");
  CREATE UNIQUE INDEX "payload_kv_key_idx" ON "cms"."payload_kv" USING btree ("key");
  CREATE INDEX "payload_locked_documents_global_slug_idx" ON "cms"."payload_locked_documents" USING btree ("global_slug");
  CREATE INDEX "payload_locked_documents_updated_at_idx" ON "cms"."payload_locked_documents" USING btree ("updated_at");
  CREATE INDEX "payload_locked_documents_created_at_idx" ON "cms"."payload_locked_documents" USING btree ("created_at");
  CREATE INDEX "payload_locked_documents_rels_order_idx" ON "cms"."payload_locked_documents_rels" USING btree ("order");
  CREATE INDEX "payload_locked_documents_rels_parent_idx" ON "cms"."payload_locked_documents_rels" USING btree ("parent_id");
  CREATE INDEX "payload_locked_documents_rels_path_idx" ON "cms"."payload_locked_documents_rels" USING btree ("path");
  CREATE INDEX "payload_locked_documents_rels_pages_id_idx" ON "cms"."payload_locked_documents_rels" USING btree ("pages_id");
  CREATE INDEX "payload_locked_documents_rels_media_id_idx" ON "cms"."payload_locked_documents_rels" USING btree ("media_id");
  CREATE INDEX "payload_locked_documents_rels_blog_posts_id_idx" ON "cms"."payload_locked_documents_rels" USING btree ("blog_posts_id");
  CREATE INDEX "payload_locked_documents_rels_blog_categories_id_idx" ON "cms"."payload_locked_documents_rels" USING btree ("blog_categories_id");
  CREATE INDEX "payload_locked_documents_rels_bird_species_id_idx" ON "cms"."payload_locked_documents_rels" USING btree ("bird_species_id");
  CREATE INDEX "payload_locked_documents_rels_bird_categories_id_idx" ON "cms"."payload_locked_documents_rels" USING btree ("bird_categories_id");
  CREATE INDEX "payload_locked_documents_rels_users_id_idx" ON "cms"."payload_locked_documents_rels" USING btree ("users_id");
  CREATE INDEX "payload_preferences_key_idx" ON "cms"."payload_preferences" USING btree ("key");
  CREATE INDEX "payload_preferences_updated_at_idx" ON "cms"."payload_preferences" USING btree ("updated_at");
  CREATE INDEX "payload_preferences_created_at_idx" ON "cms"."payload_preferences" USING btree ("created_at");
  CREATE INDEX "payload_preferences_rels_order_idx" ON "cms"."payload_preferences_rels" USING btree ("order");
  CREATE INDEX "payload_preferences_rels_parent_idx" ON "cms"."payload_preferences_rels" USING btree ("parent_id");
  CREATE INDEX "payload_preferences_rels_path_idx" ON "cms"."payload_preferences_rels" USING btree ("path");
  CREATE INDEX "payload_preferences_rels_users_id_idx" ON "cms"."payload_preferences_rels" USING btree ("users_id");
  CREATE INDEX "payload_migrations_updated_at_idx" ON "cms"."payload_migrations" USING btree ("updated_at");
  CREATE INDEX "payload_migrations_created_at_idx" ON "cms"."payload_migrations" USING btree ("created_at");
  CREATE INDEX "_agent_config_v_created_at_idx" ON "cms"."_agent_config_v" USING btree ("created_at");
  CREATE INDEX "_agent_config_v_updated_at_idx" ON "cms"."_agent_config_v" USING btree ("updated_at");
  CREATE INDEX "site_settings_faq_items_order_idx" ON "cms"."site_settings_faq_items" USING btree ("_order");
  CREATE INDEX "site_settings_faq_items_parent_id_idx" ON "cms"."site_settings_faq_items" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "site_settings_faq_items_locales_locale_parent_id_unique" ON "cms"."site_settings_faq_items_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "site_settings_testimonial_items_order_idx" ON "cms"."site_settings_testimonial_items" USING btree ("_order");
  CREATE INDEX "site_settings_testimonial_items_parent_id_idx" ON "cms"."site_settings_testimonial_items" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "site_settings_testimonial_items_locales_locale_parent_id_uni" ON "cms"."site_settings_testimonial_items_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "site_settings_footer_pousada_links_order_idx" ON "cms"."site_settings_footer_pousada_links" USING btree ("_order");
  CREATE INDEX "site_settings_footer_pousada_links_parent_id_idx" ON "cms"."site_settings_footer_pousada_links" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "site_settings_footer_pousada_links_locales_locale_parent_id_" ON "cms"."site_settings_footer_pousada_links_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "site_settings_footer_experiencias_links_order_idx" ON "cms"."site_settings_footer_experiencias_links" USING btree ("_order");
  CREATE INDEX "site_settings_footer_experiencias_links_parent_id_idx" ON "cms"."site_settings_footer_experiencias_links" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "site_settings_footer_experiencias_links_locales_locale_paren" ON "cms"."site_settings_footer_experiencias_links_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "site_settings_footer_legal_links_order_idx" ON "cms"."site_settings_footer_legal_links" USING btree ("_order");
  CREATE INDEX "site_settings_footer_legal_links_parent_id_idx" ON "cms"."site_settings_footer_legal_links" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "site_settings_footer_legal_links_locales_locale_parent_id_un" ON "cms"."site_settings_footer_legal_links_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "site_settings_authors_knows_about_order_idx" ON "cms"."site_settings_authors_knows_about" USING btree ("_order");
  CREATE INDEX "site_settings_authors_knows_about_parent_id_idx" ON "cms"."site_settings_authors_knows_about" USING btree ("_parent_id");
  CREATE INDEX "site_settings_authors_order_idx" ON "cms"."site_settings_authors" USING btree ("_order");
  CREATE INDEX "site_settings_authors_parent_id_idx" ON "cms"."site_settings_authors" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "site_settings_authors_locales_locale_parent_id_unique" ON "cms"."site_settings_authors_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "site_settings_seasonal_events_order_idx" ON "cms"."site_settings_seasonal_events" USING btree ("_order");
  CREATE INDEX "site_settings_seasonal_events_parent_id_idx" ON "cms"."site_settings_seasonal_events" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "site_settings_seasonal_events_locales_locale_parent_id_uniqu" ON "cms"."site_settings_seasonal_events_locales" USING btree ("_locale","_parent_id");
  CREATE UNIQUE INDEX "site_settings_locales_locale_parent_id_unique" ON "cms"."site_settings_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_site_settings_v_version_faq_items_order_idx" ON "cms"."_site_settings_v_version_faq_items" USING btree ("_order");
  CREATE INDEX "_site_settings_v_version_faq_items_parent_id_idx" ON "cms"."_site_settings_v_version_faq_items" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "_site_settings_v_version_faq_items_locales_locale_parent_id_" ON "cms"."_site_settings_v_version_faq_items_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_site_settings_v_version_testimonial_items_order_idx" ON "cms"."_site_settings_v_version_testimonial_items" USING btree ("_order");
  CREATE INDEX "_site_settings_v_version_testimonial_items_parent_id_idx" ON "cms"."_site_settings_v_version_testimonial_items" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "_site_settings_v_version_testimonial_items_locales_locale_pa" ON "cms"."_site_settings_v_version_testimonial_items_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_site_settings_v_version_footer_pousada_links_order_idx" ON "cms"."_site_settings_v_version_footer_pousada_links" USING btree ("_order");
  CREATE INDEX "_site_settings_v_version_footer_pousada_links_parent_id_idx" ON "cms"."_site_settings_v_version_footer_pousada_links" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "_site_settings_v_version_footer_pousada_links_locales_locale" ON "cms"."_site_settings_v_version_footer_pousada_links_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_site_settings_v_version_footer_experiencias_links_order_idx" ON "cms"."_site_settings_v_version_footer_experiencias_links" USING btree ("_order");
  CREATE INDEX "_site_settings_v_version_footer_experiencias_links_parent_id_idx" ON "cms"."_site_settings_v_version_footer_experiencias_links" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "_site_settings_v_version_footer_experiencias_links_locales_l" ON "cms"."_site_settings_v_version_footer_experiencias_links_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_site_settings_v_version_footer_legal_links_order_idx" ON "cms"."_site_settings_v_version_footer_legal_links" USING btree ("_order");
  CREATE INDEX "_site_settings_v_version_footer_legal_links_parent_id_idx" ON "cms"."_site_settings_v_version_footer_legal_links" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "_site_settings_v_version_footer_legal_links_locales_locale_p" ON "cms"."_site_settings_v_version_footer_legal_links_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_site_settings_v_version_authors_knows_about_order_idx" ON "cms"."_site_settings_v_version_authors_knows_about" USING btree ("_order");
  CREATE INDEX "_site_settings_v_version_authors_knows_about_parent_id_idx" ON "cms"."_site_settings_v_version_authors_knows_about" USING btree ("_parent_id");
  CREATE INDEX "_site_settings_v_version_authors_order_idx" ON "cms"."_site_settings_v_version_authors" USING btree ("_order");
  CREATE INDEX "_site_settings_v_version_authors_parent_id_idx" ON "cms"."_site_settings_v_version_authors" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "_site_settings_v_version_authors_locales_locale_parent_id_un" ON "cms"."_site_settings_v_version_authors_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_site_settings_v_version_seasonal_events_order_idx" ON "cms"."_site_settings_v_version_seasonal_events" USING btree ("_order");
  CREATE INDEX "_site_settings_v_version_seasonal_events_parent_id_idx" ON "cms"."_site_settings_v_version_seasonal_events" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "_site_settings_v_version_seasonal_events_locales_locale_pare" ON "cms"."_site_settings_v_version_seasonal_events_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_site_settings_v_created_at_idx" ON "cms"."_site_settings_v" USING btree ("created_at");
  CREATE INDEX "_site_settings_v_updated_at_idx" ON "cms"."_site_settings_v" USING btree ("updated_at");
  CREATE UNIQUE INDEX "_site_settings_v_locales_locale_parent_id_unique" ON "cms"."_site_settings_v_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "home_content_about_us_body_order_idx" ON "cms"."home_content_about_us_body" USING btree ("_order");
  CREATE INDEX "home_content_about_us_body_parent_id_idx" ON "cms"."home_content_about_us_body" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "home_content_about_us_body_locales_locale_parent_id_unique" ON "cms"."home_content_about_us_body_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "home_content_about_us_features_order_idx" ON "cms"."home_content_about_us_features" USING btree ("_order");
  CREATE INDEX "home_content_about_us_features_parent_id_idx" ON "cms"."home_content_about_us_features" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "home_content_about_us_features_locales_locale_parent_id_uniq" ON "cms"."home_content_about_us_features_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "home_content_expeditions_items_order_idx" ON "cms"."home_content_expeditions_items" USING btree ("_order");
  CREATE INDEX "home_content_expeditions_items_parent_id_idx" ON "cms"."home_content_expeditions_items" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "home_content_expeditions_items_locales_locale_parent_id_uniq" ON "cms"."home_content_expeditions_items_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "home_content_stats_items_order_idx" ON "cms"."home_content_stats_items" USING btree ("_order");
  CREATE INDEX "home_content_stats_items_parent_id_idx" ON "cms"."home_content_stats_items" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "home_content_stats_items_locales_locale_parent_id_unique" ON "cms"."home_content_stats_items_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "home_content_impact_items_order_idx" ON "cms"."home_content_impact_items" USING btree ("_order");
  CREATE INDEX "home_content_impact_items_parent_id_idx" ON "cms"."home_content_impact_items" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "home_content_impact_items_locales_locale_parent_id_unique" ON "cms"."home_content_impact_items_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "home_content_faq_items_order_idx" ON "cms"."home_content_faq_items" USING btree ("_order");
  CREATE INDEX "home_content_faq_items_parent_id_idx" ON "cms"."home_content_faq_items" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "home_content_faq_items_locales_locale_parent_id_unique" ON "cms"."home_content_faq_items_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "home_content_meta_meta_image_idx" ON "cms"."home_content_locales" USING btree ("meta_image_id","_locale");
  CREATE UNIQUE INDEX "home_content_locales_locale_parent_id_unique" ON "cms"."home_content_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_home_content_v_version_about_us_body_order_idx" ON "cms"."_home_content_v_version_about_us_body" USING btree ("_order");
  CREATE INDEX "_home_content_v_version_about_us_body_parent_id_idx" ON "cms"."_home_content_v_version_about_us_body" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "_home_content_v_version_about_us_body_locales_locale_parent_" ON "cms"."_home_content_v_version_about_us_body_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_home_content_v_version_about_us_features_order_idx" ON "cms"."_home_content_v_version_about_us_features" USING btree ("_order");
  CREATE INDEX "_home_content_v_version_about_us_features_parent_id_idx" ON "cms"."_home_content_v_version_about_us_features" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "_home_content_v_version_about_us_features_locales_locale_par" ON "cms"."_home_content_v_version_about_us_features_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_home_content_v_version_expeditions_items_order_idx" ON "cms"."_home_content_v_version_expeditions_items" USING btree ("_order");
  CREATE INDEX "_home_content_v_version_expeditions_items_parent_id_idx" ON "cms"."_home_content_v_version_expeditions_items" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "_home_content_v_version_expeditions_items_locales_locale_par" ON "cms"."_home_content_v_version_expeditions_items_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_home_content_v_version_stats_items_order_idx" ON "cms"."_home_content_v_version_stats_items" USING btree ("_order");
  CREATE INDEX "_home_content_v_version_stats_items_parent_id_idx" ON "cms"."_home_content_v_version_stats_items" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "_home_content_v_version_stats_items_locales_locale_parent_id" ON "cms"."_home_content_v_version_stats_items_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_home_content_v_version_impact_items_order_idx" ON "cms"."_home_content_v_version_impact_items" USING btree ("_order");
  CREATE INDEX "_home_content_v_version_impact_items_parent_id_idx" ON "cms"."_home_content_v_version_impact_items" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "_home_content_v_version_impact_items_locales_locale_parent_i" ON "cms"."_home_content_v_version_impact_items_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_home_content_v_version_faq_items_order_idx" ON "cms"."_home_content_v_version_faq_items" USING btree ("_order");
  CREATE INDEX "_home_content_v_version_faq_items_parent_id_idx" ON "cms"."_home_content_v_version_faq_items" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "_home_content_v_version_faq_items_locales_locale_parent_id_u" ON "cms"."_home_content_v_version_faq_items_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_home_content_v_created_at_idx" ON "cms"."_home_content_v" USING btree ("created_at");
  CREATE INDEX "_home_content_v_updated_at_idx" ON "cms"."_home_content_v" USING btree ("updated_at");
  CREATE INDEX "_home_content_v_version_meta_version_meta_image_idx" ON "cms"."_home_content_v_locales" USING btree ("version_meta_image_id","_locale");
  CREATE UNIQUE INDEX "_home_content_v_locales_locale_parent_id_unique" ON "cms"."_home_content_v_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "acomodacoes_content_manifesto_segments_order_idx" ON "cms"."acomodacoes_content_manifesto_segments" USING btree ("_order");
  CREATE INDEX "acomodacoes_content_manifesto_segments_parent_id_idx" ON "cms"."acomodacoes_content_manifesto_segments" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "acomodacoes_content_manifesto_segments_locales_locale_parent" ON "cms"."acomodacoes_content_manifesto_segments_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "acomodacoes_content_highlights_items_order_idx" ON "cms"."acomodacoes_content_highlights_items" USING btree ("_order");
  CREATE INDEX "acomodacoes_content_highlights_items_parent_id_idx" ON "cms"."acomodacoes_content_highlights_items" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "acomodacoes_content_highlights_items_locales_locale_parent_i" ON "cms"."acomodacoes_content_highlights_items_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "acomodacoes_content_rooms_features_order_idx" ON "cms"."acomodacoes_content_rooms_features" USING btree ("_order");
  CREATE INDEX "acomodacoes_content_rooms_features_parent_id_idx" ON "cms"."acomodacoes_content_rooms_features" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "acomodacoes_content_rooms_features_locales_locale_parent_id_" ON "cms"."acomodacoes_content_rooms_features_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "acomodacoes_content_rooms_order_idx" ON "cms"."acomodacoes_content_rooms" USING btree ("_order");
  CREATE INDEX "acomodacoes_content_rooms_parent_id_idx" ON "cms"."acomodacoes_content_rooms" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "acomodacoes_content_rooms_locales_locale_parent_id_unique" ON "cms"."acomodacoes_content_rooms_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "acomodacoes_content_culinary_images_order_idx" ON "cms"."acomodacoes_content_culinary_images" USING btree ("_order");
  CREATE INDEX "acomodacoes_content_culinary_images_parent_id_idx" ON "cms"."acomodacoes_content_culinary_images" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "acomodacoes_content_culinary_images_locales_locale_parent_id" ON "cms"."acomodacoes_content_culinary_images_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "acomodacoes_content_faq_items_order_idx" ON "cms"."acomodacoes_content_faq_items" USING btree ("_order");
  CREATE INDEX "acomodacoes_content_faq_items_parent_id_idx" ON "cms"."acomodacoes_content_faq_items" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "acomodacoes_content_faq_items_locales_locale_parent_id_uniqu" ON "cms"."acomodacoes_content_faq_items_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "acomodacoes_content_meta_meta_image_idx" ON "cms"."acomodacoes_content_locales" USING btree ("meta_image_id","_locale");
  CREATE UNIQUE INDEX "acomodacoes_content_locales_locale_parent_id_unique" ON "cms"."acomodacoes_content_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_acomodacoes_content_v_version_manifesto_segments_order_idx" ON "cms"."_acomodacoes_content_v_version_manifesto_segments" USING btree ("_order");
  CREATE INDEX "_acomodacoes_content_v_version_manifesto_segments_parent_id_idx" ON "cms"."_acomodacoes_content_v_version_manifesto_segments" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "_acomodacoes_content_v_version_manifesto_segments_locales_lo" ON "cms"."_acomodacoes_content_v_version_manifesto_segments_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_acomodacoes_content_v_version_highlights_items_order_idx" ON "cms"."_acomodacoes_content_v_version_highlights_items" USING btree ("_order");
  CREATE INDEX "_acomodacoes_content_v_version_highlights_items_parent_id_idx" ON "cms"."_acomodacoes_content_v_version_highlights_items" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "_acomodacoes_content_v_version_highlights_items_locales_loca" ON "cms"."_acomodacoes_content_v_version_highlights_items_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_acomodacoes_content_v_version_rooms_features_order_idx" ON "cms"."_acomodacoes_content_v_version_rooms_features" USING btree ("_order");
  CREATE INDEX "_acomodacoes_content_v_version_rooms_features_parent_id_idx" ON "cms"."_acomodacoes_content_v_version_rooms_features" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "_acomodacoes_content_v_version_rooms_features_locales_locale" ON "cms"."_acomodacoes_content_v_version_rooms_features_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_acomodacoes_content_v_version_rooms_order_idx" ON "cms"."_acomodacoes_content_v_version_rooms" USING btree ("_order");
  CREATE INDEX "_acomodacoes_content_v_version_rooms_parent_id_idx" ON "cms"."_acomodacoes_content_v_version_rooms" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "_acomodacoes_content_v_version_rooms_locales_locale_parent_i" ON "cms"."_acomodacoes_content_v_version_rooms_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_acomodacoes_content_v_version_culinary_images_order_idx" ON "cms"."_acomodacoes_content_v_version_culinary_images" USING btree ("_order");
  CREATE INDEX "_acomodacoes_content_v_version_culinary_images_parent_id_idx" ON "cms"."_acomodacoes_content_v_version_culinary_images" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "_acomodacoes_content_v_version_culinary_images_locales_local" ON "cms"."_acomodacoes_content_v_version_culinary_images_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_acomodacoes_content_v_version_faq_items_order_idx" ON "cms"."_acomodacoes_content_v_version_faq_items" USING btree ("_order");
  CREATE INDEX "_acomodacoes_content_v_version_faq_items_parent_id_idx" ON "cms"."_acomodacoes_content_v_version_faq_items" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "_acomodacoes_content_v_version_faq_items_locales_locale_pare" ON "cms"."_acomodacoes_content_v_version_faq_items_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_acomodacoes_content_v_created_at_idx" ON "cms"."_acomodacoes_content_v" USING btree ("created_at");
  CREATE INDEX "_acomodacoes_content_v_updated_at_idx" ON "cms"."_acomodacoes_content_v" USING btree ("updated_at");
  CREATE INDEX "_acomodacoes_content_v_version_meta_version_meta_image_idx" ON "cms"."_acomodacoes_content_v_locales" USING btree ("version_meta_image_id","_locale");
  CREATE UNIQUE INDEX "_acomodacoes_content_v_locales_locale_parent_id_unique" ON "cms"."_acomodacoes_content_v_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "culinaria_content_manifesto_segments_order_idx" ON "cms"."culinaria_content_manifesto_segments" USING btree ("_order");
  CREATE INDEX "culinaria_content_manifesto_segments_parent_id_idx" ON "cms"."culinaria_content_manifesto_segments" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "culinaria_content_manifesto_segments_locales_locale_parent_i" ON "cms"."culinaria_content_manifesto_segments_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "culinaria_content_menu_body_order_idx" ON "cms"."culinaria_content_menu_body" USING btree ("_order");
  CREATE INDEX "culinaria_content_menu_body_parent_id_idx" ON "cms"."culinaria_content_menu_body" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "culinaria_content_menu_body_locales_locale_parent_id_unique" ON "cms"."culinaria_content_menu_body_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "culinaria_content_menu_features_order_idx" ON "cms"."culinaria_content_menu_features" USING btree ("_order");
  CREATE INDEX "culinaria_content_menu_features_parent_id_idx" ON "cms"."culinaria_content_menu_features" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "culinaria_content_menu_features_locales_locale_parent_id_uni" ON "cms"."culinaria_content_menu_features_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "culinaria_content_highlights_items_order_idx" ON "cms"."culinaria_content_highlights_items" USING btree ("_order");
  CREATE INDEX "culinaria_content_highlights_items_parent_id_idx" ON "cms"."culinaria_content_highlights_items" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "culinaria_content_highlights_items_locales_locale_parent_id_" ON "cms"."culinaria_content_highlights_items_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "culinaria_content_services_items_order_idx" ON "cms"."culinaria_content_services_items" USING btree ("_order");
  CREATE INDEX "culinaria_content_services_items_parent_id_idx" ON "cms"."culinaria_content_services_items" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "culinaria_content_services_items_locales_locale_parent_id_un" ON "cms"."culinaria_content_services_items_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "culinaria_content_experience_body_order_idx" ON "cms"."culinaria_content_experience_body" USING btree ("_order");
  CREATE INDEX "culinaria_content_experience_body_parent_id_idx" ON "cms"."culinaria_content_experience_body" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "culinaria_content_experience_body_locales_locale_parent_id_u" ON "cms"."culinaria_content_experience_body_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "culinaria_content_faq_items_order_idx" ON "cms"."culinaria_content_faq_items" USING btree ("_order");
  CREATE INDEX "culinaria_content_faq_items_parent_id_idx" ON "cms"."culinaria_content_faq_items" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "culinaria_content_faq_items_locales_locale_parent_id_unique" ON "cms"."culinaria_content_faq_items_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "culinaria_content_meta_meta_image_idx" ON "cms"."culinaria_content_locales" USING btree ("meta_image_id","_locale");
  CREATE UNIQUE INDEX "culinaria_content_locales_locale_parent_id_unique" ON "cms"."culinaria_content_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_culinaria_content_v_version_manifesto_segments_order_idx" ON "cms"."_culinaria_content_v_version_manifesto_segments" USING btree ("_order");
  CREATE INDEX "_culinaria_content_v_version_manifesto_segments_parent_id_idx" ON "cms"."_culinaria_content_v_version_manifesto_segments" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "_culinaria_content_v_version_manifesto_segments_locales_loca" ON "cms"."_culinaria_content_v_version_manifesto_segments_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_culinaria_content_v_version_menu_body_order_idx" ON "cms"."_culinaria_content_v_version_menu_body" USING btree ("_order");
  CREATE INDEX "_culinaria_content_v_version_menu_body_parent_id_idx" ON "cms"."_culinaria_content_v_version_menu_body" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "_culinaria_content_v_version_menu_body_locales_locale_parent" ON "cms"."_culinaria_content_v_version_menu_body_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_culinaria_content_v_version_menu_features_order_idx" ON "cms"."_culinaria_content_v_version_menu_features" USING btree ("_order");
  CREATE INDEX "_culinaria_content_v_version_menu_features_parent_id_idx" ON "cms"."_culinaria_content_v_version_menu_features" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "_culinaria_content_v_version_menu_features_locales_locale_pa" ON "cms"."_culinaria_content_v_version_menu_features_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_culinaria_content_v_version_highlights_items_order_idx" ON "cms"."_culinaria_content_v_version_highlights_items" USING btree ("_order");
  CREATE INDEX "_culinaria_content_v_version_highlights_items_parent_id_idx" ON "cms"."_culinaria_content_v_version_highlights_items" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "_culinaria_content_v_version_highlights_items_locales_locale" ON "cms"."_culinaria_content_v_version_highlights_items_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_culinaria_content_v_version_services_items_order_idx" ON "cms"."_culinaria_content_v_version_services_items" USING btree ("_order");
  CREATE INDEX "_culinaria_content_v_version_services_items_parent_id_idx" ON "cms"."_culinaria_content_v_version_services_items" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "_culinaria_content_v_version_services_items_locales_locale_p" ON "cms"."_culinaria_content_v_version_services_items_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_culinaria_content_v_version_experience_body_order_idx" ON "cms"."_culinaria_content_v_version_experience_body" USING btree ("_order");
  CREATE INDEX "_culinaria_content_v_version_experience_body_parent_id_idx" ON "cms"."_culinaria_content_v_version_experience_body" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "_culinaria_content_v_version_experience_body_locales_locale_" ON "cms"."_culinaria_content_v_version_experience_body_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_culinaria_content_v_version_faq_items_order_idx" ON "cms"."_culinaria_content_v_version_faq_items" USING btree ("_order");
  CREATE INDEX "_culinaria_content_v_version_faq_items_parent_id_idx" ON "cms"."_culinaria_content_v_version_faq_items" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "_culinaria_content_v_version_faq_items_locales_locale_parent" ON "cms"."_culinaria_content_v_version_faq_items_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_culinaria_content_v_created_at_idx" ON "cms"."_culinaria_content_v" USING btree ("created_at");
  CREATE INDEX "_culinaria_content_v_updated_at_idx" ON "cms"."_culinaria_content_v" USING btree ("updated_at");
  CREATE INDEX "_culinaria_content_v_version_meta_version_meta_image_idx" ON "cms"."_culinaria_content_v_locales" USING btree ("version_meta_image_id","_locale");
  CREATE UNIQUE INDEX "_culinaria_content_v_locales_locale_parent_id_unique" ON "cms"."_culinaria_content_v_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "pesca_content_manifesto_segments_order_idx" ON "cms"."pesca_content_manifesto_segments" USING btree ("_order");
  CREATE INDEX "pesca_content_manifesto_segments_parent_id_idx" ON "cms"."pesca_content_manifesto_segments" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "pesca_content_manifesto_segments_locales_locale_parent_id_un" ON "cms"."pesca_content_manifesto_segments_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "pesca_content_sobre_nos_body_order_idx" ON "cms"."pesca_content_sobre_nos_body" USING btree ("_order");
  CREATE INDEX "pesca_content_sobre_nos_body_parent_id_idx" ON "cms"."pesca_content_sobre_nos_body" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "pesca_content_sobre_nos_body_locales_locale_parent_id_unique" ON "cms"."pesca_content_sobre_nos_body_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "pesca_content_sobre_nos_features_order_idx" ON "cms"."pesca_content_sobre_nos_features" USING btree ("_order");
  CREATE INDEX "pesca_content_sobre_nos_features_parent_id_idx" ON "cms"."pesca_content_sobre_nos_features" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "pesca_content_sobre_nos_features_locales_locale_parent_id_un" ON "cms"."pesca_content_sobre_nos_features_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "pesca_content_highlights_items_order_idx" ON "cms"."pesca_content_highlights_items" USING btree ("_order");
  CREATE INDEX "pesca_content_highlights_items_parent_id_idx" ON "cms"."pesca_content_highlights_items" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "pesca_content_highlights_items_locales_locale_parent_id_uniq" ON "cms"."pesca_content_highlights_items_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "pesca_content_services_items_order_idx" ON "cms"."pesca_content_services_items" USING btree ("_order");
  CREATE INDEX "pesca_content_services_items_parent_id_idx" ON "cms"."pesca_content_services_items" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "pesca_content_services_items_locales_locale_parent_id_unique" ON "cms"."pesca_content_services_items_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "pesca_content_faq_items_order_idx" ON "cms"."pesca_content_faq_items" USING btree ("_order");
  CREATE INDEX "pesca_content_faq_items_parent_id_idx" ON "cms"."pesca_content_faq_items" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "pesca_content_faq_items_locales_locale_parent_id_unique" ON "cms"."pesca_content_faq_items_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "pesca_content_meta_meta_image_idx" ON "cms"."pesca_content_locales" USING btree ("meta_image_id","_locale");
  CREATE UNIQUE INDEX "pesca_content_locales_locale_parent_id_unique" ON "cms"."pesca_content_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_pesca_content_v_version_manifesto_segments_order_idx" ON "cms"."_pesca_content_v_version_manifesto_segments" USING btree ("_order");
  CREATE INDEX "_pesca_content_v_version_manifesto_segments_parent_id_idx" ON "cms"."_pesca_content_v_version_manifesto_segments" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "_pesca_content_v_version_manifesto_segments_locales_locale_p" ON "cms"."_pesca_content_v_version_manifesto_segments_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_pesca_content_v_version_sobre_nos_body_order_idx" ON "cms"."_pesca_content_v_version_sobre_nos_body" USING btree ("_order");
  CREATE INDEX "_pesca_content_v_version_sobre_nos_body_parent_id_idx" ON "cms"."_pesca_content_v_version_sobre_nos_body" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "_pesca_content_v_version_sobre_nos_body_locales_locale_paren" ON "cms"."_pesca_content_v_version_sobre_nos_body_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_pesca_content_v_version_sobre_nos_features_order_idx" ON "cms"."_pesca_content_v_version_sobre_nos_features" USING btree ("_order");
  CREATE INDEX "_pesca_content_v_version_sobre_nos_features_parent_id_idx" ON "cms"."_pesca_content_v_version_sobre_nos_features" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "_pesca_content_v_version_sobre_nos_features_locales_locale_p" ON "cms"."_pesca_content_v_version_sobre_nos_features_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_pesca_content_v_version_highlights_items_order_idx" ON "cms"."_pesca_content_v_version_highlights_items" USING btree ("_order");
  CREATE INDEX "_pesca_content_v_version_highlights_items_parent_id_idx" ON "cms"."_pesca_content_v_version_highlights_items" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "_pesca_content_v_version_highlights_items_locales_locale_par" ON "cms"."_pesca_content_v_version_highlights_items_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_pesca_content_v_version_services_items_order_idx" ON "cms"."_pesca_content_v_version_services_items" USING btree ("_order");
  CREATE INDEX "_pesca_content_v_version_services_items_parent_id_idx" ON "cms"."_pesca_content_v_version_services_items" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "_pesca_content_v_version_services_items_locales_locale_paren" ON "cms"."_pesca_content_v_version_services_items_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_pesca_content_v_version_faq_items_order_idx" ON "cms"."_pesca_content_v_version_faq_items" USING btree ("_order");
  CREATE INDEX "_pesca_content_v_version_faq_items_parent_id_idx" ON "cms"."_pesca_content_v_version_faq_items" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "_pesca_content_v_version_faq_items_locales_locale_parent_id_" ON "cms"."_pesca_content_v_version_faq_items_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_pesca_content_v_created_at_idx" ON "cms"."_pesca_content_v" USING btree ("created_at");
  CREATE INDEX "_pesca_content_v_updated_at_idx" ON "cms"."_pesca_content_v" USING btree ("updated_at");
  CREATE INDEX "_pesca_content_v_version_meta_version_meta_image_idx" ON "cms"."_pesca_content_v_locales" USING btree ("version_meta_image_id","_locale");
  CREATE UNIQUE INDEX "_pesca_content_v_locales_locale_parent_id_unique" ON "cms"."_pesca_content_v_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "ecoturismo_content_manifesto_segments_order_idx" ON "cms"."ecoturismo_content_manifesto_segments" USING btree ("_order");
  CREATE INDEX "ecoturismo_content_manifesto_segments_parent_id_idx" ON "cms"."ecoturismo_content_manifesto_segments" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "ecoturismo_content_manifesto_segments_locales_locale_parent_" ON "cms"."ecoturismo_content_manifesto_segments_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "ecoturismo_content_sobre_nos_body_order_idx" ON "cms"."ecoturismo_content_sobre_nos_body" USING btree ("_order");
  CREATE INDEX "ecoturismo_content_sobre_nos_body_parent_id_idx" ON "cms"."ecoturismo_content_sobre_nos_body" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "ecoturismo_content_sobre_nos_body_locales_locale_parent_id_u" ON "cms"."ecoturismo_content_sobre_nos_body_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "ecoturismo_content_sobre_nos_features_order_idx" ON "cms"."ecoturismo_content_sobre_nos_features" USING btree ("_order");
  CREATE INDEX "ecoturismo_content_sobre_nos_features_parent_id_idx" ON "cms"."ecoturismo_content_sobre_nos_features" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "ecoturismo_content_sobre_nos_features_locales_locale_parent_" ON "cms"."ecoturismo_content_sobre_nos_features_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "ecoturismo_content_highlights_items_order_idx" ON "cms"."ecoturismo_content_highlights_items" USING btree ("_order");
  CREATE INDEX "ecoturismo_content_highlights_items_parent_id_idx" ON "cms"."ecoturismo_content_highlights_items" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "ecoturismo_content_highlights_items_locales_locale_parent_id" ON "cms"."ecoturismo_content_highlights_items_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "ecoturismo_content_services_items_order_idx" ON "cms"."ecoturismo_content_services_items" USING btree ("_order");
  CREATE INDEX "ecoturismo_content_services_items_parent_id_idx" ON "cms"."ecoturismo_content_services_items" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "ecoturismo_content_services_items_locales_locale_parent_id_u" ON "cms"."ecoturismo_content_services_items_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "ecoturismo_content_faq_items_order_idx" ON "cms"."ecoturismo_content_faq_items" USING btree ("_order");
  CREATE INDEX "ecoturismo_content_faq_items_parent_id_idx" ON "cms"."ecoturismo_content_faq_items" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "ecoturismo_content_faq_items_locales_locale_parent_id_unique" ON "cms"."ecoturismo_content_faq_items_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "ecoturismo_content_meta_meta_image_idx" ON "cms"."ecoturismo_content_locales" USING btree ("meta_image_id","_locale");
  CREATE UNIQUE INDEX "ecoturismo_content_locales_locale_parent_id_unique" ON "cms"."ecoturismo_content_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_ecoturismo_content_v_version_manifesto_segments_order_idx" ON "cms"."_ecoturismo_content_v_version_manifesto_segments" USING btree ("_order");
  CREATE INDEX "_ecoturismo_content_v_version_manifesto_segments_parent_id_idx" ON "cms"."_ecoturismo_content_v_version_manifesto_segments" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "_ecoturismo_content_v_version_manifesto_segments_locales_loc" ON "cms"."_ecoturismo_content_v_version_manifesto_segments_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_ecoturismo_content_v_version_sobre_nos_body_order_idx" ON "cms"."_ecoturismo_content_v_version_sobre_nos_body" USING btree ("_order");
  CREATE INDEX "_ecoturismo_content_v_version_sobre_nos_body_parent_id_idx" ON "cms"."_ecoturismo_content_v_version_sobre_nos_body" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "_ecoturismo_content_v_version_sobre_nos_body_locales_locale_" ON "cms"."_ecoturismo_content_v_version_sobre_nos_body_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_ecoturismo_content_v_version_sobre_nos_features_order_idx" ON "cms"."_ecoturismo_content_v_version_sobre_nos_features" USING btree ("_order");
  CREATE INDEX "_ecoturismo_content_v_version_sobre_nos_features_parent_id_idx" ON "cms"."_ecoturismo_content_v_version_sobre_nos_features" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "_ecoturismo_content_v_version_sobre_nos_features_locales_loc" ON "cms"."_ecoturismo_content_v_version_sobre_nos_features_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_ecoturismo_content_v_version_highlights_items_order_idx" ON "cms"."_ecoturismo_content_v_version_highlights_items" USING btree ("_order");
  CREATE INDEX "_ecoturismo_content_v_version_highlights_items_parent_id_idx" ON "cms"."_ecoturismo_content_v_version_highlights_items" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "_ecoturismo_content_v_version_highlights_items_locales_local" ON "cms"."_ecoturismo_content_v_version_highlights_items_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_ecoturismo_content_v_version_services_items_order_idx" ON "cms"."_ecoturismo_content_v_version_services_items" USING btree ("_order");
  CREATE INDEX "_ecoturismo_content_v_version_services_items_parent_id_idx" ON "cms"."_ecoturismo_content_v_version_services_items" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "_ecoturismo_content_v_version_services_items_locales_locale_" ON "cms"."_ecoturismo_content_v_version_services_items_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_ecoturismo_content_v_version_faq_items_order_idx" ON "cms"."_ecoturismo_content_v_version_faq_items" USING btree ("_order");
  CREATE INDEX "_ecoturismo_content_v_version_faq_items_parent_id_idx" ON "cms"."_ecoturismo_content_v_version_faq_items" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "_ecoturismo_content_v_version_faq_items_locales_locale_paren" ON "cms"."_ecoturismo_content_v_version_faq_items_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_ecoturismo_content_v_created_at_idx" ON "cms"."_ecoturismo_content_v" USING btree ("created_at");
  CREATE INDEX "_ecoturismo_content_v_updated_at_idx" ON "cms"."_ecoturismo_content_v" USING btree ("updated_at");
  CREATE INDEX "_ecoturismo_content_v_version_meta_version_meta_image_idx" ON "cms"."_ecoturismo_content_v_locales" USING btree ("version_meta_image_id","_locale");
  CREATE UNIQUE INDEX "_ecoturismo_content_v_locales_locale_parent_id_unique" ON "cms"."_ecoturismo_content_v_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "birdwatching_content_manifesto_segments_order_idx" ON "cms"."birdwatching_content_manifesto_segments" USING btree ("_order");
  CREATE INDEX "birdwatching_content_manifesto_segments_parent_id_idx" ON "cms"."birdwatching_content_manifesto_segments" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "birdwatching_content_manifesto_segments_locales_locale_paren" ON "cms"."birdwatching_content_manifesto_segments_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "birdwatching_content_sobre_nos_body_order_idx" ON "cms"."birdwatching_content_sobre_nos_body" USING btree ("_order");
  CREATE INDEX "birdwatching_content_sobre_nos_body_parent_id_idx" ON "cms"."birdwatching_content_sobre_nos_body" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "birdwatching_content_sobre_nos_body_locales_locale_parent_id" ON "cms"."birdwatching_content_sobre_nos_body_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "birdwatching_content_sobre_nos_features_order_idx" ON "cms"."birdwatching_content_sobre_nos_features" USING btree ("_order");
  CREATE INDEX "birdwatching_content_sobre_nos_features_parent_id_idx" ON "cms"."birdwatching_content_sobre_nos_features" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "birdwatching_content_sobre_nos_features_locales_locale_paren" ON "cms"."birdwatching_content_sobre_nos_features_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "birdwatching_content_highlights_items_order_idx" ON "cms"."birdwatching_content_highlights_items" USING btree ("_order");
  CREATE INDEX "birdwatching_content_highlights_items_parent_id_idx" ON "cms"."birdwatching_content_highlights_items" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "birdwatching_content_highlights_items_locales_locale_parent_" ON "cms"."birdwatching_content_highlights_items_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "birdwatching_content_faq_items_order_idx" ON "cms"."birdwatching_content_faq_items" USING btree ("_order");
  CREATE INDEX "birdwatching_content_faq_items_parent_id_idx" ON "cms"."birdwatching_content_faq_items" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "birdwatching_content_faq_items_locales_locale_parent_id_uniq" ON "cms"."birdwatching_content_faq_items_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "birdwatching_content_meta_meta_image_idx" ON "cms"."birdwatching_content_locales" USING btree ("meta_image_id","_locale");
  CREATE UNIQUE INDEX "birdwatching_content_locales_locale_parent_id_unique" ON "cms"."birdwatching_content_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_birdwatching_content_v_version_manifesto_segments_order_idx" ON "cms"."_birdwatching_content_v_version_manifesto_segments" USING btree ("_order");
  CREATE INDEX "_birdwatching_content_v_version_manifesto_segments_parent_id_idx" ON "cms"."_birdwatching_content_v_version_manifesto_segments" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "_birdwatching_content_v_version_manifesto_segments_locales_l" ON "cms"."_birdwatching_content_v_version_manifesto_segments_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_birdwatching_content_v_version_sobre_nos_body_order_idx" ON "cms"."_birdwatching_content_v_version_sobre_nos_body" USING btree ("_order");
  CREATE INDEX "_birdwatching_content_v_version_sobre_nos_body_parent_id_idx" ON "cms"."_birdwatching_content_v_version_sobre_nos_body" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "_birdwatching_content_v_version_sobre_nos_body_locales_local" ON "cms"."_birdwatching_content_v_version_sobre_nos_body_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_birdwatching_content_v_version_sobre_nos_features_order_idx" ON "cms"."_birdwatching_content_v_version_sobre_nos_features" USING btree ("_order");
  CREATE INDEX "_birdwatching_content_v_version_sobre_nos_features_parent_id_idx" ON "cms"."_birdwatching_content_v_version_sobre_nos_features" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "_birdwatching_content_v_version_sobre_nos_features_locales_l" ON "cms"."_birdwatching_content_v_version_sobre_nos_features_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_birdwatching_content_v_version_highlights_items_order_idx" ON "cms"."_birdwatching_content_v_version_highlights_items" USING btree ("_order");
  CREATE INDEX "_birdwatching_content_v_version_highlights_items_parent_id_idx" ON "cms"."_birdwatching_content_v_version_highlights_items" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "_birdwatching_content_v_version_highlights_items_locales_loc" ON "cms"."_birdwatching_content_v_version_highlights_items_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_birdwatching_content_v_version_faq_items_order_idx" ON "cms"."_birdwatching_content_v_version_faq_items" USING btree ("_order");
  CREATE INDEX "_birdwatching_content_v_version_faq_items_parent_id_idx" ON "cms"."_birdwatching_content_v_version_faq_items" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "_birdwatching_content_v_version_faq_items_locales_locale_par" ON "cms"."_birdwatching_content_v_version_faq_items_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_birdwatching_content_v_created_at_idx" ON "cms"."_birdwatching_content_v" USING btree ("created_at");
  CREATE INDEX "_birdwatching_content_v_updated_at_idx" ON "cms"."_birdwatching_content_v" USING btree ("updated_at");
  CREATE INDEX "_birdwatching_content_v_version_meta_version_meta_image_idx" ON "cms"."_birdwatching_content_v_locales" USING btree ("version_meta_image_id","_locale");
  CREATE UNIQUE INDEX "_birdwatching_content_v_locales_locale_parent_id_unique" ON "cms"."_birdwatching_content_v_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "contato_content_steps_placeholders_order_idx" ON "cms"."contato_content_steps_placeholders" USING btree ("_order");
  CREATE INDEX "contato_content_steps_placeholders_parent_id_idx" ON "cms"."contato_content_steps_placeholders" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "contato_content_steps_placeholders_locales_locale_parent_id_" ON "cms"."contato_content_steps_placeholders_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "contato_content_channels_items_order_idx" ON "cms"."contato_content_channels_items" USING btree ("_order");
  CREATE INDEX "contato_content_channels_items_parent_id_idx" ON "cms"."contato_content_channels_items" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "contato_content_channels_items_locales_locale_parent_id_uniq" ON "cms"."contato_content_channels_items_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "contato_content_meta_meta_image_idx" ON "cms"."contato_content_locales" USING btree ("meta_image_id","_locale");
  CREATE UNIQUE INDEX "contato_content_locales_locale_parent_id_unique" ON "cms"."contato_content_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_contato_content_v_version_steps_placeholders_order_idx" ON "cms"."_contato_content_v_version_steps_placeholders" USING btree ("_order");
  CREATE INDEX "_contato_content_v_version_steps_placeholders_parent_id_idx" ON "cms"."_contato_content_v_version_steps_placeholders" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "_contato_content_v_version_steps_placeholders_locales_locale" ON "cms"."_contato_content_v_version_steps_placeholders_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_contato_content_v_version_channels_items_order_idx" ON "cms"."_contato_content_v_version_channels_items" USING btree ("_order");
  CREATE INDEX "_contato_content_v_version_channels_items_parent_id_idx" ON "cms"."_contato_content_v_version_channels_items" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "_contato_content_v_version_channels_items_locales_locale_par" ON "cms"."_contato_content_v_version_channels_items_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_contato_content_v_created_at_idx" ON "cms"."_contato_content_v" USING btree ("created_at");
  CREATE INDEX "_contato_content_v_updated_at_idx" ON "cms"."_contato_content_v" USING btree ("updated_at");
  CREATE INDEX "_contato_content_v_version_meta_version_meta_image_idx" ON "cms"."_contato_content_v_locales" USING btree ("version_meta_image_id","_locale");
  CREATE UNIQUE INDEX "_contato_content_v_locales_locale_parent_id_unique" ON "cms"."_contato_content_v_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "nosso_impacto_content_manifesto_segments_order_idx" ON "cms"."nosso_impacto_content_manifesto_segments" USING btree ("_order");
  CREATE INDEX "nosso_impacto_content_manifesto_segments_parent_id_idx" ON "cms"."nosso_impacto_content_manifesto_segments" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "nosso_impacto_content_manifesto_segments_locales_locale_pare" ON "cms"."nosso_impacto_content_manifesto_segments_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "nosso_impacto_content_rio_vivo_steps_order_idx" ON "cms"."nosso_impacto_content_rio_vivo_steps" USING btree ("_order");
  CREATE INDEX "nosso_impacto_content_rio_vivo_steps_parent_id_idx" ON "cms"."nosso_impacto_content_rio_vivo_steps" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "nosso_impacto_content_rio_vivo_steps_locales_locale_parent_i" ON "cms"."nosso_impacto_content_rio_vivo_steps_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "nosso_impacto_content_biodiversidade_counters_order_idx" ON "cms"."nosso_impacto_content_biodiversidade_counters" USING btree ("_order");
  CREATE INDEX "nosso_impacto_content_biodiversidade_counters_parent_id_idx" ON "cms"."nosso_impacto_content_biodiversidade_counters" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "nosso_impacto_content_biodiversidade_counters_locales_locale" ON "cms"."nosso_impacto_content_biodiversidade_counters_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "nosso_impacto_content_comunidade_body_order_idx" ON "cms"."nosso_impacto_content_comunidade_body" USING btree ("_order");
  CREATE INDEX "nosso_impacto_content_comunidade_body_parent_id_idx" ON "cms"."nosso_impacto_content_comunidade_body" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "nosso_impacto_content_comunidade_body_locales_locale_parent_" ON "cms"."nosso_impacto_content_comunidade_body_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "nosso_impacto_content_operacao_practices_order_idx" ON "cms"."nosso_impacto_content_operacao_practices" USING btree ("_order");
  CREATE INDEX "nosso_impacto_content_operacao_practices_parent_id_idx" ON "cms"."nosso_impacto_content_operacao_practices" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "nosso_impacto_content_operacao_practices_locales_locale_pare" ON "cms"."nosso_impacto_content_operacao_practices_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "nosso_impacto_content_meta_meta_image_idx" ON "cms"."nosso_impacto_content_locales" USING btree ("meta_image_id","_locale");
  CREATE UNIQUE INDEX "nosso_impacto_content_locales_locale_parent_id_unique" ON "cms"."nosso_impacto_content_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_nosso_impacto_content_v_version_manifesto_segments_order_idx" ON "cms"."_nosso_impacto_content_v_version_manifesto_segments" USING btree ("_order");
  CREATE INDEX "_nosso_impacto_content_v_version_manifesto_segments_parent_id_idx" ON "cms"."_nosso_impacto_content_v_version_manifesto_segments" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "_nosso_impacto_content_v_version_manifesto_segments_locales_" ON "cms"."_nosso_impacto_content_v_version_manifesto_segments_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_nosso_impacto_content_v_version_rio_vivo_steps_order_idx" ON "cms"."_nosso_impacto_content_v_version_rio_vivo_steps" USING btree ("_order");
  CREATE INDEX "_nosso_impacto_content_v_version_rio_vivo_steps_parent_id_idx" ON "cms"."_nosso_impacto_content_v_version_rio_vivo_steps" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "_nosso_impacto_content_v_version_rio_vivo_steps_locales_loca" ON "cms"."_nosso_impacto_content_v_version_rio_vivo_steps_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_nosso_impacto_content_v_version_biodiversidade_counters_order_idx" ON "cms"."_nosso_impacto_content_v_version_biodiversidade_counters" USING btree ("_order");
  CREATE INDEX "_nosso_impacto_content_v_version_biodiversidade_counters_parent_id_idx" ON "cms"."_nosso_impacto_content_v_version_biodiversidade_counters" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "_nosso_impacto_content_v_version_biodiversidade_counters_loc" ON "cms"."_nosso_impacto_content_v_version_biodiversidade_counters_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_nosso_impacto_content_v_version_comunidade_body_order_idx" ON "cms"."_nosso_impacto_content_v_version_comunidade_body" USING btree ("_order");
  CREATE INDEX "_nosso_impacto_content_v_version_comunidade_body_parent_id_idx" ON "cms"."_nosso_impacto_content_v_version_comunidade_body" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "_nosso_impacto_content_v_version_comunidade_body_locales_loc" ON "cms"."_nosso_impacto_content_v_version_comunidade_body_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_nosso_impacto_content_v_version_operacao_practices_order_idx" ON "cms"."_nosso_impacto_content_v_version_operacao_practices" USING btree ("_order");
  CREATE INDEX "_nosso_impacto_content_v_version_operacao_practices_parent_id_idx" ON "cms"."_nosso_impacto_content_v_version_operacao_practices" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "_nosso_impacto_content_v_version_operacao_practices_locales_" ON "cms"."_nosso_impacto_content_v_version_operacao_practices_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_nosso_impacto_content_v_created_at_idx" ON "cms"."_nosso_impacto_content_v" USING btree ("created_at");
  CREATE INDEX "_nosso_impacto_content_v_updated_at_idx" ON "cms"."_nosso_impacto_content_v" USING btree ("updated_at");
  CREATE INDEX "_nosso_impacto_content_v_version_meta_version_meta_image_idx" ON "cms"."_nosso_impacto_content_v_locales" USING btree ("version_meta_image_id","_locale");
  CREATE UNIQUE INDEX "_nosso_impacto_content_v_locales_locale_parent_id_unique" ON "cms"."_nosso_impacto_content_v_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "privacidade_content_sections_content_order_idx" ON "cms"."privacidade_content_sections_content" USING btree ("_order");
  CREATE INDEX "privacidade_content_sections_content_parent_id_idx" ON "cms"."privacidade_content_sections_content" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "privacidade_content_sections_content_locales_locale_parent_i" ON "cms"."privacidade_content_sections_content_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "privacidade_content_sections_order_idx" ON "cms"."privacidade_content_sections" USING btree ("_order");
  CREATE INDEX "privacidade_content_sections_parent_id_idx" ON "cms"."privacidade_content_sections" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "privacidade_content_sections_locales_locale_parent_id_unique" ON "cms"."privacidade_content_sections_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "privacidade_content_meta_meta_image_idx" ON "cms"."privacidade_content_locales" USING btree ("meta_image_id","_locale");
  CREATE UNIQUE INDEX "privacidade_content_locales_locale_parent_id_unique" ON "cms"."privacidade_content_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_privacidade_content_v_version_sections_content_order_idx" ON "cms"."_privacidade_content_v_version_sections_content" USING btree ("_order");
  CREATE INDEX "_privacidade_content_v_version_sections_content_parent_id_idx" ON "cms"."_privacidade_content_v_version_sections_content" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "_privacidade_content_v_version_sections_content_locales_loca" ON "cms"."_privacidade_content_v_version_sections_content_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_privacidade_content_v_version_sections_order_idx" ON "cms"."_privacidade_content_v_version_sections" USING btree ("_order");
  CREATE INDEX "_privacidade_content_v_version_sections_parent_id_idx" ON "cms"."_privacidade_content_v_version_sections" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "_privacidade_content_v_version_sections_locales_locale_paren" ON "cms"."_privacidade_content_v_version_sections_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_privacidade_content_v_created_at_idx" ON "cms"."_privacidade_content_v" USING btree ("created_at");
  CREATE INDEX "_privacidade_content_v_updated_at_idx" ON "cms"."_privacidade_content_v" USING btree ("updated_at");
  CREATE INDEX "_privacidade_content_v_version_meta_version_meta_image_idx" ON "cms"."_privacidade_content_v_locales" USING btree ("version_meta_image_id","_locale");
  CREATE UNIQUE INDEX "_privacidade_content_v_locales_locale_parent_id_unique" ON "cms"."_privacidade_content_v_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "not_found_content_meta_meta_image_idx" ON "cms"."not_found_content_locales" USING btree ("meta_image_id","_locale");
  CREATE UNIQUE INDEX "not_found_content_locales_locale_parent_id_unique" ON "cms"."not_found_content_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_not_found_content_v_created_at_idx" ON "cms"."_not_found_content_v" USING btree ("created_at");
  CREATE INDEX "_not_found_content_v_updated_at_idx" ON "cms"."_not_found_content_v" USING btree ("updated_at");
  CREATE INDEX "_not_found_content_v_version_meta_version_meta_image_idx" ON "cms"."_not_found_content_v_locales" USING btree ("version_meta_image_id","_locale");
  CREATE UNIQUE INDEX "_not_found_content_v_locales_locale_parent_id_unique" ON "cms"."_not_found_content_v_locales" USING btree ("_locale","_parent_id");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   DROP TABLE "cms"."pages" CASCADE;
  DROP TABLE "cms"."media" CASCADE;
  DROP TABLE "cms"."media_locales" CASCADE;
  DROP TABLE "cms"."blog_posts_blocks_paragraph" CASCADE;
  DROP TABLE "cms"."blog_posts_blocks_paragraph_locales" CASCADE;
  DROP TABLE "cms"."blog_posts_blocks_heading" CASCADE;
  DROP TABLE "cms"."blog_posts_blocks_heading_locales" CASCADE;
  DROP TABLE "cms"."blog_posts_blocks_species" CASCADE;
  DROP TABLE "cms"."blog_posts_blocks_species_locales" CASCADE;
  DROP TABLE "cms"."blog_posts_blocks_ordered_list_items" CASCADE;
  DROP TABLE "cms"."blog_posts_blocks_ordered_list_items_locales" CASCADE;
  DROP TABLE "cms"."blog_posts_blocks_ordered_list" CASCADE;
  DROP TABLE "cms"."blog_posts" CASCADE;
  DROP TABLE "cms"."blog_posts_locales" CASCADE;
  DROP TABLE "cms"."blog_posts_rels" CASCADE;
  DROP TABLE "cms"."_blog_posts_v_blocks_paragraph" CASCADE;
  DROP TABLE "cms"."_blog_posts_v_blocks_paragraph_locales" CASCADE;
  DROP TABLE "cms"."_blog_posts_v_blocks_heading" CASCADE;
  DROP TABLE "cms"."_blog_posts_v_blocks_heading_locales" CASCADE;
  DROP TABLE "cms"."_blog_posts_v_blocks_species" CASCADE;
  DROP TABLE "cms"."_blog_posts_v_blocks_species_locales" CASCADE;
  DROP TABLE "cms"."_blog_posts_v_blocks_ordered_list_items" CASCADE;
  DROP TABLE "cms"."_blog_posts_v_blocks_ordered_list_items_locales" CASCADE;
  DROP TABLE "cms"."_blog_posts_v_blocks_ordered_list" CASCADE;
  DROP TABLE "cms"."_blog_posts_v" CASCADE;
  DROP TABLE "cms"."_blog_posts_v_locales" CASCADE;
  DROP TABLE "cms"."_blog_posts_v_rels" CASCADE;
  DROP TABLE "cms"."blog_categories" CASCADE;
  DROP TABLE "cms"."bird_species_photography_tips" CASCADE;
  DROP TABLE "cms"."bird_species_photography_tips_locales" CASCADE;
  DROP TABLE "cms"."bird_species" CASCADE;
  DROP TABLE "cms"."bird_species_locales" CASCADE;
  DROP TABLE "cms"."bird_species_rels" CASCADE;
  DROP TABLE "cms"."bird_categories" CASCADE;
  DROP TABLE "cms"."users_sessions" CASCADE;
  DROP TABLE "cms"."users" CASCADE;
  DROP TABLE "cms"."payload_kv" CASCADE;
  DROP TABLE "cms"."payload_locked_documents" CASCADE;
  DROP TABLE "cms"."payload_locked_documents_rels" CASCADE;
  DROP TABLE "cms"."payload_preferences" CASCADE;
  DROP TABLE "cms"."payload_preferences_rels" CASCADE;
  DROP TABLE "cms"."payload_migrations" CASCADE;
  DROP TABLE "cms"."agent_config" CASCADE;
  DROP TABLE "cms"."_agent_config_v" CASCADE;
  DROP TABLE "cms"."site_settings_faq_items" CASCADE;
  DROP TABLE "cms"."site_settings_faq_items_locales" CASCADE;
  DROP TABLE "cms"."site_settings_testimonial_items" CASCADE;
  DROP TABLE "cms"."site_settings_testimonial_items_locales" CASCADE;
  DROP TABLE "cms"."site_settings_footer_pousada_links" CASCADE;
  DROP TABLE "cms"."site_settings_footer_pousada_links_locales" CASCADE;
  DROP TABLE "cms"."site_settings_footer_experiencias_links" CASCADE;
  DROP TABLE "cms"."site_settings_footer_experiencias_links_locales" CASCADE;
  DROP TABLE "cms"."site_settings_footer_legal_links" CASCADE;
  DROP TABLE "cms"."site_settings_footer_legal_links_locales" CASCADE;
  DROP TABLE "cms"."site_settings_authors_knows_about" CASCADE;
  DROP TABLE "cms"."site_settings_authors" CASCADE;
  DROP TABLE "cms"."site_settings_authors_locales" CASCADE;
  DROP TABLE "cms"."site_settings_seasonal_events" CASCADE;
  DROP TABLE "cms"."site_settings_seasonal_events_locales" CASCADE;
  DROP TABLE "cms"."site_settings" CASCADE;
  DROP TABLE "cms"."site_settings_locales" CASCADE;
  DROP TABLE "cms"."_site_settings_v_version_faq_items" CASCADE;
  DROP TABLE "cms"."_site_settings_v_version_faq_items_locales" CASCADE;
  DROP TABLE "cms"."_site_settings_v_version_testimonial_items" CASCADE;
  DROP TABLE "cms"."_site_settings_v_version_testimonial_items_locales" CASCADE;
  DROP TABLE "cms"."_site_settings_v_version_footer_pousada_links" CASCADE;
  DROP TABLE "cms"."_site_settings_v_version_footer_pousada_links_locales" CASCADE;
  DROP TABLE "cms"."_site_settings_v_version_footer_experiencias_links" CASCADE;
  DROP TABLE "cms"."_site_settings_v_version_footer_experiencias_links_locales" CASCADE;
  DROP TABLE "cms"."_site_settings_v_version_footer_legal_links" CASCADE;
  DROP TABLE "cms"."_site_settings_v_version_footer_legal_links_locales" CASCADE;
  DROP TABLE "cms"."_site_settings_v_version_authors_knows_about" CASCADE;
  DROP TABLE "cms"."_site_settings_v_version_authors" CASCADE;
  DROP TABLE "cms"."_site_settings_v_version_authors_locales" CASCADE;
  DROP TABLE "cms"."_site_settings_v_version_seasonal_events" CASCADE;
  DROP TABLE "cms"."_site_settings_v_version_seasonal_events_locales" CASCADE;
  DROP TABLE "cms"."_site_settings_v" CASCADE;
  DROP TABLE "cms"."_site_settings_v_locales" CASCADE;
  DROP TABLE "cms"."home_content_about_us_body" CASCADE;
  DROP TABLE "cms"."home_content_about_us_body_locales" CASCADE;
  DROP TABLE "cms"."home_content_about_us_features" CASCADE;
  DROP TABLE "cms"."home_content_about_us_features_locales" CASCADE;
  DROP TABLE "cms"."home_content_expeditions_items" CASCADE;
  DROP TABLE "cms"."home_content_expeditions_items_locales" CASCADE;
  DROP TABLE "cms"."home_content_stats_items" CASCADE;
  DROP TABLE "cms"."home_content_stats_items_locales" CASCADE;
  DROP TABLE "cms"."home_content_impact_items" CASCADE;
  DROP TABLE "cms"."home_content_impact_items_locales" CASCADE;
  DROP TABLE "cms"."home_content_faq_items" CASCADE;
  DROP TABLE "cms"."home_content_faq_items_locales" CASCADE;
  DROP TABLE "cms"."home_content" CASCADE;
  DROP TABLE "cms"."home_content_locales" CASCADE;
  DROP TABLE "cms"."_home_content_v_version_about_us_body" CASCADE;
  DROP TABLE "cms"."_home_content_v_version_about_us_body_locales" CASCADE;
  DROP TABLE "cms"."_home_content_v_version_about_us_features" CASCADE;
  DROP TABLE "cms"."_home_content_v_version_about_us_features_locales" CASCADE;
  DROP TABLE "cms"."_home_content_v_version_expeditions_items" CASCADE;
  DROP TABLE "cms"."_home_content_v_version_expeditions_items_locales" CASCADE;
  DROP TABLE "cms"."_home_content_v_version_stats_items" CASCADE;
  DROP TABLE "cms"."_home_content_v_version_stats_items_locales" CASCADE;
  DROP TABLE "cms"."_home_content_v_version_impact_items" CASCADE;
  DROP TABLE "cms"."_home_content_v_version_impact_items_locales" CASCADE;
  DROP TABLE "cms"."_home_content_v_version_faq_items" CASCADE;
  DROP TABLE "cms"."_home_content_v_version_faq_items_locales" CASCADE;
  DROP TABLE "cms"."_home_content_v" CASCADE;
  DROP TABLE "cms"."_home_content_v_locales" CASCADE;
  DROP TABLE "cms"."acomodacoes_content_manifesto_segments" CASCADE;
  DROP TABLE "cms"."acomodacoes_content_manifesto_segments_locales" CASCADE;
  DROP TABLE "cms"."acomodacoes_content_highlights_items" CASCADE;
  DROP TABLE "cms"."acomodacoes_content_highlights_items_locales" CASCADE;
  DROP TABLE "cms"."acomodacoes_content_rooms_features" CASCADE;
  DROP TABLE "cms"."acomodacoes_content_rooms_features_locales" CASCADE;
  DROP TABLE "cms"."acomodacoes_content_rooms" CASCADE;
  DROP TABLE "cms"."acomodacoes_content_rooms_locales" CASCADE;
  DROP TABLE "cms"."acomodacoes_content_culinary_images" CASCADE;
  DROP TABLE "cms"."acomodacoes_content_culinary_images_locales" CASCADE;
  DROP TABLE "cms"."acomodacoes_content_faq_items" CASCADE;
  DROP TABLE "cms"."acomodacoes_content_faq_items_locales" CASCADE;
  DROP TABLE "cms"."acomodacoes_content" CASCADE;
  DROP TABLE "cms"."acomodacoes_content_locales" CASCADE;
  DROP TABLE "cms"."_acomodacoes_content_v_version_manifesto_segments" CASCADE;
  DROP TABLE "cms"."_acomodacoes_content_v_version_manifesto_segments_locales" CASCADE;
  DROP TABLE "cms"."_acomodacoes_content_v_version_highlights_items" CASCADE;
  DROP TABLE "cms"."_acomodacoes_content_v_version_highlights_items_locales" CASCADE;
  DROP TABLE "cms"."_acomodacoes_content_v_version_rooms_features" CASCADE;
  DROP TABLE "cms"."_acomodacoes_content_v_version_rooms_features_locales" CASCADE;
  DROP TABLE "cms"."_acomodacoes_content_v_version_rooms" CASCADE;
  DROP TABLE "cms"."_acomodacoes_content_v_version_rooms_locales" CASCADE;
  DROP TABLE "cms"."_acomodacoes_content_v_version_culinary_images" CASCADE;
  DROP TABLE "cms"."_acomodacoes_content_v_version_culinary_images_locales" CASCADE;
  DROP TABLE "cms"."_acomodacoes_content_v_version_faq_items" CASCADE;
  DROP TABLE "cms"."_acomodacoes_content_v_version_faq_items_locales" CASCADE;
  DROP TABLE "cms"."_acomodacoes_content_v" CASCADE;
  DROP TABLE "cms"."_acomodacoes_content_v_locales" CASCADE;
  DROP TABLE "cms"."culinaria_content_manifesto_segments" CASCADE;
  DROP TABLE "cms"."culinaria_content_manifesto_segments_locales" CASCADE;
  DROP TABLE "cms"."culinaria_content_menu_body" CASCADE;
  DROP TABLE "cms"."culinaria_content_menu_body_locales" CASCADE;
  DROP TABLE "cms"."culinaria_content_menu_features" CASCADE;
  DROP TABLE "cms"."culinaria_content_menu_features_locales" CASCADE;
  DROP TABLE "cms"."culinaria_content_highlights_items" CASCADE;
  DROP TABLE "cms"."culinaria_content_highlights_items_locales" CASCADE;
  DROP TABLE "cms"."culinaria_content_services_items" CASCADE;
  DROP TABLE "cms"."culinaria_content_services_items_locales" CASCADE;
  DROP TABLE "cms"."culinaria_content_experience_body" CASCADE;
  DROP TABLE "cms"."culinaria_content_experience_body_locales" CASCADE;
  DROP TABLE "cms"."culinaria_content_faq_items" CASCADE;
  DROP TABLE "cms"."culinaria_content_faq_items_locales" CASCADE;
  DROP TABLE "cms"."culinaria_content" CASCADE;
  DROP TABLE "cms"."culinaria_content_locales" CASCADE;
  DROP TABLE "cms"."_culinaria_content_v_version_manifesto_segments" CASCADE;
  DROP TABLE "cms"."_culinaria_content_v_version_manifesto_segments_locales" CASCADE;
  DROP TABLE "cms"."_culinaria_content_v_version_menu_body" CASCADE;
  DROP TABLE "cms"."_culinaria_content_v_version_menu_body_locales" CASCADE;
  DROP TABLE "cms"."_culinaria_content_v_version_menu_features" CASCADE;
  DROP TABLE "cms"."_culinaria_content_v_version_menu_features_locales" CASCADE;
  DROP TABLE "cms"."_culinaria_content_v_version_highlights_items" CASCADE;
  DROP TABLE "cms"."_culinaria_content_v_version_highlights_items_locales" CASCADE;
  DROP TABLE "cms"."_culinaria_content_v_version_services_items" CASCADE;
  DROP TABLE "cms"."_culinaria_content_v_version_services_items_locales" CASCADE;
  DROP TABLE "cms"."_culinaria_content_v_version_experience_body" CASCADE;
  DROP TABLE "cms"."_culinaria_content_v_version_experience_body_locales" CASCADE;
  DROP TABLE "cms"."_culinaria_content_v_version_faq_items" CASCADE;
  DROP TABLE "cms"."_culinaria_content_v_version_faq_items_locales" CASCADE;
  DROP TABLE "cms"."_culinaria_content_v" CASCADE;
  DROP TABLE "cms"."_culinaria_content_v_locales" CASCADE;
  DROP TABLE "cms"."pesca_content_manifesto_segments" CASCADE;
  DROP TABLE "cms"."pesca_content_manifesto_segments_locales" CASCADE;
  DROP TABLE "cms"."pesca_content_sobre_nos_body" CASCADE;
  DROP TABLE "cms"."pesca_content_sobre_nos_body_locales" CASCADE;
  DROP TABLE "cms"."pesca_content_sobre_nos_features" CASCADE;
  DROP TABLE "cms"."pesca_content_sobre_nos_features_locales" CASCADE;
  DROP TABLE "cms"."pesca_content_highlights_items" CASCADE;
  DROP TABLE "cms"."pesca_content_highlights_items_locales" CASCADE;
  DROP TABLE "cms"."pesca_content_services_items" CASCADE;
  DROP TABLE "cms"."pesca_content_services_items_locales" CASCADE;
  DROP TABLE "cms"."pesca_content_faq_items" CASCADE;
  DROP TABLE "cms"."pesca_content_faq_items_locales" CASCADE;
  DROP TABLE "cms"."pesca_content" CASCADE;
  DROP TABLE "cms"."pesca_content_locales" CASCADE;
  DROP TABLE "cms"."_pesca_content_v_version_manifesto_segments" CASCADE;
  DROP TABLE "cms"."_pesca_content_v_version_manifesto_segments_locales" CASCADE;
  DROP TABLE "cms"."_pesca_content_v_version_sobre_nos_body" CASCADE;
  DROP TABLE "cms"."_pesca_content_v_version_sobre_nos_body_locales" CASCADE;
  DROP TABLE "cms"."_pesca_content_v_version_sobre_nos_features" CASCADE;
  DROP TABLE "cms"."_pesca_content_v_version_sobre_nos_features_locales" CASCADE;
  DROP TABLE "cms"."_pesca_content_v_version_highlights_items" CASCADE;
  DROP TABLE "cms"."_pesca_content_v_version_highlights_items_locales" CASCADE;
  DROP TABLE "cms"."_pesca_content_v_version_services_items" CASCADE;
  DROP TABLE "cms"."_pesca_content_v_version_services_items_locales" CASCADE;
  DROP TABLE "cms"."_pesca_content_v_version_faq_items" CASCADE;
  DROP TABLE "cms"."_pesca_content_v_version_faq_items_locales" CASCADE;
  DROP TABLE "cms"."_pesca_content_v" CASCADE;
  DROP TABLE "cms"."_pesca_content_v_locales" CASCADE;
  DROP TABLE "cms"."ecoturismo_content_manifesto_segments" CASCADE;
  DROP TABLE "cms"."ecoturismo_content_manifesto_segments_locales" CASCADE;
  DROP TABLE "cms"."ecoturismo_content_sobre_nos_body" CASCADE;
  DROP TABLE "cms"."ecoturismo_content_sobre_nos_body_locales" CASCADE;
  DROP TABLE "cms"."ecoturismo_content_sobre_nos_features" CASCADE;
  DROP TABLE "cms"."ecoturismo_content_sobre_nos_features_locales" CASCADE;
  DROP TABLE "cms"."ecoturismo_content_highlights_items" CASCADE;
  DROP TABLE "cms"."ecoturismo_content_highlights_items_locales" CASCADE;
  DROP TABLE "cms"."ecoturismo_content_services_items" CASCADE;
  DROP TABLE "cms"."ecoturismo_content_services_items_locales" CASCADE;
  DROP TABLE "cms"."ecoturismo_content_faq_items" CASCADE;
  DROP TABLE "cms"."ecoturismo_content_faq_items_locales" CASCADE;
  DROP TABLE "cms"."ecoturismo_content" CASCADE;
  DROP TABLE "cms"."ecoturismo_content_locales" CASCADE;
  DROP TABLE "cms"."_ecoturismo_content_v_version_manifesto_segments" CASCADE;
  DROP TABLE "cms"."_ecoturismo_content_v_version_manifesto_segments_locales" CASCADE;
  DROP TABLE "cms"."_ecoturismo_content_v_version_sobre_nos_body" CASCADE;
  DROP TABLE "cms"."_ecoturismo_content_v_version_sobre_nos_body_locales" CASCADE;
  DROP TABLE "cms"."_ecoturismo_content_v_version_sobre_nos_features" CASCADE;
  DROP TABLE "cms"."_ecoturismo_content_v_version_sobre_nos_features_locales" CASCADE;
  DROP TABLE "cms"."_ecoturismo_content_v_version_highlights_items" CASCADE;
  DROP TABLE "cms"."_ecoturismo_content_v_version_highlights_items_locales" CASCADE;
  DROP TABLE "cms"."_ecoturismo_content_v_version_services_items" CASCADE;
  DROP TABLE "cms"."_ecoturismo_content_v_version_services_items_locales" CASCADE;
  DROP TABLE "cms"."_ecoturismo_content_v_version_faq_items" CASCADE;
  DROP TABLE "cms"."_ecoturismo_content_v_version_faq_items_locales" CASCADE;
  DROP TABLE "cms"."_ecoturismo_content_v" CASCADE;
  DROP TABLE "cms"."_ecoturismo_content_v_locales" CASCADE;
  DROP TABLE "cms"."birdwatching_content_manifesto_segments" CASCADE;
  DROP TABLE "cms"."birdwatching_content_manifesto_segments_locales" CASCADE;
  DROP TABLE "cms"."birdwatching_content_sobre_nos_body" CASCADE;
  DROP TABLE "cms"."birdwatching_content_sobre_nos_body_locales" CASCADE;
  DROP TABLE "cms"."birdwatching_content_sobre_nos_features" CASCADE;
  DROP TABLE "cms"."birdwatching_content_sobre_nos_features_locales" CASCADE;
  DROP TABLE "cms"."birdwatching_content_highlights_items" CASCADE;
  DROP TABLE "cms"."birdwatching_content_highlights_items_locales" CASCADE;
  DROP TABLE "cms"."birdwatching_content_faq_items" CASCADE;
  DROP TABLE "cms"."birdwatching_content_faq_items_locales" CASCADE;
  DROP TABLE "cms"."birdwatching_content" CASCADE;
  DROP TABLE "cms"."birdwatching_content_locales" CASCADE;
  DROP TABLE "cms"."_birdwatching_content_v_version_manifesto_segments" CASCADE;
  DROP TABLE "cms"."_birdwatching_content_v_version_manifesto_segments_locales" CASCADE;
  DROP TABLE "cms"."_birdwatching_content_v_version_sobre_nos_body" CASCADE;
  DROP TABLE "cms"."_birdwatching_content_v_version_sobre_nos_body_locales" CASCADE;
  DROP TABLE "cms"."_birdwatching_content_v_version_sobre_nos_features" CASCADE;
  DROP TABLE "cms"."_birdwatching_content_v_version_sobre_nos_features_locales" CASCADE;
  DROP TABLE "cms"."_birdwatching_content_v_version_highlights_items" CASCADE;
  DROP TABLE "cms"."_birdwatching_content_v_version_highlights_items_locales" CASCADE;
  DROP TABLE "cms"."_birdwatching_content_v_version_faq_items" CASCADE;
  DROP TABLE "cms"."_birdwatching_content_v_version_faq_items_locales" CASCADE;
  DROP TABLE "cms"."_birdwatching_content_v" CASCADE;
  DROP TABLE "cms"."_birdwatching_content_v_locales" CASCADE;
  DROP TABLE "cms"."contato_content_steps_placeholders" CASCADE;
  DROP TABLE "cms"."contato_content_steps_placeholders_locales" CASCADE;
  DROP TABLE "cms"."contato_content_channels_items" CASCADE;
  DROP TABLE "cms"."contato_content_channels_items_locales" CASCADE;
  DROP TABLE "cms"."contato_content" CASCADE;
  DROP TABLE "cms"."contato_content_locales" CASCADE;
  DROP TABLE "cms"."_contato_content_v_version_steps_placeholders" CASCADE;
  DROP TABLE "cms"."_contato_content_v_version_steps_placeholders_locales" CASCADE;
  DROP TABLE "cms"."_contato_content_v_version_channels_items" CASCADE;
  DROP TABLE "cms"."_contato_content_v_version_channels_items_locales" CASCADE;
  DROP TABLE "cms"."_contato_content_v" CASCADE;
  DROP TABLE "cms"."_contato_content_v_locales" CASCADE;
  DROP TABLE "cms"."nosso_impacto_content_manifesto_segments" CASCADE;
  DROP TABLE "cms"."nosso_impacto_content_manifesto_segments_locales" CASCADE;
  DROP TABLE "cms"."nosso_impacto_content_rio_vivo_steps" CASCADE;
  DROP TABLE "cms"."nosso_impacto_content_rio_vivo_steps_locales" CASCADE;
  DROP TABLE "cms"."nosso_impacto_content_biodiversidade_counters" CASCADE;
  DROP TABLE "cms"."nosso_impacto_content_biodiversidade_counters_locales" CASCADE;
  DROP TABLE "cms"."nosso_impacto_content_comunidade_body" CASCADE;
  DROP TABLE "cms"."nosso_impacto_content_comunidade_body_locales" CASCADE;
  DROP TABLE "cms"."nosso_impacto_content_operacao_practices" CASCADE;
  DROP TABLE "cms"."nosso_impacto_content_operacao_practices_locales" CASCADE;
  DROP TABLE "cms"."nosso_impacto_content" CASCADE;
  DROP TABLE "cms"."nosso_impacto_content_locales" CASCADE;
  DROP TABLE "cms"."_nosso_impacto_content_v_version_manifesto_segments" CASCADE;
  DROP TABLE "cms"."_nosso_impacto_content_v_version_manifesto_segments_locales" CASCADE;
  DROP TABLE "cms"."_nosso_impacto_content_v_version_rio_vivo_steps" CASCADE;
  DROP TABLE "cms"."_nosso_impacto_content_v_version_rio_vivo_steps_locales" CASCADE;
  DROP TABLE "cms"."_nosso_impacto_content_v_version_biodiversidade_counters" CASCADE;
  DROP TABLE "cms"."_nosso_impacto_content_v_version_biodiversidade_counters_locales" CASCADE;
  DROP TABLE "cms"."_nosso_impacto_content_v_version_comunidade_body" CASCADE;
  DROP TABLE "cms"."_nosso_impacto_content_v_version_comunidade_body_locales" CASCADE;
  DROP TABLE "cms"."_nosso_impacto_content_v_version_operacao_practices" CASCADE;
  DROP TABLE "cms"."_nosso_impacto_content_v_version_operacao_practices_locales" CASCADE;
  DROP TABLE "cms"."_nosso_impacto_content_v" CASCADE;
  DROP TABLE "cms"."_nosso_impacto_content_v_locales" CASCADE;
  DROP TABLE "cms"."privacidade_content_sections_content" CASCADE;
  DROP TABLE "cms"."privacidade_content_sections_content_locales" CASCADE;
  DROP TABLE "cms"."privacidade_content_sections" CASCADE;
  DROP TABLE "cms"."privacidade_content_sections_locales" CASCADE;
  DROP TABLE "cms"."privacidade_content" CASCADE;
  DROP TABLE "cms"."privacidade_content_locales" CASCADE;
  DROP TABLE "cms"."_privacidade_content_v_version_sections_content" CASCADE;
  DROP TABLE "cms"."_privacidade_content_v_version_sections_content_locales" CASCADE;
  DROP TABLE "cms"."_privacidade_content_v_version_sections" CASCADE;
  DROP TABLE "cms"."_privacidade_content_v_version_sections_locales" CASCADE;
  DROP TABLE "cms"."_privacidade_content_v" CASCADE;
  DROP TABLE "cms"."_privacidade_content_v_locales" CASCADE;
  DROP TABLE "cms"."not_found_content" CASCADE;
  DROP TABLE "cms"."not_found_content_locales" CASCADE;
  DROP TABLE "cms"."_not_found_content_v" CASCADE;
  DROP TABLE "cms"."_not_found_content_v_locales" CASCADE;
  DROP TYPE "cms"."_locales";`)
}
