/*
  Warnings:

  - You are about to drop the `Business_has_users` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Business_has_users" DROP CONSTRAINT "Business_has_users_businessId_fkey";

-- DropForeignKey
ALTER TABLE "Business_has_users" DROP CONSTRAINT "Business_has_users_userId_fkey";

-- DropTable
DROP TABLE "Business_has_users";

-- CreateTable
CREATE TABLE "_BusinessToUser" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_BusinessToUser_AB_unique" ON "_BusinessToUser"("A", "B");

-- CreateIndex
CREATE INDEX "_BusinessToUser_B_index" ON "_BusinessToUser"("B");

-- AddForeignKey
ALTER TABLE "_BusinessToUser" ADD CONSTRAINT "_BusinessToUser_A_fkey" FOREIGN KEY ("A") REFERENCES "Business"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_BusinessToUser" ADD CONSTRAINT "_BusinessToUser_B_fkey" FOREIGN KEY ("B") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
