-- CreateTable
CREATE TABLE "Product" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "price" REAL NOT NULL,
    "description" TEXT NOT NULL,
    CONSTRAINT "Product_id_fkey" FOREIGN KEY ("id") REFERENCES "Category" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
