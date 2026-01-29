"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useSubmitKyc } from "@/lib/hooks/useAuth";
import { useUpdateProfile, useUserProfile } from "@/lib/hooks/useProfile";
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
  AlertCircle,
  FileText,
  User as UserIcon,
  Phone,
  Mail,
  Loader2,
  CheckCircle2,
  Clock,
  XCircle,
} from "lucide-react";
import Image from "next/image";
import { useAppSelector } from "@/lib/store/hooks";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";

const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
const ACCEPTED_IMAGE_TYPES = ["image/jpeg", "image/jpg", "image/png"];

// Profile Update Schema
const profileSchema = z.object({
  firstName: z.string().min(2, "First name must be at least 2 characters"),
  lastName: z.string().min(2, "Last name must be at least 2 characters"),
  username: z.string().min(3, "Username must be at least 3 characters"),
  phone: z.string(),
});

// KYC Schema - Make fields optional if already uploaded
const kycSchema = z.object({
  profilePic: z
    .any()
    .optional()
    .refine((file) => !file || file instanceof File, "Invalid file")
    .refine(
      (file) => !file || file?.size <= MAX_FILE_SIZE,
      `Max file size is 5MB.`,
    )
    .refine(
      (file) => !file || ACCEPTED_IMAGE_TYPES.includes(file?.type),
      ".jpg, .jpeg and .png files are accepted.",
    ),
  cnic_front: z
    .any()
    .optional()
    .refine((file) => !file || file instanceof File, "Invalid file")
    .refine(
      (file) => !file || file?.size <= MAX_FILE_SIZE,
      `Max file size is 5MB.`,
    )
    .refine(
      (file) => !file || ACCEPTED_IMAGE_TYPES.includes(file?.type),
      ".jpg, .jpeg and .png files are accepted.",
    ),
  cnic_back: z
    .any()
    .optional()
    .refine((file) => !file || file instanceof File, "Invalid file")
    .refine(
      (file) => !file || file?.size <= MAX_FILE_SIZE,
      `Max file size is 5MB.`,
    )
    .refine(
      (file) => !file || ACCEPTED_IMAGE_TYPES.includes(file?.type),
      ".jpg, .jpeg and .png files are accepted.",
    ),
});

type ProfileFormValues = z.infer<typeof profileSchema>;
type KycFormValues = z.infer<typeof kycSchema>;
type TabType = "profile" | "kyc";

export default function ProfilePage() {
  const {user } = useAppSelector((state) => state.auth);
  const userId = user?.id;
  const [activeTab, setActiveTab] = useState<TabType>("profile");

  const [previews, setPreviews] = useState<{
    profilePic: string | null;
    cnic_front: string | null;
    cnic_back: string | null;
  }>({
    profilePic: null,
    cnic_front: null,
    cnic_back: null,
  });

  // Fetch user profile
  const { data: userProfile, isLoading: isLoadingProfile } = useUserProfile(
    userId as string,
  );

  // Profile form
  const profileForm = useForm<ProfileFormValues>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      username: "",
      phone: "",
    },
  });

  // KYC form
  const kycForm = useForm<KycFormValues>({
    resolver: zodResolver(kycSchema),
  });

  const kycMutation = useSubmitKyc();
  const updateProfileMutation = useUpdateProfile();

  // Update form when user profile loads
  React.useEffect(() => {
    if (userProfile) {
      profileForm.reset({
        firstName: userProfile?.data?.firstName || "",
        lastName: userProfile?.data?.lastName || "",
        username: userProfile?.data?.username || "",
        phone: userProfile?.data?.phone || "",
      });
    }
  }, [userProfile, profileForm]);

  React.useEffect(() => {
    return () => {
      Object.values(previews).forEach((url) => {
        if (url && url.startsWith("blob:")) URL.revokeObjectURL(url);
      });
    };
  }, [previews]);

  const handleFileChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    field: keyof KycFormValues,
  ) => {
    const file = e.target.files?.[0];
    if (file) {
      kycForm.setValue(field, file, { shouldValidate: true });
      const objectUrl = URL.createObjectURL(file);
      setPreviews((prev) => ({
        ...prev,
        [field]: objectUrl,
      }));
    }
  };

  const onProfileSubmit = (data: ProfileFormValues) => {
    updateProfileMutation.mutate(data);
  };

  const onKycSubmit = (data: KycFormValues) => {
    const formData = new FormData();

    // Only append files that are newly selected
    if (data.profilePic instanceof File) {
      formData.append("profilePic", data.profilePic);
    }
    if (data.cnic_front instanceof File) {
      formData.append("cnic_front", data.cnic_front);
    }
    if (data.cnic_back instanceof File) {
      formData.append("cnic_back", data.cnic_back);
    }

    // Check if at least one file is selected
    if (formData.entries().next().done) {
      kycForm.setError("profilePic", {
        message: "Please upload at least one document to update KYC",
      });
      return;
    }

    kycMutation.mutate(formData);
  };

  // Get KYC status badge
  const getKycStatusBadge = () => {
    const kycApproved = userProfile?.data?.kycApproved;
    const hasKycDocs =
      userProfile?.data?.profilePic || userProfile?.data?.cnic_front;

    if (kycApproved) {
      return (
        <Badge className="bg-green-500/10 text-green-500 border-green-500/20">
          <CheckCircle2 className="w-3 h-3 mr-1" />
          KYC Approved
        </Badge>
      );
    } else if (hasKycDocs) {
      return (
        <Badge className="bg-yellow-500/10 text-yellow-500 border-yellow-500/20">
          <Clock className="w-3 h-3 mr-1" />
          KYC Pending Review
        </Badge>
      );
    } else {
      return (
        <Badge className="bg-red-500/10 text-red-500 border-red-500/20">
          <XCircle className="w-3 h-3 mr-1" />
          KYC Not Submitted
        </Badge>
      );
    }
  };

  // Get image URL (preview or existing)
  const getImageUrl = (field: keyof typeof previews) => {
    if (previews[field]) return previews[field];
    if (field === "profilePic") return userProfile?.data?.profilePic;
    if (field === "cnic_front") return userProfile?.data?.cnic_front;
    if (field === "cnic_back") return userProfile?.data?.cnic_back;
    return null;
  };

  if (isLoadingProfile) {
    return (
      <div className="flex items-center justify-center py-20">
        <Loader2 className="h-6 w-6 animate-spin text-[#D4AF37]" />
        <span className="ml-2 text-gray-400">Loading profile...</span>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto space-y-8 pb-12">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold text-white tracking-tight">
          Profile & KYC
        </h1>
        <p className="text-gray-400">
          Manage your account information and complete identity verification.
        </p>
      </div>

      {/* Tab Navigation */}
      <div className="flex items-center gap-3 bg-[#0F1C2E]/60 backdrop-blur-xl border border-[#D4AF37]/20 rounded-2xl p-2">
        <Button
          variant="ghost"
          onClick={() => setActiveTab("profile")}
          className={cn(
            "flex-1 h-12 rounded-xl font-semibold transition-all",
            activeTab === "profile"
              ? "bg-[#D4AF37] text-[#0F1C2E] hover:bg-[#D4AF37]/90 shadow-lg"
              : "text-gray-400 hover:text-white hover:bg-white/5",
          )}
        >
          <UserIcon className="w-4 h-4 mr-2" />
          Profile Information
        </Button>
        <Button
          variant="ghost"
          onClick={() => setActiveTab("kyc")}
          className={cn(
            "flex-1 h-12 rounded-xl font-semibold transition-all",
            activeTab === "kyc"
              ? "bg-[#D4AF37] text-[#0F1C2E] hover:bg-[#D4AF37]/90 shadow-lg"
              : "text-gray-400 hover:text-white hover:bg-white/5",
          )}
        >
          <FileText className="w-4 h-4 mr-2" />
          KYC Verification
        </Button>
      </div>

      {/* Profile Information Card */}
      {activeTab === "profile" && (
        <Card className="bg-[#0F1C2E]/60 border-[#D4AF37]/20 backdrop-blur-xl overflow-hidden shadow-2xl rounded-3xl animate-in fade-in-50 duration-300">
          <CardHeader className="border-b border-white/5 pb-6">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-[#D4AF37]/10 rounded-xl">
                <UserIcon className="w-5 h-5 text-[#D4AF37]" />
              </div>
              <div>
                <CardTitle className="text-xl text-white">
                  Personal Information
                </CardTitle>
                <CardDescription className="text-gray-400">
                  Update your account details and personal information.
                </CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent className="pt-8">
            <Form {...profileForm}>
              <form
                onSubmit={profileForm.handleSubmit(onProfileSubmit)}
                className="space-y-6"
              >
                <div className="grid md:grid-cols-2 gap-6">
                  {/* First Name */}
                  <FormField
                    control={profileForm.control}
                    name="firstName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-gray-200 font-semibold flex items-center gap-2">
                          <UserIcon className="w-4 h-4" /> First Name
                        </FormLabel>
                        <FormControl>
                          <Input
                            placeholder="John"
                            {...field}
                            className="bg-white/5 border-white/10 text-white placeholder:text-gray-600 focus-visible:ring-[#D4AF37]/50 h-12"
                          />
                        </FormControl>
                        <FormMessage className="text-red-400 text-xs" />
                      </FormItem>
                    )}
                  />

                  {/* Last Name */}
                  <FormField
                    control={profileForm.control}
                    name="lastName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-gray-200 font-semibold flex items-center gap-2">
                          <UserIcon className="w-4 h-4" /> Last Name
                        </FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Doe"
                            {...field}
                            className="bg-white/5 border-white/10 text-white placeholder:text-gray-600 focus-visible:ring-[#D4AF37]/50 h-12"
                          />
                        </FormControl>
                        <FormMessage className="text-red-400 text-xs" />
                      </FormItem>
                    )}
                  />

                  {/* Username */}
                  <FormField
                    control={profileForm.control}
                    name="username"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-gray-200 font-semibold flex items-center gap-2">
                          <Mail className="w-4 h-4" /> Username
                        </FormLabel>
                        <FormControl>
                          <Input
                            placeholder="johndoe"
                            {...field}
                            className="bg-white/5 border-white/10 text-white placeholder:text-gray-600 focus-visible:ring-[#D4AF37]/50 h-12"
                          />
                        </FormControl>
                        <FormMessage className="text-red-400 text-xs" />
                      </FormItem>
                    )}
                  />

                  {/* Phone */}
                  <FormField
                    control={profileForm.control}
                    name="phone"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-gray-200 font-semibold flex items-center gap-2">
                          <Phone className="w-4 h-4" /> Phone Number
                        </FormLabel>
                        <FormControl>
                          <Input
                            placeholder="+1234567890"
                            {...field}
                            className="bg-white/5 border-white/10 text-white placeholder:text-gray-600 focus-visible:ring-[#D4AF37]/50 h-12"
                          />
                        </FormControl>
                        <FormMessage className="text-red-400 text-xs" />
                      </FormItem>
                    )}
                  />
                </div>

                <LoaderButton
                  type="submit"
                  loading={updateProfileMutation.isPending}
                  loadingText="Updating Profile..."
                  className="w-full bg-[#D4AF37] hover:bg-[#B8962E] text-[#0F1C2E] font-bold py-6 rounded-2xl transition-all shadow-[0_0_25px_rgba(212,175,55,0.2)] text-base"
                >
                  Update Profile
                </LoaderButton>
              </form>
            </Form>
          </CardContent>
        </Card>
      )}

      {/* KYC Verification Card */}
      {activeTab === "kyc" && (
        <Card className="bg-[#0F1C2E]/60 border-[#D4AF37]/20 backdrop-blur-xl overflow-hidden shadow-2xl rounded-3xl animate-in fade-in-50 duration-300">
          <CardHeader className="border-b border-white/5 pb-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-[#D4AF37]/10 rounded-xl">
                  <FileText className="w-5 h-5 text-[#D4AF37]" />
                </div>
                <div>
                  <CardTitle className="text-xl text-white">
                    Identity Verification (KYC)
                  </CardTitle>
                  <CardDescription className="text-gray-400">
                    {userProfile?.data?.profilePic
                      ? "Update your KYC documents or upload new ones."
                      : "Please provide clear photos of your documents."}
                  </CardDescription>
                </div>
              </div>
              {getKycStatusBadge()}
            </div>
          </CardHeader>
          <CardContent className="pt-8">
            <Form {...kycForm}>
              <form
                onSubmit={kycForm.handleSubmit(onKycSubmit)}
                className="space-y-8"
              >
                {/* Profile Picture */}
                <div className="space-y-4">
                  <FormLabel className="text-gray-200 font-semibold text-base flex items-center gap-2">
                    <Camera className="w-4 h-4" /> Profile Picture
                    {userProfile?.data?.profilePic && (
                      <span className="text-xs text-gray-500 font-normal ml-2">
                        (Previously uploaded)
                      </span>
                    )}
                  </FormLabel>
                  <div className="flex items-center gap-6">
                    <div className="relative group">
                      <div className="w-32 h-32 rounded-2xl bg-white/5 border-2 border-dashed border-[#D4AF37]/30 flex items-center justify-center overflow-hidden transition-all group-hover:border-[#D4AF37]/60">
                        {getImageUrl("profilePic") ? (
                          <Image
                            src={getImageUrl("profilePic")!}
                            alt="Profile Preview"
                            fill
                            className="object-cover rounded-2xl"
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
                        {userProfile?.data?.profilePic
                          ? "Click on the image to upload a new photo or keep the existing one."
                          : "Make sure your face is clearly visible. The picture should be brightly lit and not blurry."}
                      </p>
                      <FormMessage className="text-red-400 text-xs mt-1">
                        {kycForm.formState.errors.profilePic?.message as string}
                      </FormMessage>
                    </div>
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-8">
                  {/* CNIC Front */}
                  <div className="space-y-4">
                    <FormLabel className="text-gray-200 font-semibold text-base flex items-center gap-2">
                      <FileText className="w-4 h-4" /> CNIC Front
                      {userProfile?.data?.cnic_front && (
                        <span className="text-xs text-gray-500 font-normal ml-2">
                          (Previously uploaded)
                        </span>
                      )}
                    </FormLabel>
                    <div className="relative group">
                      <div className="aspect-[1.6/1] rounded-2xl bg-white/5 border-2 border-dashed border-[#D4AF37]/30 flex items-center justify-center overflow-hidden transition-all group-hover:border-[#D4AF37]/60">
                        {getImageUrl("cnic_front") ? (
                          <Image
                            src={getImageUrl("cnic_front")!}
                            alt="CNIC Front Preview"
                            fill
                            className="object-cover rounded-2xl"
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
                      {kycForm.formState.errors.cnic_front?.message as string}
                    </FormMessage>
                  </div>

                  {/* CNIC Back */}
                  <div className="space-y-4">
                    <FormLabel className="text-gray-200 font-semibold text-base flex items-center gap-2">
                      <FileText className="w-4 h-4" /> CNIC Back
                      {userProfile?.data?.cnic_back && (
                        <span className="text-xs text-gray-500 font-normal ml-2">
                          (Previously uploaded)
                        </span>
                      )}
                    </FormLabel>
                    <div className="relative group">
                      <div className="aspect-[1.6/1] rounded-2xl bg-white/5 border-2 border-dashed border-[#D4AF37]/30 flex items-center justify-center overflow-hidden transition-all group-hover:border-[#D4AF37]/60">
                        {getImageUrl("cnic_back") ? (
                          <Image
                            src={getImageUrl("cnic_back")!}
                            alt="CNIC Back Preview"
                            fill
                            className="object-cover rounded-2xl"
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
                      {kycForm.formState.errors.cnic_back?.message as string}
                    </FormMessage>
                  </div>
                </div>

                <div className="bg-[#D4AF37]/5 border border-[#D4AF37]/20 p-4 rounded-2xl flex items-start gap-3">
                  <AlertCircle className="w-5 h-5 text-[#D4AF37] shrink-0 mt-0.5" />
                  <div className="text-xs text-gray-400 leading-relaxed">
                    <strong className="text-gray-300 block mb-1">
                      Upload Requirements:
                    </strong>
                    Photos must be clear, well-lit, and all edges of the
                    document must be visible. Your data is encrypted and handled
                    securely according to our privacy policy.
                    {userProfile?.data?.profilePic && (
                      <span className="block mt-2 text-[#D4AF37]">
                        You can upload new documents to replace existing ones.
                      </span>
                    )}
                  </div>
                </div>

                <LoaderButton
                  type="submit"
                  loading={kycMutation.isPending}
                  loadingText={
                    userProfile?.data?.profilePic
                      ? "Updating KYC..."
                      : "Submitting KYC..."
                  }
                  className="w-full bg-[#D4AF37] hover:bg-[#B8962E] text-[#0F1C2E] font-bold py-7 rounded-2xl transition-all shadow-[0_0_25px_rgba(212,175,55,0.2)] text-lg"
                >
                  {userProfile?.data?.profilePic
                    ? "Update KYC Documents"
                    : "Submit KYC Application"}
                </LoaderButton>
              </form>
            </Form>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
