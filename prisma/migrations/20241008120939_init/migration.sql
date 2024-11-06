/*
  Warnings:

  - The primary key for the `Categories` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `Products` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Categories" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "color" TEXT,
    "productId" TEXT,
    CONSTRAINT "Categories_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Products" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_Categories" ("color", "id", "name", "productId") SELECT "color", "id", "name", "productId" FROM "Categories";
DROP TABLE "Categories";
ALTER TABLE "new_Categories" RENAME TO "Categories";
CREATE TABLE "new_Products" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "price" REAL NOT NULL,
    "description" TEXT NOT NULL,
    "imageLink" TEXT NOT NULL
);
INSERT INTO "new_Products" ("description", "id", "imageLink", "name", "price") SELECT "description", "id", "imageLink", "name", "price" FROM "Products";
DROP TABLE "Products";
ALTER TABLE "new_Products" RENAME TO "Products";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
