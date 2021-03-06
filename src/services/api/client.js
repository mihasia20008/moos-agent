import axios from 'axios';

import { SERVER } from '../constants';

export const getData = async (id) => {
    try {
        const { data: { error_code: status, ...rest } } = await axios({
            method: 'GET',
            url: `${SERVER.HOST}${SERVER.SPA_ENDPOINT}/company/get?principalCompany_id=${id}`,
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
