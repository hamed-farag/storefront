/* Replace with your SQL commands */
CREATE TABLE "Order_Products" (
  id uuid NOT NULL,
  orderId uuid NOT NULL,
  productId uuid NOT NULL,
  quantity INTEGER DEFAULT 1,
  PRIMARY KEY (id),
  FOREIGN KEY (orderId) REFERENCES "Order"(id) ON DELETE CASCADE ON UPDATE CASCADE,
  FOREIGN KEY (productId) REFERENCES "Product"(id) ON DELETE CASCADE ON UPDATE CASCADE
);
