(() => {
  'use strict';

  const LAST_USER_KEY = 'newanime:wishlist:last-user:v1';
  const USER_CACHE_PREFIX = 'newanime:wishlist:user:v1:';
  const MAX_ID_LENGTH = 160;

  let activeUserId = null;
  let syncingLocal = false;
  let lastSynced = new Set();
  let queue = Promise.resolve();

  const normalizeIds = values => [...new Set((Array.isArray(values) ? values : [])
    .filter(value => typeof value === 'string')
    .map(value => value.trim())
    .filter(value => value && value.length <= MAX_ID_LENGTH))];

  const readJsonIds = key => {
    try {
      return normalizeIds(JSON.parse(localStorage.getItem(key) || '[]'));
    } catch (_) {
      return [];
    }
  };

  const writeJsonIds = (key, values) => {
    try {
      localStorage.setItem(key, JSON.stringify(normalizeIds(values)));
    } catch (_) {}
  };

  const publish = (status, detail = {}) => {
    document.dispatchEvent(new CustomEvent('newanime:wishlist-sync', {
      detail: { status, userId: activeUserId, ...detail }
    }));
  };

  function boot() {
    const wishlist = window.NewAnimeWishlist;
    const auth = window.NewAnimeAuth;
    if (!wishlist || !auth?.client) return false;

    const replaceLocal = values => {
      const target = new Set(normalizeIds(values));
      syncingLocal = true;
      try {
        wishlist.getAll().forEach(id => {
          if (!target.has(id)) wishlist.remove(id);
        });
        target.forEach(id => {
          if (!wishlist.has(id)) wishlist.add(id);
        });
      } finally {
        syncingLocal = false;
      }
    };

    const fetchRemote = async userId => {
      const { data, error } = await auth.client
        .from('wishlist')
        .select('anime_id')
        .eq('user_id', userId);
      if (error) throw error;
      return normalizeIds((data || []).map(row => row.anime_id));
    };

    const addRemote = async (userId, ids) => {
      if (!ids.length) return;
      const rows = ids.map(animeId => ({ user_id: userId, anime_id: animeId }));
      const { error } = await auth.client
        .from('wishlist')
        .upsert(rows, { onConflict: 'user_id,anime_id', ignoreDuplicates: true });
      if (error) throw error;
    };

    const removeRemote = async (userId, ids) => {
      if (!ids.length) return;
      const { error } = await auth.client
        .from('wishlist')
        .delete()
        .eq('user_id', userId)
        .in('anime_id', ids);
      if (error) throw error;
    };

    const connectUser = async user => {
      const userId = user?.id;
      if (!userId) return;

      publish('syncing', { phase: 'initial' });

      const previousUserId = localStorage.getItem(LAST_USER_KEY) || '';
      let localIds = normalizeIds(wishlist.getAll());

      if (previousUserId && previousUserId !== userId) {
        writeJsonIds(`${USER_CACHE_PREFIX}${previousUserId}`, localIds);
        localIds = readJsonIds(`${USER_CACHE_PREFIX}${userId}`);
        replaceLocal(localIds);
      } else if (previousUserId === userId) {
        const cachedIds = readJsonIds(`${USER_CACHE_PREFIX}${userId}`);
        localIds = normalizeIds([...cachedIds, ...localIds]);
        replaceLocal(localIds);
      }

      const remoteIds = await fetchRemote(userId);
      const remoteSet = new Set(remoteIds);
      const missingRemote = localIds.filter(id => !remoteSet.has(id));

      await addRemote(userId, missingRemote);

      const merged = normalizeIds([...remoteIds, ...localIds]);
      replaceLocal(merged);
      writeJsonIds(`${USER_CACHE_PREFIX}${userId}`, merged);
      localStorage.setItem(LAST_USER_KEY, userId);

      activeUserId = userId;
      lastSynced = new Set(merged);
      publish('synced', { phase: 'initial', count: merged.length });
    };

    const pushSnapshot = async snapshot => {
      const userId = activeUserId;
      if (!userId) return;

      const nextIds = normalizeIds(snapshot);
      const next = new Set(nextIds);
      const previous = new Set(lastSynced);
      const added = nextIds.filter(id => !previous.has(id));
      const removed = [...previous].filter(id => !next.has(id));

      if (!added.length && !removed.length) {
        writeJsonIds(`${USER_CACHE_PREFIX}${userId}`, nextIds);
        return;
      }

      publish('syncing', { phase: 'delta' });

      try {
        await addRemote(userId, added);
        await removeRemote(userId, removed);
        lastSynced = next;
        writeJsonIds(`${USER_CACHE_PREFIX}${userId}`, nextIds);
        publish('synced', { phase: 'delta', count: nextIds.length });
      } catch (error) {
        lastSynced = previous;
        publish('error', { phase: 'delta' });
        console.warn('Wishlist cloud sync failed.', error);
      }
    };

    const handleAuth = detail => {
      const user = detail?.user || null;

      if (!user) {
        const signedOutUserId = activeUserId;
        if (signedOutUserId) {
          writeJsonIds(`${USER_CACHE_PREFIX}${signedOutUserId}`, wishlist.getAll());
          replaceLocal([]);
        }
        activeUserId = null;
        lastSynced = new Set();
        publish('signed-out', { cleared: Boolean(signedOutUserId), count: 0 });
        return;
      }

      queue = queue
        .then(() => connectUser(user))
        .catch(error => {
          publish('error', { phase: 'initial' });
          console.warn('Initial wishlist cloud sync failed.', error);
        });
    };

    document.addEventListener('newanime:auth', event => {
      handleAuth(event.detail || {});
    });

    document.addEventListener('newanime:wishlist', event => {
      if (syncingLocal) return;

      const ids = normalizeIds(event.detail?.ids || wishlist.getAll());

      if (activeUserId) {
        writeJsonIds(`${USER_CACHE_PREFIX}${activeUserId}`, ids);
      }

      if (!activeUserId) return;
      queue = queue.then(() => pushSnapshot(ids));
    });

    const currentUser = auth.getUser?.();
    if (currentUser) handleAuth({ user: currentUser });

    window.NewAnimeWishlistSync = Object.freeze({
      syncNow() {
        const user = auth.getUser?.();
        if (!user) return Promise.resolve(false);
        queue = queue.then(() => connectUser(user));
        return queue.then(() => true);
      }
    });

    return true;
  }

  if (boot()) return;

  let attempts = 0;
  const timer = window.setInterval(() => {
    attempts += 1;
    if (boot() || attempts >= 100) window.clearInterval(timer);
  }, 50);
})();
