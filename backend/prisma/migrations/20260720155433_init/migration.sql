-- CreateTable
CREATE TABLE "Reviews" (
    "id" SERIAL NOT NULL,
    "customer_name" TEXT NOT NULL,
    "review_text" TEXT NOT NULL,
    "sentiment" TEXT NOT NULL,
    "confident_score" INTEGER NOT NULL,
    "email" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Reviews_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Reviews_email_key" ON "Reviews"("email");
