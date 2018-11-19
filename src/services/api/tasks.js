import axios from 'axios';

import { SERVER } from '../constants';

export const getData = async (session_id) => {
  try {
      const { data: { error_code: status, ...rest } } = await axios({
          method: 'GET',
          url: `${SERVER.HOST}/order/list?session_id=${session_id}`,
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
}

export const getNextPage = () => new Promise((resolve) => {
  setTimeout(() => resolve({
    isSuccess: true,
    data: {
      list: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
    },
  }), 1000);
})