/* Replace with your SQL commands */
ALTER TABLE
  "Product"
ADD
  CONSTRAINT fk_category_product FOREIGN KEY (categoryId) REFERENCES "Category"(id) ON DELETE CASCADE ON UPDATE CASCADE;
