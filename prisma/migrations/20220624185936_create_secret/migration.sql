-- CreateTable
CREATE TABLE "secret" (
    "id" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "app" TEXT NOT NULL,
    "password" TEXT NOT NULL,

    CONSTRAINT "secret_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "secret_userId_key" ON "secret"("userId");

-- AddForeignKey
ALTER TABLE "secret" ADD CONSTRAINT "secret_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
