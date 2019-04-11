import axios from 'axios';

import { SERVER } from '../constants';

export const findByString = async (query) => {
  try {
      const { data: { error_code: status, ...rest } } = await axios({
          method: 'GET',
          url: `${SERVER.HOST}${SERVER.SPA_ENDPOINT}/company/list?q=${query}`,
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
