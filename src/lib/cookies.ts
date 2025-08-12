import Cookies from "universal-cookie";
import { JWT_TOKEN_KEY } from "../constant/common";

const cookies = new Cookies();
export const getToken = () => {
  return cookies.get(JWT_TOKEN_KEY);
};

export const setToken = (token: string) => {
  const expiryDate = new Date(new Date().setDate(new Date().getDate() + 3));
  cookies.set(JWT_TOKEN_KEY, token, {
    path: "/",
    expires: expiryDate,
  });
};

export const removeToken = () => {
  cookies.remove(JWT_TOKEN_KEY, {
    path: "/",
  });
};
