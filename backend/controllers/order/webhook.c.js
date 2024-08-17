const stripe = require('../../config/stripe');
const orderModel = require('../../models/orderProductModel');
const cartProductModel = require("../../models/cartProductModel")

const endpointSecret = process.env.STRIPE_ENDPOINT_WEBHOOK;

const getLineItems = async (lineItems) => {
  let products = []
  if (lineItems?.data.length) {
    for (const item of lineItems.data) {
      const product = await stripe.products.retrieve(item.price.product)
      const productId = product.metadata.productId;
      const productData = {
        productId: productId,
        name: product.name,
        price: item.price.unit_amount / 100,
        quantity: item.quantity,
        image: product.images
      }
      products.push(productData)
    }
  }
  return products;
}

const webhookController = async (req, res) => {
  const sig = req.headers['stripe-signature'];

  const payloadString = JSON.stringify(req.body)

  let event;

  const header = stripe.webhooks.generateTestHeaderString({
    payload: payloadString,
    secret: endpointSecret,
  });

  try {
    event = stripe.webhooks.constructEvent(payloadString, header, endpointSecret);
  } catch (err) {
    response.status(400).send(`Webhook Error: ${err.message}`);
    return;
  }

  switch (event.type) {
    case 'checkout.session.completed':
      const session = event.data.object;
      const lineItems = await stripe.checkout.sessions.listLineItems(session.id);
      const productDetails = await getLineItems(lineItems);
      // Then define and call a function to handle the event payment_intent.succeeded
      const orderDetails = {
        productDetails: productDetails,
        email: session.customer_details.email,
        userId: session.metadata.userId,
        paymentDetails: {
          paymentId: session.payment_intent,
          payment_method_type: session.payment_method_types,
          payment_status: session.payment_status
        },
        shipping_options : session.shipping_options.map((shipping) => {
          return {...shipping, 
            shipping_amount : shipping.shipping_amount / 100}}),
        totalAmount : session.amount_total / 100
      };
      const order = new orderModel(orderDetails);
      const saveOrder = await order.save();
      if (saveOrder?._id){
        const deleteProductInCart = await cartProductModel.deleteMany({userId : session.metadata.userId, })
      }
      break;
    // ... handle other event types
    default:
      console.log(`Unhandled event type ${event.type}`);
  }

  res.status(200).send();

}

module.exports = webhookController