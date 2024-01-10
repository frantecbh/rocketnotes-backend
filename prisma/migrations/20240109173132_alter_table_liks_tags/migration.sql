/*
  Warnings:

  - You are about to drop the column `name` on the `links` table. All the data in the column will be lost.
  - You are about to drop the column `updated_at` on the `links` table. All the data in the column will be lost.
  - You are about to drop the column `created_at` on the `tags` table. All the data in the column will be lost.
  - You are about to drop the column `updated_at` on the `tags` table. All the data in the column will be lost.
  - Added the required column `url` to the `links` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_links" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "url" TEXT NOT NULL,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "id_notes" TEXT,
    CONSTRAINT "links_id_notes_fkey" FOREIGN KEY ("id_notes") REFERENCES "notes" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_links" ("created_at", "id", "id_notes") SELECT "created_at", "id", "id_notes" FROM "links";
DROP TABLE "links";
ALTER TABLE "new_links" RENAME TO "links";
CREATE TABLE "new_tags" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "id_users" TEXT,
    "id_notes" TEXT,
    CONSTRAINT "tags_id_users_fkey" FOREIGN KEY ("id_users") REFERENCES "users" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "tags_id_notes_fkey" FOREIGN KEY ("id_notes") REFERENCES "notes" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_tags" ("id", "id_notes", "id_users", "name") SELECT "id", "id_notes", "id_users", "name" FROM "tags";
DROP TABLE "tags";
ALTER TABLE "new_tags" RENAME TO "tags";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
