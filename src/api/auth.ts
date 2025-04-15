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
            password: password
        });
        return res.data;
    } catch (error) {
        let errorMessage = 'An unknown error occurred';
        let status = 0;
        let errors: any[] = [];

        if (axios.isAxiosError(error) && error.response) {
            status = error.response.status;

            switch (status) {
                case 400:
                    errorMessage = error.response.data.message || "Validation errors";
                    errors = error.response.data.data?.errors || []; 
                    break;
                case 401:
                    errorMessage = error.response.data.message || "Invalid credentials";
                    break;
                case 500:
                    errorMessage = "Server error";
                    break;
                default:
                    errorMessage = error.message;
                    break;
            }
        }

        return {
            success: false,
            message: errorMessage,
            status: status,
            errors: errors
        };
    }
};


export const register = async (
    payload: {
        username: string,
        password: string
    }
) => {
    try {
        console.log("evvvvv", url);

        const { username, password } = payload;
        const login_url = `${url}/register`;
        const res = await axios.post(login_url, {
            username: username,
            password: password
        });
        return res.data;
    } catch (error) {
        let errorMessage = 'An unknown error occurred';
        let status = 0;
        if (axios.isAxiosError(error) && error.response) {
            switch (error.status) {
                case 400:
                    errorMessage = error.message;
                    status = error.status;
                    break;
                case 500:
                    errorMessage = "Server error";
                    status = error.status;
                    break;
                default:
                    errorMessage = error.message;
                    break;
            }
        }
        return {
            success: false,
            message: errorMessage,
            status: status
        }
    }
}

export const refreshToken = async (token: string) => {
    try {
        const rf_url = `${url}/refresh-token`;
        const res = await axios.get(rf_url, {
            headers: {
                Authorization: token
            }
        })
        return res.data;
    } catch (error) {
        let errorMessage = "An unknown error accurred";
        let status = 0;
        if (axios.isAxiosError(error) && error.message) {
            switch (error.status) {
                case 401:
                    errorMessage = error.message;
                    status = error.status;
                    break;
                case 500:
                    errorMessage = "Server error";
                    status = error.status;
                    break;
                default:
                    errorMessage = error.message;
                    break;
            }
        }
        return {
            success: false,
            message: errorMessage,
            status: status
        }
    }
}