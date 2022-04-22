/* Replace with your SQL commands */
CREATE TYPE statusType AS ENUM ('active', 'complete', 'canceled');

CREATE TABLE "Order" (
  id uuid NOT NULL,
  userId uuid NOT NULL,
  status statusType NOT NULL,
  PRIMARY KEY (id),
  FOREIGN KEY (userId) REFERENCES "User"(id) ON DELETE CASCADE ON UPDATE CASCADE
);
