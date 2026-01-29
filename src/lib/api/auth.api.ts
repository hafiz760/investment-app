import apiClient from "./client.api";
import { store } from "../store";
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
  ResendOtpRequest,
  KycResponse,
  GetUsersResponse,
  GetUserResponse,
  UpdateKycStatusRequest,
  UpdateKycStatusResponse,
  ApiRole,
} from "../types/auth";

export const authApi = {
  register: async (data: RegisterRequest): Promise<RegisterResponse> => {
    const response = await apiClient.post<RegisterResponse>(
      "/auth/register",
      data,
    );
    return response.data;
  },

  verifyOtp: async (data: VerifyOtpRequest): Promise<AuthResponse> => {
    const response = await apiClient.post<AuthResponse>(
      "/auth/verify-otp",
      data,
    );
    return response.data;
  },
  verifyForgotOtp: async (
    data: VerifyOtpRequest,
  ): Promise<VerifyForgotOtpResponse> => {
    const response = await apiClient.post<VerifyForgotOtpResponse>(
      "/auth/verify-forgot-password-otp",
      data,
    );
    return response.data;
  },

  resendOtp: async (data: ResendOtpRequest): Promise<AuthResponse> => {
    const response = await apiClient.post<AuthResponse>(
      "/auth/resend-otp",
      data,
    );
    return response.data;
  },

  login: async (data: LoginRequest): Promise<AuthResponse> => {
    const response = await apiClient.post<AuthResponse>("/auth/login", data);
    return response.data;
  },

  forgotPassword: async (
    data: ForgotPasswordRequest,
  ): Promise<ForgotPasswordResponse> => {
    const response = await apiClient.post<ForgotPasswordResponse>(
      "/auth/forgot-password",
      data,
    );
    return response.data;
  },

  resetPassword: async (
    data: ResetPasswordRequest,
  ): Promise<ResetPasswordResponse> => {
    const response = await apiClient.post<ResetPasswordResponse>(
      "/auth/reset-password",
      data,
    );
    return response.data;
  },

  updatePassword: async (
    data: UpdatePasswordRequest,
  ): Promise<UpdatePasswordResponse> => {
    const response = await apiClient.patch<UpdatePasswordResponse>(
      "/auth/update-password",
      data,
    );
    return response.data;
  },

  submitKyc: async (formData: FormData): Promise<KycResponse> => {
    const response = await apiClient.patch<KycResponse>(
      "/auth/apply-kyc",
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      },
    );
    return response.data;
  },
  getUsers: async (page = 1, limit = 20): Promise<GetUsersResponse> => {
    const response = await apiClient.get<GetUsersResponse>("/auth/users", {
      params: { page, limit },
    });
    return response.data;
  },
  getUserById: async (id: string): Promise<GetUserResponse> => {
    const response = await apiClient.get<GetUserResponse>(`/auth/users/${id}`);
    return response.data;
  },
  updateKycStatus: async (
    id: string,
    data: UpdateKycStatusRequest,
  ): Promise<UpdateKycStatusResponse> => {
    const response = await apiClient.patch<UpdateKycStatusResponse>(
      `/auth/users/${id}/kyc-status`,
      data,
    );
    return response.data;
  },
  getRoles: async (): Promise<ApiRole[]> => {
    const response = await apiClient.get<ApiRole[]>("/roles");
    return response.data;
  },
  createRole: async (payload: {
    name: string;
    permissions: any[];
  }): Promise<ApiRole> => {
    const response = await apiClient.post<ApiRole>("/roles", payload);
    return response.data;
  },
  updateRole: async (
    id: string,
    payload: { name: string; permissions: any[] },
  ): Promise<ApiRole> => {
    const response = await apiClient.patch<ApiRole>(`/roles/${id}`, payload);
    return response.data;
  },
  deleteRole: async (id: string): Promise<void> => {
    await apiClient.delete(`/roles/${id}`);
  },
};
