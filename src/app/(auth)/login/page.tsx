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

import { useLoginMutation } from "@/lib/services/authApi";

const loginSchema = z.object({
  email: z.string().email({ message: "Invalid email address" }),
  password: z.string().min(8, { message: "Password must be at least 8 characters" }),
  userType: z.string(),
});

type LoginFormValues = z.infer<typeof loginSchema>;

export default function LoginPage() {
  const [login, { isLoading, error }] = useLoginMutation();

  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
      userType: "USER",
    },
  });

  async function onSubmit(data: LoginFormValues) {
    try {
      // Hardcoding userType as USER as requested
      const payload = { ...data, userType: "USER" };
      const response = await login(payload).unwrap();
      console.log("Login success:", response);
      alert("Login successful!");
    } catch (err: any) {
      console.error("Login error:", err);
    }
  }

  return (
    <AuthFormLayout
      title="Welcome Back"
      subtitle="Sign in to your account to continue"
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          {error && (
            <div className="bg-red-500/10 border border-red-500/20 text-red-400 p-3 rounded-xl text-xs">
              {(error as any)?.data?.message || "Invalid email or password."}
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

          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <div className="flex items-center justify-between">
                  <FormLabel className="text-gray-300">Password</FormLabel>
                  <Link
                    href="/forgot-password"
                    className="text-xs text-[#D4AF37] hover:underline"
                  >
                    Forgot Password?
                  </Link>
                </div>
                <FormControl>
                  <Input
                    type="password"
                    placeholder="••••••••"
                    className="bg-[#050B14]/50 border-[#D4AF37]/20 text-white focus:border-[#D4AF37] focus:ring-[#D4AF37]/20 rounded-xl"
                    {...field}
                  />
                </FormControl>
                <FormMessage className="text-red-400" />
              </FormItem>
            )}
          />

          {/* Hidden userType field */}
          <input type="hidden" {...form.register("userType")} />

          <Button
            type="submit"
            disabled={isLoading}
            className="w-full bg-[#D4AF37] hover:bg-[#B8962E] text-[#0F1C2E] font-bold py-6 rounded-xl transition-all shadow-[0_0_20px_rgba(212,175,55,0.2)] disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? "Signing In..." : "Sign In"}
          </Button>

          <div className="text-center text-sm text-gray-400 mt-6">
            Don't have an account?{" "}
            <Link
              href="/signup"
              className="text-[#D4AF37] hover:underline font-medium"
            >
              Sign up
            </Link>
          </div>
        </form>
      </Form>
    </AuthFormLayout>
  );
}
