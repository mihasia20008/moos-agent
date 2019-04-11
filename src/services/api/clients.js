import axios from 'axios';

import { SERVER } from '../constants';
import { prepareFiltersToQuery } from "../utility";

export const getData = async (filters = {}) => {
  try {
      const query = prepareFiltersToQuery(filters);
      console.log('clients filter', query);
      const { data: { error_code: status, ...rest } } = await axios({
          method: 'GET',
          url: `${SERVER.HOST}${SERVER.SPA_ENDPOINT}/company/list?${query}`,
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

export const getNextPage = async (page, filters = {}, limit = 20) => {
    try {
        const query = prepareFiltersToQuery(filters);
        const { data: { error_code: status, ...rest } } = await axios({
            method: 'GET',
            url: `${SERVER.HOST}${SERVER.SPA_ENDPOINT}/company/list?page=${page}&limit=${limit}${query}`,
        });
        if (status === 0) {
            return {
                isSuccess: true,
                ...rest,
            };
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
        }
    }
};