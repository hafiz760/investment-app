import apiClient from "./client";
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
} from "../types/auth";

export const authApi = {
  register: async (data: RegisterRequest): Promise<RegisterResponse> => {
    const response = await apiClient.post<RegisterResponse>(
      "auth/register",
      data
    );
    return response.data;
  },

  verifyOtp: async (data: VerifyOtpRequest): Promise<AuthResponse> => {
    const response = await apiClient.post<AuthResponse>(
      "auth/verify-otp",
      data
    );
    return response.data;
  },

  login: async (data: LoginRequest): Promise<AuthResponse> => {
    const response = await apiClient.post<AuthResponse>("auth/login", data);
    return response.data;
  },

  forgotPassword: async (
    data: ForgotPasswordRequest
  ): Promise<ForgotPasswordResponse> => {
    const response = await apiClient.post<ForgotPasswordResponse>(
      "auth/forgot-password",
      data
    );
    return response.data;
  },

  resetPassword: async (
    data: ResetPasswordRequest
  ): Promise<ResetPasswordResponse> => {
    const response = await apiClient.post<ResetPasswordResponse>(
      "auth/reset-password",
      data
    );
    return response.data;
  },

  updatePassword: async (
    data: UpdatePasswordRequest
  ): Promise<UpdatePasswordResponse> => {
    const response = await apiClient.patch<UpdatePasswordResponse>(
      "auth/update-password",
      data
    );
    return response.data;
  },
};
