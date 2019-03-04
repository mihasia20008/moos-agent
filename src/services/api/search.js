import axios from 'axios';

import { SERVER } from '../constants';

export const findByString = async (session_id, query) => {
  try {
      const { data: { error_code: status, ...rest } } = await axios({
          method: 'GET',
          url: `${SERVER.HOST}${SERVER.SPA_ENDPOINT}/company/list?session_id=${session_id}&q=${query}`,
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
