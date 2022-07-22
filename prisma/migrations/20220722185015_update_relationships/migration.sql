/*
  Warnings:

  - You are about to drop the column `responsibleId` on the `events` table. All the data in the column will be lost.
  - You are about to drop the column `phone` on the `users` table. All the data in the column will be lost.
  - Added the required column `phone` to the `events` table without a default value. This is not possible if the table is not empty.
  - Added the required column `responsible` to the `events` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "events" DROP CONSTRAINT "events_responsibleId_fkey";

-- AlterTable
ALTER TABLE "events" DROP COLUMN "responsibleId",
ADD COLUMN     "phone" TEXT NOT NULL,
ADD COLUMN     "responsible" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "users" DROP COLUMN "phone";
