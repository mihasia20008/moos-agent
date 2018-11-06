export const getData = () => new Promise((resolve) => {
  setTimeout(() => resolve({
    isSuccess: true,
    data: {
      list: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
    },
  }), 3000);
});

export const getNextPage = () => new Promise((resolve) => {
  setTimeout(() => resolve({
    isSuccess: true,
    data: {
      list: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
    },
  }), 1000);
})