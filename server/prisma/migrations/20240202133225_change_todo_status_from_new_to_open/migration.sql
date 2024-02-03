/*
  Warnings:

  - The values [New] on the enum `Todo_status` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterTable
ALTER TABLE `Todo` MODIFY `status` ENUM('Open', 'Completed') NOT NULL;
