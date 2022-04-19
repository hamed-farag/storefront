/* Replace with your SQL commands */
ALTER TABLE
  "User"
ADD
  CONSTRAINT email_unique UNIQUE (email);
