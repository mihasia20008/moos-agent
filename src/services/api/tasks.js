export const getData = () => new Promise((resolve) => {
  setTimeout(() => resolve({
    isSuccess: true,
    data: {
      list: [0, 1, 2, 3, 4, 5],
    },
  }), 3000);
});
