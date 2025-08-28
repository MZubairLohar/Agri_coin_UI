import { NextResponse } from "next/server";

const stripe = require("stripe")(
  "sk_test_51Q47vSG124FIRgpMYy2XfP1PthkORGJdpoYLHnLtq8YZsD3YkyckDXIh2cKas6JwxGvHgVU3oFuHfunyaK5qUqtL00cIlfws6N"
);

export async function POST(req) {
  const { recordId, userId, tokenId, status, from, amount, type, paymentType } =
    await req.json();

  console.log("stripeCheckoutData", {
    recordId,
    userId,
    tokenId,
    status,
    from,
    amount,
    type,
    paymentType,
  });

  const session = await stripe.checkout.sessions.create({
    success_url:
      "http://localhost:3000/investordash/success?session_id={CHECKOUT_SESSION_ID}",
    cancel_url: "http://example.com/cancel",
    line_items: [
      {
        price_data: {
          currency: "usd",
          product_data: {
            name: `Purchase of NFT Id: ${tokenId} `,
            description: `Amount: ${amount} USD - Type: ${type} - Payment Method: ${paymentType}`,
          },
          unit_amount: parseInt(amount) * 100,
        },
        quantity: 1,
      },
    ],
    mode: "payment",
    metadata: {
      recordId: recordId,
      userId: userId,
      tokenId: tokenId,
      status: status,
      from: from,
      amount: amount,
      type: type,
      paymentType: paymentType,
    },
  });

  return NextResponse.json({
    message: session,
  });
}
