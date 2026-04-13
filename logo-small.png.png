import { ApifyClient } from "apify-client";

const client = new ApifyClient({ token: process.env.APIFY_TOKEN });

export const getTailoredTemplates = async (industry, comfortLevel) => {
  const businessContext = "small business, entrepreneur, behind the scenes, marketing tips";

  const comfortKeywords = comfortLevel === "Recording-only"
    ? "ASMR satisfying faceless aesthetic"
    : "vlog founder story talking to camera";

  const searchQuery = `${industry} ${businessContext} ${comfortKeywords}`;

  const input = {
    keywords: [searchQuery],
    maxResultsPerKeyword: 10,
    searchType: "video",
  };

  try {
    const run = await client.actor("automation-lab/tiktok-search-scraper").call(input);
    const { items } = await client.dataset(run.defaultDatasetId).listItems();

    return items
      .filter((item) => {
        const caption = (item.text || "").toLowerCase();
        return (
          caption.includes("business") ||
          caption.includes("entrepreneur") ||
          caption.includes("handmade") ||
          caption.includes("smallbiz")
        );
      })
      .slice(0, 5);
  } catch (error) {
    console.error("Apify Fetch Error:", error);
    return [];
  }
};
