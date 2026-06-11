export default {
  id: "digitalnz",
  name: "DigitalNZ",
  version: "1.0.0",
  description: "Search DigitalNZ records (books, archives, documents).",
  contentType: "books",
  contentTypes: ["books", "documents"],
  baseUrl: "https://api.digitalnz.org/v3",
  // -----------------------------
  // SEARCH FUNCTION
  // -----------------------------
  async search(query, options = {}) {
    const page = options.page || 1;
    const limit = options.limit || 20;
    const url =
      `${this.baseUrl}/records.json` +
      `?text=${encodeURIComponent(query)}` +
      `&page=${page}` +
      `&per_page=${limit}`;
    const res = await fetch(url);
    const json = await res.json();
    const results = (json.results || []).map(item => ({
      id: item.id,
      title: item.title || "Untitled",
      author: item.creator || null,
      description: item.description || "",
      cover: item.thumbnail_url || null,
      publisher: item.content_partner || null,
      date: item.date || null,
      category: item.category || null,
      url: item.source_url || null,
      // optional metadata for Cinder UI
      type: "book"
    }));
    return {
      results,
      page,
      limit,
      total: json.search?.result_count || results.length
    };
  },
  // -----------------------------
  // OPTIONAL: SIMPLE DETAILS FETCH
  // -----------------------------
  async getDetails(id) {
    const url =
      `${this.baseUrl}/records/${id}.json`;
    try {
      const res = await fetch(url);
      const json = await res.json();
      return {
        id: json.id,
        title: json.title,
        author: json.creator,
        description: json.description,
        cover: json.thumbnail_url,
        publisher: json.content_partner,
        date: json.date,
        url: json.source_url
      };
    } catch (e) {
      return null;
    }
  }
};
