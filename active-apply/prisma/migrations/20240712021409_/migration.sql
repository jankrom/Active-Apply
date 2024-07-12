-- CreateTable
CREATE TABLE "Spreadsheet" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "userId" UUID NOT NULL,
    "name" TEXT NOT NULL,
    "totalJobs" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "Spreadsheet_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SpreadsheetRow" (
    "id" SERIAL NOT NULL,
    "companyName" TEXT NOT NULL,
    "jobUrl" TEXT NOT NULL,
    "status" TEXT NOT NULL,
    "position" TEXT,
    "positionNumber" TEXT,
    "date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "spreadsheetId" UUID NOT NULL,
    "userId" UUID NOT NULL,

    CONSTRAINT "SpreadsheetRow_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Profile" (
    "id" UUID NOT NULL,
    "defaultSpreadsheet" TEXT,
    "currentlyPaid" BOOLEAN NOT NULL DEFAULT false,
    "stripe_customer_id" TEXT,
    "stripe_subscription_id" TEXT,
    "stripe_price_id" TEXT,
    "stripe_current_period_end" TIMESTAMP(3),

    CONSTRAINT "Profile_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Profile_id_key" ON "Profile"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Profile_stripe_customer_id_key" ON "Profile"("stripe_customer_id");

-- CreateIndex
CREATE UNIQUE INDEX "Profile_stripe_subscription_id_key" ON "Profile"("stripe_subscription_id");

-- CreateIndex
CREATE UNIQUE INDEX "Profile_stripe_current_period_end_key" ON "Profile"("stripe_current_period_end");

-- AddForeignKey
ALTER TABLE "Spreadsheet" ADD CONSTRAINT "Spreadsheet_userId_fkey" FOREIGN KEY ("userId") REFERENCES "Profile"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SpreadsheetRow" ADD CONSTRAINT "SpreadsheetRow_spreadsheetId_fkey" FOREIGN KEY ("spreadsheetId") REFERENCES "Spreadsheet"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SpreadsheetRow" ADD CONSTRAINT "SpreadsheetRow_userId_fkey" FOREIGN KEY ("userId") REFERENCES "Profile"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
