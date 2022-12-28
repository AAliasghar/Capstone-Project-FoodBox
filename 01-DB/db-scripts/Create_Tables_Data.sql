-- -----------------------------------------------------
-- Schema full-stack-ecommerce
-- -----------------------------------------------------
DROP SCHEMA IF EXISTS `full-stack-ecommerce`;

CREATE SCHEMA `full-stack-ecommerce`;
USE `full-stack-ecommerce` ;

-- -----------------------------------------------------
-- Table `full-stack-ecommerce`.`product_category`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `full-stack-ecommerce`.`product_category` (
  `id` BIGINT(20) NOT NULL AUTO_INCREMENT,
  `category_name` VARCHAR(255) NULL DEFAULT NULL,
  PRIMARY KEY (`id`))
ENGINE=InnoDB
AUTO_INCREMENT = 1;

-- -----------------------------------------------------
-- Table `full-stack-ecommerce`.`product`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `full-stack-ecommerce`.`product` (
  `id` BIGINT(20) NOT NULL AUTO_INCREMENT,
  `sku` VARCHAR(255) DEFAULT NULL,
  `name` VARCHAR(255) DEFAULT NULL,
  `description` VARCHAR(255) DEFAULT NULL,
  `unit_price` DECIMAL(13,2) DEFAULT NULL,
  `image_url` VARCHAR(255) DEFAULT NULL,
  `active` BIT DEFAULT 1,
  `units_in_stock` INT(11) DEFAULT NULL,
   `date_created` DATETIME(6) DEFAULT NULL,
  `last_updated` DATETIME(6) DEFAULT NULL,
  `category_id` BIGINT(20) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_category` (`category_id`),
  CONSTRAINT `fk_category` FOREIGN KEY (`category_id`) REFERENCES `product_category` (`id`)
) 
ENGINE=InnoDB
AUTO_INCREMENT = 1;


-- -----------------------------------------------------
-- Add sample data
-- -----------------------------------------------------


INSERT INTO product (sku, name, description, image_url, active, units_in_stock,
unit_price, category_id, date_created)
VALUES ('-1000', 'Dosa', 'Vegeterian',
'assets/images/products/Dosa.png'
,1,100,5.99,1, NOW());

INSERT INTO product (sku, name, description, image_url, active, units_in_stock,
unit_price, category_id, date_created)
VALUES ('-1001', 'Idli', 'Vegeterian',
'assets/images/products/Idli.png'
,1,100,10.99,1, NOW());

INSERT INTO product (sku, name, description, image_url, active, units_in_stock,
unit_price, category_id, date_created)
VALUES ('-1002', 'Dosa Double', 'Vegeterian',
'assets/images/products/Dosa Double.png'
,1,100,15.99,1, NOW());

INSERT INTO product (sku, name, description, image_url, active, units_in_stock,
unit_price, category_id, date_created)
VALUES ('-1003', 'Panjabi', 'Non-Vegeterian',
'assets/images/products/Panjabi.png'
,1,100,15.99,2, NOW());

INSERT INTO product (sku, name, description, image_url, active, units_in_stock,
unit_price, category_id, date_created)
VALUES ('-1004', 'Samosa', 'Non-Vegeterian',
'assets/images/products/Samosa.png'
,1,100,5.99,2, NOW());

INSERT INTO product (sku, name, description, image_url, active, units_in_stock,
unit_price, category_id, date_created)
VALUES ('-1005', 'Thali', 'Non-Vegeterian',
'assets/images/products/Thali.png'
,1,100,18.99,2, NOW());

-----------------------------------------------------------------------
----------------------------------------------------------------------

SET foreign_key_checks = 0;

--
-- Table structure for table `country`
--

DROP TABLE IF EXISTS `country`;

CREATE TABLE `country` (
  `id` smallint unsigned NOT NULL,
  `code` varchar(2) DEFAULT NULL,
  `name` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB;

--
-- Data for table `country`
--

INSERT INTO `country` VALUES 
(1,'IN','India'),
(2,'DE','Germany'),
(3,'US','United States');

--
-- Table structure for table `state`
--

DROP TABLE IF EXISTS `state`;

CREATE TABLE `state` (
  `id` smallint unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(255) DEFAULT NULL,
  `country_id` smallint unsigned NOT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_country` (`country_id`),
  CONSTRAINT `fk_country` FOREIGN KEY (`country_id`) REFERENCES `country` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=1;

--
-- Dumping data for table `state`
--

INSERT INTO `state` VALUES 
(1,'Baden-Württemberg',2),
(2,'Bavaria',2),
(3,'Berlin',2),
(4,'Brandenburg',2),
(5,'Bremen',2),
(6,'Hamburg',2),
(7,'Hesse',2),
(8,'Lower Saxony',2),
(9,'Mecklenburg-Vorpommern',2),
(10,'North Rhine-Westphalia',2),
(11,'Rhineland-Palatinate',2),
(12,'Saarland',2),
(13,'Saxony',2),
(14,'Saxony-Anhalt',2),
(15,'Schleswig-Holstein',2),
(16,'Thuringia',2),
(17,'Andhra Pradesh',1),
(18,'Arunachal Pradesh',1),
(19,'Assam',1),
(20,'Bihar',1),
(21,'Chhattisgarh',1),
(22,'Goa',1),
(23,'Gujarat',1),
(24,'Haryana',1),
(25,'Himachal Pradesh',1),
(26,'Jammu & Kashmir',1),
(27,'Jharkhand',1),
(28,'Karnataka',1),
(29,'Kerala',1),
(30,'Madhya Pradesh',1),
(31,'Maharashtra',1),
(32,'Manipur',1),
(33,'Meghalaya',1),
(34,'Mizoram',1),
(35,'Nagaland',1),
(36,'Odisha',1),
(37,'Punjab',1),
(38,'Rajasthan',1),
(39,'Sikkim',1),
(40,'Tamil Nadu',1),
(41,'Telangana',1),
(42,'Tripura',1),
(43,'Uttar Pradesh',1),
(44,'Uttarakhand',1),
(45,'West Bengal',1),
(46,'Andaman and Nicobar Islands',1),
(47,'Chandigarh',1),
(48,'Dadra and Nagar Haveli',1),
(49,'Daman & Diu',1),
(50,'Lakshadweep',1),
(51,'Puducherry',1),
(52,'The Government of NCT of Delhi',1),
(53,'Alabama',3),
(54,'Alaska',3),
(55,'Arizona',3),
(56,'Arkansas',3),
(57,'California',3),
(58,'Colorado',3),
(59,'Connecticut',3),
(60,'Delaware',3),
(61,'District Of Columbia',3),
(62,'Florida',3),
(63,'Georgia',3),
(64,'Hawaii',3),
(65,'Idaho',3),
(66,'Illinois',3),
(67,'Indiana',3),
(68,'Iowa',3),
(69,'Kansas',3),
(70,'Kentucky',3),
(71,'Louisiana',3),
(72,'Maine',3),
(73,'Maryland',3),
(74,'Massachusetts',3),
(75,'Michigan',3),
(76,'Minnesota',3),
(77,'Mississippi',3),
(78,'Missouri',3),
(79,'Montana',3),
(80,'Nebraska',3),
(81,'Nevada',3),
(82,'New Hampshire',3),
(83,'New Jersey',3),
(84,'New Mexico',3),
(85,'New York',3),
(86,'North Carolina',3),
(87,'North Dakota',3),
(88,'Ohio',3),
(89,'Oklahoma',3),
(90,'Oregon',3),
(91,'Pennsylvania',3),
(92,'Rhode Island',3),
(93,'South Carolina',3),
(94,'South Dakota',3),
(95,'Tennessee',3),
(96,'Texas',3),
(97,'Utah',3),
(98,'Vermont',3),
(99,'Virginia',3),
(100,'Washington',3),
(101,'West Virginia',3),
(102,'Wisconsin',3),
(103,'Wyoming',3);

SET foreign_key_checks = 1;