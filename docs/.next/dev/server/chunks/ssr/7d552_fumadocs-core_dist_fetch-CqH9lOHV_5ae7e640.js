module.exports = [
"[project]/node_modules/.pnpm/fumadocs-core@16.6.9_@mdx-js+mdx@3.1.1_@types+estree-jsx@1.0.5_@types+hast@3.0.4_@types+mdast_tms2fjjds3dojmbu73cocgno2m/node_modules/fumadocs-core/dist/fetch-CqH9lOHV.js [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "fetchDocs",
    ()=>fetchDocs
]);
//#region src/search/client/fetch.ts
const cache = /* @__PURE__ */ new Map();
async function fetchDocs(query, { api = "/api/search", locale, tag }) {
    const url = new URL(api, window.location.origin);
    url.searchParams.set("query", query);
    if (locale) url.searchParams.set("locale", locale);
    if (tag) url.searchParams.set("tag", Array.isArray(tag) ? tag.join(",") : tag);
    const key = url.toString();
    const cached = cache.get(key);
    if (cached) return cached;
    const res = await fetch(url);
    if (!res.ok) throw new Error(await res.text());
    const result = await res.json();
    cache.set(key, result);
    return result;
}
;
}),
];

//# sourceMappingURL=7d552_fumadocs-core_dist_fetch-CqH9lOHV_5ae7e640.js.map