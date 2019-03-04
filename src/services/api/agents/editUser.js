import axios from "axios";
import * as SERVER from "../../constants/server";

export default async (session_id, data) => {
    try {
        const { data: { error_code: status, ...rest } } = await axios({
            method: 'POST',
            url: `${SERVER.HOST}${SERVER.API_ENDPOINT}/manager/agent/user/edit`,
            data: {
                session_id,
                ...data,
            }
        });
        if (status === 0) {
            return {
                isSuccess: true,
                ...rest,
            };
        }
        return {
            isSuccess: false,
            needLogout: status === 5,
            message: rest.error,
        };
    } catch (err) {
        console.log(err);
        return {
            isSuccess: false,
            message: err.message,
        }
    }
};
