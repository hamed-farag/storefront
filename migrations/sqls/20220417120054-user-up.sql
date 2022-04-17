/* Replace with your SQL commands */
CREATE TABLE "User" (
  id uuid NOT NULL,
  firstName varchar(50) NOT NULL,
  lastName varchar(50) NOT NULL,
  email varchar(254) NOT NULL,
  gender varchar(6) NOT NULL,
  password varchar(255) NOT NULL,
  PRIMARY KEY (id)
);
