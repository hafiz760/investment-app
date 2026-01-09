"use client";

import React, { Suspense } from "react";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { AuthFormLayout } from "@/components/layout/AuthFormLayout";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useSearchParams, useRouter } from "next/navigation";
import { ChevronLeft } from "lucide-react";
import { useState, useEffect } from "react";
import { useVerifyOtp, useResendOtp } from "@/lib/hooks/useAuth"; // Import useResendOtp
import { LoaderButton } from "@/components/ui/loader-button";

const verifyOtpSchema = z.object({
  email: z.string().email({ message: "Invalid email address" }),
  otp: z.string().length(6, { message: "OTP must be exactly 6 characters" }),
});

type VerifyOtpFormValues = z.infer<typeof verifyOtpSchema>;

function VerifyOtpContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const emailParam = searchParams.get("email") || "";

  const [timer, setTimer] = useState(60); // Start with 60 seconds timer

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

  const verifyOtpMutation = useVerifyOtp();
  const resendOtpMutation = useResendOtp();

  async function onSubmit(data: VerifyOtpFormValues) {
    console.log(data);
    try {
      verifyOtpMutation.mutate(data);
    } catch (err: any) {
      console.error("Verification error:", err);
    }
  }

  const handleResend = () => {
    if (timer > 0 || resendOtpMutation.isPending) return;
    resendOtpMutation.mutate(
      {
        email: emailParam,
        type: "REGISTRATION",
      },
      {
        onSuccess: () => {
          setTimer(60);
        },
      }
    );
  };

  return (
    <AuthFormLayout
      title="Verify Account"
      subtitle="Enter the 6-digit code sent to your email"
    >
      <div className="space-y-6">
        {verifyOtpMutation.isSuccess ? (
          <div className="text-center space-y-4">
            <div className="bg-green-500/10 border border-green-500/20 text-green-400 p-4 rounded-xl text-sm">
              Account verified successfully! Redirecting to login...
            </div>
          </div>
        ) : (
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="otp"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-gray-300">
                      Verification Code (OTP)
                    </FormLabel>
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
                <LoaderButton
                  type="submit"
                  loading={verifyOtpMutation.isPending}
                  loadingText="Verifying..."
                  className="w-full bg-[#D4AF37] hover:bg-[#B8962E] text-[#0F1C2E] font-bold py-6 rounded-xl transition-all shadow-[0_0_20px_rgba(212,175,55,0.2)]"
                >
                  Verify OTP
                </LoaderButton>

                <div className="text-center text-sm text-gray-400">
                  {timer > 0 ? (
                    `Resend code in ${timer}s`
                  ) : (
                    <>
                      Didn't receive code?{" "}
                      <button
                        type="button"
                        onClick={handleResend}
                        disabled={resendOtpMutation.isPending}
                        className="text-[#D4AF37] hover:text-[#B8962E] hover:underline disabled:text-gray-500 disabled:cursor-not-allowed font-medium transition-colors"
                      >
                        {resendOtpMutation.isPending ? "Sending..." : "Resend"}
                      </button>
                    </>
                  )}
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
    <Suspense
      fallback={
        <div className="min-h-screen bg-[#050B14] flex items-center justify-center text-white">
          Loading...
        </div>
      }
    >
      <VerifyOtpContent />
    </Suspense>
  );
}
