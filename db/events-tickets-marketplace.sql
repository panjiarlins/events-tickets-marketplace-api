CREATE TABLE `Users` (
  `id` varchar(255) PRIMARY KEY,
  `firstName` varchar(255) NOT NULL,
  `lastName` varchar(255) NOT NULL,
  `email` varchar(255) UNIQUE NOT NULL,
  `password` varchar(255) NOT NULL,
  `profileImage` longblob,
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
  `id` integer PRIMARY KEY,
  `userId` varchar(255) NOT NULL,
  `title` varchar(255) NOT NULL,
  `imageName` varchar(255) NOT NULL,
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
  `code` varchar(255) PRIMARY KEY,
  `point` float NOT NULL,
  `stock` integer NOT NULL,
  `createdAt` timestamp NOT NULL,
  `updatedAt` timestamp NOT NULL
);

CREATE TABLE `EventVouchers` (
  `eventId` integer,
  `voucherCode` varchar(255),
  `createdAt` timestamp NOT NULL,
  `updatedAt` timestamp NOT NULL,
  PRIMARY KEY (`eventId`, `voucherCode`)
);

CREATE TABLE `Orders` (
  `id` integer PRIMARY KEY,
  `userId` varchar(255) NOT NULL,
  `voucherCode` varchar(255) NOT NULL,
  `eventId` integer NOT NULL,
  `quantity` integer NOT NULL,
  `referralPointUsage` float NOT NULL,
  `isPaid` boolean NOT NULL,
  `createdAt` timestamp NOT NULL,
  `updatedAt` timestamp NOT NULL
);

CREATE TABLE `Reviews` (
  `orderId` integer PRIMARY KEY,
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

ALTER TABLE `EventVouchers` ADD FOREIGN KEY (`eventId`) REFERENCES `Events` (`id`);

ALTER TABLE `EventVouchers` ADD FOREIGN KEY (`voucherCode`) REFERENCES `Vouchers` (`code`);

ALTER TABLE `Reviews` ADD FOREIGN KEY (`orderId`) REFERENCES `Orders` (`id`);

ALTER TABLE `Orders` ADD FOREIGN KEY (`voucherCode`) REFERENCES `Vouchers` (`code`);
