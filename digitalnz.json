export default {
  id: "digitalnz-metadata",
  name: "DigitalNZ",
  version: "1.0.0",
  description: "Metadata provider for DigitalNZ API v3 (books and records).",
  capabilities: {
    search: true
  },
  baseUrl: "https://api.digitalnz.org/v3",
  async search(query, options = {}) {
    const page = options.page || 1;
    const limit = options.limit || 20;
    const url =
      `${this.baseUrl}/records.json?text=${encodeURIComponent(query)}` +
      `&page=${page}&per_page=${limit}`;
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
      url: item.source_url || null
    }));
    return {
      results,
      page,
      limit,
      total: json.search?.result_count || results.length
    };
  }
};
