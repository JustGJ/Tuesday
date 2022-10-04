/*
  Warnings:

  - You are about to drop the `_BusinessToUser` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "_BusinessToUser" DROP CONSTRAINT "_BusinessToUser_A_fkey";

-- DropForeignKey
ALTER TABLE "_BusinessToUser" DROP CONSTRAINT "_BusinessToUser_B_fkey";

-- DropTable
DROP TABLE "_BusinessToUser";

-- CreateTable
CREATE TABLE "Business_has_users" (
    "isAdmin" BOOLEAN NOT NULL,
    "userId" INTEGER NOT NULL,
    "businessId" INTEGER NOT NULL,

    CONSTRAINT "Business_has_users_pkey" PRIMARY KEY ("userId","businessId")
);

-- AddForeignKey
ALTER TABLE "Business_has_users" ADD CONSTRAINT "Business_has_users_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Business_has_users" ADD CONSTRAINT "Business_has_users_businessId_fkey" FOREIGN KEY ("businessId") REFERENCES "Business"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
