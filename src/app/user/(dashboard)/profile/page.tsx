"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useSubmitKyc } from "@/lib/hooks/useAuth";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { LoaderButton } from "@/components/ui/loader-button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import {
  Camera,
  Upload,
  CheckCircle2,
  AlertCircle,
  FileText,
  User as UserIcon,
} from "lucide-react";
import Image from "next/image";

const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
const ACCEPTED_IMAGE_TYPES = ["image/jpeg", "image/jpg", "image/png"];

const kycSchema = z.object({
  profilePic: z
    .any()
    .refine((file) => file instanceof File, "Profile picture is required")
    .refine((file) => file?.size <= MAX_FILE_SIZE, `Max file size is 5MB.`)
    .refine(
      (file) => ACCEPTED_IMAGE_TYPES.includes(file?.type),
      ".jpg, .jpeg and .png files are accepted."
    ),
  cnic_front: z
    .any()
    .refine((file) => file instanceof File, "CNIC front image is required")
    .refine((file) => file?.size <= MAX_FILE_SIZE, `Max file size is 5MB.`)
    .refine(
      (file) => ACCEPTED_IMAGE_TYPES.includes(file?.type),
      ".jpg, .jpeg and .png files are accepted."
    ),
  cnic_back: z
    .any()
    .refine((file) => file instanceof File, "CNIC back image is required")
    .refine((file) => file?.size <= MAX_FILE_SIZE, `Max file size is 5MB.`)
    .refine(
      (file) => ACCEPTED_IMAGE_TYPES.includes(file?.type),
      ".jpg, .jpeg and .png files are accepted."
    ),
});

type KycFormValues = z.infer<typeof kycSchema>;

export default function ProfilePage() {
  const [previews, setPreviews] = useState<{
    profilePic: string | null;
    cnic_front: string | null;
    cnic_back: string | null;
  }>({
    profilePic: null,
    cnic_front: null,
    cnic_back: null,
  });

  const form = useForm<KycFormValues>({
    resolver: zodResolver(kycSchema),
  });

  const kycMutation = useSubmitKyc();

  React.useEffect(() => {
    // Cleanup previews on unmount
    return () => {
      Object.values(previews).forEach((url) => {
        if (url) URL.revokeObjectURL(url);
      });
    };
  }, [previews]);

  const handleFileChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    field: keyof KycFormValues
  ) => {
    const file = e.target.files?.[0];
    if (file) {
      form.setValue(field, file, { shouldValidate: true });
      const objectUrl = URL.createObjectURL(file);
      setPreviews((prev) => ({
        ...prev,
        [field]: objectUrl,
      }));
    }
  };

  const onSubmit = (data: KycFormValues) => {
    const formData = new FormData();
    formData.append("profilePic", data.profilePic);
    formData.append("cnic_front", data.cnic_front);
    formData.append("cnic_back", data.cnic_back);
    kycMutation.mutate(formData);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold text-white tracking-tight">
          Profile & KYC
        </h1>
        <p className="text-gray-400">
          Complete your identity verification to unlock all features.
        </p>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <Card className="bg-[#0F1C2E]/60 border-[#D4AF37]/20 backdrop-blur-xl overflow-hidden shadow-2xl rounded-3xl">
            <CardHeader className="border-b border-white/5 pb-6">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-[#D4AF37]/10 rounded-xl">
                  <UserIcon className="w-5 h-5 text-[#D4AF37]" />
                </div>
                <div>
                  <CardTitle className="text-xl text-white">
                    Identity Verification (KYC)
                  </CardTitle>
                  <CardDescription className="text-gray-400">
                    Please provide clear photos of your documents.
                  </CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="pt-8 space-y-8">
              {/* Profile Picture */}
              <div className="space-y-4">
                <FormLabel className="text-gray-200 font-semibold text-base flex items-center gap-2">
                  <Camera className="w-4 h-4" /> Profile Picture
                </FormLabel>
                <div className="flex items-center gap-6">
                  <div className="relative group">
                    <div className="w-32 h-32 rounded-2xl bg-white/5 border-2 border-dashed border-[#D4AF37]/30 flex items-center justify-center overflow-hidden transition-all group-hover:border-[#D4AF37]/60">
                      {previews.profilePic ? (
                        <Image
                          src={previews.profilePic}
                          alt="Profile Preview"
                          fill
                          className="object-cover"
                        />
                      ) : (
                        <div className="text-center p-4">
                          <Upload className="w-6 h-6 text-gray-500 mx-auto mb-2" />
                          <span className="text-[10px] text-gray-500 font-medium uppercase tracking-wider">
                            Upload
                          </span>
                        </div>
                      )}
                    </div>
                    <Input
                      type="file"
                      accept="image/*"
                      className="absolute inset-0 opacity-0 cursor-pointer"
                      onChange={(e) => handleFileChange(e, "profilePic")}
                    />
                  </div>
                  <div className="flex-1 space-y-2">
                    <h4 className="text-sm font-medium text-white">
                      Your Face Photo
                    </h4>
                    <p className="text-xs text-gray-400 leading-relaxed">
                      Make sure your face is clearly visible. The picture should
                      be brightly lit and not blurry.
                    </p>
                    <FormMessage className="text-red-400 text-xs mt-1">
                      {form.formState.errors.profilePic?.message as string}
                    </FormMessage>
                  </div>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-8">
                {/* CNIC Front */}
                <div className="space-y-4">
                  <FormLabel className="text-gray-200 font-semibold text-base flex items-center gap-2">
                    <FileText className="w-4 h-4" /> CNIC Front
                  </FormLabel>
                  <div className="relative group">
                    <div className="aspect-[1.6/1] rounded-2xl bg-white/5 border-2 border-dashed border-[#D4AF37]/30 flex items-center justify-center overflow-hidden transition-all group-hover:border-[#D4AF37]/60">
                      {previews.cnic_front ? (
                        <Image
                          src={previews.cnic_front}
                          alt="CNIC Front Preview"
                          fill
                          className="object-cover"
                        />
                      ) : (
                        <div className="text-center">
                          <Upload className="w-8 h-8 text-gray-500 mx-auto mb-2" />
                          <p className="text-sm text-gray-400">
                            Click or drag to upload
                          </p>
                          <p className="text-[10px] text-gray-500 mt-1">
                            JPG, PNG up to 5MB
                          </p>
                        </div>
                      )}
                    </div>
                    <Input
                      type="file"
                      accept="image/*"
                      className="absolute inset-0 opacity-0 cursor-pointer"
                      onChange={(e) => handleFileChange(e, "cnic_front")}
                    />
                  </div>
                  <FormMessage className="text-red-400 text-xs mt-1">
                    {form.formState.errors.cnic_front?.message as string}
                  </FormMessage>
                </div>

                {/* CNIC Back */}
                <div className="space-y-4">
                  <FormLabel className="text-gray-200 font-semibold text-base flex items-center gap-2">
                    <FileText className="w-4 h-4" /> CNIC Back
                  </FormLabel>
                  <div className="relative group">
                    <div className="aspect-[1.6/1] rounded-2xl bg-white/5 border-2 border-dashed border-[#D4AF37]/30 flex items-center justify-center overflow-hidden transition-all group-hover:border-[#D4AF37]/60">
                      {previews.cnic_back ? (
                        <Image
                          src={previews.cnic_back}
                          alt="CNIC Back Preview"
                          fill
                          className="object-cover"
                        />
                      ) : (
                        <div className="text-center">
                          <Upload className="w-8 h-8 text-gray-500 mx-auto mb-2" />
                          <p className="text-sm text-gray-400">
                            Click or drag to upload
                          </p>
                          <p className="text-[10px] text-gray-500 mt-1">
                            JPG, PNG up to 5MB
                          </p>
                        </div>
                      )}
                    </div>
                    <Input
                      type="file"
                      accept="image/*"
                      className="absolute inset-0 opacity-0 cursor-pointer"
                      onChange={(e) => handleFileChange(e, "cnic_back")}
                    />
                  </div>
                  <FormMessage className="text-red-400 text-xs mt-1">
                    {form.formState.errors.cnic_back?.message as string}
                  </FormMessage>
                </div>
              </div>

              <div className="bg-[#D4AF37]/5 border border-[#D4AF37]/20 p-4 rounded-2xl flex items-start gap-3">
                <AlertCircle className="w-5 h-5 text-[#D4AF37] shrink-0 mt-0.5" />
                <div className="text-xs text-gray-400 leading-relaxed">
                  <strong className="text-gray-300 block mb-1">
                    Upload Requirements:
                  </strong>
                  Photos must be clear, well-lit, and all edges of the document
                  must be visible. Your data is encrypted and handled securely
                  according to our privacy policy.
                </div>
              </div>

              <LoaderButton
                type="submit"
                loading={kycMutation.isPending}
                loadingText="Submitting KYC..."
                className="w-full bg-[#D4AF37] hover:bg-[#B8962E] text-[#0F1C2E] font-bold py-7 rounded-2xl transition-all shadow-[0_0_25px_rgba(212,175,55,0.2)] text-lg"
              >
                Submit KYC Application
              </LoaderButton>
            </CardContent>
          </Card>
        </form>
      </Form>
    </div>
  );
}
