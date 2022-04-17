/* Replace with your SQL commands */
CREATE TABLE "Product" (
  id uuid NOT NULL,
  name VARCHAR(255) NOT NULL,
  price NUMERIC NOT NULL,
  categoryId SERIAL NOT NULL,
  PRIMARY KEY (id)
);
