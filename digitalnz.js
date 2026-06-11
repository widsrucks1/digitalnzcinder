export default {
  id: "digitalnz",
  name: "DigitalNZ",
  version: "1.0.0",
  description: "Search DigitalNZ metadata records",

  contentType: "books",

  baseUrl: "https://api.digitalnz.org/v3",

  search: async function (query, page = 1) {
    const url =
      `${this.baseUrl}/records.json` +
      `?text=${encodeURIComponent(query)}` +
      `&page=${page}` +
      `&per_page=20`;

    const res = await fetch(url);
    const json = await res.json();

    if (!json || !json.results) {
      return { results: [] };
    }

    return {
      results: json.results.map(item => ({
        id: item.id,
        title: item.title || "Untitled",
        author: item.creator || "",
        description: item.description || "",
        cover: item.thumbnail_url || "",
        url: item.source_url || "",
        date: item.date || "",
        publisher: item.content_partner || ""
      })),
      page,
      total: json.search?.result_count || json.results.length
    };
  },

  getDetails: async function (id) {
    try {
      const res = await fetch(
        `${this.baseUrl}/records/${id}.json`
      );
      const json = await res.json();

      return {
        id: json.id,
        title: json.title,
        description: json.description,
        author: json.creator,
        cover: json.thumbnail_url,
        url: json.source_url
      };
    } catch (e) {
      return null;
    }
  }
};
