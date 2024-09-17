/*
  Warnings:

  - You are about to drop the `LeagueKalguurUser` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "LeagueKalguurUser";

-- CreateTable
CREATE TABLE "SettlersLeagueUser" (
    "userId" TEXT NOT NULL,
    "playStyle" TEXT[],
    "achievements" TEXT[],

    CONSTRAINT "SettlersLeagueUser_pkey" PRIMARY KEY ("userId")
);
