-- Use this script to initialize the database
-- Run on creation of the DB container
-- Create new tables and populate required data
-- Can use the db/init.js file to generate this SQL

DROP TABLE IF EXISTS "Users" CASCADE;
CREATE TABLE IF NOT EXISTS "Users" ("id"  SERIAL , "email" VARCHAR(255) NOT NULL UNIQUE, "verified" BOOLEAN DEFAULT false, "pwHash" VARCHAR(255) NOT NULL, "name" VARCHAR(255) NOT NULL, "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL, "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL, PRIMARY KEY ("id"));
SELECT i.relname AS name, ix.indisprimary AS primary, ix.indisunique AS unique, ix.indkey AS indkey, array_agg(a.attnum) as column_indexes, array_agg(a.attname) AS column_names, pg_get_indexdef(ix.indexrelid) AS definition FROM pg_class t, pg_class i, pg_index ix, pg_attribute a WHERE t.oid = ix.indrelid AND i.oid = ix.indexrelid AND a.attrelid = t.oid AND t.relkind = 'r' and t.relname = 'Users' GROUP BY i.relname, ix.indexrelid, ix.indisprimary, ix.indisunique, ix.indkey ORDER BY i.relname;
CREATE INDEX "IX_Users" ON "Users" ("email");
