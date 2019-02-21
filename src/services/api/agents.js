import axios from 'axios';

import { SERVER } from '../constants';

export const getData = async (session_id) => {
    try {
        const { data: { error_code: status, ...rest } } = await axios({
            method: 'GET',
            url: `${SERVER.HOST}${SERVER.API_ENDPOINT}/manager/agent/list?session_id=${session_id}`,
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
