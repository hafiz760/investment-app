"use client";

import { useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner"; // or your toast library

export default function WalletSuccessPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const queryClient = useQueryClient();
  const [isVerifying, setIsVerifying] = useState(true);
  const sessionId = searchParams.get("session_id");

  useEffect(() => {
    const verifyPayment = async () => {
      if (!sessionId) {
        toast.error("Invalid payment session");
        router.push("/wallet");
        return;
      }

      try {
        // Call your backend to verify the payment
        const response = await fetch("/api/wallet/verify-payment", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ sessionId }),
        });

        const data = await response.json();

        if (data.success) {
          // Invalidate wallet queries to refresh balance
          queryClient.invalidateQueries({ queryKey: ["wallet-transactions"] });
          queryClient.invalidateQueries({ queryKey: ["wallet-balance"] });

          toast.success("Payment successful! Your wallet has been credited.");

          // Redirect to wallet after 2 seconds
          setTimeout(() => {
            router.push("/wallet");
          }, 2000);
        } else {
          toast.error("Payment verification failed");
          router.push("/wallet");
        }
      } catch (error) {
        console.error("Payment verification error:", error);
        toast.error("Failed to verify payment");
        router.push("/wallet");
      } finally {
        setIsVerifying(false);
      }
    };

    verifyPayment();
  }, [sessionId, router, queryClient]);

  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="text-center">
        {isVerifying ? (
          <>
            <div className="mb-4 inline-block h-12 w-12 animate-spin rounded-full border-4 border-solid border-current border-r-transparent"></div>
            <h2 className="text-xl font-semibold">Verifying Payment...</h2>
            <p className="mt-2 text-gray-600">
              Please wait while we confirm your transaction.
            </p>
          </>
        ) : (
          <>
            <div className="mb-4 text-6xl">✅</div>
            <h2 className="text-xl font-semibold">Payment Successful!</h2>
            <p className="mt-2 text-gray-600">Redirecting to your wallet...</p>
          </>
        )}
      </div>
    </div>
  );
}
