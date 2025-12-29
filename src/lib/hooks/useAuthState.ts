import { useAppSelector } from "../store/hooks";
export const useAuthState = () => {
  const { user, accessToken, isAuthenticated } = useAppSelector(
    (state) => state.auth
  );

  return {
    user,
    accessToken,
    isAuthenticated,
  };
};
