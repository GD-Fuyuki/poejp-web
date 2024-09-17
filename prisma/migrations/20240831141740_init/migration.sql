-- CreateTable
CREATE TABLE "RegistLeagueKalguur" (
    "userId" TEXT NOT NULL,
    "playStyle" TEXT[],
    "achievements" TEXT[],

    CONSTRAINT "RegistLeagueKalguur_pkey" PRIMARY KEY ("userId")
);
