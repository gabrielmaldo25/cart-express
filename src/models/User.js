const pool = require("../configs/db");

exports.getRolByUserId = async (idSupabase) => {
  const { rows } = await pool(
    "SELECT role FROM users where id_auth_supabase = $1",
    [idSupabase]
  );
  return rows[0]?.role;
};
