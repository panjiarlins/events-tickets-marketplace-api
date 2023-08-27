CREATE TABLE `Users` (
  `id` varchar(255) PRIMARY KEY,
  `firstName` varchar(255) NOT NULL,
  `lastName` varchar(255) NOT NULL,
  `email` varchar(255) UNIQUE NOT NULL,
  `password` varchar(255) NOT NULL,
  `createdAt` timestamp NOT NULL,
  `updatedAt` timestamp NOT NULL
);

CREATE TABLE `ReferralActions` (
  `referrerUserId` varchar(255),
  `referredUserId` varchar(255) UNIQUE,
  `createdAt` timestamp NOT NULL,
  `updatedAt` timestamp NOT NULL,
  PRIMARY KEY (`referrerUserId`, `referredUserId`)
);

CREATE TABLE `Referrals` (
  `userId` varchar(255) PRIMARY KEY,
  `code` varchar(255) UNIQUE NOT NULL,
  `point` float NOT NULL,
  `createdAt` timestamp NOT NULL,
  `updatedAt` timestamp NOT NULL
);

CREATE TABLE `Events` (
  `id` varchar(255) PRIMARY KEY,
  `userId` varchar(255) NOT NULL,
  `title` varchar(255) NOT NULL,
  `imageUrl` text NOT NULL,
  `city` varchar(255) NOT NULL,
  `address` text NOT NULL,
  `description` text NOT NULL,
  `price` float NOT NULL,
  `stock` integer NOT NULL,
  `startAt` timestamp NOT NULL,
  `createdAt` timestamp NOT NULL,
  `updatedAt` timestamp NOT NULL
);

CREATE TABLE `Vouchers` (
  `eventId` varchar(255),
  `code` varchar(255),
  `point` float NOT NULL,
  `stock` integer NOT NULL,
  `createdAt` timestamp NOT NULL,
  `updatedAt` timestamp NOT NULL,
  PRIMARY KEY (`eventId`, `code`)
);

CREATE TABLE `Orders` (
  `id` varchar(255) PRIMARY KEY,
  `userId` varchar(255) NOT NULL,
  `eventId` varchar(255) NOT NULL,
  `quantity` integer NOT NULL,
  `voucherPointUsage` float NOT NULL,
  `referralPointUsage` float NOT NULL,
  `isPaid` boolean NOT NULL,
  `createdAt` timestamp NOT NULL,
  `updatedAt` timestamp NOT NULL
);

CREATE TABLE `Reviews` (
  `orderId` varchar(255) PRIMARY KEY,
  `comment` text NOT NULL,
  `rating` float NOT NULL,
  `createdAt` timestamp NOT NULL,
  `updatedAt` timestamp NOT NULL
);

ALTER TABLE `Referrals` ADD FOREIGN KEY (`userId`) REFERENCES `Users` (`id`);

ALTER TABLE `ReferralActions` ADD FOREIGN KEY (`referrerUserId`) REFERENCES `Users` (`id`);

ALTER TABLE `ReferralActions` ADD FOREIGN KEY (`referredUserId`) REFERENCES `Users` (`id`);

ALTER TABLE `Events` ADD FOREIGN KEY (`userId`) REFERENCES `Users` (`id`);

ALTER TABLE `Orders` ADD FOREIGN KEY (`userId`) REFERENCES `Users` (`id`);

ALTER TABLE `Orders` ADD FOREIGN KEY (`eventId`) REFERENCES `Events` (`id`);

ALTER TABLE `Vouchers` ADD FOREIGN KEY (`eventId`) REFERENCES `Events` (`id`);

ALTER TABLE `Reviews` ADD FOREIGN KEY (`orderId`) REFERENCES `Orders` (`id`);
