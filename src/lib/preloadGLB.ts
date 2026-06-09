// src/lib/preloadGLB.ts
// Eagerly fetches the GLB into browser cache before R3F initialises.
// Call this at the top of your page component (module level, not inside a hook).
export function preloadGLB(url: string) {
  if (typeof window === "undefined") return;
  // Use a link preload if not already added
  if (document.querySelector(`link[href="${url}"]`)) return;
  const link = document.createElement("link");
  link.rel = "preload";
  link.as = "fetch";
  link.href = url;
  link.crossOrigin = "anonymous";
  document.head.appendChild(link);
  // Also kick off a fetch so it lands in the HTTP cache immediately
  fetch(url, { mode: "cors", credentials: "same-origin" }).catch(() => {});
}