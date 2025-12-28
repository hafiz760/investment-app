"use client";

import React from "react";
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
import { useForgotPasswordMutation } from "@/lib/services/authApi";
import { ChevronLeft } from "lucide-react";

import { useRouter } from "next/navigation";

const forgotPasswordSchema = z.object({
  email: z.string().email({ message: "Invalid email address" }),
});

type ForgotPasswordFormValues = z.infer<typeof forgotPasswordSchema>;

export default function ForgotPasswordPage() {
  const router = useRouter();
  const [forgotPassword, { isLoading, error, isSuccess }] = useForgotPasswordMutation();

  const form = useForm<ForgotPasswordFormValues>({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: {
      email: "",
    },
  });

  async function onSubmit(data: ForgotPasswordFormValues) {
    try {
      await forgotPassword(data).unwrap();
      // Redirect to OTP verification page
      router.push(`/verify-forgot-otp?email=${encodeURIComponent(data.email)}`);
    } catch (err: any) {
      console.error("Forgot password error:", err);
    }
  }

  return (
    <AuthFormLayout
      title="Forgot Password?"
      subtitle="Enter your email to receive a reset link"
    >
      <div className="space-y-6">
        {isSuccess ? (
          <div className="text-center space-y-4">
            <div className="bg-green-500/10 border border-green-500/20 text-green-400 p-4 rounded-xl text-sm">
              If an account exists for {form.getValues("email")}, you will receive a password reset link shortly.
            </div>
            <Link
              href="/login"
              className="inline-flex items-center gap-2 text-[#D4AF37] hover:underline font-medium text-sm"
            >
              <ChevronLeft className="h-4 w-4" />
              Back to Login
            </Link>
          </div>
        ) : (
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              {error && (
                <div className="bg-red-500/10 border border-red-500/20 text-red-400 p-3 rounded-xl text-xs">
                  {(error as any)?.data?.message || "An error occurred. Please try again."}
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
                        placeholder="name@example.com"
                        className="bg-[#050B14]/50 border-[#D4AF37]/20 text-white focus:border-[#D4AF37] focus:ring-[#D4AF37]/20 rounded-xl"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage className="text-red-400" />
                  </FormItem>
                )}
              />

              <Button
                type="submit"
                disabled={isLoading}
                className="w-full bg-[#D4AF37] hover:bg-[#B8962E] text-[#0F1C2E] font-bold py-6 rounded-xl transition-all shadow-[0_0_20px_rgba(212,175,55,0.2)] disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? "Sending Link..." : "Send Reset Link"}
              </Button>

              <div className="text-center">
                <Link
                  href="/login"
                  className="inline-flex items-center gap-2 text-[#D4AF37] hover:underline font-medium text-sm"
                >
                  <ChevronLeft className="h-4 w-4" />
                  Back to Login
                </Link>
              </div>
            </form>
          </Form>
        )}
      </div>
    </AuthFormLayout>
  );
}
