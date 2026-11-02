CREATE DATABASE IF NOT EXISTS destination_cafe
  CHARACTER SET utf8mb4
  COLLATE utf8mb4_unicode_ci;

USE destination_cafe;

CREATE TABLE IF NOT EXISTS bookings (
  id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
  customer_name VARCHAR(100) NOT NULL,
  phone VARCHAR(20) NOT NULL,
  booking_date DATE NOT NULL,
  booking_time TIME NOT NULL,
  guests TINYINT UNSIGNED NOT NULL,
  special_request VARCHAR(500) NULL,
  status ENUM('pending', 'confirmed', 'cancelled') NOT NULL DEFAULT 'pending',
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (id),
  INDEX idx_booking_date (booking_date),
  INDEX idx_booking_status (status)
);
