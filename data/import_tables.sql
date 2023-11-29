
-- BEGIN;

DROP TABLE IF EXISTS "user",
"question",
"tag",
"comment",
"question_has_tag";

-- -----------------------------------------------------
-- Table "user"
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS "user" (
  "id" serial PRIMARY KEY,
  "email" text NOT NULL,
  "password" text NOT NULL,
  "username" text NULL,
  "created_at" timestamptz NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updated_at" timestamptz
);

-- -----------------------------------------------------
-- Table "question"
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS "question" (
  "id" serial PRIMARY KEY,
  "title" text NOT NULL,
  "description" varchar NULL,
  "picture" text NULL,
  "created_at" timestamptz NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updated_at" timestamptz
);

-- -----------------------------------------------------
-- Table "tag"
CREATE TABLE IF NOT EXISTS "tag" (
  "id" serial PRIMARY KEY,
  "name" text NOT NULL,
  "icon" text NOT NULL,
  "created_at" timestamptz NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updated_at" timestamptz
);

-- -----------------------------------------------------
-- Table "comment"
CREATE TABLE IF NOT EXISTS "comment" (
  "id" serial PRIMARY KEY,
  "description" text NOT NULL,
  "user_id" integer NOT NULL REFERENCES "user"("id"),
  "question_id" integer NOT NULL REFERENCES "question"("id"),
  "created_at" timestamptz NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updated_at" timestamptz
);

-- -----------------------------------------------------
-- Table "question_has_tag"
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS "question_has_tag" (
  "id" serial PRIMARY KEY,
  "question_id" integer NOT NULL REFERENCES "question"("id"),
  "tag_id" integer NOT NULL REFERENCES "tag"("id"),
  "created_at" timestamptz NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updated_at" timestamptz,
  UNIQUE ("question_id", "tag_id")
);

-- COMMIT;