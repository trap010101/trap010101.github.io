// Detect the default streaming region from browser country signals without IP geolocation.
// A user-selected region always wins and remains persistent.
(() => {
  const REGION_KEY = 'animeStreamingRegion';
  const SOURCE_KEY = 'animeStreamingRegionSource';
  const SUPPORTED = new Set(['kr', 'jp', 'us']);
  const COUNTRY_TO_REGION = { KR: 'kr', JP: 'jp', US: 'us' };

  const safeGet = key => {
    try { return localStorage.getItem(key); } catch (_) { return null; }
  };

  const safeSet = (key, value) => {
    try { localStorage.setItem(key, value); } catch (_) {}
  };

  const primaryLocale = () => {
    if (Array.isArray(navigator.languages) && navigator.languages.length) {
      return String(navigator.languages[0] || '');
    }
    return String(navigator.language || '');
  };

  const localeCountry = locale => {
    if (!locale) return null;
    const normalized = locale.replace(/_/g, '-');
    try {
      const region = new Intl.Locale(normalized).region;
      if (region) return region.toUpperCase();
    } catch (_) {}

    const match = normalized.match(/-([A-Za-z]{2})(?:-|$)/);
    return match ? match[1].toUpperCase() : null;
  };

  const timezoneRegion = () => {
    let zone = '';
    try { zone = Intl.DateTimeFormat().resolvedOptions().timeZone || ''; } catch (_) {}

    if (zone === 'Asia/Seoul') return 'kr';
    if (zone === 'Asia/Tokyo') return 'jp';

    const usZones = new Set([
      'America/New_York',
      'America/Detroit',
      'America/Chicago',
      'America/Menominee',
      'America/Denver',
      'America/Boise',
      'America/Phoenix',
      'America/Los_Angeles',
      'America/Anchorage',
      'America/Juneau',
      'America/Metlakatla',
      'America/Nome',
      'America/Sitka',
      'America/Yakutat',
      'America/Adak',
      'Pacific/Honolulu'
    ]);

    if (
      usZones.has(zone) ||
      zone.startsWith('America/Indiana/') ||
      zone.startsWith('America/Kentucky/') ||
      zone.startsWith('America/North_Dakota/')
    ) return 'us';

    return null;
  };

  const languageFallback = locale => {
    const language = String(locale || '').toLowerCase().split(/[-_]/)[0];
    if (language === 'ko') return 'kr';
    if (language === 'ja') return 'jp';
    return 'us';
  };

  const detectRegion = () => {
    const locale = primaryLocale();
    const country = localeCountry(locale);
    const fromCountry = country ? COUNTRY_TO_REGION[country] : null;
    if (SUPPORTED.has(fromCountry)) return fromCountry;

    const fromTimezone = timezoneRegion();
    if (SUPPORTED.has(fromTimezone)) return fromTimezone;

    return languageFallback(locale);
  };

  const existingRegion = safeGet(REGION_KEY);
  const existingSource = safeGet(SOURCE_KEY);

  // Older versions only persisted the region after an explicit user choice,
  // so an existing unmarked value is preserved as a manual preference.
  if (SUPPORTED.has(existingRegion) && !existingSource) {
    safeSet(SOURCE_KEY, 'manual');
  } else if (existingSource !== 'manual' || !SUPPORTED.has(existingRegion)) {
    const detected = detectRegion();
    safeSet(REGION_KEY, detected);
    safeSet(SOURCE_KEY, 'auto');
  }

  window.detectDefaultStreamingRegion = detectRegion;

  // Any explicit click on a region option converts the stored value to a manual preference.
  document.addEventListener('click', event => {
    const option = event.target.closest?.('[data-stream-region], [data-detail-stream-region]');
    if (!option) return;
    safeSet(SOURCE_KEY, 'manual');
  });
})();
