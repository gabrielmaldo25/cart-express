const supabase = require("../configs/supabase");
const users = require("../models/User");

exports.signUpNewEmail = async (req, res) => {
  const { email, password } = req.body;
  const { data, error } = await supabase.auth.signUp({ email, password });
  if (error) {
    return res.status(400).json({ error: error.stack });
  }
  return res.status(200).json({ user: data.user });
}; 

exports.signIn = async (req, res) => {
  const { email, password } = req.body;
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });
  if (error) {
    return res.status(400).json({ error: error.stack });
  }
  return res.status(200).json({ session: data.session });
};
