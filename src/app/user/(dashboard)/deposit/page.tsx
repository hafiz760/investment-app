"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { cn } from "@/lib/utils";
import { useWalletDeposit } from "@/lib/hooks/useWallet";
import { DepositRequest } from "@/lib/types/wallet";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Loader2 } from "lucide-react";

const paymentMethods = [
  {
    id: "stripe",
    name: "Stripe",
    image: "/images/payments/stripe.png",
    description:
      "Send form your payment gateway. your bank may charge you a cash advance fee.",
  },
];

// Zod validation schema
const depositFormSchema = z.object({
  amount: z.number().min(1, "Amount is required"),
  currency: z.string().min(1, "Currency is required"),
  paymentMethod: z.string().min(1, "Payment method is required"),
});

type DepositFormValues = z.infer<typeof depositFormSchema>;

export default function DepositPage() {
  const depositMutation = useWalletDeposit();

  const form = useForm<DepositFormValues>({
    resolver: zodResolver(depositFormSchema),
    defaultValues: {
      amount: 0,
      currency: "usd",
      paymentMethod: "stripe",
    },
  });

  const onSubmit = async (data: DepositFormValues) => {
    try {
      const buyData: DepositRequest = {
        amount: data.amount,
      };
      await depositMutation.mutateAsync(buyData);
      form.reset();
    } catch (error) {
      console.error("Deposit failed:", error);
    }
  };

  const isLoading = depositMutation.isPending || form.formState.isSubmitting;

  return (
    <div className="space-y-8 pb-12">
      <div className="flex flex-col gap-1">
        <div className="flex items-center gap-2 text-sm text-gray-400">
          <span>Dashboard</span>
          <span>/</span>
          <span className="text-[#D4AF37] font-medium">Deposit</span>
        </div>
        <h1 className="text-3xl font-bold tracking-tight text-white">
          Deposit
        </h1>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-6">
              <Card className="bg-[#0F1C2E]/60 backdrop-blur-xl border border-[#D4AF37]/20 shadow-2xl overflow-hidden">
                <CardHeader className="bg-white/5 border-b border-white/10">
                  <CardTitle className="text-base font-bold text-white">
                    Select Payment Method
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-6 space-y-4">
                  <FormField
                    control={form.control}
                    name="paymentMethod"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <div className="space-y-4">
                            {paymentMethods.map((method) => (
                              <div
                                key={method.id}
                                onClick={() => field.onChange(method.id)}
                                className={cn(
                                  "flex flex-col md:flex-row items-center gap-6 p-6 rounded-xl border transition-all cursor-pointer relative overflow-hidden",
                                  field.value === method.id
                                    ? "border-[#D4AF37]/50 bg-[#D4AF37]/5 ring-1 ring-[#D4AF37]/20"
                                    : "hover:border-white/20 border-white/10",
                                )}
                              >
                                {field.value === method.id && (
                                  <div className="absolute top-0 right-0 w-1 h-full bg-[#D4AF37]" />
                                )}
                                <div className="h-16 w-16 bg-white/5 border border-white/10 rounded-full flex items-center justify-center overflow-hidden shrink-0 shadow-2xl p-2">
                                  <div className="flex items-center justify-center font-bold text-xs text-[#D4AF37] bg-[#D4AF37]/10 w-full h-full rounded-full">
                                    {method.name.charAt(0)}
                                  </div>
                                </div>
                                <div className="flex-1 text-center md:text-left">
                                  <h3 className="text-lg font-bold mb-1 text-white">
                                    {method.name}
                                  </h3>
                                  <p className="text-sm text-gray-400 leading-relaxed">
                                    {method.description}
                                  </p>
                                </div>
                              </div>
                            ))}
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </CardContent>
              </Card>
            </div>

            {/* Payment Summary Sidebar */}
            <div className="space-y-6">
              <Card className="bg-[#0F1C2E]/60 backdrop-blur-xl border border-[#D4AF37]/20 shadow-2xl sticky top-40 overflow-hidden">
                <CardHeader className="bg-white/5 border-b border-white/10">
                  <CardTitle className="text-base font-bold text-white">
                    Payment Summary
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-6 space-y-6">
                  <FormField
                    control={form.control}
                    name="currency"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-sm font-bold text-gray-300">
                          Select Currency
                        </FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger className="h-12 bg-white/5 border-white/10 rounded-lg text-white">
                              <SelectValue placeholder="Select Currency" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent className="bg-[#0F1C2E] border-[#D4AF37]/20 text-white">
                            <SelectItem value="usd">USD</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="amount"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-sm font-bold text-gray-300">
                          Enter Amount
                        </FormLabel>
                        <FormControl>
                          <Input
                            type="number"
                            placeholder="Enter amount"
                            {...field}
                            onChange={(e) =>
                              field.onChange(
                                e.target.value === ""
                                  ? 0
                                  : parseFloat(e.target.value),
                              )
                            }
                            className="h-12 bg-white/5 border-white/10 rounded-lg text-white placeholder:text-gray-500"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <Button
                    type="submit"
                    disabled={isLoading}
                    className="w-full bg-[#D4AF37] hover:bg-[#B8962E] text-[#0F1C2E] py-8 rounded-lg font-bold text-lg shadow-lg shadow-[#D4AF37]/10 transition-all disabled:opacity-50"
                  >
                    {isLoading ? (
                      <>
                        <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                        Processing...
                      </>
                    ) : (
                      "Make Payment"
                    )}
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </form>
      </Form>
    </div>
  );
}
