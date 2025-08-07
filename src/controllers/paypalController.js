const paypal = require("../configs/paypal");
const { updateSaleStatus } = require("../models/SaleModel");
exports.createPayment = (req, res, next) => {
  const create_payment_json = {
    intent: "sale",
    payer: {
      payment_method: "paypal",
    },
    redirect_urls: {
      return_url: "http://return.url",
      cancel_url: "http://cancel.url",
    },
    transactions: [
      {
        item_list: {
          items: req.body.items,
        },
        amount: {
          currency: "USD",
          total: req.body.total,
        },
        description: "This is the payment structure with paypal",
      },
    ],
  };
  paypal.payment.create(create_payment_json, async function (error, payment) {
    if (error) {
      next(error);
    } else {
      res.status(200).json({ payment });
    }
  });
};

exports.executePayment = async (req, res, next) => {
  const { paymentId, PayerID } = req.query;
  const { id_sale } = req.params;
  const execute_payment_json = {
    payer_id: PayerID,
    transactions: [{ amount: { currency: "USD", total: req.query.total } }],
  };
  paypal.payment.execute(
    paymentId,
    execute_payment_json,
    async (error, payment) => {
      if (error) {
        next(error);
      } else {
        try {
          await updateSaleStatus("Completed", id_sale);
          console.log("Completed");
          res.status(200).json({ payment });
        } catch (error) {
          next(error);
        }
      }
    }
  );
};
