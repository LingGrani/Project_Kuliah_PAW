-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jan 16, 2025 at 12:41 AM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `pawproject`
--

-- --------------------------------------------------------

--
-- Table structure for table `admin`
--

CREATE TABLE `admin` (
  `username` varchar(15) NOT NULL,
  `password` varchar(50) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `genre`
--

CREATE TABLE `genre` (
  `genreID` int(11) NOT NULL,
  `genreName` varchar(50) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `genre`
--

INSERT INTO `genre` (`genreID`, `genreName`) VALUES
(1, 'Horror'),
(2, 'Action'),
(3, 'Adventure'),
(4, 'Komedi'),
(5, 'Sport');

-- --------------------------------------------------------

--
-- Table structure for table `movie`
--

CREATE TABLE `movie` (
  `movieID` int(11) NOT NULL,
  `title` varchar(100) DEFAULT NULL,
  `releaseYear` int(11) DEFAULT NULL,
  `description` varchar(255) DEFAULT NULL,
  `thumbnail` varchar(255) DEFAULT NULL,
  `cbfc` varchar(10) DEFAULT NULL,
  `series` tinyint(1) NOT NULL,
  `genre` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `movie`
--

INSERT INTO `movie` (`movieID`, `title`, `releaseYear`, `description`, `thumbnail`, `cbfc`, `series`, `genre`) VALUES
(1, 'Nun', 2019, 'A priest with a haunted past and a novice on the threshold of her final vows are sent by the Vatican to investigate the death of a young nun in Romania and confront a malevolent force in the form of a demonic nun.', 'linggrani.com/thumbnail/Nun.jpeg', 'U/A', 0, 'Horror'),
(2, 'Boboiboy The Movie.png', 2019, '----', 'linggrani.com/thumbnail/Boboiboy_The_Movie.png', 'U', 0, 'Adventue'),
(3, 'Frozen', 2019, '----', 'linggrani.com/thumbnail/frozen.jpg', 'U', 0, 'Adventue'),
(4, 'How to Train your dragon', 2010, '----', 'linggrani.com/thumbnail/how_to_train_your_dragon3.jpg', 'U/A', 1, 'Action'),
(5, 'IT', 2010, '----', 'linggrani.com/thumbnail/IT.jpg', 'U/A', 0, 'Horror'),
(6, 'TURBO', 2010, '----', 'linggrani.com/thumbnail/TURBO.jpg', 'A', 0, 'Horror');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `username` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`username`, `email`, `password`) VALUES
('me', 'me@mail.com', '$2a$10$aRW1/DhfHoTMNaAA5Is8M.vFHny0AK7NeikwXA5RtYgDB1KAK56Q2');

-- --------------------------------------------------------

--
-- Table structure for table `video`
--

CREATE TABLE `video` (
  `videoID` int(11) NOT NULL,
  `movieID` int(11) DEFAULT NULL,
  `videoTitle` varchar(255) DEFAULT NULL,
  `episodeNumber` int(11) DEFAULT NULL,
  `duration` varchar(255) DEFAULT NULL,
  `videoLink` varchar(255) DEFAULT NULL,
  `seasonIndex` int(11) DEFAULT NULL,
  `thumbnail` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `video`
--

INSERT INTO `video` (`videoID`, `movieID`, `videoTitle`, `episodeNumber`, `duration`, `videoLink`, `seasonIndex`, `thumbnail`) VALUES
(1, 1, 'Nun', 1, '01:36:30', 'https://linggrani.com/video/The_Nun.mp4', 0, 'https://linggrani.com/thumbnail/Nun.jpeg'),
(2, 2, 'Boboiboy The Movie', 1, '01:36:30', 'https://linggrani.com/video/Boboiboy_The_Movie.mkv', 0, 'https://linggrani.com/thumbnail/Boboiboy_The_Movie.png'),
(3, 4, 'How to Train Your Dragon 2', 2, '01:36:30', 'https://linggrani.com/video/How_to_Train_Your_Dragon_2).mp4', 2, 'https://linggrani.com/thumbnail/how_to_train_your_dragon2.jpg'),
(4, 4, 'How to Train Your Dragon 3', 2, '01:36:30', 'https://linggrani.com/video/How_to_Train_Your_Dragon_The_Hidden_World.mp4\r\n', 2, 'https://linggrani.com/thumbnail/how_to_train_your_dragon3.jpg'),
(5, 3, 'Frozen', 1, '01:36:30', 'https://linggrani.com/video/Frozen.mp4', 0, 'https://linggrani.com/thumbnail/frozen.jpg\r\n');

-- --------------------------------------------------------

--
-- Table structure for table `watchlist`
--

CREATE TABLE `watchlist` (
  `movieID` int(11) NOT NULL,
  `email` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Indexes for dumped tables
--

--
-- Indexes for table `admin`
--
ALTER TABLE `admin`
  ADD PRIMARY KEY (`username`);

--
-- Indexes for table `genre`
--
ALTER TABLE `genre`
  ADD PRIMARY KEY (`genreID`);

--
-- Indexes for table `movie`
--
ALTER TABLE `movie`
  ADD PRIMARY KEY (`movieID`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`username`);

--
-- Indexes for table `video`
--
ALTER TABLE `video`
  ADD PRIMARY KEY (`videoID`),
  ADD KEY `movieID` (`movieID`);

--
-- Indexes for table `watchlist`
--
ALTER TABLE `watchlist`
  ADD PRIMARY KEY (`movieID`,`email`),
  ADD KEY `email` (`email`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `genre`
--
ALTER TABLE `genre`
  MODIFY `genreID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `movie`
--
ALTER TABLE `movie`
  MODIFY `movieID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT for table `video`
--
ALTER TABLE `video`
  MODIFY `videoID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `video`
--
ALTER TABLE `video`
  ADD CONSTRAINT `video_ibfk_1` FOREIGN KEY (`movieID`) REFERENCES `movie` (`movieID`);

--
-- Constraints for table `watchlist`
--
ALTER TABLE `watchlist`
  ADD CONSTRAINT `watchlist_ibfk_1` FOREIGN KEY (`movieID`) REFERENCES `movie` (`movieID`),
  ADD CONSTRAINT `watchlist_ibfk_2` FOREIGN KEY (`email`) REFERENCES `users` (`Username`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
