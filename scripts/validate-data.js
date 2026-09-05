#!/usr/bin/env node

const fs = require("fs");
const path = require("path");
const vm = require("vm");

const ROOT = path.resolve(__dirname, "..");
const RELEASE_STATUSES = new Set(["date", "month", "year", "tba"]);
const PRODUCTION_STATUSES = new Set(["announced", "scheduled", "delayed", "cancelled", "released"]);
const FORMATS = new Set(["tv", "movie", "ona", "ova", "special", "unknown"]);
const ORIGINS = new Set([
  "comic",
  "light-novel",
  "webtoon",
  "web-novel",
  "game",
  "original",
  "novel",
  "other",
  "unknown"
]);
const SOURCE_TYPES = new Set([
  "official-site",
  "official-x",
  "official-youtube",
  "streaming-platform",
  "publisher",
  "studio",
  "news",
  "distributor",
  "other"
]);
const SOURCE_SUPPORTS = new Set([
  "announcement",
  "release",
  "release-japan",
  "release-korea",
  "release-global",
  "pv",
  "official-link",
  "poster",
  "streaming",
  "format",
  "title"
]);
const UPDATE_TYPES = new Set([
  "anime-added",
  "release-window",
  "release-date",
  "release-delay",
  "release-cancelled",
  "title",
  "poster",
  "pv",
  "official-link",
  "streaming-added",
  "streaming-removed",
  "streaming-updated",
  "format",
  "source",
  "other"
]);

function loadProductionData() {
  const context = {
    URL,
    window: {},
    document: {
      readyState: "loading",
      addEventListener() {}
    }
  };
  vm.createContext(context);
  for (const file of [
    "data/anime.js",
    "data/platforms.js",
    "data/updates.js"
  ]) {
    vm.runInContext(fs.readFileSync(path.join(ROOT, file), "utf8"), context, { filename: file });
  }
  return {
    anime: context.window.animeData,
    months: context.window.animeScheduleMonths,
    platforms: context.window.ottPlatforms,
    updates: context.window.animeUpdates
  };
}

function isNonEmptyString(value) {
  return typeof value === "string" && value.trim().length > 0;
}

function isHttpUrl(value) {
  if (!isNonEmptyString(value)) return false;
  try {
    const url = new URL(value);
    return url.protocol === "http:" || url.protocol === "https:";
  } catch (_) {
    return false;
  }
}

function isHttpsUrl(value) {
  if (!isNonEmptyString(value)) return false;
  try {
    return new URL(value).protocol === "https:";
  } catch (_) {
    return false;
  }
}

function isIsoDate(value) {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(value || "")) return false;
  const [year, month, day] = value.split("-").map(Number);
  const candidate = new Date(Date.UTC(year, month - 1, day));
  return candidate.getUTCFullYear() === year &&
    candidate.getUTCMonth() === month - 1 &&
    candidate.getUTCDate() === day;
}

function validateSource(source, location, errors) {
  if (!source || typeof source !== "object" || Array.isArray(source)) {
    errors.push(`${location} must be an object`);
    return;
  }
  if (!SOURCE_TYPES.has(source.type)) errors.push(`${location}.type is invalid`);
  if (!isHttpUrl(source.url)) errors.push(`${location}.url is invalid`);
  if (!isNonEmptyString(source.label)) errors.push(`${location}.label is missing`);
  if (source.supports !== undefined) {
    if (!Array.isArray(source.supports) || source.supports.some(value => !SOURCE_SUPPORTS.has(value))) {
      errors.push(`${location}.supports contains an invalid concept`);
    } else if (new Set(source.supports).size !== source.supports.length) {
      errors.push(`${location}.supports contains duplicates`);
    }
  }
}

function getPrimaryScheduleRelease(anime) {
  return anime.release?.japan || anime.release?.global || anime.release?.korea || null;
}

function countBy(values) {
  return Object.fromEntries(
    [...new Set(values)].sort((a, b) => String(a).localeCompare(String(b)))
      .map(value => [String(value), values.filter(item => item === value).length])
  );
}

function validateRelease(release, location, errors) {
  if (release === null) return;
  if (!release || typeof release !== "object" || Array.isArray(release)) {
    errors.push(`${location} must be an object or null`);
    return;
  }
  if (!RELEASE_STATUSES.has(release.status)) {
    errors.push(`${location}.status is invalid`);
    return;
  }

  const { status, year, month, day } = release;
  const validYear = Number.isInteger(year) && year >= 1900 && year <= 2200;
  const validMonth = Number.isInteger(month) && month >= 1 && month <= 12;
  const validDay = Number.isInteger(day) && day >= 1 && day <= 31;

  if (status === "date" && (!validYear || !validMonth || !validDay)) {
    errors.push(`${location} requires a valid year, month, and day for status "date"`);
  }
  if (status === "month" && (!validYear || !validMonth || day !== null)) {
    errors.push(`${location} requires year/month and a null day for status "month"`);
  }
  if (status === "year" && (!validYear || month !== null || day !== null)) {
    errors.push(`${location} requires a year and null month/day for status "year"`);
  }
  if (status === "tba") {
    if (year !== null && !validYear) errors.push(`${location}.year is invalid`);
    if (month !== null && !validMonth) errors.push(`${location}.month is invalid`);
    if (day !== null && !validDay) errors.push(`${location}.day is invalid`);
  }

  if (status === "date" && validYear && validMonth && validDay) {
    const candidate = new Date(Date.UTC(year, month - 1, day));
    if (
      candidate.getUTCFullYear() !== year ||
      candidate.getUTCMonth() !== month - 1 ||
      candidate.getUTCDate() !== day
    ) {
      errors.push(`${location} contains an impossible calendar date`);
    }
  }

  if (release.display !== undefined) {
    if (!release.display || typeof release.display !== "object" || Array.isArray(release.display)) {
      errors.push(`${location}.display must be a localization object`);
    } else if (!["ko", "ja", "en"].some(lang => isNonEmptyString(release.display[lang]))) {
      errors.push(`${location}.display has no usable localized value`);
    }
  }
}

function validate() {
  const { anime, months, platforms, updates } = loadProductionData();
  const errors = [];
  const warnings = [];

  if (!Array.isArray(anime)) errors.push("window.animeData must be an array");
  if (!Array.isArray(months)) errors.push("window.animeScheduleMonths must be an array");
  if (!Array.isArray(platforms)) errors.push("window.ottPlatforms must be an array");
  if (!Array.isArray(updates)) errors.push("window.animeUpdates must be an array");
  if (errors.length) return { errors, warnings, report: null };

  const ids = new Set();
  const duplicateIds = new Set();
  const platformIds = new Set();

  for (const [index, platform] of platforms.entries()) {
    const location = `platforms[${index}]`;
    if (!isNonEmptyString(platform?.id)) errors.push(`${location}.id is missing`);
    else if (platformIds.has(platform.id)) errors.push(`${location}.id is duplicated: ${platform.id}`);
    else platformIds.add(platform.id);
    if (!isNonEmptyString(platform?.name)) errors.push(`${location}.name is missing`);
  }

  for (const [index, item] of anime.entries()) {
    const location = `anime[${index}]`;
    if (!isNonEmptyString(item?.id)) {
      errors.push(`${location}.id is missing`);
    } else {
      if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(item.id)) {
        errors.push(`${location}.id is not a lowercase ASCII slug: ${item.id}`);
      }
      if (ids.has(item.id)) duplicateIds.add(item.id);
      ids.add(item.id);
    }

    if (!item?.title || typeof item.title !== "object" || Array.isArray(item.title)) {
      errors.push(`${location}.title is missing`);
    } else if (!["ko", "ja", "en"].some(lang => isNonEmptyString(item.title[lang]))) {
      errors.push(`${location}.title has no usable localized title`);
    }

    if (!Array.isArray(item?.aliases) || item.aliases.some(alias => !isNonEmptyString(alias))) {
      errors.push(`${location}.aliases must contain only non-empty strings`);
    } else if (new Set(item.aliases).size !== item.aliases.length) {
      errors.push(`${location}.aliases contains duplicates`);
    }

    if (!item?.release || typeof item.release !== "object" || Array.isArray(item.release)) {
      errors.push(`${location}.release is missing`);
    } else {
      for (const region of ["japan", "korea", "global"]) {
        if (!(region in item.release)) errors.push(`${location}.release.${region} is missing`);
        else validateRelease(item.release[region], `${location}.release.${region}`, errors);
      }
    }

    if (!PRODUCTION_STATUSES.has(item?.productionStatus)) {
      errors.push(`${location}.productionStatus is invalid`);
    }
    if (!FORMATS.has(item?.format)) errors.push(`${location}.format is invalid`);
    if (!ORIGINS.has(item?.origin)) errors.push(`${location}.origin is invalid`);

    if (!Array.isArray(item?.tags) || item.tags.some(tag => !isNonEmptyString(tag))) {
      errors.push(`${location}.tags must contain only non-empty strings`);
    } else if (new Set(item.tags).size !== item.tags.length) {
      errors.push(`${location}.tags contains duplicates`);
    }

    if (item?.poster !== null) {
      if (!item.poster || typeof item.poster !== "object" || !isNonEmptyString(item.poster.src)) {
        errors.push(`${location}.poster metadata requires src`);
      } else if (item.poster.position !== null && !isNonEmptyString(item.poster.position)) {
        errors.push(`${location}.poster.position must be a string or null`);
      }
    }

    if (!item?.links || typeof item.links !== "object" || Array.isArray(item.links)) {
      errors.push(`${location}.links is missing`);
    } else {
      for (const [key, value] of Object.entries(item.links)) {
        if (value !== null && !isHttpUrl(value)) errors.push(`${location}.links.${key} is not a valid HTTP(S) URL`);
      }
    }

    if (!item?.streaming || typeof item.streaming !== "object" || Array.isArray(item.streaming)) {
      errors.push(`${location}.streaming must be an object`);
    } else {
      for (const [platform, value] of Object.entries(item.streaming)) {
        if (!platformIds.has(platform)) errors.push(`${location}.streaming uses unknown platform: ${platform}`);
        if (!isHttpUrl(value)) errors.push(`${location}.streaming.${platform} is not a valid HTTP(S) URL`);
      }
    }

    if (!item?.previousStreaming || typeof item.previousStreaming !== "object" || Array.isArray(item.previousStreaming)) {
      errors.push(`${location}.previousStreaming must be an object`);
    } else {
      const previousUrls = new Set();
      for (const [platform, value] of Object.entries(item.previousStreaming)) {
        const previousLocation = `${location}.previousStreaming.${platform}`;
        if (!platformIds.has(platform)) errors.push(`${previousLocation} uses an unknown platform`);
        if (!isHttpsUrl(value)) errors.push(`${previousLocation} must be a non-empty HTTPS URL`);

        let hostname = "";
        try {
          hostname = new URL(value).hostname.toLowerCase();
        } catch (_) {}
        if (
          hostname === "x.com" || hostname.endsWith(".x.com") ||
          hostname === "twitter.com" || hostname.endsWith(".twitter.com") ||
          hostname === "justwatch.com" || hostname.endsWith(".justwatch.com") ||
          hostname === "myanimelist.net" || hostname.endsWith(".myanimelist.net") ||
          hostname === "anilist.co" || hostname.endsWith(".anilist.co") ||
          hostname === "wikipedia.org" || hostname.endsWith(".wikipedia.org")
        ) {
          errors.push(`${previousLocation} points to a prohibited non-streaming destination`);
        }
        if (previousUrls.has(value)) errors.push(`${previousLocation} duplicates another previous-series URL`);
        previousUrls.add(value);
      }
    }

    if (!item?.verification || typeof item.verification !== "object") {
      errors.push(`${location}.verification is missing`);
    } else {
      if (item.verification.verifiedAt !== null && !isIsoDate(item.verification.verifiedAt)) {
        errors.push(`${location}.verification.verifiedAt is not null or a valid ISO date`);
      } else if (item.verification.verifiedAt > new Date().toISOString().slice(0, 10)) {
        errors.push(`${location}.verification.verifiedAt is in the future`);
      }
      if (!Array.isArray(item.verification.sources)) {
        errors.push(`${location}.verification.sources must be an array`);
      } else {
        if (item.verification.verifiedAt !== null && item.verification.sources.length === 0) {
          errors.push(`${location}.verification.verifiedAt requires at least one source`);
        }
        if (item.verification.verifiedAt === null && item.verification.sources.length > 0) {
          errors.push(`${location}.verification.sources requires verifiedAt`);
        }
        const sourceUrls = new Set();
        for (const [sourceIndex, source] of item.verification.sources.entries()) {
          const sourceLocation = `${location}.verification.sources[${sourceIndex}]`;
          validateSource(source, sourceLocation, errors);
          if (sourceUrls.has(source?.url)) errors.push(`${sourceLocation}.url is duplicated within the anime`);
          sourceUrls.add(source?.url);
        }
      }
    }

    for (const field of ["createdAt", "updatedAt"]) {
      if (item?.[field] !== null && !isIsoDate(item?.[field])) {
        errors.push(`${location}.${field} is not null or a valid ISO date`);
      }
    }
  }

  for (const id of duplicateIds) errors.push(`duplicate anime ID: ${id}`);

  const updateIds = new Set();
  const duplicateUpdateIds = new Set();
  for (const [index, update] of updates.entries()) {
    const location = `updates[${index}]`;
    if (!isNonEmptyString(update?.id)) {
      errors.push(`${location}.id is missing`);
    } else {
      if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(update.id)) {
        errors.push(`${location}.id is not a lowercase ASCII slug: ${update.id}`);
      }
      if (updateIds.has(update.id)) duplicateUpdateIds.add(update.id);
      updateIds.add(update.id);
    }
    if (!ids.has(update?.animeId)) errors.push(`${location}.animeId does not reference an anime`);
    if (!UPDATE_TYPES.has(update?.type)) errors.push(`${location}.type is invalid`);
    if (!isIsoDate(update?.changedAt)) errors.push(`${location}.changedAt is not a valid ISO date`);
    if (!Array.isArray(update?.fields) || update.fields.length === 0 || update.fields.some(field => !isNonEmptyString(field))) {
      errors.push(`${location}.fields must contain at least one non-empty field path`);
    } else if (new Set(update.fields).size !== update.fields.length) {
      errors.push(`${location}.fields contains duplicates`);
    }
    if (update?.summary !== undefined) {
      if (!update.summary || typeof update.summary !== "object" || Array.isArray(update.summary)) {
        errors.push(`${location}.summary must be a localization object`);
      } else if (!["ko", "ja", "en"].some(lang => isNonEmptyString(update.summary[lang]))) {
        errors.push(`${location}.summary has no usable localized value`);
      } else {
        for (const lang of ["ko", "ja", "en"]) {
          if (update.summary[lang] !== undefined && !isNonEmptyString(update.summary[lang])) {
            errors.push(`${location}.summary.${lang} is invalid`);
          }
        }
      }
    }
    if (update?.source !== undefined && update.source !== null) {
      validateSource(update.source, `${location}.source`, errors);
    }
  }
  for (const id of duplicateUpdateIds) errors.push(`duplicate update ID: ${id}`);

  const primaryReleases = anime.map(getPrimaryScheduleRelease).filter(Boolean);
  const verifiedAnime = anime.filter(item => item.verification?.verifiedAt !== null).length;
  const regionReport = Object.fromEntries(["japan", "korea", "global"].map(region => {
    const releases = anime.map(item => item.release?.[region]);
    return [region, {
      confirmed: releases.filter(Boolean).length,
      null: releases.filter(release => release === null).length,
      ...Object.fromEntries([...RELEASE_STATUSES].map(status => [
        status,
        releases.filter(release => release?.status === status).length
      ]))
    }];
  }));
  const report = {
    totalAnime: anime.length,
    uniqueIds: ids.size,
    duplicateIds: [...duplicateIds].sort(),
    entriesByYear: countBy(primaryReleases.map(release => release.year ?? "tba")),
    entriesByMonth: {
      ...Object.fromEntries(months.map(group => [
        group.id,
        primaryReleases.filter(release =>
          release.year === group.year && release.month === group.month
        ).length
      ])),
      "year-only": primaryReleases.filter(release => release.status === "year").length,
      "tba": primaryReleases.filter(release => release.status === "tba").length
    },
    releasePrecision: Object.fromEntries(
      [...RELEASE_STATUSES].map(status => [
        status,
        primaryReleases.filter(release => release.status === status).length
      ])
    ),
    releaseByRegion: regionReport,
    verifiedAnime,
    unverifiedAnime: anime.length - verifiedAnime,
    verificationCoveragePercent: Number(((verifiedAnime / anime.length) * 100).toFixed(1)),
    sourceTypeDistribution: countBy(anime.flatMap(item =>
      (item.verification?.sources || []).map(source => source.type)
    )),
    updateHistory: {
      total: updates.length,
      uniqueIds: updateIds.size,
      duplicateIds: [...duplicateUpdateIds].sort(),
      typeDistribution: countBy(updates.map(update => update.type))
    },
    posterCoverage: anime.filter(item => isNonEmptyString(item.poster?.src)).length,
    posterPositionOverrides: anime.filter(item => isNonEmptyString(item.poster?.position)).length,
    pvCoverage: anime.filter(item => isHttpUrl(item.links?.pv)).length,
    officialCoverage: anime.filter(item => isHttpUrl(item.links?.official)).length,
    streamingCoverage: anime.filter(item =>
      Object.values(item.streaming || {}).some(isHttpUrl)
    ).length,
    localizedTitleCoverage: Object.fromEntries(
      ["ko", "ja", "en"].map(lang => [
        lang,
        anime.filter(item => isNonEmptyString(item.title?.[lang])).length
      ])
    ),
    originDistribution: countBy(anime.map(item => item.origin)),
    formatDistribution: countBy(anime.map(item => item.format)),
    tagDistribution: countBy(anime.flatMap(item => item.tags || []))
  };

  return { errors, warnings, report };
}

try {
  const result = validate();
  console.log(JSON.stringify({
    valid: result.errors.length === 0,
    errors: result.errors,
    warnings: result.warnings,
    report: result.report
  }, null, 2));
  if (result.errors.length) process.exitCode = 1;
} catch (error) {
  console.error(error.stack || error.message);
  process.exitCode = 1;
}
