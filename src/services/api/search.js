import axios from 'axios';

import { SERVER } from '../constants';
import PropTypes from "prop-types";

export const findByString = async (query) => {
  try {
      const { data: { error_code: status, ...rest } } = await axios({
          method: 'GET',
          url: `${SERVER.HOST}${SERVER.SPA_ENDPOINT}/company/list?q=${query}`,
      });
      if (status === 0) {
          return {
              isSuccess: true,
              list: rest.company,
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

export const selectByString = async (query) => {
    try {
        const { data: { error_code: status, ...rest } } = await axios({
            method: 'GET',
            url: `${SERVER.HOST}${SERVER.API_ENDPOINT}/company/select?q=${query}`,
        });
        if (status === 0) {
            const preparedOther = rest.other.map((item) => ({
                ...item,
                id: {
                    companyTypeRefId: item.companyTypeRefId,
                    INN: item.INN,
                    displayName: item.displayName,
                    fullName: item.fullName,
                }
            }));
            return {
                isSuccess: true,
                list: [
                    ...rest.elastic,
                    ...preparedOther,
                ],
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
