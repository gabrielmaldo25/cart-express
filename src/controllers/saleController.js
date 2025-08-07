const {
  getSaleByUserId,
  createSale,
  updateSaleStatus,
} = require("../models/SaleModel");

exports.getSaleByUserId = async (req, res, next) => {
  const { id_user } = req.params;
  try {
    const sale = await getSaleByUserId(id_user);
    res.status(200).json(sale);
  } catch (error) {
    next(error);
  }
};

exports.createSale = async (req, res, next) => {
  const { id_user, status, total } = req.body;
  try {
    const sale = await createSale(id_user, status, total);
    res.status(201).json(sale);
  } catch (error) {
    next(error);
  }
};

exports.updateSaleStatus = async (req, res, next) => {
  const { id } = req.params;

  const { status } = req.body;
  try {
    const sale = await updateSaleStatus(id, status);
    res.status(200).json(sale);
  } catch (error) {
    next(error);
  }
};
