import React from "react";
import { loadStripe } from "@stripe/stripe-js";

const stripePromise = loadStripe("pk_test_51Q8UHDFzgTtI20YVFJZsBXWfEr106wPK9TQExzYXPxUKs72yQWsypwy9QjElIqGWy3MeL21gLS7RThtFnTacRPYv00pNFegnzw"); 

const PaymentComponent = ({ onPaymentSuccess }) => {
  const handlePayment = async () => {
    const stripe = await stripePromise;

    // Call your backend to create a checkout session
    const response = await fetch("http://localhost:5000/create-checkout-session", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        // Include any required data here
      }),
    });

    const session = await response.json();

    // Redirect to Checkout
    const result = await stripe.redirectToCheckout({
      sessionId: session.id,
    });

    if (result.error) {
      alert(result.error.message);
    }
  };

  return (
    <div>
      <h2>Complete your payment</h2>
      <button onClick={handlePayment} className="bg-blue-500 text-white py-2 px-4 rounded-lg">
        Pay with Stripe
      </button>
    </div>
  );
};

export default PaymentComponent;
