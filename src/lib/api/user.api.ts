import { userResponse } from "../types/user";
import apiClient from "./client.api";

export interface UserProfile {
  id: string;
  firstName: string;
  lastName: string;
  username: string;
  phone: string;
  email?: string;
}

export interface UpdateProfileRequest {
  firstName: string;
  lastName: string;
  username: string;
  phone: string;
}

export const userApi = {
  getProfile: async (userId: string): Promise<userResponse> => {
    const response = await apiClient.get<userResponse>(`/auth/users/${userId}`);
    return response.data;
  },

  updateProfile: async (data: UpdateProfileRequest): Promise<UserProfile> => {
    const response = await apiClient.patch<UserProfile>(
      `/auth/update-profile`,
      data,
    );
    return response.data;
  },
};
