const pool = require("../configs/db");
const table = "users";

exports.getRolByUserId = async (id_auth_supabase) => {
  const { rows } = await pool.query(
    "SELECT role FROM users where id_auth_supabase = $1",
    [id_auth_supabase]
  );
  return rows[0]?.role;
};

exports.getUserBySupabaseId = async (id_auth_supabase) => {
  const { rows } = await pool.query(
    "SELECT * FROM users where id_auth_supabase = $1",
    [id_auth_supabase]
  );
  return rows[0];
};

exports.createUser = async (role, id_auth_supabase, name) => {
  const { rows } = await pool.query(
    `INSERT INTO ${table} (role, id_auth_supabase, name) VALUES ($1, $2, $3) RETURNING *`,
    [role, id_auth_supabase, name]
  );
  return rows[0];
};
