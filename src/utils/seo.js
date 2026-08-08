/**
 * Utility to dynamically update page SEO metadata for Google crawling & indexing
 */
export function updateSEO({ title, description, keywords, path = "" }) {
    const siteUrl = "https://prepwise.acharyaworks.in";
    const currentUrl = `${siteUrl}${path}`;
    const fullTitle = title.includes("AcharyaWorks") ? title : `${title} | AcharyaWorks`;

    // 1. Update Document Title
    document.title = fullTitle;

    // Helper to update or create meta tags
    const setMeta = (name, content, attr = "name") => {
        if (!content) return;
        let element = document.querySelector(`meta[${attr}="${name}"]`);
        if (!element) {
            element = document.createElement("meta");
            element.setAttribute(attr, name);
            document.head.appendChild(element);
        }
        element.setAttribute("content", content);
    };

    // 2. Standard Meta Tags
    setMeta("description", description);
    setMeta("keywords", keywords || "PrepWise, Interview Preparation, Tech Interview Prep, HR STAR Method, AcharyaWorks, Rahul Kumar Acharya");
    setMeta("author", "Rahul Kumar Acharya");
    setMeta("robots", "index, follow, max-image-preview:large");

    // 3. OpenGraph Tags
    setMeta("og:title", fullTitle, "property");
    setMeta("og:description", description, "property");
    setMeta("og:url", currentUrl, "property");
    setMeta("og:site_name", "PrepWise", "property");

    // 4. Twitter Tags
    setMeta("twitter:title", fullTitle, "property");
    setMeta("twitter:description", description, "property");
    setMeta("twitter:url", currentUrl, "property");

    // 5. Canonical Link
    let canonical = document.querySelector("link[rel='canonical']");
    if (!canonical) {
        canonical = document.createElement("link");
        canonical.setAttribute("rel", "canonical");
        document.head.appendChild(canonical);
    }
    canonical.setAttribute("href", currentUrl);
}
