const {
  getSaleDetailBySaleId,
  createSaleDetail,
} = require("../models/SaleDetailModel");
const { getSaleByUserId } = require("../models/SaleModel");

exports.getSaleDetailBySaleId = async (req, res, next) => {
  const { id_sale } = req.params;
  try {
    const saleDetail = await getSaleDetailBySaleId(id_sale);
    res.status(200).json(saleDetail);
  } catch (error) {
    next(error);
  }
};

exports.createSaleDetail = async (req, res, next) => {
  const userId = req.params.id_user;
  const { id_product, description, sale_price, quantity, total } = req.body;
  try {
    const sale = await getSaleByUserId(userId);
    if (!sale) {
      return res.status(404).json({ error: "Sale not found" });
    }

    const saleDetail = await createSaleDetail(
      sale.id,
      id_product,
      description,
      sale_price,
      quantity,
      total
    );
    res.status(201).json(saleDetail);
  } catch (error) {
    next(error);
  }
};
