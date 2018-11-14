import axios from 'axios';

import { SERVER } from '../constants';

export const loginUser = async (authData) => {
    const res = await axios({
        method: 'GET',
        url: `${SERVER.HOST}/login?username=${authData.name}&password=${authData.password}`,
        mode: 'no-cors'
    });
    console.log(res);
    return { isSuccess: false };
}