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

import { useRegisterMutation } from "@/lib/services/authApi";
import { useRouter } from "next/navigation";

const signupSchema = z.object({
  firstName: z.string().min(2, { message: "First name is too short" }),
  lastName: z.string().min(2, { message: "Last name is too short" }),
  email: z.string().email({ message: "Invalid email address" }),
  username: z.string().min(3, { message: "Username must be at least 3 characters" }),
  password: z.string().min(8, { message: "Password must be at least 8 characters" }),
  phone: z.string().min(10, { message: "Enter a valid phone number" }),
  userType: z.string(),
});

type SignupFormValues = z.infer<typeof signupSchema>;

export default function SignupPage() {
  const router = useRouter();
  const [register, { isLoading, error }] = useRegisterMutation();
  
  const form = useForm<SignupFormValues>({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      username: "",
      password: "",
      phone: "",
      userType: "USER",
    },
  });

  async function onSubmit(data: SignupFormValues) {
    try {
      // Hardcoding userType as USER as requested
      const payload = { ...data, userType: "USER" };
      const response = await register(payload).unwrap();
      console.log("Signup success:", response);
      // Logic for successful registration (e.g., redirect or success message)
      router.push(`/verify-otp?email=${encodeURIComponent(data.email)}`);
    } catch (err: any) {
      console.error("Signup error:", err);
    }
  }

  return (
    <AuthFormLayout
      title="Create Account"
      subtitle="Join InvestaX and start your investment journey"
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          {error && (
            <div className="bg-red-500/10 border border-red-500/20 text-red-400 p-3 rounded-xl text-xs">
              {(error as any)?.data?.message || "An error occurred during registration."}
            </div>
          )}
          
          <div className="grid grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="firstName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-gray-300">First Name</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="John"
                      className="bg-[#050B14]/50 border-[#D4AF37]/20 text-white focus:border-[#D4AF37] h-11 rounded-xl"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage className="text-red-400 text-xs" />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="lastName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-gray-300">Last Name</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Doe"
                      className="bg-[#050B14]/50 border-[#D4AF37]/20 text-white focus:border-[#D4AF37] h-11 rounded-xl"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage className="text-red-400 text-xs" />
                </FormItem>
              )}
            />
          </div>

          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-gray-300">Email Address</FormLabel>
                <FormControl>
                  <Input
                    placeholder="name@example.com"
                    className="bg-[#050B14]/50 border-[#D4AF37]/20 text-white focus:border-[#D4AF37] h-11 rounded-xl"
                    {...field}
                  />
                </FormControl>
                <FormMessage className="text-red-400 text-xs" />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-gray-300">Username</FormLabel>
                <FormControl>
                  <Input
                    placeholder="johndoe123"
                    className="bg-[#050B14]/50 border-[#D4AF37]/20 text-white focus:border-[#D4AF37] h-11 rounded-xl"
                    {...field}
                  />
                </FormControl>
                <FormMessage className="text-red-400 text-xs" />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-gray-300">Password</FormLabel>
                <FormControl>
                  <Input
                    type="password"
                    placeholder="••••••••"
                    className="bg-[#050B14]/50 border-[#D4AF37]/20 text-white focus:border-[#D4AF37] h-11 rounded-xl"
                    {...field}
                  />
                </FormControl>
                <FormMessage className="text-red-400 text-xs" />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="phone"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-gray-300">Phone Number</FormLabel>
                <FormControl>
                  <Input
                    placeholder="+1 (555) 000-0000"
                    className="bg-[#050B14]/50 border-[#D4AF37]/20 text-white focus:border-[#D4AF37] h-11 rounded-xl"
                    {...field}
                  />
                </FormControl>
                <FormMessage className="text-red-400 text-xs" />
              </FormItem>
            )}
          />

          {/* Hidden userType field */}
          <input type="hidden" {...form.register("userType")} />

          <Button
            type="submit"
            disabled={isLoading}
            className="w-full bg-[#D4AF37] hover:bg-[#B8962E] text-[#0F1C2E] font-bold py-6 rounded-xl transition-all shadow-[0_0_20px_rgba(212,175,55,0.2)] mt-4 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? "Creating Account..." : "Create Account"}
          </Button>

          <div className="text-center text-sm text-gray-400 mt-6 pb-2">
            Already have an account?{" "}
            <Link
              href="/login"
              className="text-[#D4AF37] hover:underline font-medium"
            >
              Log in
            </Link>
          </div>
        </form>
      </Form>
    </AuthFormLayout>
  );
}
