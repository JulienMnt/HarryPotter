-- CreateTable
CREATE TABLE `light` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `house` VARCHAR(191) NOT NULL,
    `red` INTEGER NOT NULL,
    `green` INTEGER NOT NULL,
    `blue` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
