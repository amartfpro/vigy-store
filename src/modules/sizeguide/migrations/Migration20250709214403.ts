import { Migration } from '@mikro-orm/migrations';

export class Migration20250709214403 extends Migration {

  override async up(): Promise<void> {
    this.addSql(`create table if not exists "sizechart" ("id" text not null, "name" text not null, "image_url" text null, "created_at" timestamptz not null default now(), "updated_at" timestamptz not null default now(), "deleted_at" timestamptz null, constraint "sizechart_pkey" primary key ("id"));`);
    this.addSql(`CREATE INDEX IF NOT EXISTS "IDX_sizechart_deleted_at" ON "sizechart" (deleted_at) WHERE deleted_at IS NULL;`);

    this.addSql(`create table if not exists "sizechart_measure" ("id" text not null, "size" text not null, "neck_girth" integer null, "shoulder_width" integer null, "neck_elbow" integer null, "chest_girth" integer null, "back_width" integer null, "hip_girth" integer null, "arm_length" integer null, "arm_girth" integer null, "wrist_girth" integer null, "thigh_girth" integer null, "ankle_girth" integer null, "trunk_height" integer null, "leg_height" integer null, "sizechart_id" text not null, "created_at" timestamptz not null default now(), "updated_at" timestamptz not null default now(), "deleted_at" timestamptz null, constraint "sizechart_measure_pkey" primary key ("id"));`);
    this.addSql(`CREATE INDEX IF NOT EXISTS "IDX_sizechart_measure_sizechart_id" ON "sizechart_measure" (sizechart_id) WHERE deleted_at IS NULL;`);
    this.addSql(`CREATE INDEX IF NOT EXISTS "IDX_sizechart_measure_deleted_at" ON "sizechart_measure" (deleted_at) WHERE deleted_at IS NULL;`);

    this.addSql(`create table if not exists "sizechart_relevant_measure" ("id" text not null, "field_name" text not null, "sizechart_id" text not null, "created_at" timestamptz not null default now(), "updated_at" timestamptz not null default now(), "deleted_at" timestamptz null, constraint "sizechart_relevant_measure_pkey" primary key ("id"));`);
    this.addSql(`CREATE INDEX IF NOT EXISTS "IDX_sizechart_relevant_measure_sizechart_id" ON "sizechart_relevant_measure" (sizechart_id) WHERE deleted_at IS NULL;`);
    this.addSql(`CREATE INDEX IF NOT EXISTS "IDX_sizechart_relevant_measure_deleted_at" ON "sizechart_relevant_measure" (deleted_at) WHERE deleted_at IS NULL;`);

    this.addSql(`create table if not exists "usersize" ("id" text not null, "neck_girth" integer null, "shoulder_width" integer null, "neck_elbow" integer null, "chest_girth" integer null, "back_width" integer null, "hip_girth" integer null, "arm_length" integer null, "arm_girth" integer null, "wrist_girth" integer null, "thigh_girth" integer null, "ankle_girth" integer null, "trunk_height" integer null, "leg_height" integer null, "created_at" timestamptz not null default now(), "updated_at" timestamptz not null default now(), "deleted_at" timestamptz null, constraint "usersize_pkey" primary key ("id"));`);
    this.addSql(`CREATE INDEX IF NOT EXISTS "IDX_usersize_deleted_at" ON "usersize" (deleted_at) WHERE deleted_at IS NULL;`);

    this.addSql(`alter table if exists "sizechart_measure" add constraint "sizechart_measure_sizechart_id_foreign" foreign key ("sizechart_id") references "sizechart" ("id") on update cascade;`);

    this.addSql(`alter table if exists "sizechart_relevant_measure" add constraint "sizechart_relevant_measure_sizechart_id_foreign" foreign key ("sizechart_id") references "sizechart" ("id") on update cascade;`);
  }

  override async down(): Promise<void> {
    this.addSql(`alter table if exists "sizechart_measure" drop constraint if exists "sizechart_measure_sizechart_id_foreign";`);

    this.addSql(`alter table if exists "sizechart_relevant_measure" drop constraint if exists "sizechart_relevant_measure_sizechart_id_foreign";`);

    this.addSql(`drop table if exists "sizechart" cascade;`);

    this.addSql(`drop table if exists "sizechart_measure" cascade;`);

    this.addSql(`drop table if exists "sizechart_relevant_measure" cascade;`);

    this.addSql(`drop table if exists "usersize" cascade;`);
  }

}
