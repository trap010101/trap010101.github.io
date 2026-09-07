# Structured schedules

The production data remains `window.animeData` in `data/anime.js` plus the two additive records in `data/anime-20260904.js`. Existing `release.japan`, `release.global`, `release.korea`, season, format, and tag fields still drive the calendar. Do not derive days or times from coarse month/year values.

```js
schedule: {
  premiere: {
    type: "streaming",       // tv | streaming | theatrical; extensible to ova | special
    date: "2026-09-30",      // official published calendar day, strict YYYY-MM-DD
    time: "24:30",           // HH:mm, or null if unconfirmed; supported 00:00–49:59
    timezone: "Asia/Tokyo",  // required IANA zone, never the viewer's local zone
    displayTime: "24:30"     // official notation, or null for unknown/theatrical
  },
  broadcast: {              // optional, only for a distinct later event
    type: "tv",
    date: "2026-10-07",
    time: "24:00",
    timezone: "Asia/Tokyo",
    displayTime: "24:00"
  },
  source: "https://www.tenken-anime.com/onair.html",
  verifiedAt: "2026-09-07"
}
```

`source` references the supporting URL already registered in `verification.sources`, including its `supports` and source-level `verifiedAt`. `schedule.verifiedAt` applies only to schedule research and does not imply that every other metadata field was rechecked. Keep the existing general verification architecture. For events announced on different pages, register both sources in the existing array and extend event-specific references when needed; all currently paired events are supported by the single linked ON AIR page.

If the earliest regular public premiere cannot be identified, omit `schedule`, or use `premiere: null` with a separately verified `broadcast` event. A known later TV date must not masquerade as a first premiere. Omit optional events rather than duplicating the same TV schedule in both fields.

## Precision and clock normalization

- TV/streaming date only: `time: null`, `displayTime: null`. No precise timestamp is fabricated. Eligible through the end of its source-calendar release date; display D-N / today's localized release wording.
- Theatrical: confirmed opening date, internal `time: "00:00"`, `displayTime: null`. The countdown expires at the opening-day boundary. No clock is displayed and no claim of a midnight screening is made. Consequently films are removed at the start of opening day, as requested by the passed-premiere rule.
- Exact TV/streaming: `schedule-utils.js` converts official wall-clock values to UTC numerically. `2026-10-03 25:30 JST` becomes `2026-10-03T16:30:00Z` (October 4, 01:30 JST); the UI keeps October 3, 25:30.
- Published “深夜1時23分” can be stored as `time: "25:23"`, `displayTime: "深夜1時23分"` on the officially named date. Calculation and presentation never parse each other.
- Japan/Korea use their explicit UTC+9 offset for current scheduling. Other IANA zones use `Intl` offsets; ambiguous DST folds and nonexistent times are rejected. A future DST-fold schema should add an explicit offset before using ambiguous local schedules.

A date-only record has an unknown within-day ordering. The selector uses the start of that source-calendar day as a **sort boundary only**, not a claimed premiere instant. Exact records are sorted by their normalized timestamp, with stable ID tie-breaking.

## Upcoming selection and UI

`AnimeSchedule.UPCOMING_WINDOW_DAYS` in `schedule-utils.js` is the single 30-day configuration value. Exact-time entries qualify when `now < premiere <= now + window`; date-only entries use inclusive source-calendar day distance. Cancelled/released, incomplete, and invalid schedules are excluded.

The carousel reads the full canonical runtime dataset (`allAnimeData`, preserved by `schedule-lifecycle.js`). Initially the nearest eligible title is centered. Keyed DOM cards change transform/opacity, with only three visible slots; 0 hides the section, 1 hides navigation, and 2 uses two distinct cards. Previous/next, local left/right keys and horizontal pointer swipes loop manually, without autoplay. Vertical scrolling uses `touch-action: pan-y pinch-zoom`.

The active countdown uses D-N above 24 hours, localized hours/minutes within 24 hours, and a clock within one hour. Date-only/theatrical and side cards use source-calendar D-N or today's type-aware label. `aria-describedby` exposes countdown text; a polite status announces manual selections/language changes, never every second. Offstage cards are inert. Reduced motion removes transitions.

One timeout schedules the next required update. It changes only visible countdown text unless the eligible set changes. Exact near-release cards tick per second, other exact cards per minute, day-only cards at midnight/eligibility/expiry boundaries. Hidden pages pause timers; offscreen cards stop precision ticks; no future schedules means no timer. Expired items are removed automatically and the selected ID is retained when still eligible.

The focused card opens the existing listing via stable `anime-<id>` anchors. The existing filter state is reset to the title's year/all months, then the matching card receives focus and scroll. Existing resources and detail links remain unchanged.

## Checks and browser fixtures

- `node --test tests/*.test.js`: time normalization, source-day behavior, timestamp expiry, 30-day boundaries, viewer timezone independence, distinct slots/looping, and production source references.
- `node scripts/validate-schedules.js`: effective production records, valid schedules, matching source and verification date, paired-event chronology, counts.
- `node scripts/validate-data.js`: existing full data validator.
- `npm run dev -- --host 0.0.0.0 --port 4173`: dependency-free static preview.
- `/tests/browser.html`: local QA controls for 320/390/768/1280px iframe viewports, 0/1/2/3/8 items, near-release/date-only scenarios and explicit clock advancement. Fixture data is isolated in iframe srcdoc; it never alters production data or the homepage clock. No test hooks run on the production homepage.

See [the complete 132-title research audit](schedule-audit-2026-09-07.md) for sources and unresolved timing.
