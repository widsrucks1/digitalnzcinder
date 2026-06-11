export default {
  id: "digitalnz",
  name: "DigitalNZ",

  search: async function (query, page = 1) {
    return {
      results: [
        {
          id: "test",
          title: "DigitalNZ test result"
        }
      ]
    };
  }
};
