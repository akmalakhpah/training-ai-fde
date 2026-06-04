// Single source of truth for asset cache-busting.
// Bump this number on any change to a JS/CSS asset and push — that's the whole
// deploy ritual. Every HTML page reads window.ASSET_V at runtime and appends
// ?v=<ASSET_V> to its script/stylesheet URLs, so no other file needs editing.
// This file itself carries no ?v= and rides GitHub Pages' ~10-min cache TTL,
// which is what propagates the new version to browsers after a push.
window.ASSET_V = "31";
