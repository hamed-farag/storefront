/* Replace with your SQL commands */
CREATE TYPE statusType AS ENUM ('active', 'complete', 'canceled');

CREATE TABLE "Order" (
  id uuid NOT NULL,
  productId uuid NOT NULL,
  quantity INTEGER DEFAULT 1,
  userId uuid NOT NULL,
  status statusType NOT NULL,
  PRIMARY KEY (id),
  FOREIGN KEY (productId) REFERENCES "Product"(id) ON DELETE CASCADE ON UPDATE CASCADE,
  FOREIGN KEY (userId) REFERENCES "User"(id) ON DELETE CASCADE ON UPDATE CASCADE
);
