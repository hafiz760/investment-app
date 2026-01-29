"use client";

import React, { useState } from "react";
import {
  Settings as SettingsIcon,
  User as UserIcon,
  Mail,
  Phone,
  Loader2,
  Save,
  Camera,
  Lock,
  Eye,
  EyeOff,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useUpdateProfile, useUserProfile } from "@/lib/hooks/useProfile";
import { useUpdatePassword } from "@/lib/hooks/useAuth";
import { useAppSelector } from "@/lib/store/hooks";
import Image from "next/image";

const profileSchema = z.object({
  firstName: z.string().min(2, "First name must be at least 2 characters"),
  lastName: z.string().min(2, "Last name must be at least 2 characters"),
  username: z.string().min(3, "Username must be at least 3 characters"),
  phone: z.string(),
});

const passwordSchema = z
  .object({
    currentPassword: z.string().min(1, "Current password is required"),
    newPassword: z
      .string()
      .min(8, "Password must be at least 8 characters")
      .regex(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/,
        "Password must contain uppercase, lowercase, number and special character",
      ),
    confirmPassword: z.string().min(1, "Please confirm your password"),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });

type ProfileFormValues = z.infer<typeof profileSchema>;
type PasswordFormValues = z.infer<typeof passwordSchema>;

export default function AdminSettingsPage() {
  const { user } = useAppSelector((state) => state.auth);
  const userId = user?.id;
  const [mounted, setMounted] = useState(false);
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // Fetch user profile
  const { data: userProfile, isLoading: isLoadingProfile } = useUserProfile(
    userId as string,
  );

  const updateProfileMutation = useUpdateProfile();
  const updatePasswordMutation = useUpdatePassword();

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

  // Password form
  const passwordForm = useForm<PasswordFormValues>({
    resolver: zodResolver(passwordSchema),
    defaultValues: {
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    },
  });

  // Fix hydration
  React.useEffect(() => {
    setMounted(true);
  }, []);

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

  const onProfileSubmit = (data: ProfileFormValues) => {
    updateProfileMutation.mutate(data);
  };

  const onPasswordSubmit = (data: PasswordFormValues) => {
    updatePasswordMutation.mutate(
      {
        currentPassword: data.currentPassword,
        newPassword: data.newPassword,
      },
      {
        onSuccess: () => {
          passwordForm.reset();
        },
      },
    );
  };

  if (isLoadingProfile) {
    return (
      <div className="flex items-center justify-center py-20">
        <Loader2 className="h-6 w-6 animate-spin text-[#D4AF37]" />
        <span className="ml-2 text-gray-400">Loading settings...</span>
      </div>
    );
  }

  return (
    <div className="space-y-8 animate-in slide-in-from-bottom-4 duration-500 pb-20 max-w-5xl mx-auto">
      {/* Header */}
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold text-white tracking-tight">
          Admin Settings
        </h1>
        <p className="text-gray-400">
          Manage your admin account settings and preferences.
        </p>
      </div>

      {/* Profile Card */}
      <Card className="bg-[#0F1C2E]/60 border-[#D4AF37]/20 backdrop-blur-xl shadow-2xl rounded-3xl overflow-hidden">
        <CardHeader className="border-b border-white/5 pb-6">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-[#D4AF37]/10 rounded-xl">
              <UserIcon className="w-5 h-5 text-[#D4AF37]" />
            </div>
            <div>
              <CardTitle className="text-xl text-white">
                Admin Profile
              </CardTitle>
              <CardDescription className="text-gray-400">
                Update your personal information and account details.
              </CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent className="pt-8">
          {/* Profile Picture Section */}
          <div className="flex flex-col sm:flex-row items-center gap-6 mb-8 pb-8 border-b border-white/5">
            <div className="relative group">
              <div className="w-32 h-32 rounded-full bg-white/5 border-4 border-[#D4AF37]/20 flex items-center justify-center overflow-hidden">
                {mounted && userProfile?.data?.profilePic ? (
                  <Image
                    src={userProfile.data.profilePic}
                    alt="Admin Profile"
                    width={128}
                    height={128}
                    className="object-cover w-full h-full"
                  />
                ) : (
                  <UserIcon className="w-12 h-12 text-gray-500" />
                )}
              </div>
              <div className="absolute bottom-0 right-0 p-2 bg-[#D4AF37] rounded-full cursor-pointer hover:bg-[#B8962E] transition-colors">
                <Camera className="w-4 h-4 text-[#0F1C2E]" />
              </div>
            </div>
            <div className="flex-1 text-center sm:text-left">
              <h3 className="text-lg font-semibold text-white">
                {userProfile?.data?.firstName} {userProfile?.data?.lastName}
              </h3>
              <p className="text-sm text-gray-400 mt-1">
                @{userProfile?.data?.username}
              </p>
              <p className="text-xs text-gray-500 mt-2">
                Admin • {userProfile?.data?.email}
              </p>
            </div>
          </div>

          {/* Profile Update Form */}
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
                          className="bg-white/5 border-white/10 text-white placeholder:text-gray-600 focus-visible:ring-[#D4AF37]/50 h-12 rounded-xl"
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
                          className="bg-white/5 border-white/10 text-white placeholder:text-gray-600 focus-visible:ring-[#D4AF37]/50 h-12 rounded-xl"
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
                          className="bg-white/5 border-white/10 text-white placeholder:text-gray-600 focus-visible:ring-[#D4AF37]/50 h-12 rounded-xl"
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
                          className="bg-white/5 border-white/10 text-white placeholder:text-gray-600 focus-visible:ring-[#D4AF37]/50 h-12 rounded-xl"
                        />
                      </FormControl>
                      <FormMessage className="text-red-400 text-xs" />
                    </FormItem>
                  )}
                />

                {/* Email (Read-only) */}
                <FormItem>
                  <FormLabel className="text-gray-200 font-semibold flex items-center gap-2">
                    <Mail className="w-4 h-4" /> Email Address
                  </FormLabel>
                  <Input
                    value={userProfile?.data?.email || ""}
                    disabled
                    className="bg-white/5 border-white/10 text-gray-400 h-12 rounded-xl cursor-not-allowed"
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    Email cannot be changed
                  </p>
                </FormItem>

                {/* Role (Read-only) */}
                <FormItem>
                  <FormLabel className="text-gray-200 font-semibold flex items-center gap-2">
                    <UserIcon className="w-4 h-4" /> Role
                  </FormLabel>
                  <Input
                    value={userProfile?.data?.roleName || "Admin"}
                    disabled
                    className="bg-white/5 border-white/10 text-gray-400 h-12 rounded-xl cursor-not-allowed"
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    Contact super admin to change role
                  </p>
                </FormItem>
              </div>

              {/* Account Info Section */}
              <div className="bg-[#D4AF37]/5 border border-[#D4AF37]/20 p-4 rounded-2xl">
                <h4 className="text-sm font-semibold text-white mb-3">
                  Account Information
                </h4>
                <div className="grid sm:grid-cols-2 gap-3 text-xs">
                  <div>
                    <span className="text-gray-400">Account Created:</span>
                    <span className="text-white ml-2">
                      {mounted && userProfile?.data?.createdAt
                        ? new Date(
                            userProfile.data.createdAt,
                          ).toLocaleDateString("en-US", {
                            year: "numeric",
                            month: "short",
                            day: "numeric",
                          })
                        : "N/A"}
                    </span>
                  </div>
                  <div>
                    <span className="text-gray-400">Last Updated:</span>
                    <span className="text-white ml-2">
                      {mounted && userProfile?.data?.updatedAt
                        ? new Date(
                            userProfile.data.updatedAt,
                          ).toLocaleDateString("en-US", {
                            year: "numeric",
                            month: "short",
                            day: "numeric",
                          })
                        : "N/A"}
                    </span>
                  </div>
                  <div>
                    <span className="text-gray-400">Account Status:</span>
                    <span className="text-green-500 ml-2 font-semibold">
                      {userProfile?.data?.isVerified ? "Verified" : "Pending"}
                    </span>
                  </div>
                  <div>
                    <span className="text-gray-400">User ID:</span>
                    <span className="text-white ml-2 font-mono text-[10px]">
                      {userProfile?.data?.id.substring(0, 16)}...
                    </span>
                  </div>
                </div>
              </div>

              {/* Submit Button */}
              <Button
                type="submit"
                disabled={updateProfileMutation.isPending}
                className="w-full bg-[#D4AF37] hover:bg-[#B8962E] text-[#0F1C2E] font-bold py-6 rounded-2xl transition-all shadow-[0_0_25px_rgba(212,175,55,0.2)] text-base"
              >
                {updateProfileMutation.isPending ? (
                  <>
                    <Loader2 className="h-5 w-5 mr-2 animate-spin" />
                    Updating Profile...
                  </>
                ) : (
                  <>
                    <Save className="h-5 w-5 mr-2" />
                    Save Changes
                  </>
                )}
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>

      {/* Password Change Card */}
      <Card className="bg-[#0F1C2E]/60 border-[#D4AF37]/20 backdrop-blur-xl shadow-2xl rounded-3xl overflow-hidden">
        <CardHeader className="border-b border-white/5 pb-6">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-[#D4AF37]/10 rounded-xl">
              <Lock className="w-5 h-5 text-[#D4AF37]" />
            </div>
            <div>
              <CardTitle className="text-xl text-white">
                Change Password
              </CardTitle>
              <CardDescription className="text-gray-400">
                Update your password to keep your account secure.
              </CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent className="pt-8">
          <Form {...passwordForm}>
            <form
              onSubmit={passwordForm.handleSubmit(onPasswordSubmit)}
              className="space-y-6"
            >
              {/* Current Password */}
              <FormField
                control={passwordForm.control}
                name="currentPassword"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-gray-200 font-semibold flex items-center gap-2">
                      <Lock className="w-4 h-4" /> Current Password
                    </FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Input
                          type={showCurrentPassword ? "text" : "password"}
                          placeholder="Enter current password"
                          {...field}
                          className="bg-white/5 border-white/10 text-white placeholder:text-gray-600 focus-visible:ring-[#D4AF37]/50 h-12 rounded-xl pr-10"
                        />
                        <button
                          type="button"
                          onClick={() =>
                            setShowCurrentPassword(!showCurrentPassword)
                          }
                          className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white"
                        >
                          {showCurrentPassword ? (
                            <EyeOff className="w-4 h-4" />
                          ) : (
                            <Eye className="w-4 h-4" />
                          )}
                        </button>
                      </div>
                    </FormControl>
                    <FormMessage className="text-red-400 text-xs" />
                  </FormItem>
                )}
              />

              <div className="grid md:grid-cols-2 gap-6">
                {/* New Password */}
                <FormField
                  control={passwordForm.control}
                  name="newPassword"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-gray-200 font-semibold flex items-center gap-2">
                        <Lock className="w-4 h-4" /> New Password
                      </FormLabel>
                      <FormControl>
                        <div className="relative">
                          <Input
                            type={showNewPassword ? "text" : "password"}
                            placeholder="Enter new password"
                            {...field}
                            className="bg-white/5 border-white/10 text-white placeholder:text-gray-600 focus-visible:ring-[#D4AF37]/50 h-12 rounded-xl pr-10"
                          />
                          <button
                            type="button"
                            onClick={() => setShowNewPassword(!showNewPassword)}
                            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white"
                          >
                            {showNewPassword ? (
                              <EyeOff className="w-4 h-4" />
                            ) : (
                              <Eye className="w-4 h-4" />
                            )}
                          </button>
                        </div>
                      </FormControl>
                      <FormMessage className="text-red-400 text-xs" />
                    </FormItem>
                  )}
                />

                {/* Confirm Password */}
                <FormField
                  control={passwordForm.control}
                  name="confirmPassword"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-gray-200 font-semibold flex items-center gap-2">
                        <Lock className="w-4 h-4" /> Confirm Password
                      </FormLabel>
                      <FormControl>
                        <div className="relative">
                          <Input
                            type={showConfirmPassword ? "text" : "password"}
                            placeholder="Confirm new password"
                            {...field}
                            className="bg-white/5 border-white/10 text-white placeholder:text-gray-600 focus-visible:ring-[#D4AF37]/50 h-12 rounded-xl pr-10"
                          />
                          <button
                            type="button"
                            onClick={() =>
                              setShowConfirmPassword(!showConfirmPassword)
                            }
                            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white"
                          >
                            {showConfirmPassword ? (
                              <EyeOff className="w-4 h-4" />
                            ) : (
                              <Eye className="w-4 h-4" />
                            )}
                          </button>
                        </div>
                      </FormControl>
                      <FormMessage className="text-red-400 text-xs" />
                    </FormItem>
                  )}
                />
              </div>

              {/* Password Requirements */}
              <div className="bg-[#D4AF37]/5 border border-[#D4AF37]/20 p-4 rounded-2xl">
                <h4 className="text-sm font-semibold text-white mb-2">
                  Password Requirements:
                </h4>
                <ul className="text-xs text-gray-400 space-y-1">
                  <li>• At least 8 characters long</li>
                  <li>• Contains uppercase and lowercase letters</li>
                  <li>• Contains at least one number</li>
                  <li>• Contains at least one special character (@$!%*?&)</li>
                </ul>
              </div>

              {/* Submit Button */}
              <Button
                type="submit"
                disabled={updatePasswordMutation.isPending}
                className="w-full bg-[#D4AF37] hover:bg-[#B8962E] text-[#0F1C2E] font-bold py-6 rounded-2xl transition-all shadow-[0_0_25px_rgba(212,175,55,0.2)] text-base"
              >
                {updatePasswordMutation.isPending ? (
                  <>
                    <Loader2 className="h-5 w-5 mr-2 animate-spin" />
                    Updating Password...
                  </>
                ) : (
                  <>
                    <Lock className="h-5 w-5 mr-2" />
                    Update Password
                  </>
                )}
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}
