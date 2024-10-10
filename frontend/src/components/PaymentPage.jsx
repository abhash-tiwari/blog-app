import React, { useState } from "react";
import PaymentComponent from "./PaymentComponent";

const PaymentPage = () => {
  const [isPaymentSuccessful, setIsPaymentSuccessful] = useState(false);

  const handlePaymentSuccess = async () => {
    setIsPaymentSuccessful(true);

    const blogPost = JSON.parse(localStorage.getItem("blogPost"));

    const token = localStorage.getItem("token");

    try {
      const response = await fetch("http://localhost:5000/api/blogs", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(blogPost),
      });

      if (response.ok) {
        alert("Blog post saved successfully after payment!");
      } else {
        alert("Failed to save the blog post after payment.");
      }
    } catch (error) {
      console.error("Saving after payment failed: ", error);
      alert("An error occurred while saving the blog post.");
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow-lg rounded-lg">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">
        Complete Payment
      </h1>
      {!isPaymentSuccessful ? (
        <PaymentComponent onPaymentSuccess={handlePaymentSuccess} />
      ) : (
        <p>Payment successful! Your blog is being posted...</p>
      )}
    </div>
  );
};

export default PaymentPage;
