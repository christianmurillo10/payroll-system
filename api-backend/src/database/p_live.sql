/*
SQLyog Community v13.1.5  (64 bit)
MySQL - 10.4.6-MariaDB-log : Database - p_live
*********************************************************************
*/

/*!40101 SET NAMES utf8 */;

/*!40101 SET SQL_MODE=''*/;

/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;
CREATE DATABASE /*!32312 IF NOT EXISTS*/`p_live` /*!40100 DEFAULT CHARACTER SET utf8 */;

USE `p_live`;

/*Table structure for table `employee_salaries_and_allowances` */

DROP TABLE IF EXISTS `employee_salaries_and_allowances`;

CREATE TABLE `employee_salaries_and_allowances` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `salary_amount` decimal(12,2) NOT NULL DEFAULT 0.00,
  `allowance_amount` decimal(12,2) NOT NULL DEFAULT 0.00,
  `employee_id` int(11) NOT NULL COMMENT 'refd to employees.id',
  `user_id` int(11) NOT NULL COMMENT 'refd to users.id',
  `date_issued` date NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NULL DEFAULT current_timestamp(),
  `is_current` smallint(1) NOT NULL DEFAULT 1,
  `is_deleted` smallint(1) NOT NULL DEFAULT 0,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

/*Data for the table `employee_salaries_and_allowances` */

/*Table structure for table `employees` */

DROP TABLE IF EXISTS `employees`;

CREATE TABLE `employees` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `employee_no` varchar(50) NOT NULL,
  `firstname` varchar(50) NOT NULL,
  `middlename` varchar(50) NOT NULL,
  `lastname` varchar(50) NOT NULL,
  `primary_address` varchar(100) NOT NULL,
  `secondary_address` varchar(100) DEFAULT NULL,
  `email` varchar(50) NOT NULL,
  `mobile` varchar(50) DEFAULT NULL,
  `landline` varchar(50) NOT NULL,
  `tin_no` varchar(50) NOT NULL,
  `sss_no` varchar(50) NOT NULL,
  `philhealth_no` varchar(50) NOT NULL,
  `pagibig_no` varchar(50) NOT NULL,
  `pay_frequency_id` int(11) NOT NULL COMMENT 'refd to pay_frequencies.id',
  `user_id` int(11) NOT NULL COMMENT 'refd to users.id',
  `birthdate` date NOT NULL,
  `date_start` date NOT NULL,
  `date_endo` date NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NULL DEFAULT current_timestamp(),
  `is_active` smallint(1) NOT NULL DEFAULT 1,
  `is_deleted` smallint(1) NOT NULL DEFAULT 0,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

/*Data for the table `employees` */

/*Table structure for table `pay_frequencies` */

DROP TABLE IF EXISTS `pay_frequencies`;

CREATE TABLE `pay_frequencies` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(50) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NULL DEFAULT current_timestamp(),
  `is_deleted` smallint(1) NOT NULL DEFAULT 0,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

/*Data for the table `pay_frequencies` */

/*Table structure for table `payroll_deductions` */

DROP TABLE IF EXISTS `payroll_deductions`;

CREATE TABLE `payroll_deductions` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `sss_payable_amount` decimal(12,2) NOT NULL DEFAULT 0.00,
  `sss_salary_amount` decimal(12,2) NOT NULL DEFAULT 0.00,
  `phic_payable_amount` decimal(12,2) NOT NULL DEFAULT 0.00,
  `hdmf_payable_amount` decimal(12,2) NOT NULL DEFAULT 0.00,
  `hdmf_salary_amount` decimal(12,2) NOT NULL DEFAULT 0.00,
  `hdmf_housing_amount` decimal(12,2) NOT NULL DEFAULT 0.00,
  `personal_cash_amount` decimal(12,2) NOT NULL DEFAULT 0.00,
  `with_tax_compensation_amount` decimal(12,2) NOT NULL DEFAULT 0.00,
  `total_deductions` decimal(12,2) NOT NULL DEFAULT 0.00,
  `payroll_id` int(11) NOT NULL COMMENT 'refd to payrolls.id',
  `employee_id` int(11) NOT NULL COMMENT 'refd to employees.id',
  `user_id` int(11) NOT NULL COMMENT 'refd to users.id',
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NULL DEFAULT current_timestamp(),
  `is_deleted` smallint(1) NOT NULL DEFAULT 0,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

/*Data for the table `payroll_deductions` */

/*Table structure for table `payroll_hdmf_contributions` */

DROP TABLE IF EXISTS `payroll_hdmf_contributions`;

CREATE TABLE `payroll_hdmf_contributions` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `amount` decimal(12,2) NOT NULL DEFAULT 0.00,
  `adjustment_amount` decimal(12,2) NOT NULL DEFAULT 0.00,
  `total_amount` decimal(12,2) NOT NULL DEFAULT 0.00,
  `payroll_id` int(11) NOT NULL COMMENT 'refd to payrolls.id',
  `employee_id` int(11) NOT NULL COMMENT 'refd to employees.id',
  `user_id` int(11) NOT NULL COMMENT 'refd to users.id',
  `contribution_type` smallint(1) NOT NULL DEFAULT 1 COMMENT '1=Bi-Monthly Contribution 2=Bi-Monthly Salary Loan 3=Bi-Monthly Housing',
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NULL DEFAULT current_timestamp(),
  `is_deleted` smallint(1) NOT NULL DEFAULT 0,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

/*Data for the table `payroll_hdmf_contributions` */

/*Table structure for table `payroll_night_differentials` */

DROP TABLE IF EXISTS `payroll_night_differentials`;

CREATE TABLE `payroll_night_differentials` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `regular_day` decimal(2,2) NOT NULL DEFAULT 0.00,
  `special_day` decimal(2,2) NOT NULL DEFAULT 0.00 COMMENT 'Sunday/Rest/Special day',
  `special_day_ford` decimal(2,2) NOT NULL DEFAULT 0.00 COMMENT 'Special day falling on rest day',
  `holiday` decimal(2,2) NOT NULL DEFAULT 0.00,
  `holiday_ford` decimal(2,2) NOT NULL DEFAULT 0.00 COMMENT 'Holiday falling on rest day',
  `double_holiday` decimal(2,2) NOT NULL DEFAULT 0.00,
  `double_holiday_ford` decimal(2,2) NOT NULL DEFAULT 0.00 COMMENT 'Double Holiday falling on rest day',
  `regular_day_amount` decimal(12,2) NOT NULL DEFAULT 0.00,
  `special_day_amount` decimal(12,2) NOT NULL DEFAULT 0.00,
  `special_day_ford_amount` decimal(12,2) NOT NULL DEFAULT 0.00,
  `holiday_amount` decimal(12,2) NOT NULL DEFAULT 0.00,
  `holiday_ford_amount` decimal(12,2) NOT NULL DEFAULT 0.00,
  `double_holiday_amount` decimal(12,2) NOT NULL DEFAULT 0.00,
  `double_holiday_ford_amount` decimal(12,2) NOT NULL DEFAULT 0.00,
  `total_amount` decimal(12,2) NOT NULL DEFAULT 0.00,
  `payroll_id` int(11) NOT NULL COMMENT 'refd to payrolls.id',
  `employee_id` int(11) NOT NULL COMMENT 'refd to employees.id',
  `user_id` int(11) NOT NULL COMMENT 'refd to users.id',
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NULL DEFAULT current_timestamp(),
  `is_deleted` smallint(1) NOT NULL DEFAULT 0,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

/*Data for the table `payroll_night_differentials` */

/*Table structure for table `payroll_non_taxable_compensations` */

DROP TABLE IF EXISTS `payroll_non_taxable_compensations`;

CREATE TABLE `payroll_non_taxable_compensations` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `allowance_amount` decimal(12,2) NOT NULL DEFAULT 0.00,
  `sick_leave_amount` decimal(12,2) NOT NULL DEFAULT 0.00,
  `vacation_leave_amount` decimal(12,2) NOT NULL DEFAULT 0.00,
  `holiday_amount` decimal(12,2) NOT NULL DEFAULT 0.00,
  `other_salary_wages_amount` decimal(12,2) NOT NULL DEFAULT 0.00,
  `total_amount` decimal(12,2) NOT NULL DEFAULT 0.00,
  `payroll_id` int(11) NOT NULL COMMENT 'refd to payrolls.id',
  `employee_id` int(11) NOT NULL COMMENT 'refd to employees.id',
  `user_id` int(11) NOT NULL COMMENT 'refd to employees.id',
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NULL DEFAULT current_timestamp(),
  `is_deleted` smallint(1) NOT NULL DEFAULT 0,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

/*Data for the table `payroll_non_taxable_compensations` */

/*Table structure for table `payroll_other_salaries_and_wages` */

DROP TABLE IF EXISTS `payroll_other_salaries_and_wages`;

CREATE TABLE `payroll_other_salaries_and_wages` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `amount` decimal(12,2) NOT NULL DEFAULT 0.00,
  `description` text DEFAULT NULL,
  `payroll_id` int(11) NOT NULL COMMENT 'refd to payrolls.id',
  `employee_id` int(11) NOT NULL COMMENT 'refd to employees.id',
  `user_id` int(11) NOT NULL COMMENT 'refd to users.id',
  `type` smallint(1) NOT NULL DEFAULT 1 COMMENT '1=taxable 2=non taxable',
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NULL DEFAULT current_timestamp(),
  `is_deleted` smallint(1) NOT NULL DEFAULT 0,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

/*Data for the table `payroll_other_salaries_and_wages` */

/*Table structure for table `payroll_overtimes` */

DROP TABLE IF EXISTS `payroll_overtimes`;

CREATE TABLE `payroll_overtimes` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `regular_day` decimal(2,2) NOT NULL DEFAULT 0.00,
  `special_day` decimal(2,2) NOT NULL DEFAULT 0.00 COMMENT 'Sunday/Rest/Special day',
  `special_day_ford` decimal(2,2) NOT NULL DEFAULT 0.00 COMMENT 'Special day falling on rest day',
  `holiday` decimal(2,2) NOT NULL DEFAULT 0.00,
  `holiday_ford` decimal(2,2) NOT NULL DEFAULT 0.00 COMMENT 'Holiday falling on rest day',
  `double_holiday` decimal(2,2) NOT NULL DEFAULT 0.00,
  `double_holiday_ford` decimal(2,2) NOT NULL DEFAULT 0.00 COMMENT 'Double Holiday falling on rest day',
  `regular_day_amount` decimal(12,2) NOT NULL DEFAULT 0.00,
  `special_day_amount` decimal(12,2) NOT NULL DEFAULT 0.00,
  `special_day_ford_amount` decimal(12,2) NOT NULL DEFAULT 0.00,
  `holiday_amount` decimal(12,2) NOT NULL DEFAULT 0.00,
  `holiday_ford_amount` decimal(12,2) NOT NULL DEFAULT 0.00,
  `double_holiday_amount` decimal(12,2) NOT NULL DEFAULT 0.00,
  `double_holiday_ford_amount` decimal(12,2) NOT NULL DEFAULT 0.00,
  `total_amount` decimal(12,2) NOT NULL DEFAULT 0.00,
  `payroll_id` int(11) NOT NULL COMMENT 'refd to payrolls.id',
  `employee_id` int(11) NOT NULL COMMENT 'refd to employees.id',
  `user_id` int(11) NOT NULL COMMENT 'refd to users.id',
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NULL DEFAULT current_timestamp(),
  `is_deleted` smallint(1) NOT NULL DEFAULT 0,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

/*Data for the table `payroll_overtimes` */

/*Table structure for table `payroll_personal_cash_advances` */

DROP TABLE IF EXISTS `payroll_personal_cash_advances`;

CREATE TABLE `payroll_personal_cash_advances` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `amount` decimal(12,2) NOT NULL DEFAULT 0.00,
  `payroll_id` int(11) NOT NULL COMMENT 'refd to payrolls.id',
  `employee_id` int(11) NOT NULL COMMENT 'refd to employees.id',
  `user_id` int(11) NOT NULL COMMENT 'refd to users.id',
  `date` date NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NULL DEFAULT current_timestamp(),
  `is_deleted` smallint(1) NOT NULL DEFAULT 0,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

/*Data for the table `payroll_personal_cash_advances` */

/*Table structure for table `payroll_phic_contributions` */

DROP TABLE IF EXISTS `payroll_phic_contributions`;

CREATE TABLE `payroll_phic_contributions` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `amount` decimal(12,2) NOT NULL,
  `adjustment_amount` decimal(12,2) NOT NULL,
  `total_amount` decimal(12,2) NOT NULL,
  `payroll_id` int(11) NOT NULL COMMENT 'refd to payrolls.id',
  `employee_id` int(11) NOT NULL COMMENT 'refd to employees.id',
  `user_id` int(11) NOT NULL COMMENT 'refd to users.id',
  `contribution_type` smallint(1) NOT NULL DEFAULT 1 COMMENT '1=Bi-Monthly Contribution',
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NULL DEFAULT current_timestamp(),
  `is_deleted` smallint(1) NOT NULL DEFAULT 0,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

/*Data for the table `payroll_phic_contributions` */

/*Table structure for table `payroll_sss_contributions` */

DROP TABLE IF EXISTS `payroll_sss_contributions`;

CREATE TABLE `payroll_sss_contributions` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `amount` decimal(12,2) NOT NULL,
  `adjustment_amount` decimal(12,2) NOT NULL,
  `total_amount` decimal(12,2) NOT NULL,
  `payroll_id` int(11) NOT NULL COMMENT 'refd to payrolls.id',
  `employee_id` int(11) NOT NULL COMMENT 'refd to employees.id',
  `user_id` int(11) NOT NULL COMMENT 'refd to users.id',
  `contribution_type` smallint(1) NOT NULL DEFAULT 1 COMMENT '1=Bi-Monthly Contribution 2=Bi-Monthly Salary Loan',
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NULL DEFAULT current_timestamp(),
  `is_deleted` smallint(1) NOT NULL DEFAULT 0,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

/*Data for the table `payroll_sss_contributions` */

/*Table structure for table `payroll_tardiness` */

DROP TABLE IF EXISTS `payroll_tardiness`;

CREATE TABLE `payroll_tardiness` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `undertime` decimal(2,2) NOT NULL DEFAULT 0.00,
  `half_day` decimal(2,2) NOT NULL DEFAULT 0.00,
  `sick_leave` decimal(2,2) NOT NULL DEFAULT 0.00,
  `vacation_leave` decimal(2,2) NOT NULL DEFAULT 0.00,
  `holiday` decimal(2,2) NOT NULL DEFAULT 0.00,
  `absent` decimal(2,2) NOT NULL DEFAULT 0.00,
  `undertime_amount` decimal(12,2) NOT NULL DEFAULT 0.00,
  `half_day_amount` decimal(12,2) NOT NULL DEFAULT 0.00,
  `sick_leave_amount` decimal(12,2) NOT NULL DEFAULT 0.00,
  `vacation_leave_amount` decimal(12,2) NOT NULL DEFAULT 0.00,
  `holiday_amount` decimal(12,2) NOT NULL DEFAULT 0.00,
  `absent_amount` decimal(12,2) NOT NULL DEFAULT 0.00,
  `total_absent_amount` decimal(12,2) NOT NULL DEFAULT 0.00 COMMENT 'Scope: Sick Leave, Vacation Leave, Holiday, Absent',
  `payroll_id` int(11) NOT NULL COMMENT 'refd to payrolls.id',
  `employee_id` int(11) NOT NULL COMMENT 'refd to employees.id',
  `user_id` int(11) NOT NULL COMMENT 'refd to users.id',
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NULL DEFAULT current_timestamp(),
  `is_deleted` smallint(1) NOT NULL DEFAULT 0,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

/*Data for the table `payroll_tardiness` */

/*Table structure for table `payroll_with_tax_compensations` */

DROP TABLE IF EXISTS `payroll_with_tax_compensations`;

CREATE TABLE `payroll_with_tax_compensations` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `amount` decimal(12,2) NOT NULL DEFAULT 0.00,
  `adjustment_amount` decimal(12,2) NOT NULL DEFAULT 0.00,
  `total_amount` decimal(12,2) NOT NULL DEFAULT 0.00,
  `payroll_id` int(11) NOT NULL COMMENT 'refd to payrolls.id',
  `employee_id` int(11) NOT NULL COMMENT 'refd to employees.id',
  `user_id` int(11) NOT NULL COMMENT 'refd to users.id',
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NULL DEFAULT current_timestamp(),
  `is_deleted` smallint(1) NOT NULL DEFAULT 0,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

/*Data for the table `payroll_with_tax_compensations` */

/*Table structure for table `payroll_working_holidays` */

DROP TABLE IF EXISTS `payroll_working_holidays`;

CREATE TABLE `payroll_working_holidays` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `regular_day` decimal(2,2) NOT NULL DEFAULT 0.00,
  `special_day` decimal(2,2) NOT NULL DEFAULT 0.00 COMMENT 'Sunday/Rest/Special day',
  `special_day_ford` decimal(2,2) NOT NULL DEFAULT 0.00 COMMENT 'Special day falling on rest day',
  `holiday` decimal(2,2) NOT NULL DEFAULT 0.00,
  `holiday_ford` decimal(2,2) NOT NULL DEFAULT 0.00 COMMENT 'Holiday falling on rest day',
  `double_holiday` decimal(2,2) NOT NULL DEFAULT 0.00,
  `double_holiday_ford` decimal(2,2) NOT NULL DEFAULT 0.00 COMMENT 'Double Holiday falling on rest day',
  `regular_day_amount` decimal(12,2) NOT NULL DEFAULT 0.00,
  `special_day_amount` decimal(12,2) NOT NULL DEFAULT 0.00,
  `special_day_ford_amount` decimal(12,2) NOT NULL DEFAULT 0.00,
  `holiday_amount` decimal(12,2) NOT NULL DEFAULT 0.00,
  `holiday_ford_amount` decimal(12,2) NOT NULL DEFAULT 0.00,
  `double_holiday_amount` decimal(12,2) NOT NULL DEFAULT 0.00,
  `double_holiday_ford_amount` decimal(12,2) NOT NULL DEFAULT 0.00,
  `total_amount` decimal(12,2) NOT NULL DEFAULT 0.00,
  `payroll_id` int(11) NOT NULL COMMENT 'refd to payrolls.id',
  `employee_id` int(11) NOT NULL COMMENT 'refd to employees.id',
  `user_id` int(11) NOT NULL COMMENT 'refd to users.id',
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NULL DEFAULT current_timestamp(),
  `is_deleted` smallint(1) NOT NULL DEFAULT 0,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

/*Data for the table `payroll_working_holidays` */

/*Table structure for table `payrolls` */

DROP TABLE IF EXISTS `payrolls`;

CREATE TABLE `payrolls` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `basic_salary_amount` decimal(12,2) NOT NULL DEFAULT 0.00,
  `fixed_allowance_amount` decimal(12,2) NOT NULL DEFAULT 0.00,
  `daily_allowance_amount` decimal(12,2) NOT NULL DEFAULT 0.00,
  `daily_rate_amount` decimal(12,2) NOT NULL DEFAULT 0.00,
  `total_working_day_amount` decimal(12,2) NOT NULL DEFAULT 0.00,
  `total_night_differential_amount` decimal(12,2) NOT NULL DEFAULT 0.00,
  `total_overtime_amount` decimal(12,2) NOT NULL DEFAULT 0.00,
  `total_other_salary_and_wages_amount` decimal(12,2) NOT NULL DEFAULT 0.00 COMMENT 'payroll_other_salaries_and_wages (taxable)',
  `total_tardiness_amount` decimal(12,2) NOT NULL DEFAULT 0.00,
  `gross_amount` decimal(12,2) NOT NULL DEFAULT 0.00,
  `total_non_taxable_amount` decimal(12,2) NOT NULL DEFAULT 0.00 COMMENT 'payroll_other_salaries_and_wages (non-taxable)',
  `total_deduction_amount` decimal(12,2) NOT NULL DEFAULT 0.00,
  `net_amount` decimal(12,2) NOT NULL DEFAULT 0.00,
  `employee_id` int(11) NOT NULL COMMENT 'refd to employees.id',
  `user_id` int(11) NOT NULL COMMENT 'refd to users.id',
  `date` date NOT NULL,
  `date_from` date NOT NULL,
  `date_to` date NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NULL DEFAULT current_timestamp(),
  `is_deleted` smallint(1) NOT NULL DEFAULT 0,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

/*Data for the table `payrolls` */

/*Table structure for table `roles` */

DROP TABLE IF EXISTS `roles`;

CREATE TABLE `roles` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(100) NOT NULL,
  `description` text DEFAULT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` timestamp NULL DEFAULT current_timestamp(),
  `is_deleted` smallint(1) NOT NULL DEFAULT 0,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=latin1;

/*Data for the table `roles` */

insert  into `roles`(`id`,`name`,`description`,`created_at`,`updated_at`,`is_deleted`) values 
(1,'Superadministrator','Superadministrator','2019-05-03 14:50:47','2019-09-06 08:31:30',0),
(2,'Administrator','Administrator','2019-05-03 16:40:00','2019-05-07 03:32:45',0),
(3,'Tester','Tester','2019-09-01 09:40:22','2019-09-06 10:16:20',0),
(4,'User','User','2019-09-01 09:44:43','2019-09-01 10:06:40',0),
(5,'Guest','Guest','2019-09-01 10:07:24','2019-09-01 10:11:51',0),
(6,'Checker','Checker','2019-09-02 12:21:54','2019-09-02 12:26:24',0);

/*Table structure for table `sss_contribution_tables` */

DROP TABLE IF EXISTS `sss_contribution_tables`;

CREATE TABLE `sss_contribution_tables` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `compensation_range_from` decimal(12,2) NOT NULL DEFAULT 0.00,
  `compensation_range_to` decimal(12,2) NOT NULL DEFAULT 0.00,
  `monthly_salary_credit` decimal(12,2) NOT NULL DEFAULT 0.00,
  `employer_contribution` decimal(12,2) NOT NULL DEFAULT 0.00,
  `employee_contribution` decimal(12,2) NOT NULL DEFAULT 0.00,
  `total` decimal(12,2) NOT NULL DEFAULT 0.00,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NULL DEFAULT current_timestamp(),
  `is_deleted` smallint(1) NOT NULL DEFAULT 0,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

/*Data for the table `sss_contribution_tables` */

/*Table structure for table `users` */

DROP TABLE IF EXISTS `users`;

CREATE TABLE `users` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `email` varchar(100) NOT NULL,
  `username` varchar(30) NOT NULL,
  `password` varchar(100) NOT NULL,
  `role_id` int(11) NOT NULL COMMENT 'refd to roles.id',
  `created_at` datetime NOT NULL,
  `updated_at` timestamp NULL DEFAULT current_timestamp(),
  `permission_type` smallint(1) NOT NULL DEFAULT 1 COMMENT '1=Role Permissions 2=User Permissions',
  `is_logged` smallint(1) NOT NULL DEFAULT 0 COMMENT '0=No 1=Yes',
  `is_active` smallint(1) NOT NULL DEFAULT 1 COMMENT '0=No 1=Yes',
  `is_deleted` smallint(1) NOT NULL DEFAULT 0,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=18 DEFAULT CHARSET=latin1;

/*Data for the table `users` */

insert  into `users`(`id`,`email`,`username`,`password`,`role_id`,`created_at`,`updated_at`,`permission_type`,`is_logged`,`is_active`,`is_deleted`) values 
(1,'user01@mail.com','user01','$2b$10$gcx8lJNXfJLCj4jF/NCs7eftV71Y69l309n0lQMCP2L8FDDO7HfVW',1,'2019-08-20 11:47:00','2019-09-05 14:49:01',1,1,1,0),
(2,'user02@mail.com','user02','$2b$10$1CCrP/5SE2Jet6fnJkeUteBDutBw8XjsLfxk0R0xHRFTRRhlxfmSy',1,'2019-08-20 15:42:38','2019-09-05 14:49:01',1,1,1,0),
(3,'user03@mail.com','user03','$2b$10$oMXrmPGxRvR9dADNWX4cm.gnkSnkp5R8b7XykIiu0/aENszkQXRqO',1,'2019-08-20 15:42:44','2019-09-05 14:49:01',1,1,1,0),
(4,'user04@mail.com','user04','$2b$10$z053hBCw57WarDaX25gffeg1/lAw5F8DXxAIW6mVNnIROCXJ/PgAG',1,'2019-08-20 15:42:48','2019-09-05 14:49:01',1,1,1,0),
(5,'user05@mail.com','user05','$2b$10$K7iwlPEpZvSk.NptnKkB/.wlTuSG9OiOI.soVUVBa5vAEnWxTlif6',1,'2019-08-21 15:08:05','2019-09-06 12:22:32',1,1,1,0),
(6,'user06@mail.com','user06','$2b$10$Plag8R.TvTpdegDk0wmDC.d99WASEBc43PWDkxo7EHyejdd49QnKO',1,'2019-08-21 15:08:50','2019-09-05 14:49:01',1,1,1,0),
(7,'user07@mail.com','user07','$2b$10$Jq/Gl5B1GFyLhoh6x7Bklu4CpNtZV01xnXcv4cU54mGDNObJmjQqK',1,'2019-08-21 15:13:16','2019-09-05 14:49:01',1,1,1,0),
(8,'user08@mail.com','user08','$2b$10$l1OMnn/pb8hFFcGTdj9mqOBgD0osnebnhoWMBq6vZHwRs/2rLPX0K',2,'2019-08-29 07:46:22','2019-09-05 14:49:01',1,1,1,0),
(9,'user09@mail.com','user09','$2b$10$9td.HdBbahrt5G8oyHyW4.ctsWodDL7Bawz0qOiRqpoDAmfp4eOxC',1,'2019-08-29 07:47:52','2019-09-05 14:49:01',1,1,1,0),
(10,'user10@mail.com','user10','$2b$10$RYyvGJq54PlUXfmcGxzSHeXQRzSHzwLYMbD7HfUqYh9o99jTq.tbG',1,'2019-08-29 07:51:16','2019-09-05 14:49:01',1,1,1,0),
(11,'user11@mail.com','user11','$2b$10$FWiROiqXyJRqwsP.2fqT7.ZhkLSY8N5pgWpqNHPrJ5QnoloolDAh2',1,'2019-08-29 23:42:59','2019-09-05 14:49:01',1,1,1,0),
(12,'user12@mail.com','user12','$2b$10$FQQDnPKWsqBHDcnZAdTA8.u.pr9OLP.MbPt.WulK4Z2tbt7MEkX5C',1,'2019-09-01 07:46:43','2019-09-05 14:49:01',1,1,1,0),
(13,'user13@mail.com','user13','$2b$10$rdI3WpuEo.n25yJny1RJ3uElKUtVCrbjN.yi6hL5zkcEztZC5Bxte',1,'2019-09-01 08:30:21','2019-09-05 14:49:01',1,1,1,0),
(14,'user14@mail.com','User14','$2b$10$0y.TlP2J0SnCa4d1AZEPtuLGwzEt54jBMkN1wV2mdkLD2i7u.QQ8i',3,'2019-09-02 06:49:27','2019-09-05 14:49:01',1,1,1,0),
(15,'user15@mail.com','User15','$2b$10$ccI4C4eWkogVHz06D.hk7.7XPQ3KGR3N0c5QTAdoqncYR1ujnuvI.',5,'2019-09-02 08:55:54','2019-09-05 14:49:01',1,1,1,0),
(16,'user16@mail.com','user16','$2b$10$wOYaizd/Nyq.q/nv1JjlOOmrvvKlEhGR3iXycAkQ.jPgZLzkKh7.C',4,'2019-09-02 10:40:40','2019-09-05 14:49:01',1,1,1,0),
(17,'user17@mail.com','user17','$2b$10$7wEHgH6Or/BL4xL7DlHay.iqqWIaaO2eyqlQmnp1QN7joDCs4m726',3,'2019-09-02 10:59:40','2019-09-05 14:49:01',1,1,1,0);

/*Table structure for table `withholding_tax_tables` */

DROP TABLE IF EXISTS `withholding_tax_tables`;

CREATE TABLE `withholding_tax_tables` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `compensation_range_from` decimal(12,2) NOT NULL DEFAULT 0.00,
  `compensation_range_to` decimal(12,2) NOT NULL DEFAULT 0.00,
  `tax_amount` decimal(12,2) NOT NULL DEFAULT 0.00,
  `tax_percentage` int(3) NOT NULL,
  `pay_frequency_id` int(11) NOT NULL COMMENT 'refd to pay_frequencies.id',
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NULL DEFAULT current_timestamp(),
  `is_deleted` smallint(1) NOT NULL DEFAULT 0,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

/*Data for the table `withholding_tax_tables` */

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;
