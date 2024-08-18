-- CreateTable
CREATE TABLE "SiteCheck" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "userId" TEXT NOT NULL,

    CONSTRAINT "SiteCheck_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "SiteCheck" ADD CONSTRAINT "SiteCheck_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
