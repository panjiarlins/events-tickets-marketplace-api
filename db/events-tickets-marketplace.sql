CREATE DATABASE `events-tickets-marketplace`;

USE `events-tickets-marketplace`;

CREATE TABLE `users` (
  `id` varchar(255) UNIQUE PRIMARY KEY NOT NULL,
  `first_name` varchar(255) NOT NULL,
  `last_name` varchar(255) NOT NULL,
  `email` varchar(255) UNIQUE NOT NULL,
  `password` varchar(255) NOT NULL,
  `created_at` timestamp NOT NULL,
  `last_update` timestamp NOT NULL
);

CREATE TABLE `referral_activities` (
  `referrer_user_id` varchar(255) NOT NULL,
  `referred_user_id` varchar(255) NOT NULL,
  `created_at` timestamp NOT NULL,
  PRIMARY KEY (`referrer_user_id`, `referred_user_id`)
);

CREATE TABLE `referrals` (
  `user_id` varchar(255) UNIQUE PRIMARY KEY NOT NULL,
  `code` varchar(255) UNIQUE NOT NULL,
  `point` float NOT NULL,
  `claimed_point` float NOT NULL
);

CREATE TABLE `events` (
  `id` varchar(255) UNIQUE PRIMARY KEY NOT NULL,
  `user_id` varchar(255) NOT NULL,
  `title` varchar(255) NOT NULL,
  `image_url` text NOT NULL,
  `city` varchar(255) NOT NULL,
  `address` text NOT NULL,
  `description` text NOT NULL,
  `price` float NOT NULL,
  `start_at` timestamp NOT NULL,
  `created_at` timestamp NOT NULL,
  `last_update` timestamp NOT NULL,
  `stock` integer NOT NULL,
  `claimed_stock` integer NOT NULL
);

CREATE TABLE `vouchers` (
  `event_id` varchar(255) NOT NULL,
  `code` varchar(255) NOT NULL,
  `point` float NOT NULL,
  `stock` integer NOT NULL,
  `claimed_stock` integer NOT NULL,
  `created_at` timestamp NOT NULL,
  `last_update` timestamp NOT NULL,
  PRIMARY KEY (`event_id`, `code`)
);

CREATE TABLE `orders` (
  `id` varchar(255) UNIQUE PRIMARY KEY NOT NULL,
  `user_id` varchar(255) NOT NULL,
  `event_id` varchar(255) NOT NULL,
  `quantity` integer NOT NULL,
  `voucher_point_usage` float NOT NULL,
  `referral_point_usage` float NOT NULL,
  `created_at` timestamp NOT NULL,
  `is_paid` boolean NOT NULL
);

CREATE TABLE `reviews` (
  `order_id` varchar(255) UNIQUE PRIMARY KEY NOT NULL,
  `created_at` timestamp NOT NULL,
  `comment` text NOT NULL,
  `rating` float NOT NULL
);

ALTER TABLE `referral_activities` ADD FOREIGN KEY (`referrer_user_id`) REFERENCES `users` (`id`);

ALTER TABLE `referral_activities` ADD FOREIGN KEY (`referred_user_id`) REFERENCES `users` (`id`);

ALTER TABLE `referrals` ADD FOREIGN KEY (`user_id`) REFERENCES `users` (`id`);

ALTER TABLE `events` ADD FOREIGN KEY (`user_id`) REFERENCES `users` (`id`);

ALTER TABLE `vouchers` ADD FOREIGN KEY (`event_id`) REFERENCES `events` (`id`);

ALTER TABLE `orders` ADD FOREIGN KEY (`event_id`) REFERENCES `events` (`id`);

ALTER TABLE `orders` ADD FOREIGN KEY (`user_id`) REFERENCES `users` (`id`);

ALTER TABLE `reviews` ADD FOREIGN KEY (`order_id`) REFERENCES `orders` (`id`);

ALTER TABLE `users` MODIFY COLUMN `last_update` TIMESTAMP ON UPDATE CURRENT_TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP;
    
ALTER TABLE `events` MODIFY COLUMN `last_update` TIMESTAMP ON UPDATE CURRENT_TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP;

ALTER TABLE `vouchers` MODIFY COLUMN `last_update` TIMESTAMP ON UPDATE CURRENT_TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP;

ALTER TABLE `users` MODIFY COLUMN `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP;

ALTER TABLE `referral_activities` MODIFY COLUMN `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP;

ALTER TABLE `events` MODIFY COLUMN `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP;

ALTER TABLE `vouchers` MODIFY COLUMN `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP;

ALTER TABLE `orders` MODIFY COLUMN `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP;

ALTER TABLE `reviews` MODIFY COLUMN `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP;
