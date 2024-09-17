/*
  Warnings:

  - You are about to drop the `Account` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Favorite` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `RegistLeagueKalguur` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Account" DROP CONSTRAINT "Account_userId_fkey";

-- DropForeignKey
ALTER TABLE "Favorite" DROP CONSTRAINT "Favorite_userId_fkey";

-- DropTable
DROP TABLE "Account";

-- DropTable
DROP TABLE "Favorite";

-- DropTable
DROP TABLE "RegistLeagueKalguur";

-- CreateTable
CREATE TABLE "LeagueKalguurUser" (
    "userId" TEXT NOT NULL,
    "playStyle" TEXT[],
    "achievements" TEXT[],

    CONSTRAINT "LeagueKalguurUser_pkey" PRIMARY KEY ("userId")
);
