import axios from "axios";
import * as SERVER from "../../constants/server";

export default async (data) => {
    try {
        const { data: { error_code: status, ...rest } } = await axios({
            method: 'POST',
            url: `${SERVER.HOST}${SERVER.API_ENDPOINT}/manager/agent/user/add`,
            data: data,
        });
        if (status === 0) {
            return {
                isSuccess: true,
                ...rest,
            };
        }
        const error = Object.values(rest.errors).reduce((acc, error) => {
            if (acc) {
                return `${acc} ${error}!`;
            }
            return `${error}!`;
        }, '');
        return {
            isSuccess: false,
            // needLogout: status === 2,
            message: error,
        };
    } catch (err) {
        console.log(err);
        return {
            isSuccess: false,
            message: err.message,
        }
    }
};
