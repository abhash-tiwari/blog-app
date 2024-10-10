import express from "express";
import Stripe from "stripe";

const router = express.Router();
const stripe = new Stripe(
  "sk_test_51Q8UHDFzgTtI20YVbxi5OwUU7PnhpDeusj4Hg4b4OkXWtY8PCSwbfTMlmXDXtAyyGffSERcAkoKJcmWkYNPQRDTu00kySut2fc"
);

router.post("/", async (req, res) => {
  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: [
        {
          price_data: {
            currency: "usd",
            product_data: {
              name: "Blog Posting Fee",
            },
            unit_amount: 500,
          },
          quantity: 1,
        },
      ],
      mode: "payment",
      success_url: "http://localhost:3000/payment?success=true", // Success URL
      cancel_url: "http://localhost:3000/payment?cancel=true", // Cancel URL
    });

    res.json({ id: session.id }); // Respond with the session ID
  } catch (error) {
    console.error("Error creating checkout session", error);
    res.status(500).json({ error: "Failed to create session" });
  }
});

export default router;
