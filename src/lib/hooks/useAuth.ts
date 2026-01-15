import {
  useMutation,
  useQuery,
  UseMutationResult,
  useQueryClient,
} from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { authApi } from "../api/auth";
import {
  RegisterRequest,
  RegisterResponse,
  LoginRequest,
  AuthResponse,
  VerifyOtpRequest,
  VerifyForgotOtpResponse,
  ForgotPasswordRequest,
  ForgotPasswordResponse,
  ResetPasswordRequest,
  ResetPasswordResponse,
  UpdatePasswordRequest,
  UpdatePasswordResponse,
  ApiError,
  ResendOtpRequest,
  KycResponse,
  GetUsersResponse,
  GetUserResponse,
  UpdateKycStatusRequest,
  UpdateKycStatusResponse,
  ApiRole,
} from "../types/auth";
import { useAppDispatch } from "../store/hooks";
import { setAuth, clearAuth } from "../store/slices/authSlice";
import { setAuthCookie, clearAuthCookie } from "../utils/cookies";
import { persistor } from "../store";

export const useAdminCreateUser = (): UseMutationResult<
  RegisterResponse,
  ApiError,
  RegisterRequest
> => {
  const queryClient = useQueryClient();
  return useMutation<RegisterResponse, ApiError, RegisterRequest>({
    mutationFn: authApi.register,
    onSuccess: () => {
      toast.success("User created successfully!");
      queryClient.invalidateQueries({ queryKey: ["users"] });
    },
    onError: (error) => {
      toast.error("Failed to create user", {
        description: error.message,
      });
    },
  });
};

export const useRegister = (): UseMutationResult<
  RegisterResponse,
  ApiError,
  RegisterRequest
> => {
  const router = useRouter();
  return useMutation<RegisterResponse, ApiError, RegisterRequest>({
    mutationFn: authApi.register,
    onSuccess: (data) => {
      toast.success("Registration successful!", {
        description: `OTP sent to ${data.email}. Please check your email to verify your account.`,
      });
      router.push(`/verify-otp?email=${encodeURIComponent(data.email)}`);
    },
    onError: (error) => {
      toast.error("Registration failed", {
        description: error.message,
      });
    },
  });
};

export const useVerifyOtp = (): UseMutationResult<
  AuthResponse,
  ApiError,
  VerifyOtpRequest
> => {
  const router = useRouter();
  const dispatch = useAppDispatch();

  return useMutation<AuthResponse, ApiError, VerifyOtpRequest>({
    mutationFn: authApi.verifyOtp,
    onSuccess: (data) => {
      dispatch(setAuth({ user: data.user, accessToken: data.access_token }));
      setAuthCookie(data.access_token);

      toast.success("Email verified successfully!", {
        description: "Welcome to Plouton AI",
      });
      router.push("/");
    },
    onError: (error) => {
      toast.error("Verification failed", {
        description: error.message,
      });
    },
  });
};

export const useResendOtp = (): UseMutationResult<
  AuthResponse,
  ApiError,
  ResendOtpRequest
> => {
  return useMutation<AuthResponse, ApiError, ResendOtpRequest>({
    mutationFn: authApi.resendOtp,
    onSuccess: (data) => {
      console.log(data);
      toast.success("OTP sent successfully!", {
        description: "Please check your email to verify your account.",
      });
    },
    onError: (error) => {
      toast.error("Verification failed", {
        description: error.message,
      });
    },
  });
};

export const useLogin = (): UseMutationResult<
  AuthResponse,
  ApiError,
  LoginRequest
> => {
  const router = useRouter();
  const dispatch = useAppDispatch();

  return useMutation<AuthResponse, ApiError, LoginRequest>({
    mutationFn: authApi.login,
    onSuccess: (data) => {
      console.log(data);
      dispatch(setAuth({ user: data.user, accessToken: data.access_token }));
      setAuthCookie(data.access_token);

      toast.success("Login successful!", {
        description: `Welcome back, ${data.user.username}`,
      });

      if (data.user.roleName === "Super Admin") {
        router.push("/super-admin");
      } else if (data.user.roleName === "Admin") {
        router.push("/admin");
      } else if (data.user.roleName === "User") {
        router.push("/user/dashboard");
      } else {
        router.push("/");
      }
    },
    onError: (error) => {
      toast.error("Login failed", {
        description: error.message,
      });
    },
  });
};

export const useForgotPassword = (): UseMutationResult<
  ForgotPasswordResponse,
  ApiError,
  ForgotPasswordRequest
> => {
  const router = useRouter();

  return useMutation<ForgotPasswordResponse, ApiError, ForgotPasswordRequest>({
    mutationFn: authApi.forgotPassword,
    onSuccess: (data, variables) => {
      toast.success("OTP sent successfully!", {
        description: data.message,
      });
      // Redirect to reset password page with email as query param
      router.push(
        `/reset-password?email=${encodeURIComponent(variables.email)}`
      );
    },
  });
};

export const useVerifyForgotOtp = (): UseMutationResult<
  VerifyForgotOtpResponse,
  ApiError,
  VerifyOtpRequest
> => {
  return useMutation<VerifyForgotOtpResponse, ApiError, VerifyOtpRequest>({
    mutationFn: authApi.verifyForgotOtp,
    onSuccess: (data) => {
      toast.success("OTP verified successfully!", {
        description: data.message,
      });
    },
    onError: (error) => {
      toast.error("Verification failed", {
        description: error.message,
      });
    },
  });
};

export const useResetPassword = (): UseMutationResult<
  ResetPasswordResponse,
  ApiError,
  ResetPasswordRequest
> => {
  const router = useRouter();

  return useMutation<ResetPasswordResponse, ApiError, ResetPasswordRequest>({
    mutationFn: authApi.resetPassword,
    onSuccess: (data) => {
      toast.success("Password reset successful!", {
        description: data.message,
      });
      // router.push("/sign-in");
    },
    onError: (error) => {
      toast.error("Password reset failed", {
        description: error.message,
      });
    },
  });
};

export const useUpdatePassword = (): UseMutationResult<
  UpdatePasswordResponse,
  ApiError,
  UpdatePasswordRequest
> => {
  return useMutation<UpdatePasswordResponse, ApiError, UpdatePasswordRequest>({
    mutationFn: authApi.updatePassword,
    onSuccess: (data) => {
      toast.success("Password updated successfully!", {
        description: data.message,
      });
    },
    onError: (error) => {
      toast.error("Password update failed", {
        description: error.message,
      });
    },
  });
};

export const useLogout = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const queryClient = useQueryClient();

  return async () => {
    // Clear Redux auth state
    dispatch(clearAuth());

    // Clear auth cookie
    clearAuthCookie();

    // Clear React Query cache (removes all cached workflow/session data)
    queryClient.clear();

    // Purge Redux Persist storage (clears persisted state from localStorage)
    await persistor.purge();

    toast.info("Logged out successfully");
    router.push("/login");
  };
};

export const useSubmitKyc = (): UseMutationResult<
  KycResponse,
  ApiError,
  FormData
> => {
  return useMutation<KycResponse, ApiError, FormData>({
    mutationFn: authApi.submitKyc,
    onSuccess: (data) => {
      toast.success("KYC submission successful!", {
        description: data.message,
      });
    },
    onError: (error) => {
      toast.error("KYC submission failed", {
        description: error.message,
      });
    },
  });
};

export const useUsers = (page = 1, limit = 20) => {
  return useQuery<GetUsersResponse, ApiError>({
    queryKey: ["users", page, limit],
    queryFn: () => authApi.getUsers(page, limit),
  });
};

export const useUser = (id: string) => {
  return useQuery<GetUserResponse, ApiError>({
    queryKey: ["user", id],
    queryFn: () => authApi.getUserById(id),
    enabled: !!id,
  });
};

export const useUpdateKycStatus = () => {
  const queryClient = useQueryClient();
  return useMutation<
    UpdateKycStatusResponse,
    ApiError,
    { id: string; data: UpdateKycStatusRequest }
  >({
    mutationFn: ({ id, data }) => authApi.updateKycStatus(id, data),
    onSuccess: (data) => {
      toast.success(data.message);
      queryClient.invalidateQueries({ queryKey: ["users"] });
      queryClient.invalidateQueries({ queryKey: ["user"] });
    },
    onError: (error) => {
      toast.error("Failed to update KYC status", {
        description: error.message,
      });
    },
  });
};

export const useRoles = () => {
  return useQuery<ApiRole[], ApiError>({
    queryKey: ["roles"],
    queryFn: authApi.getRoles,
  });
};
