-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jul 18, 2024 at 08:14 AM
-- Server version: 10.4.28-MariaDB
-- PHP Version: 8.2.4

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `truck_mate`
--

-- --------------------------------------------------------

--
-- Table structure for table `complaints`
--

CREATE TABLE `complaints` (
  `id` int(11) NOT NULL,
  `username` varchar(225) NOT NULL,
  `message` varchar(225) NOT NULL,
  `orderId` int(225) NOT NULL,
  `date` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

--
-- Dumping data for table `complaints`
--

INSERT INTO `complaints` (`id`, `username`, `message`, `orderId`, `date`) VALUES
(1510, 'asd', 'sdasda', 123, '2024-07-16 10:02:19');

-- --------------------------------------------------------

--
-- Table structure for table `confirmed_orders`
--

CREATE TABLE `confirmed_orders` (
  `id` int(11) NOT NULL,
  `order_id` int(11) DEFAULT NULL,
  `cusname` varchar(200) NOT NULL,
  `cusaddress` varchar(200) NOT NULL,
  `cuscontact` varchar(15) NOT NULL,
  `supname` varchar(200) NOT NULL,
  `supaddress` varchar(200) NOT NULL,
  `supcontact` varchar(15) NOT NULL,
  `description` varchar(200) NOT NULL,
  `category` varchar(200) NOT NULL,
  `size` varchar(200) NOT NULL,
  `weight` varchar(200) NOT NULL,
  `type` varchar(200) NOT NULL,
  `pickup` varchar(200) NOT NULL,
  `delivery` varchar(200) NOT NULL,
  `driver_email` varchar(200) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

-- --------------------------------------------------------

--
-- Table structure for table `customer`
--

CREATE TABLE `customer` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `mobileNumber` varchar(10) NOT NULL,
  `nicNumber` varchar(12) NOT NULL,
  `password` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `customer`
--

INSERT INTO `customer` (`id`, `name`, `email`, `mobileNumber`, `nicNumber`, `password`) VALUES
(1, 'K.Shashini Aloka Amandini De Silva', 'shashidesilva2002@gmail.com', '0787909149', '200265300950', '123456781'),
(10, 'shashi de silva', 'shashidesilva02@gmail.com', '0703766481', '123456789v', '1234567890-'),
(12, 'J.D.M.Devin Hansaja', 'devinhansaja100@gmail.com', '0703766481', '123456789123', '987654321'),
(15, 'K.Shashini Aloka Amandini De Silva', 'shashidesilva2002@gmail.com', '0787909149', '123456789v', '123456781'),
(16, 'Dulanjana', 'dcdranasinghe@gmail.com', '0785883543', '200030801627', '121212121');

-- --------------------------------------------------------

--
-- Table structure for table `customersign`
--

CREATE TABLE `customersign` (
  `id` int(11) NOT NULL,
  `name` varchar(225) NOT NULL,
  `email` varchar(225) NOT NULL,
  `mobile` int(10) NOT NULL,
  `NIC` varchar(12) NOT NULL,
  `password` varchar(225) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

-- --------------------------------------------------------

--
-- Table structure for table `orderdetails`
--

CREATE TABLE `orderdetails` (
  `id` int(11) NOT NULL,
  `name` varchar(225) NOT NULL,
  `address` varchar(225) NOT NULL,
  `contact` varchar(225) NOT NULL,
  `name1` varchar(225) NOT NULL,
  `address1` varchar(225) NOT NULL,
  `contact1` varchar(225) NOT NULL,
  `description` text NOT NULL,
  `category` varchar(225) NOT NULL,
  `package_size` varchar(225) NOT NULL,
  `weight` varchar(225) NOT NULL,
  `package` varchar(225) NOT NULL,
  `pickup` datetime NOT NULL,
  `delivery` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

--
-- Dumping data for table `orderdetails`
--

INSERT INTO `orderdetails` (`id`, `name`, `address`, `contact`, `name1`, `address1`, `contact1`, `description`, `category`, `package_size`, `weight`, `package`, `pickup`, `delivery`) VALUES
(1, 'D.C.Dulanjana Ranasinghe', '70/18 , isuru kedella , dolagatha rd , udugampola', '54563463', 'D.C.Dulanjana Ranasinghe', '70/18 , isuru kedella , dolagatha rd , udugampola', '2436542676', 'rgvdfvdfvbdbvdbb', 'Glass', '24', '45kg', 'package', '2024-06-19 15:25:00', '2024-06-18 15:25:00'),
(2, 'D.C.Dulanjana Ranasinghe', '70/18 , isuru kedella , dolagatha rd , udugampola', '54563463', 'D.C.Dulanjana Ranasinghe', '70/18 , isuru kedella , dolagatha rd , udugampola', '2436542676', 'rgvdfvdfvbdbvdbb', 'Glass', '24', '45kg', 'package', '2024-06-19 15:25:00', '2024-06-18 15:25:00'),
(3, 'D.C.Dulanjana Ranasinghe', '70/18 , isuru kedella , dolagatha rd , udugampola', '5456346322', 'D.C.Dulanjana Ranasinghe', '70/18 , isuru kedella , dolagatha rd , udugampola', '24365426', 'qwertyuio', 'Furniture', '11', '45kg', 'package', '2024-06-22 09:07:00', '2024-06-29 09:07:00'),
(4, 'D.C.Dulanjana Ranasinghe', '70/18 , isuru kedella , dolagatha rd , udugampola', '5456346322', 'D.C.Dulanjana Ranasinghe', '70/18 , isuru kedella , dolagatha rd , udugampola', '24365426', 'sdfghjkl', 'Grocery items', '11', '45kg', 'unpackage', '2024-06-07 09:31:00', '2024-06-08 09:32:00'),
(5, 'D.C.Dulanjana Ranasinghe', '70/18 , isuru kedella , dolagatha rd , udugampola', '5456346322', 'D.C.Dulanjana Ranasinghe', '70/18 , isuru kedella , dolagatha rd , udugampola', '24365426', 'asdfghjkl', 'Glass', '22', '45kg', 'unpackage', '2024-06-07 09:36:00', '2024-06-08 09:36:00'),
(6, 'D.C.Dulanjana Ranasinghe', '70/18 , isuru kedella , dolagatha rd , udugampola', '5456346322', 'D.C.Dulanjana Ranasinghe', '70/18 , isuru kedella , dolagatha rd , udugampola', '24365426', 'qwerghj', 'Glass', '33', '45kg', 'package', '2024-06-07 10:11:00', '2024-06-08 10:11:00'),
(1501, '', '', '', '', '', '', '', '', '', '', '', '2024-07-14 11:08:31', '2024-07-14 11:08:31');

-- --------------------------------------------------------

--
-- Table structure for table `orders`
--

CREATE TABLE `orders` (
  `id` int(11) NOT NULL,
  `cusname` varchar(200) NOT NULL,
  `cusaddress` varchar(200) NOT NULL,
  `cuscontact` varchar(15) NOT NULL,
  `supname` varchar(200) NOT NULL,
  `supaddress` varchar(200) NOT NULL,
  `supcontact` varchar(15) NOT NULL,
  `description` varchar(200) NOT NULL,
  `category` varchar(200) NOT NULL,
  `size` varchar(200) NOT NULL,
  `weight` varchar(200) NOT NULL,
  `type` varchar(200) NOT NULL,
  `pickup` varchar(200) NOT NULL,
  `delivery` varchar(200) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

--
-- Dumping data for table `orders`
--

INSERT INTO `orders` (`id`, `cusname`, `cusaddress`, `cuscontact`, `supname`, `supaddress`, `supcontact`, `description`, `category`, `size`, `weight`, `type`, `pickup`, `delivery`) VALUES
(1511, 'sandaruwa', 'no.35 Kehelella, Badalgama', '0787140121', 'Tharaka', 'kadawatha', '0712342342', 'AAAA', 'Grocery items', '5sqft', '6kg', 'unpackage', '2024-07-17T17:54', '2024-07-20T17:54');

-- --------------------------------------------------------

--
-- Table structure for table `orderstatus`
--

CREATE TABLE `orderstatus` (
  `id` int(100) NOT NULL,
  `orderid` int(12) NOT NULL,
  `orderstatus` varchar(100) NOT NULL,
  `date` date NOT NULL,
  `time` time NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

--
-- Dumping data for table `orderstatus`
--

INSERT INTO `orderstatus` (`id`, `orderid`, `orderstatus`, `date`, `time`) VALUES
(1501, 1504, 'dispatched', '2024-07-24', '00:00:00');

-- --------------------------------------------------------

--
-- Table structure for table `order_history`
--

CREATE TABLE `order_history` (
  `id` int(11) NOT NULL,
  `order_id` int(11) DEFAULT NULL,
  `cusname` varchar(255) DEFAULT NULL,
  `cusaddress` varchar(255) DEFAULT NULL,
  `cuscontact` varchar(20) DEFAULT NULL,
  `supname` varchar(255) DEFAULT NULL,
  `supaddress` varchar(255) DEFAULT NULL,
  `supcontact` varchar(20) DEFAULT NULL,
  `description` text DEFAULT NULL,
  `category` varchar(50) DEFAULT NULL,
  `size` varchar(20) DEFAULT NULL,
  `weight` varchar(20) DEFAULT NULL,
  `type` varchar(50) DEFAULT NULL,
  `pickup` varchar(255) DEFAULT NULL,
  `delivery` varchar(255) DEFAULT NULL,
  `driver_email` varchar(255) DEFAULT NULL,
  `status` varchar(50) DEFAULT NULL,
  `date_delivered` date DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

--
-- Dumping data for table `order_history`
--

INSERT INTO `order_history` (`id`, `order_id`, `cusname`, `cusaddress`, `cuscontact`, `supname`, `supaddress`, `supcontact`, `description`, `category`, `size`, `weight`, `type`, `pickup`, `delivery`, `driver_email`, `status`, `date_delivered`, `created_at`) VALUES
(1, 1504, 'shashi', 'no.35 Keheella,Badalgama', '0777123123', 'Kavindu', 'kadawatha', '0712342342', 'bla', 'Grocery item', '1sqft', '1kg', 'package', '2024-07-16T16:42', '2024-07-22T16:42', 'drver@gmail.com', 'delivered', '2024-07-22', '2024-07-15 12:20:41');

-- --------------------------------------------------------

--
-- Table structure for table `picked_orders`
--

CREATE TABLE `picked_orders` (
  `id` int(11) NOT NULL,
  `order_id` int(11) DEFAULT NULL,
  `cusname` varchar(255) DEFAULT NULL,
  `cusaddress` varchar(255) DEFAULT NULL,
  `cuscontact` varchar(20) DEFAULT NULL,
  `supname` varchar(255) DEFAULT NULL,
  `supaddress` varchar(255) DEFAULT NULL,
  `supcontact` varchar(20) DEFAULT NULL,
  `description` text DEFAULT NULL,
  `category` varchar(50) DEFAULT NULL,
  `size` varchar(20) DEFAULT NULL,
  `weight` varchar(20) DEFAULT NULL,
  `type` varchar(50) DEFAULT NULL,
  `pickup` varchar(255) DEFAULT NULL,
  `delivery` varchar(255) DEFAULT NULL,
  `driver_email` varchar(255) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

--
-- Dumping data for table `picked_orders`
--

INSERT INTO `picked_orders` (`id`, `order_id`, `cusname`, `cusaddress`, `cuscontact`, `supname`, `supaddress`, `supcontact`, `description`, `category`, `size`, `weight`, `type`, `pickup`, `delivery`, `driver_email`, `created_at`) VALUES
(1508, 1504, 'shashi', 'no.35 Kehelella, Badalgama', '0777123123', 'Kavindu', 'kadawatha', '0712342342', 'bla', 'Grocery items', '1sqft', '1kg', 'package', '2024-07-16T16:42', '2024-07-22T16:42', 'driver@example.com', '2024-07-15 11:39:52'),
(1509, 1505, 'oshia', '530/biyagama', '0787140121', 'Dulanjana', 'kadawatha', '0712342342', '..', 'Glass', '5sqft', '12kg', 'package', '2024-07-18T16:54', '2024-07-31T16:54', 'driver@example.com', '2024-07-15 11:39:54');

-- --------------------------------------------------------

--
-- Table structure for table `reviews`
--

CREATE TABLE `reviews` (
  `id` int(11) NOT NULL,
  `username` varchar(255) NOT NULL,
  `rating` int(11) NOT NULL,
  `date` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

--
-- Dumping data for table `reviews`
--

INSERT INTO `reviews` (`id`, `username`, `rating`, `date`) VALUES
(1, 'kavindu', 3, '2024-07-16 10:49:10');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `user_id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `mobile_number` varchar(255) DEFAULT NULL,
  `nic_number` varchar(255) DEFAULT NULL,
  `password` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`user_id`, `name`, `email`, `mobile_number`, `nic_number`, `password`) VALUES
(1503, 'Dulanjana', 'dulanjanarasa@gmail.com', '0785883543', '200030801629', '12121212'),
(1505, 'oshin', 'oshin@gmail.com', '0785883543', 'dulanjanarr', '123412341234'),
(1507, 'Dulanjana', 'dulanjandada@gmail.com', '0785883543', '200030801627', '12345678'),
(1508, 'Vihara', 'vihara@gmail.com', '0785883543', '200030801627', '987654321'),
(1509, 'Kavindu', 'dcdranasinghe@gmail.com', '0789675432', '123456789v', '12345678');

-- --------------------------------------------------------

--
-- Table structure for table `vehicles`
--

CREATE TABLE `vehicles` (
  `vehicle_id` int(11) NOT NULL,
  `user_id` int(11) DEFAULT NULL,
  `vehicle_model` varchar(255) DEFAULT NULL,
  `size` varchar(255) DEFAULT NULL,
  `max_weight` varchar(255) DEFAULT NULL,
  `category` varchar(255) DEFAULT NULL,
  `number_plate` varchar(255) NOT NULL,
  `province` varchar(255) DEFAULT NULL,
  `revenue_license` varchar(255) DEFAULT NULL,
  `insurance_number` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

--
-- Indexes for dumped tables
--

--
-- Indexes for table `complaints`
--
ALTER TABLE `complaints`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `confirmed_orders`
--
ALTER TABLE `confirmed_orders`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `customer`
--
ALTER TABLE `customer`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `customersign`
--
ALTER TABLE `customersign`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `orderdetails`
--
ALTER TABLE `orderdetails`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `orders`
--
ALTER TABLE `orders`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `order_history`
--
ALTER TABLE `order_history`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `picked_orders`
--
ALTER TABLE `picked_orders`
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
  ADD PRIMARY KEY (`user_id`),
  ADD UNIQUE KEY `email` (`email`);

--
-- Indexes for table `vehicles`
--
ALTER TABLE `vehicles`
  ADD PRIMARY KEY (`vehicle_id`),
  ADD UNIQUE KEY `number_plate` (`number_plate`),
  ADD KEY `fk_user` (`user_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `complaints`
--
ALTER TABLE `complaints`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=1511;

--
-- AUTO_INCREMENT for table `confirmed_orders`
--
ALTER TABLE `confirmed_orders`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=1510;

--
-- AUTO_INCREMENT for table `customer`
--
ALTER TABLE `customer`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=17;

--
-- AUTO_INCREMENT for table `customersign`
--
ALTER TABLE `customersign`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `orderdetails`
--
ALTER TABLE `orderdetails`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=1502;

--
-- AUTO_INCREMENT for table `orders`
--
ALTER TABLE `orders`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=1513;

--
-- AUTO_INCREMENT for table `order_history`
--
ALTER TABLE `order_history`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=1509;

--
-- AUTO_INCREMENT for table `picked_orders`
--
ALTER TABLE `picked_orders`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=1512;

--
-- AUTO_INCREMENT for table `reviews`
--
ALTER TABLE `reviews`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `user_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=1511;

--
-- AUTO_INCREMENT for table `vehicles`
--
ALTER TABLE `vehicles`
  MODIFY `vehicle_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=1511;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `vehicles`
--
ALTER TABLE `vehicles`
  ADD CONSTRAINT `fk_user` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
