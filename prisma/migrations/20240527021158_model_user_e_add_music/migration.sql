/*
  Warnings:

  - You are about to drop the column `Album` on the `Music` table. All the data in the column will be lost.
  - You are about to drop the column `ArtistId` on the `Music` table. All the data in the column will be lost.
  - Added the required column `album` to the `Music` table without a default value. This is not possible if the table is not empty.
  - Added the required column `artistId` to the `Music` table without a default value. This is not possible if the table is not empty.

*/
-- CreateTable
CREATE TABLE "Artist" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "photo" TEXT,
    "streams" TEXT NOT NULL
);

-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Music" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "genre" TEXT NOT NULL,
    "album" TEXT NOT NULL,
    "artistId" INTEGER NOT NULL,
    CONSTRAINT "Music_artistId_fkey" FOREIGN KEY ("artistId") REFERENCES "Artist" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Music" ("genre", "id", "name") SELECT "genre", "id", "name" FROM "Music";
DROP TABLE "Music";
ALTER TABLE "new_Music" RENAME TO "Music";
CREATE UNIQUE INDEX "Music_artistId_key" ON "Music"("artistId");
PRAGMA foreign_key_check("Music");
PRAGMA foreign_keys=ON;
