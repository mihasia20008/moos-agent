import axios from 'axios';

import { SERVER } from '../constants';

export const login = async (authData) => {
    try {
        const { data: { error_code: status, ...rest } } = await axios({
            method: 'POST',
            url: `${SERVER.HOST}/login`,
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

export const auth = async (session_id) => {
    try {
        const { data: { error_code: status, ...rest } } = await axios({
            method: 'GET',
            url: `${SERVER.HOST}/session?session_id=${session_id}`,
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

export const logout = async (session_id) => {
    try {
        const { data: { error_code: status, ...rest } } = await axios({
            method: 'GET',
            url: `${SERVER.HOST}/logout?session_id=${session_id}`,
        });
        if (status === 0) {
            return { isSuccess: true };
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
        };
    }
};
