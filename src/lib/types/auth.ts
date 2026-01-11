export enum Role {
  USER = "USER",
  ADMIN = "ADMIN",
}

export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  username: string;
  phone: string;
  userType: Role;
  isVerified?: boolean;
  profilePic?: string | null;
  cnic_front?: string | null;
  cnic_back?: string | null;
  kycApproved?: boolean;
  createdAt?: string;
  updatedAt?: string;
}

export interface AuthResponse {
  access_token: string;
  user: User;
}

export interface GetUsersResponse {
  message: string;
  data: User[];
}

export interface GetUserResponse {
  message: string;
  data: User;
}

export interface RegisterRequest {
  email: string;
  firstName: string;
  lastName: string;
  username: string;
  password: string;
  phone: string;
  userType: Role;
}

export interface RegisterResponse {
  message: string;
  email: string;
}

export interface LoginRequest {
  email: string;
  password: string;
  userType: Role;
}

export interface VerifyOtpRequest {
  email: string;
  otp: string;
}

export interface VerifyForgotOtpResponse {
  message: string;
  resetToken: string;
}

export interface ResendOtpRequest {
  email: string;
  type: string;
}

export interface ForgotPasswordRequest {
  email: string;
}

export interface ForgotPasswordResponse {
  message: string;
}

export interface ResetPasswordRequest {
  token: string;
  newPassword: string;
}

export interface ResetPasswordResponse {
  message: string;
}

export interface UpdatePasswordRequest {
  currentPassword: string;
  newPassword: string;
}

export interface UpdatePasswordResponse {
  message: string;
}

export interface KycRequest {
  profilePic: File;
  cnic_front: File;
  cnic_back: File;
}

export interface KycResponse {
  message: string;
}

export interface ApiError {
  statusCode: number;
  message: string;
  error: string;
}

export interface UpdateKycStatusRequest {
  kycApproved: boolean;
}

export interface UpdateKycStatusResponse {
  message: string;
}
