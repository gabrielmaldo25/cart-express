const paypal = require("../configs/paypal");
const { updateSaleStatus } = require("../models/SaleModel");
exports.createPayment = (req, res, next) => {
  const { items, total } = req.body;
  const mappedItems = items.map((item) => ({
    name: item.description,
    sku: `SKU-${item.id_product}`,
    price: item.sale_price.toString(),
    currency: "USD",
    quantity: item.quantity,
  }));
  const create_payment_json = {
    intent: "sale",
    payer: {
      payment_method: "paypal",
    },
    redirect_urls: {
      return_url: "http://localhost:5173/pago/success",
      cancel_url: "http://cancel.url",
    },
    transactions: [
      {
        item_list: {
          items: mappedItems,
        },
        amount: {
          currency: "USD",
          total,
        },
        description: "This is the payment structure with paypal",
      },
    ],
  };
  paypal.payment.create(create_payment_json, async function (error, payment) {
    if (error) {
      next(error);
    } else {
      const redirectUrl = payment.links.find(link=> link.rel === 'approval_url').href
      res.status(200).json({ redirectUrl });
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
