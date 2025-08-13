const {
  getRolByUserId,
  getUserBySupabaseId,
  createUser,
} = require("../models/UserModel");

exports.getUserBySupabaseId = async (req, res, next) => {
  const { id_auth_supabase } = req.params;
  try {
    const sale = await getUserBySupabaseId(id_auth_supabase);
    res.status(200).json(sale);
  } catch (error) {
    next(error);
  }
};

exports.createUser = async (req, res, next) => {
  const { role, id_auth_supabase, name } = req.body;
  try {
    const user = await createUser(role, id_auth_supabase, name);
    res.status(201).json(user);
  } catch (error) {
    next(error);
  }
};
