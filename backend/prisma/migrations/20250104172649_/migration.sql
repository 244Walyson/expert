/*
  Warnings:

  - Added the required column `category` to the `vehicle` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `vehicle` ADD COLUMN `category` ENUM('CARRO', 'MOTOCICLETA', 'CAMINHAO') NOT NULL;
