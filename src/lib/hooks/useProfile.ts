"use client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { userApi, UserProfile, UpdateProfileRequest } from "../api/user.api";
import { ApiError } from "../types/error";
import { toast } from "sonner";
import { userResponse } from "../types/user";

export function useUserProfile(userId: string) {
  return useQuery<userResponse, ApiError>({
    queryKey: ["user-profile", userId],
    queryFn: () => userApi.getProfile(userId),
    enabled: !!userId, // Only fetch if userId exists
  });
}

export function useUpdateProfile() {
  const queryClient = useQueryClient();

  return useMutation<UserProfile, ApiError, UpdateProfileRequest>({
    mutationFn: (data) => userApi.updateProfile(data),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["user-profile", data.id] });
      toast.success("Profile updated successfully!");
    },
    onError: (error) => {
      toast.error(error.message || "Failed to update profile");
    },
  });
}
