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

export const getUsersList = async (session_id, companyId) => {
    try {
        const { data: { error_code: status, ...rest } } = await axios({
            method: 'GET',
            url: `${SERVER.HOST}${SERVER.API_ENDPOINT}/manager/agent/user/list?session_id=${session_id}&companyId=${companyId}`,
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

export const setEnableStatus = async (session_id, username) => {
    try {
        const { data: { error_code: status, ...rest } } = await axios({
            method: 'GET',
            url: `${SERVER.HOST}${SERVER.API_ENDPOINT}/manager/agent/user/enable?session_id=${session_id}&username=${username}`,
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

export const setDisableStatus = async (session_id, username) => {
    try {
        const { data: { error_code: status, ...rest } } = await axios({
            method: 'GET',
            url: `${SERVER.HOST}${SERVER.API_ENDPOINT}/manager/agent/user/disable?session_id=${session_id}&username=${username}`,
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

export const createUser = async (session_id, data) => {
    try {
        const { data: { error_code: status, ...rest } } = await axios({
            method: 'POST',
            url: `${SERVER.HOST}${SERVER.API_ENDPOINT}/manager/agent/user/add`,
            data: {
                session_id,
                ...data,
            }
        });
        console.log(status, rest);
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
