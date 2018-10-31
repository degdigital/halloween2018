const cacheName = 'media-cache';

async function cacheMediaAssets(urls) {
    const cache = await window.caches.open(cacheName);
    return Promise.all(urls.map(url => cacheMediaAsset(url, cache)));
}

async function cacheMediaAsset(url, cache) {
    const networkResponse = await fetch(url);
    return cache.put(url, networkResponse.clone());
}

async function getMediaAsset(url) {
    const cache = await window.caches.open(cacheName);
    const cacheResponse = await cache.match(url);
    if(cacheResponse) {
        return cacheResponse;
    }
    return null;
}

export default {
    cacheMediaAssets,
    getMediaAsset
};