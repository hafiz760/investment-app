"use client";

import React, { Suspense } from "react";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { AuthFormLayout } from "@/components/layout/AuthFormLayout";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useVerifyOtpMutation, useResendOtpMutation } from "@/lib/services/authApi";
import { useSearchParams, useRouter } from "next/navigation";
import { ChevronLeft } from "lucide-react";
import { useState, useEffect } from "react";

const verifyOtpSchema = z.object({
  email: z.string().email({ message: "Invalid email address" }),
  otp: z.string().length(6, { message: "OTP must be exactly 6 characters" }),
});

type VerifyOtpFormValues = z.infer<typeof verifyOtpSchema>;

function VerifyOtpContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const emailParam = searchParams.get("email") || "";
  
  const [verifyOtp, { isLoading, error, isSuccess }] = useVerifyOtpMutation();
  const [resendOtp, { isLoading: isResending }] = useResendOtpMutation();
  const [timer, setTimer] = useState(0);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (timer > 0) {
      interval = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [timer]);

  const form = useForm<VerifyOtpFormValues>({
    resolver: zodResolver(verifyOtpSchema),
    defaultValues: {
      email: emailParam,
      otp: "",
    },
  });

  async function onSubmit(data: VerifyOtpFormValues) {
    try {
      await verifyOtp(data).unwrap();
      // Logic for successful verification (e.g., redirect to login or dashboard)
      setTimeout(() => {
        router.push("/login");
      }, 2000);
    } catch (err: any) {
      console.error("Verification error:", err);
    }
  }

  const handleResend = async () => {
    if (timer > 0 || isResending) return;
    try {
      await resendOtp({ email: emailParam, type: "REGISTRATION" }).unwrap();
      setTimer(60);
      alert("Verification code resent successfully!");
    } catch (err: any) {
      console.error("Resend error:", err);
      alert(err?.data?.message || "Failed to resend OTP. Please try again.");
    }
  };

  return (
    <AuthFormLayout
      title="Verify Account"
      subtitle="Enter the 6-digit code sent to your email"
    >
      <div className="space-y-6">
        {isSuccess ? (
          <div className="text-center space-y-4">
            <div className="bg-green-500/10 border border-green-500/20 text-green-400 p-4 rounded-xl text-sm">
              Account verified successfully! Redirecting to login...
            </div>
          </div>
        ) : (
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              {error && (
                <div className="bg-red-500/10 border border-red-500/20 text-red-400 p-3 rounded-xl text-xs">
                  {(error as any)?.data?.message || "Invalid OTP. Please try again."}
                </div>
              )}

              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-gray-300">Email Address</FormLabel>
                    <FormControl>
                      <Input
                        readOnly
                        className="bg-[#050B14]/30 border-[#D4AF37]/10 text-gray-500 h-11 rounded-xl cursor-not-allowed"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage className="text-red-400" />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="otp"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-gray-300">Verification Code (OTP)</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="000000"
                        maxLength={6}
                        className="bg-[#050B14]/50 border-[#D4AF37]/20 text-white focus:border-[#D4AF37] h-12 text-center text-2xl tracking-[0.5em] font-bold rounded-xl"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage className="text-red-400" />
                  </FormItem>
                )}
              />

              <div className="space-y-3">
                <Button
                  type="submit"
                  disabled={isLoading}
                  className="w-full bg-[#D4AF37] hover:bg-[#B8962E] text-[#0F1C2E] font-bold py-6 rounded-xl transition-all shadow-[0_0_20px_rgba(212,175,55,0.2)] disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isLoading ? "Verifying..." : "Verify OTP"}
                </Button>

                <div className="text-center">
                  <button
                    type="button"
                    onClick={handleResend}
                    disabled={timer > 0 || isResending}
                    className="text-sm text-[#D4AF37] hover:text-[#B8962E] disabled:text-gray-500 disabled:cursor-not-allowed font-medium transition-colors"
                  >
                    {timer > 0 ? `Resend code in ${timer}s` : "Didn't receive code? Resend"}
                  </button>
                </div>
              </div>

              <div className="text-center">
                <Link
                  href="/signup"
                  className="inline-flex items-center gap-2 text-[#D4AF37] hover:underline font-medium text-sm"
                >
                  <ChevronLeft className="h-4 w-4" />
                  Back to Signup
                </Link>
              </div>
            </form>
          </Form>
        )}
      </div>
    </AuthFormLayout>
  );
}

export default function VerifyOtpPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#050B14] flex items-center justify-center text-white">Loading...</div>}>
      <VerifyOtpContent />
    </Suspense>
  );
}
