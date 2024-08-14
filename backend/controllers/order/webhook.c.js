const stripe = require('../../config/stripe')

const endpointSecret = process.env.STRIPE_ENDPOINT_WEBHOOK;

const webhookController = async(req, res) => {
    const sig = req.headers['stripe-signature'];

    const payloadString = JSON.stringify(req.body)

    let event;

    const header = stripe.webhooks.generateTestHeaderString({
        payload: payloadString,
        secret : endpointSecret,
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
          const lineItems = await stripe.checkout.session.listLineItems(session.id)
          // Then define and call a function to handle the event payment_intent.succeeded
          break;
        // ... handle other event types
        default:
          console.log(`Unhandled event type ${event.type}`);
      }

    res.status(200).send();
    
}

module.exports = webhookController