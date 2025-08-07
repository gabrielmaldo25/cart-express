const pool = require("../configs/db");
const table = "sales_details";

exports.getSaleDetailBySaleId = async (id_sale) => {
  const { rows } = await pool.query(
    `SELECT * FROM ${table} WHERE id_sale = $1`,
    [id_sale]
  );
  return rows[0];
};

exports.createSaleDetail = async (
  id_sale,
  id_product,
  description,
  sale_price,
  quantity,
  total
) => {
  const { rows } = await pool.query(
    `INSERT INTO ${table} (id_sale,id_product,description,sale_price,quantity,total) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *`,
    [id_sale, id_product, description, sale_price, quantity, total]
  );
  return rows[0];
};
