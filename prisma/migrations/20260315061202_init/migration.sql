-- CreateTable
CREATE TABLE `cart` (
    `u_id` INTEGER NOT NULL,
    `p_id` INTEGER NOT NULL,
    `qty` INTEGER NULL DEFAULT 1,

    INDEX `FK_p_id`(`p_id`),
    PRIMARY KEY (`u_id`, `p_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `images` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `p_id` INTEGER NULL,
    `image_position` ENUM('profile', 'ad_image', 'faq_image', 'banner_image') NOT NULL DEFAULT 'profile',
    `image_link` VARCHAR(80) NOT NULL,
    `created_at` TIMESTAMP(0) NULL DEFAULT CURRENT_TIMESTAMP(0),
    `updated_at` TIMESTAMP(0) NULL DEFAULT CURRENT_TIMESTAMP(0),

    INDEX `p_id`(`p_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `product` (
    `id` INTEGER NOT NULL,
    `p_name` VARCHAR(200) NULL,
    `created_at` TIMESTAMP(0) NULL DEFAULT CURRENT_TIMESTAMP(0),
    `updated_at` TIMESTAMP(0) NULL DEFAULT CURRENT_TIMESTAMP(0),
    `short_info` VARCHAR(100) NULL,
    `price` INTEGER NULL,
    `ratings` DECIMAL(2, 1) NULL,
    `information` VARCHAR(400) NULL,
    `nutri_research` JSON NULL,
    `nutrition` JSON NULL,
    `overview` JSON NULL,
    `direction` JSON NULL,
    `faq` JSON NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `user` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `ph_no` VARCHAR(10) NOT NULL,

    UNIQUE INDEX `ph_no`(`ph_no`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `cart` ADD CONSTRAINT `FK_p_id` FOREIGN KEY (`p_id`) REFERENCES `product`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `cart` ADD CONSTRAINT `FK_u_id` FOREIGN KEY (`u_id`) REFERENCES `user`(`id`) ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `images` ADD CONSTRAINT `images_ibfk_1` FOREIGN KEY (`p_id`) REFERENCES `product`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;
