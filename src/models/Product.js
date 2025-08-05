const pool = require("../configs/db");
const table = "products";
exports.getAllProducts = async () => {
  const { rows } = await pool.query(`SELECT * FROM ${table}`);
  return rows;
};

exports.getProductById = async (id) => {
  const { rows } = await pool.query(`SELECT * FROM ${table} WHERE id = $1`, [
    id,
  ]);
  return rows[0];
};

exports.createProduct = async (name, price, image) => {
  const { rows } = await pool.query(
    `INSERT INTO ${table} (name, price, image) VALUES ($1, $2, $3) RETURNING *`,
    [name, price, image]
  );
  return rows[0];
};

exports.updateProduct = async (id, name, price, image) => {
  const { rows } = await pool.query(
    `UPDATE ${table} SET name = $1, price = $2, image = $3 WHERE id = $4 RETURNING *`,
    [name, price, image, id]
  );
  return rows[0];
};

exports.deleteProductById = async (id) => {
  const { rows } = await pool.query(
    `DELETE FROM ${table} WHERE id = $1 RETURNING *`,
    [id]
  );
  return rows[0];
};
