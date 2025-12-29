import {
  useMutation,
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
  ForgotPasswordRequest,
  ForgotPasswordResponse,
  ResetPasswordRequest,
  ResetPasswordResponse,
  UpdatePasswordRequest,
  UpdatePasswordResponse,
  ApiError,
} from "../types/auth";
import { useAppDispatch } from "../store/hooks";
import { setAuth, clearAuth } from "../store/slices/authSlice";
import { setAuthCookie, clearAuthCookie } from "../utils/cookies";
import { persistor } from "../store";

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
      dispatch(setAuth({ user: data.user, accessToken: data.accessToken }));
      setAuthCookie(data.accessToken);

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
      dispatch(setAuth({ user: data.user, accessToken: data.accessToken }));
      setAuthCookie(data.accessToken);

      toast.success("Login successful!", {
        description: `Welcome back, ${data.user.username}`,
      });

      if (typeof window !== "undefined") {
        const searchParams = new URLSearchParams(window.location.search);
        const redirectTo = searchParams.get("redirect");
        router.push(redirectTo || "/");
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
    onError: (error) => {
      toast.error("Request failed", {
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
      router.push("/sign-in");
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
    router.push("/sign-in");
  };
};
