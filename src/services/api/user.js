import axios from 'axios';

import { SERVER } from '../constants';

export const login = async (authData) => {
    try {
        const { data: { error_code: status, ...rest } } = await axios({
            method: 'POST',
            url: `${SERVER.HOST}${SERVER.API_ENDPOINT}/login`,
            data: authData,
        });
        if (status === 0) {
            return {
                isSuccess: true,
                ...rest,
            };
        }
        return {
            isSuccess: false,
            needLogout: status === 2,
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

export const auth = async () => {
    try {
        const { data: { error_code: status, ...rest } } = await axios({
            method: 'GET',
            url: `${SERVER.HOST}${SERVER.SPA_ENDPOINT}/session`,
        });
        if (status === 0) {
            return {
                isSuccess: true,
                ...rest,
            };
        }
        if (status === 2) {
            return {
                isSuccess: false,
                message: 'Пользователя с данной сессией не найдено!',
            }
        }
        return {
            isSuccess: false,
            message: rest.error,
        };
    } catch (err) {
        console.log(err);
        return {
            isSuccess: false,
            message: err.message,
        };
    }
};

export const logout = async () => {
    try {
        const { data: { error_code: status, ...rest } } = await axios({
            method: 'GET',
            url: `${SERVER.HOST}${SERVER.API_ENDPOINT}/logout`,
        });
        if (status === 0) {
            return { isSuccess: true };
        }
        return {
            isSuccess: false,
            needLogout: status === 2,
            message: rest.error,
        };
    } catch (err) {
        console.log(err);
        return {
            isSuccess: false,
            message: err.message,
        };
    }
};

export const recoverPassword = async (username) => {
    try {
        const { data: { error_code: status, ...rest } } = await axios({
            method: 'POST',
            url: `${SERVER.HOST}${SERVER.API_ENDPOINT}/recover`,
            data: { username }
        });
        if (status === 0) {
            return { isSuccess: true };
        }
        return {
            isSuccess: false,
            message: rest.error,
        };
    } catch (err) {
        console.log(err);
        return {
            isSuccess: false,
            message: err.message,
        };
    }
};
