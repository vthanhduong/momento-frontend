import axios from "axios";

const url = `${process.env.EXPO_PUBLIC_API_BASE_URL}/auth`;

export const login = async (payload: {
  username: string;
  password: string;
}) => {
  try {
    const { username, password } = payload;
    const login_url = `${url}/login`;

    const res = await axios.post(login_url, {
      username: username,
      password: password,
    });
    return res.data;
  } catch (error) {
    console.error("Login Error", error);
    let errorMessage = "An unknown error occurred";
    if (axios.isAxiosError(error) && error.response) {
      switch (error.status) {
        case 500:
          errorMessage = "Server error";
          break;
        case 401:
          errorMessage = "Invalid";
          break;
        default:
          errorMessage = error.message;
          break;
      }
    }
    return errorMessage;
  }
};
