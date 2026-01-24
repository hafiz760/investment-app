export enum Role {
  USER = "USER",
  ADMIN = "ADMIN",
  SUPER_ADMIN = "SUPER_ADMIN",
}

export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  username: string;
  phone: string;
  roleId: string;
  roleName: string;
  permissions: Permission[];
  isVerified?: boolean;
  profilePic?: string | null;
  cnic_front?: string | null;
  cnic_back?: string | null;
  kycApproved?: boolean;
  createdAt?: string;
  updatedAt?: string;
  userType?: Role; // Keeping as optional for backward compatibility if needed, though roleName seems to replace it
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

export interface Permission {
  id: string;
  moduleName: string;
  read: boolean;
  write: boolean;
  update: boolean;
  delete: boolean;
  roleId: string;
}

export interface ApiRole {
  id: string;
  name: string;
  createdAt: string;
  updatedAt: string;
  permissions: Permission[];
}

export interface RegisterRequest {
  email: string;
  firstName: string;
  lastName: string;
  username: string;
  password: string;
  phone: string;
  roleId: string;
}

export interface RegisterResponse {
  message: string;
  email: string;
}

export interface LoginRequest {
  email: string;
  password: string;
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



export interface UpdateKycStatusRequest {
  kycApproved: boolean;
}

export interface UpdateKycStatusResponse {
  message: string;
}
