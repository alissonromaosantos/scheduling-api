CREATE TYPE "user_role" AS ENUM('USER', 'ADMIN');--> statement-breakpoint
CREATE TABLE "contacts_groups" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid(),
	"user_id" uuid NOT NULL,
	"contact_id" uuid NOT NULL,
	"group_id" uuid NOT NULL
);
--> statement-breakpoint
CREATE TABLE "contacts" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid(),
	"user_id" uuid NOT NULL,
	"name" text NOT NULL,
	"email" text NOT NULL UNIQUE,
	"phone" text,
	"is_active" boolean DEFAULT true NOT NULL,
	"observations" text,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "contacts_id_user_id_unique" UNIQUE("id","user_id")
);
--> statement-breakpoint
CREATE TABLE "groups" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid(),
	"user_id" uuid NOT NULL,
	"name" text NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "groups_id_user_id_unique" UNIQUE("id","user_id")
);
--> statement-breakpoint
CREATE TABLE "users" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid(),
	"fullname" text NOT NULL,
	"email" text NOT NULL UNIQUE,
	"cpf" text NOT NULL UNIQUE,
	"phone" text,
	"address" text,
	"password" text NOT NULL,
	"role" "user_role" DEFAULT 'USER'::"user_role" NOT NULL
);
--> statement-breakpoint
ALTER TABLE "contacts_groups" ADD CONSTRAINT "contacts_groups_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE;--> statement-breakpoint
ALTER TABLE "contacts_groups" ADD CONSTRAINT "contacts_groups_contact_tenant_fk" FOREIGN KEY ("contact_id","user_id") REFERENCES "contacts"("id","user_id") ON DELETE CASCADE;--> statement-breakpoint
ALTER TABLE "contacts_groups" ADD CONSTRAINT "contacts_groups_group_tenant_fk" FOREIGN KEY ("group_id","user_id") REFERENCES "groups"("id","user_id") ON DELETE CASCADE;--> statement-breakpoint
ALTER TABLE "contacts" ADD CONSTRAINT "contacts_user_id_users_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE;--> statement-breakpoint
ALTER TABLE "groups" ADD CONSTRAINT "groups_user_id_users_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE;