#!/usr/bin/env node

// Prints a validated update-history record for pasting into data/updates.js.
const fs = require("fs");
const path = require("path");
const vm = require("vm");

const UPDATE_TYPES = new Set([
  "anime-added", "release-window", "release-date", "release-delay",
  "release-cancelled", "title", "poster", "pv", "official-link",
  "streaming-added", "streaming-removed", "streaming-updated", "format",
  "source", "other"
]);

function usage() {
  console.log(`Usage:
  node scripts/create-update.js --anime-id ID --type TYPE --fields FIELD[,FIELD]
    --summary-ko TEXT --summary-ja TEXT --summary-en TEXT
    [--date YYYY-MM-DD] [--source-type TYPE --source-url URL --source-label TEXT]

The command does not edit production data; it prints a canonical record to review.`);
}

function parseArgs(values) {
  const parsed = {};
  for (let index = 0; index < values.length; index += 2) {
    const key = values[index];
    const value = values[index + 1];
    if (!key?.startsWith("--") || value === undefined) throw new Error(`Invalid argument near ${key || "end"}`);
    parsed[key.slice(2)] = value;
  }
  return parsed;
}

function isIsoDate(value) {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(value || "")) return false;
  return new Date(`${value}T00:00:00Z`).toISOString().slice(0, 10) === value;
}

if (process.argv.includes("--help") || process.argv.length === 2) {
  usage();
  process.exit(0);
}

try {
  const args = parseArgs(process.argv.slice(2));
  const changedAt = args.date || new Date().toISOString().slice(0, 10);
  const required = ["anime-id", "type", "fields", "summary-ko", "summary-ja", "summary-en"];
  for (const field of required) {
    if (!args[field]?.trim()) throw new Error(`Missing --${field}`);
  }
  if (!UPDATE_TYPES.has(args.type)) throw new Error(`Unknown update type: ${args.type}`);
  if (!isIsoDate(changedAt)) throw new Error(`Invalid ISO date: ${changedAt}`);

  const context = { window: {} };
  vm.createContext(context);
  const animeFile = path.resolve(__dirname, "../data/anime.js");
  vm.runInContext(fs.readFileSync(animeFile, "utf8"), context, { filename: animeFile });
  if (!context.window.animeData.some(anime => anime.id === args["anime-id"])) {
    throw new Error(`Unknown anime ID: ${args["anime-id"]}`);
  }

  const fields = args.fields.split(",").map(field => field.trim()).filter(Boolean);
  if (fields.length === 0) throw new Error("At least one field path is required");
  const record = {
    id: `${changedAt}-${args["anime-id"]}-${args.type}`,
    animeId: args["anime-id"],
    changedAt,
    type: args.type,
    fields,
    summary: {
      ko: args["summary-ko"],
      ja: args["summary-ja"],
      en: args["summary-en"]
    }
  };

  const sourceValues = [args["source-type"], args["source-url"], args["source-label"]];
  if (sourceValues.some(Boolean)) {
    if (!sourceValues.every(value => value?.trim())) {
      throw new Error("Source type, URL, and label must be provided together");
    }
    const url = new URL(args["source-url"]);
    if (!["http:", "https:"].includes(url.protocol)) throw new Error("Source URL must use HTTP(S)");
    record.source = {
      type: args["source-type"],
      url: args["source-url"],
      label: args["source-label"]
    };
  }

  console.log(JSON.stringify(record, null, 2));
} catch (error) {
  console.error(error.message);
  process.exitCode = 1;
}
