-- phpMyAdmin SQL Dump
-- version 5.1.1deb5ubuntu1
-- https://www.phpmyadmin.net/
--
-- Host: localhost:3306
-- Generation Time: Nov 13, 2023 at 11:19 PM
-- Server version: 10.6.12-MariaDB-0ubuntu0.22.04.1
-- PHP Version: 8.1.2-1ubuntu2.14

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `travelnik-database`
--

-- --------------------------------------------------------

--
-- Table structure for table `accommodations`
--

CREATE TABLE `accommodations` (
  `id` int(11) NOT NULL,
  `source` text DEFAULT NULL,
  `image` text DEFAULT NULL,
  `title` text DEFAULT NULL,
  `rating` float NOT NULL DEFAULT 0,
  `price` float NOT NULL DEFAULT 0,
  `distance_from_center` varchar(255) DEFAULT NULL,
  `reviews` int(11) NOT NULL DEFAULT 0,
  `status` varchar(64) NOT NULL DEFAULT 'Not defined',
  `longitude` double DEFAULT NULL,
  `latitude` double DEFAULT NULL,
  `check_in_time` varchar(12) DEFAULT NULL,
  `check_out_time` varchar(12) DEFAULT NULL,
  `address` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `accommodations`
--

INSERT INTO `accommodations` (`id`, `source`, `image`, `title`, `rating`, `price`, `distance_from_center`, `reviews`, `status`, `longitude`, `latitude`, `check_in_time`, `check_out_time`, `address`) VALUES
(1, 'https://www.booking.com/hotel/ba/vezir-palace.html', 'https://cf.bstatic.com/xdata/images/hotel/square60/226684314.jpg?k=d0ce7f1352b9ad1b6da7e24c58b93920544cf78f94f29ee178b5f2f551eb1f59&o=', 'Hotel Vezir Palace', 8.4, 64.8, '0.75', 533, 'Very Good', 17.670232, 44.229841, '06:00', '11:00', 'Varoš bb, Travnik'),
(2, 'https://www.booking.com/hotel/ba/mlm.html', 'https://cf.bstatic.com/xdata/images/hotel/square60/401639645.jpg?k=54a619db525fb44dfb7b877b13366262a70382fb6e0448134557f892f6bd3e2e&o=', 'MALM Travnik', 9.4, 30, '0.25', 144, 'Wonderful', 17.6633591738413, 44.2241592918428, '08:00', '11:00', 'Gaj'),
(3, 'https://www.booking.com/hotel/ba/panorama-travnik-travnik.html', 'https://cf.bstatic.com/xdata/images/hotel/square60/351364602.jpg?k=c70b85e828abd5b15d50c14fb90f31ae73b8efe094a0991b339b1c8351614af3&o=', 'Panorama Travnik', 9.7, 40, '0.90', 117, 'Exceptional', 17.6734173558992, 44.2274911027521, '', '10:00', 'Gornje Osoje 15'),
(4, 'https://www.booking.com/hotel/ba/iut.html', 'https://cf.bstatic.com/xdata/images/hotel/square60/211274406.jpg?k=cc25e920cc371a5d8cebc28c93fe9d422bd76f84c4e593e82c78093eb95113ef&o=', 'Hotel IUT', 8.7, 32, '1.55', 440, 'Excellent', 17.644051, 44.22896, '00:00', '11:00', 'Aleja Konzula - Meljanac bb'),
(5, 'https://www.booking.com/hotel/ba/apartman-kalibunar-bb-alagica-njive-travnik.html', 'https://cf.bstatic.com/xdata/images/hotel/square60/260924713.jpg?k=d6ad039177a2f093b2d3e991ac8612b6aa0b6467087823a0750f0b1dfa1eff27&o=', 'Apartment LAMI - Kalibunar, Travnik', 9.5, 34.43, '1.05', 101, 'Exceptional', 17.650767455741, 44.229479024108, '06:00', '11:00', 'Kalibunar b.b. Alagica Njive'),
(6, 'https://www.booking.com/hotel/ba/motel-bajra.html', 'https://cf.bstatic.com/xdata/images/hotel/square60/320565207.jpg?k=aa87e6f7fbfc41b78d75a9d349a7e327416827ef10b8202f8c12b5570b2ed81a&o=', 'Motel Bajra', 7.3, 32, '2.55', 188, 'Good', 17.6929289102554, 44.218412050793, '07:00', '10:00', 'Dolac na Lašvi bb'),
(7, 'https://www.booking.com/hotel/ba/lipa.html', 'https://cf.bstatic.com/xdata/images/hotel/square60/414390753.jpg?k=426490ab5b6a3723cbc1a5fe42bd5a3633da1e4ed0f63e120b7d8cc8e909c9cc&o=', 'Lipa Hotel', 8.6, 66, '0.15', 211, 'Excellent', 17.661319, 44.226562, '', '11:00', 'Bosanska bb'),
(8, 'https://www.booking.com/hotel/ba/soba-za-dvoje.html', 'https://cf.bstatic.com/xdata/images/hotel/square60/242554954.jpg?k=df4cf07a6a402438a58b3161a5309b15da03a63b672a6223ccdf628d1283fb06&o=', 'Apartman za dvoje', 8.5, 10.4, '10.90', 35, 'Very Good', 17.58172, 44.304974, '00:00', '11:00', 'donja šišava vlasic-odmor / soba za dvoje'),
(9, 'https://www.booking.com/hotel/ba/aba.html', 'https://cf.bstatic.com/xdata/images/hotel/square60/102408055.jpg?k=f2161c8115b0f8f3c6d7038182e43237d4bb8a9a3d69a6b3dc0b702277c38637&o=', 'Garni Motel Aba', 7.7, 23.07, '0.80', 231, 'Good', 17.6721096038818, 44.2282149803665, '00:00', '12:00', 'Šumeće 166'),
(10, 'https://www.booking.com/hotel/ba/a-amp-s-apartment.html', 'https://cf.bstatic.com/xdata/images/hotel/square60/433333008.jpg?k=67fbbf65b7cdaf43eba1275e212d7b1e23a0d2a691cc9b6e9e77838e999cd25e&o=', 'Downtown Apartment Travnik', 9.8, 35.1, '0.50', 162, 'Exceptional', 17.6687460672702, 44.2265419883692, '08:00', '10:30', 'Zenjak'),
(11, 'https://www.booking.com/hotel/ba/apartment-adi-travnik.html', 'https://cf.bstatic.com/xdata/images/hotel/square60/113007303.jpg?k=b1e031f915a7121e69aa357c6999bd94a342c9586843bc51cf325933d87b5e6c&o=', 'Apartment Adi', 9.4, 41.25, '0.35', 175, 'Wonderful', 17.6669228821993, 44.2265363445115, '', '11:00', 'Zenjak'),
(12, 'https://www.booking.com/hotel/ba/una-travnik123456789101112131415161718192021222324.html', 'https://cf.bstatic.com/xdata/images/hotel/square60/275751554.jpg?k=f9dd121ea8434d53ec68156e139e4f172673b183af7093b0a1980a1817e3e4e7&o=', 'Apartman UNA Travnik', 9.2, 21, '0.35', 113, 'Wonderful', 17.66704836157, 44.226932046762, '08:00', '10:00', 'Zenjak lamela 7, sprat 3'),
(13, 'https://www.booking.com/hotel/ba/hostel-tron.html', 'https://cf.bstatic.com/xdata/images/hotel/square60/85038462.jpg?k=1b4baf5326ec07d1cbaff89ce9b78faf6adbfa7a12298d88d80acd35b80fea19&o=', 'Hostel Tron', 8.1, 30, '4.70', 214, 'Very Good', 17.7151456475258, 44.2072492601233, '', '12:00', 'Donje Putićevo bb'),
(14, 'https://www.booking.com/hotel/ba/apartments-swiss-travnik.html', 'https://cf.bstatic.com/xdata/images/hotel/square60/384549359.jpg?k=5ae05396ed437c999637e95bcf1fa662bbc7cd1a5ce2b6153db573631b2ea6a8&o=', 'Apartments Swiss Travnik', 8.9, 33.48, '0.25', 39, 'Excellent', 17.663643032921, 44.227892714709, '08:00', '11:00', '28 Potur mahala'),
(15, 'https://www.booking.com/hotel/ba/poturmahala.html', 'https://cf.bstatic.com/xdata/images/hotel/square60/468779448.jpg?k=ac799e089f66da97e7c6bd6d9040116f4a9a44d11f9b973cbeae758386e91733&o=', 'Apartment Poturmahala', 9.3, 40, '0.40', 91, 'Wonderful', 17.6656056107673, 44.2285824308807, '08:30', '11:00', 'Potur mahala Potur mahala'),
(16, 'https://www.booking.com/hotel/ba/ozzy.html', 'https://cf.bstatic.com/xdata/images/hotel/square60/303360958.jpg?k=6e0ad284dff163189e5e5ba85ca5c16fdc2cf1640851d145016b115d5dd4f01b&o=', 'Ozzy', 9.8, 40, '0.55', 89, 'Exceptional', 17.669155431189, 44.2249966038553, '10:00', '11:00', 'Donja Mahala stan 71, kat 5, ulaan 5'),
(17, 'https://www.booking.com/hotel/ba/apartman-travnik.html', 'https://cf.bstatic.com/xdata/images/hotel/square60/287711831.jpg?k=311fc6a1806c94ab27ed9f2da92e92a8adf2d34e347c920bcf96a482aae965b6&o=', 'Apartman Travnik', 8.1, 30.6, '0.40', 40, 'Very Good', 17.6677248, 44.2253916, '06:30', '11:30', 'Konatur'),
(18, 'https://www.booking.com/hotel/ba/travnik-apartment.html', 'https://cf.bstatic.com/xdata/images/hotel/square60/474756679.jpg?k=ed756d2dca249634e4e8012cbb0ae5fd565e28d6913f0ad69d6af0929b8ec822&o=', 'Travnik Apartment', 9.1, 25.6, '0.70', 27, 'Wonderful', 17.654431087645, 44.226119920019, '10:00', '12:00', '3 Bosanska'),
(19, 'https://www.booking.com/hotel/ba/stari-grad-migy-apartman-travnik.html', 'https://cf.bstatic.com/xdata/images/hotel/square60/300631153.jpg?k=7fde9c9fb8bbe35ed7a697711341f29ec61a2be451651863c77050b9eda9db6d&o=', 'Stari Grad Migy Travnik Apartman', 9.1, 22.5, '0.75', 100, 'Wonderful', 17.6700068378387, 44.2300016287347, '', '', 'Varoš 62 Stari grad'),
(20, 'https://www.booking.com/hotel/ba/apartman-ada-travnik.html', 'https://cf.bstatic.com/xdata/images/hotel/square60/285978833.jpg?k=5d0358baf6bdc9c75a4549601b5d89bbc6f8af466554af25c6a1237693336a20&o=', 'Apartman DIN', 9.5, 36, '0.30', 96, 'Exceptional', 17.659439470465, 44.226332688888, '07:00', '11:00', 'Rizaha Hercegovca 6'),
(21, 'https://www.booking.com/hotel/ba/motel-calypso.html', 'https://cf.bstatic.com/xdata/images/hotel/square60/52942764.jpg?k=32b065f5c73872f1aa5537a751933e0fe69a8b04a492843e130cd1f3f97b44c4&o=', 'Motel Calypso Travnik', 8.3, 26, '6.35', 235, 'Very Good', 17.7309331297874, 44.1965266492725, '07:00', '21:30', 'Nova Bila bb'),
(22, 'https://www.booking.com/hotel/ba/tomy.html', 'https://cf.bstatic.com/xdata/images/hotel/square60/375015095.jpg?k=6ed5897a8b43a15c1e44239378f834911d3d10af8f18721e81d056e2475b3870&o=', 'Tomy', 9.3, 28.35, '0.30', 24, 'Wonderful', 17.6663382, 44.2257812, '09:00', '10:00', 'Mehmed-paše Kukavice 14'),
(23, 'https://www.booking.com/hotel/ba/apartment-emina-travnik.html', 'https://cf.bstatic.com/xdata/images/hotel/square60/211696552.jpg?k=037f16d25b1bdbac3d59b5198434b34b42bdd5938e8e0da89f7e1d2a764ce6b3&o=', 'Apartment Emina', 9.4, 41, '0.45', 58, 'Wonderful', 17.667857250332, 44.225119147748, '07:00', '10:00', 'ulica Konatur A/14'),
(24, 'https://www.booking.com/hotel/ba/apartmani-snjezna-kraljica-vlasic.html', 'https://cf.bstatic.com/xdata/images/hotel/square60/500895936.jpg?k=eebeb818d231e1e6ce19ea868b3baa3aaf22635cbcb7b06e22dbf11b4343334e&o=', 'Apartmani Snježna Kraljica Vlašić', 0, 108, '12.00', 0, '', 17.576548692363, 44.314103699113, '09:00', '10:00', 'Babanovac'),
(25, 'https://www.booking.com/hotel/ba/ajanovic.html', 'https://cf.bstatic.com/xdata/images/hotel/square60/463713856.jpg?k=1e58134af3b477ec63f93bfcd8dacc21a18add3b543b71097bded6afd4b843d7&o=', 'Ajanovic', 5.6, 22.5, '0.65', 7, 'Okay', 17.67086572249, 44.227228955259, '', '', 'Podmusala'),
(26, 'https://www.booking.com/hotel/ba/lagenhet-i-zenica.html', 'https://cf.bstatic.com/xdata/images/hotel/square60/503755798.jpg?k=2144ebe057cbe27eb3a75f0f4bf4b4f7af2bca38cc72dc3cf391f137ce08bbf8&o=', 'Stan u Zenici', 0, 50.32, '1.60', 0, '', 17.925866, 44.2006362, '08:00', '12:00', 'Prve Zeničke brigade 11 C våning 4'),
(27, 'https://www.booking.com/hotel/ba/33-lipe.html', 'https://cf.bstatic.com/xdata/images/hotel/square60/499372237.jpg?k=ac48a31c10c1d1d35f12c839b3e77c048baea2a5f850195b4fd02ee7c5794431&o=', '33 Lipe', 6.8, 18, '7.65', 6, 'Pleasant', 17.568719335713, 44.237332654095, '00:00', '00:00', 'Turbe bb'),
(28, 'https://www.booking.com/hotel/ba/krajina-v.html', 'https://cf.bstatic.com/xdata/images/hotel/square60/455229314.jpg?k=3f0e0d2ef29121743d6d091097db396aa5d155d54e28de630a4bf40fe56310f2&o=', 'Krajina V', 8.8, 41.25, '13.85', 24, 'Excellent', 17.5442270349447, 44.3169080034726, '07:00', '11:00', 'Babanovac'),
(29, 'https://www.booking.com/hotel/ba/apartment-vremeplov.html', 'https://cf.bstatic.com/xdata/images/hotel/square60/87254405.jpg?k=93fa97a46aa0bb3eb9737934f849c73b9301073f28725d44476448e20450d3ec&o=', 'Apartment Vremeplov', 8.6, 35, '0.65', 284, 'Excellent', 17.670524418354, 44.2271034231815, '07:00', '10:30', 'Varoš 10'),
(30, 'https://www.booking.com/hotel/ba/villa-popovic-nova-bila1.html', 'https://cf.bstatic.com/xdata/images/hotel/square60/415286098.jpg?k=8622406337fe2deadbab84cd76524fe4d0221631273ba640843f851ce7fba30d&o=', 'Hostel Villa Popović', 9, 16.88, '7.05', 59, 'Wonderful', 17.7409658984263, 44.1970691475776, '00:00', '00:00', 'Podolac bb'),
(31, 'https://www.booking.com/hotel/ba/apartmani-venci-travnik.html', 'https://cf.bstatic.com/xdata/images/hotel/square60/376173840.jpg?k=41fb414c116258c84be432f8d4fbaf75c050b742ead127360eea0ba238063aff&o=', 'Apartmani Venci Travnik', 8.9, 60, '0.55', 59, 'Excellent', 17.6567860634056, 44.2279029897834, '08:00', '11:00', 'Stanična'),
(32, 'https://www.booking.com/hotel/ba/apartment-aria-travnik.html', 'https://cf.bstatic.com/xdata/images/hotel/square60/351653258.jpg?k=6d4c9206541aeefeee524b8e5b12e134b64d031234cc10c076bb4ca202ead38e&o=', 'Apartment Aria', 9.7, 27, '1.10', 79, 'Exceptional', 17.649170405667, 44.225287360698, '12:00', '15:30', 'Aleja Konzula (zgrada Bunian )');

-- --------------------------------------------------------

--
-- Table structure for table `activities`
--

CREATE TABLE `activities` (
  `id` int(11) NOT NULL,
  `location_id` int(11) DEFAULT NULL,
  `reviews` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL CHECK (json_valid(`reviews`)),
  `name` varchar(100) DEFAULT NULL,
  `description` text DEFAULT NULL,
  `category` varchar(50) DEFAULT NULL,
  `duration` time DEFAULT NULL,
  `difficulty` varchar(50) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `activities`
--

INSERT INTO `activities` (`id`, `location_id`, `reviews`, `name`, `description`, `category`, `duration`, `difficulty`) VALUES
(1, 2, '[1,2,3,4,5,6]', 'Eat 20 ćevapa at Ćevabdžinica Hari', 'This is easy task for those who are from Travnik.', 'Food', '00:45:00', 'Hard'),
(4, 6, '[13,14,15,16]', 'Hiking - Vezir Palace', 'This week we organize hiking event. We will be meeting at Vezir Palace at 08:00 AM.', 'Hiking', '00:00:01', 'Hard');

-- --------------------------------------------------------

--
-- Table structure for table `businesses`
--

CREATE TABLE `businesses` (
  `id` int(11) NOT NULL,
  `location_id` int(11) DEFAULT NULL,
  `reviews` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL CHECK (json_valid(`reviews`)),
  `name` varchar(100) DEFAULT NULL,
  `description` text DEFAULT NULL,
  `category` varchar(50) DEFAULT NULL,
  `opening_time` time DEFAULT NULL,
  `closing_time` time DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `businesses`
--

INSERT INTO `businesses` (`id`, `location_id`, `reviews`, `name`, `description`, `category`, `opening_time`, `closing_time`) VALUES
(1, 2, NULL, 'Test', 'stjaktasjitas', '1', '18:07:00', '22:07:00'),
(2, 5, '[7,8,9,10,11,12]', 'BEST Supermarket 6', 'Here you can buy food & drinks', '9', '08:00:00', '21:00:00');

-- --------------------------------------------------------

--
-- Table structure for table `events`
--

CREATE TABLE `events` (
  `id` int(11) NOT NULL,
  `location_id` int(11) DEFAULT NULL,
  `name` varchar(100) DEFAULT NULL,
  `description` text DEFAULT NULL,
  `category` varchar(50) DEFAULT NULL,
  `start_date` datetime DEFAULT NULL,
  `end_date` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `events`
--

INSERT INTO `events` (`id`, `location_id`, `name`, `description`, `category`, `start_date`, `end_date`) VALUES
(2, 4, 'Visit Radića Brdo', 'Let\'s group and visit together location \"Radića Brdo\"', 'Hiking', '2023-11-11 00:00:00', '2023-11-12 00:00:00');

-- --------------------------------------------------------

--
-- Table structure for table `location`
--

CREATE TABLE `location` (
  `id` int(11) NOT NULL,
  `longitude` double DEFAULT NULL,
  `latitude` double DEFAULT NULL,
  `address` text DEFAULT NULL,
  `city` varchar(128) DEFAULT NULL,
  `country` varchar(128) DEFAULT NULL,
  `postal_code` varchar(64) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `location`
--

INSERT INTO `location` (`id`, `longitude`, `latitude`, `address`, `city`, `country`, `postal_code`) VALUES
(2, 17.659867735474847, 44.22794904944067, 'Bašbunar', 'Travnik', 'Bosnia and Herzegovina', '72270'),
(4, 17.645276518433036, 44.236066982513734, 'Brza Cesta Lašva-Travnik-Jajce', 'Travnik', 'Bosnia and Herzegovina', '72270'),
(5, 17.66567203806099, 44.2272802063666, 'Šehida', 'Travnik', 'Bosnia and Herzegovina', NULL),
(6, 17.669641628720996, 44.229118873325945, 'Varoš', 'Travnik', 'Bosnia and Herzegovina', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `reviews`
--

CREATE TABLE `reviews` (
  `id` int(11) NOT NULL,
  `name` varchar(64) DEFAULT NULL,
  `date` datetime DEFAULT NULL,
  `text` text DEFAULT NULL,
  `rate` tinyint(4) NOT NULL DEFAULT 1,
  `images` longtext DEFAULT NULL,
  `approved` tinyint(1) NOT NULL DEFAULT 0,
  `entity_id` int(11) DEFAULT NULL,
  `entity_type` enum('activity','business') DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `reviews`
--

INSERT INTO `reviews` (`id`, `name`, `date`, `text`, `rate`, `images`, `approved`, `entity_id`, `entity_type`) VALUES
(1, 'Alice Johnson', '2023-11-13 14:30:00', 'Great experience at Ćevabdžinica Hari!', 4, NULL, 1, 1, 'activity'),
(2, 'Bob Smith', '2023-11-14 10:45:00', 'Delicious ćevapa, will come back!', 5, NULL, 1, 1, 'activity'),
(3, 'Eva Davis', '2023-11-15 19:20:00', 'Friendly staff, loved the ambiance.', 4, NULL, 1, 1, 'activity'),
(4, 'Charlie Brown', '2023-11-16 12:15:00', 'Average experience, but decent food.', 3, NULL, 1, 1, 'activity'),
(5, 'Grace Miller', '2023-11-17 18:00:00', 'Not a fan of ćevapa, but the place was nice.', 2, NULL, 1, 1, 'activity'),
(6, 'David Wilson', '2023-11-18 15:30:00', 'Fantastic ćevapa and service!', 5, NULL, 1, 1, 'activity'),
(7, 'Emily White', '2023-11-20 11:00:00', 'BEST Supermarket has a wide variety of products!', 5, NULL, 1, 2, 'business'),
(8, 'Tom Johnson', '2023-11-21 14:30:00', 'Clean and organized store, excellent service.', 4, NULL, 1, 2, 'business'),
(9, 'Sophia Davis', '2023-11-22 17:45:00', 'Reasonable prices and friendly staff at BEST Supermarket.', 4, NULL, 1, 2, 'business'),
(10, 'Michael Smith', '2023-11-23 10:15:00', 'Great deals on fresh produce, my go-to supermarket.', 5, NULL, 1, 2, 'business'),
(11, 'Olivia Brown', '2023-11-24 15:20:00', 'BEST Supermarket never disappoints, always find what I need.', 5, NULL, 1, 2, 'business'),
(12, 'Liam Wilson', '2023-11-25 12:45:00', 'The BEST Supermarket truly lives up to its name!', 5, NULL, 1, 2, 'business'),
(13, 'Ibrahim Okić', '2023-11-13 23:10:04', 'gaga', 3, NULL, 1, 4, 'activity'),
(14, 'Hajraga', '2023-11-13 23:10:25', 'Test 2', 2, NULL, 1, 4, 'activity'),
(15, 'Testerica', '2023-11-13 23:12:16', 'test', 5, NULL, 1, 4, 'activity'),
(16, 'Hajro', '2023-11-13 23:13:41', 'tata', 4, NULL, 1, 4, 'activity');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `name` varchar(50) DEFAULT NULL,
  `surname` varchar(50) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `password` varchar(128) DEFAULT NULL,
  `role` varchar(64) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `name`, `surname`, `email`, `password`, `role`) VALUES
(1, 'Ibrahim', 'Okic', 'ibrahim@gmail.com', '$2a$12$4GXFQvTLG8LVZpyfdTbmOuWWQB7/h65Z6qrQ1KS8Nzs5mMQXukuoy', 'Admin'),
(2, 'Almir', 'Hodzic', 'almir@gmail.com', '$2a$12$V3Gtblbi/6nOEhNc.74Bg.IRDfS4FsRReN9LwVEaPccBN8jkaMYxG', 'Admin');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `accommodations`
--
ALTER TABLE `accommodations`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `activities`
--
ALTER TABLE `activities`
  ADD PRIMARY KEY (`id`),
  ADD KEY `location_id` (`location_id`);

--
-- Indexes for table `businesses`
--
ALTER TABLE `businesses`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `events`
--
ALTER TABLE `events`
  ADD PRIMARY KEY (`id`),
  ADD KEY `location_id` (`location_id`);

--
-- Indexes for table `location`
--
ALTER TABLE `location`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `reviews`
--
ALTER TABLE `reviews`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `accommodations`
--
ALTER TABLE `accommodations`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=33;

--
-- AUTO_INCREMENT for table `activities`
--
ALTER TABLE `activities`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `businesses`
--
ALTER TABLE `businesses`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `events`
--
ALTER TABLE `events`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `location`
--
ALTER TABLE `location`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `reviews`
--
ALTER TABLE `reviews`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=17;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `activities`
--
ALTER TABLE `activities`
  ADD CONSTRAINT `activities_ibfk_1` FOREIGN KEY (`location_id`) REFERENCES `location` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `events`
--
ALTER TABLE `events`
  ADD CONSTRAINT `events_ibfk_1` FOREIGN KEY (`location_id`) REFERENCES `location` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
