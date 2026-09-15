# NewAnime Project Instructions

## Poster replacement: required end-to-end procedure

A poster replacement is not complete until the new poster renders correctly on the live **main page** and its live **detail page**.

1. Use the user-provided original exactly when one is supplied. Do not substitute, redraw, remove logos/text, or crop it unless the user explicitly asks.
2. Store poster assets under `assets/posters/` as a valid, decodable WebP. Preserve the source dimensions/aspect ratio unless a resize or crop was requested.
3. Before any commit, verify the generated WebP can be decoded and has the expected dimensions. A file returning HTTP 200 is not sufficient.
4. Update every active reference for the anime ID:
   - canonical entry in `data/anime.js`
   - any matching entry in `data/poster-fixes-*.js` or another runtime override
   - `anime/<anime-id>/index.html` when a static detail page exists, including its visible `img`, Open Graph, X/Twitter, and JSON-LD image URLs
   - any other title-keyed poster map used by the page
5. Search the repository for both the anime ID and the old filename. Do not leave a later-loading override or static page pointing back to the old asset.
6. Preserve the existing approved poster framing and `object-position`; do not silently change fit/crop behavior.
7. If a cache-busted filename is needed, update all references in the same change. Do not reuse a URL that may have cached a failed image response.
8. After static pages are regenerated, run `node scripts/prune-unused-poster-assets.js --prune`. The replacement is not complete while an unreferenced previous poster asset is still left in `assets/posters/`.
9. Commit and push the completed change to `main`. Do not use temporary chunk files, ad-hoc workflows, or staging assets in the final repository state.
10. Wait for the deployment, then verify:
   - the live main-page data/override resolves to the new asset;
   - the live detail-page HTML resolves to the new asset;
   - the live asset decodes successfully as WebP.
11. Only report completion after all three live checks pass. If any check fails, continue fixing rather than reporting the repository-only state as complete.

## Poster asset lifecycle and identity

- Treat poster files as owned by a specific anime ID. Do not reuse an unrelated title's poster asset merely because the image is already present in the repository.
- A superseded poster may remain only while an active site file still references it. Once all active references have moved to the replacement, remove the old asset in the same maintenance cycle.
- `scripts/prune-unused-poster-assets.js` is the authoritative orphan check. It scans active site files for exact `assets/posters/...` references, refuses to run when dangling references or unsafe runtime-computed poster paths are detected, and applies a deletion safety limit.
- Historical audit files are not active references and must not keep obsolete poster binaries alive.
- The generation workflow must run poster pruning after all static detail/month/year pages are regenerated and before the generated commit is created.

## Scope and data integrity

- Change only the requested anime and the files necessary to make its poster work.
- Prefer user-specified or official Korean titles. Keep canonical data, runtime overrides, and static detail-page titles in sync when touching that anime.
- Keep local assets local; do not hotlink posters.
- If no reliable poster exists, use the established `?` fallback rather than unrelated artwork.
