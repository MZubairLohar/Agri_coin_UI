// "use client";
// import React, { useEffect } from "react";
// import { useSearchParams } from "next/navigation";
// import axios from "axios";
// import Link from "next/link";
// const success = () => {
//   const searchParams = useSearchParams();
//   const sessionId = searchParams.get("session_id");

//   useEffect(() => {
//     if (sessionId) {
//       axios
//         .get(`/api/stripe-session?session_id=${sessionId}`)
//         .then(async (res) => {
//           const session = res.data.session;
//           console.log(
//             session.metadata.id,
//             session.metadata.gramRate,
//             session.metadata.amount,
//             session.metadata.paymentMethod,
//             session.metadata.tokenQuantity,
//             session.metadata.tokenType,
//             session.metadata.type,
//             session.metadata.paymentType,
//             session.metadata.status,
//             session.metadata.from,
//             "sessiondata"
//           );
//           // Send session metadata to your DB API
//           const sendResponse = await axios.post("/api/send-paymentDetail", {
//             id: session.metadata.id,
//             gramRate: session.metadata.gramRate,
//             amount: session.metadata.amount,
//             paymentMethod: session.metadata.paymentMethod,
//             tokenQuantity: session.metadata.tokenQuantity,
//             tokenType: session.metadata.tokenType,
//             type: session.metadata.type,
//             paymentType: session.metadata.paymentType,
//             status: session.metadata.status,
//             from: session.metadata.from,
//           });
//           console.log("data send Successfully", sendResponse);
//         });
//     }
//   }, [sessionId]);
//   return (
//     <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4">
//       <div className="bg-white rounded-2xl shadow-xl p-8 max-w-md w-full text-center">
//         <div className="text-green-500 text-5xl mb-4">✅</div>
//         <h1 className="text-2xl font-bold text-gray-800 mb-2">
//           Payment Successful!
//         </h1>
//         <p className="text-gray-600 mb-6">
//           Your payment has been processed successfully. Thank you for your
//           purchase.
//         </p>
//         <Link
//           href="/dashboard/user"
//           className="inline-block bg-green-600 hover:bg-green-700 text-white font-medium py-2 px-6 rounded-full transition"
//         >
//           Go to Dashboard
//         </Link>
//       </div>
//     </div>
//   );
// };

// export default success;
"use client";
import React, { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import axios from "axios";
import Link from "next/link";

const Success = () => {
  const searchParams = useSearchParams();
  const sessionId = searchParams.get("session_id");

  const [isSending, setIsSending] = useState(true); // initially true → button disabled

  useEffect(() => {
    const sendData = async () => {
      try {
        if (sessionId) {
          const res = await axios.get(
            `/api/stripe/stripe-session?session_id=${sessionId}`
          );
          const session = res.data.session;

          console.log("Session metadata", session.metadata);

          // Post data to DB
          const response = await axios.post("/api/investor/buyNFT", {
            recordId: session.metadata.recordId,
            userId: session.metadata.userId,
            tokenId: session.metadata.tokenId,
            status: session.metadata.status,
            from: session.metadata.from,
            amount: session.metadata.amount,

            type: session.metadata.type,
            paymentType: session.metadata.paymentType,
          });
          let tokenId = session.metadata.tokenId;
          let recordId = session.metadata.recordId;
          const data = await response.json();
          if (data && type === "preHarvest") {
            const res = await fetch("/api/farmer/preHarvest/updateRequest", {
              method: "PUT",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                recordId,
                status: "investmentPending",
                tokenId,
              }),
            });

            if (!res.ok) {
              throw new Error(`Failed to update: ${res.statusText}`);
            }

            const data = await res.json();
            console.log("✅ Status Update Response:", data);
          } else if (data && type === "postHarvest") {
            const res = await fetch("/api/farmer/postHarvest/updateRequest", {
              method: "PUT",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                recordId,
                status: "investmentPending",
                tokenId,
              }),
            });
            const data = await res.json();
            console.log("✅ Status Update Response:", data);
          }
        }
      } catch (err) {
        console.error("Error sending payment data:", err);
      } finally {
        setIsSending(false); // ✅ Enable button once data is sent
      }
    };

    sendData();
  }, [sessionId]);

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4">
      <div className="bg-white rounded-2xl shadow-xl p-8 max-w-md w-full text-center">
        <div className="text-green-500 text-5xl mb-4">✅</div>
        <h1 className="text-2xl font-bold text-gray-800 mb-2">
          Payment Successful!
        </h1>
        <p className="text-gray-600 mb-6">
          Your payment has been processed successfully. Thank you for your
          purchase.
        </p>

        <Link
          href="/investordash"
          className={`inline-block font-medium py-2 px-6 rounded-full transition ${
            isSending
              ? "bg-gray-400 text-white cursor-not-allowed"
              : "bg-green-600 hover:bg-green-700 text-white"
          }`}
          aria-disabled={isSending}
          onClick={(e) => {
            if (isSending) e.preventDefault(); // block navigation if still sending
          }}
        >
          {isSending ? "Saving your data..." : "Go to Dashboard"}
        </Link>
      </div>
    </div>
  );
};

export default Success;
