const express = require('express');
const router  = express.Router();
const ctrl    = require('../controllers/checkoutController');
router.get( '/',                    ctrl.getCheckoutPage);
router.post('/process',             ctrl.processCheckout);       // crea orden BD + muestra PayPal
router.post('/create-paypal-order', ctrl.createPayPalOrder);    // crea orden en PayPal API
router.post('/capture-paypal-order',ctrl.capturePayPalOrder);   // captura el pago aprobado
router.get( '/success', async (req, res) => {
  try {
    const { Order } = require('../models');
    const order = await Order.findByPk(parseInt(req.query.orderId));
    if (!order) return res.redirect('/');
    res.render('order-success', { title: 'Pedido Completado', order });
  } catch (err) { res.redirect('/'); }
});
router.get( '/cancel',              ctrl.handleCancelPayment);
module.exports = router;