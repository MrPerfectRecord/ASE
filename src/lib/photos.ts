"use client";
import { useEffect, useState } from "react";
import { db } from "./firebase";
import { doc, getDoc } from "firebase/firestore";

/**
 * All photo slots that the admin/dev page can edit.
 */
export interface PhotosConfig {
  // Homepage
  homeAbout: string;
  homeWhyUs: string;
  homeCtaBackground: string;

  // Footer
  footerImage: string;

  // About page
  aboutHero: string;
  aboutStory1: string;
  aboutStory2: string;

  // Services
  serviceStructural: string;
  serviceRetrofit: string;
  serviceTruss: string;
  serviceExpertWitness: string;

  // Page hero images (Lumexa-style dark sections)
  careersHero: string;
  contactHero: string;
  servicesHero: string;
}

/**
 * Built-in fallback paths. Used only as a *last-resort* fallback if Firestore
 * has nothing AND localStorage has nothing AND the user has never saved
 * defaults. Components never render these synchronously — they wait for the
 * fetch (with a transparent placeholder showing during the brief load).
 */
export const DEFAULT_PHOTOS: PhotosConfig = {
  homeAbout: "/images/structural-design.jpg",
  homeWhyUs: "/images/expert-witness.jpg",
  homeCtaBackground: "/home-cta-bg.png",
  footerImage: "/images/structural-design.jpg",
  aboutHero: "/home-hero.png",
  aboutStory1: "/images/structural-design.jpg",
  aboutStory2: "/images/retrofit-design.jpg",
  serviceStructural: "/images/structural-design.jpg",
  serviceRetrofit: "/images/retrofit-design.jpg",
  serviceTruss: "/images/truss-design.jpg",
  serviceExpertWitness: "/images/expert-witness.jpg",
  careersHero: "/images/expert-witness.jpg",
  contactHero: "/home-hero.png",
  servicesHero: "/images/structural-design.jpg",
};

/** Empty config used as the *loading* state — every value is "" so consumers
 *  can quickly tell "we don't have data yet, render a placeholder instead". */
export const EMPTY_PHOTOS: PhotosConfig = (
  Object.keys(DEFAULT_PHOTOS) as Array<keyof PhotosConfig>
).reduce<PhotosConfig>(
  (acc, k) => {
    acc[k] = "";
    return acc;
  },
  { ...DEFAULT_PHOTOS }
);

export const PHOTO_LABELS: Record<
  keyof PhotosConfig,
  { label: string; description: string; group: string }
> = {
  homeAbout: {
    label: "Homepage — About section",
    description: "Image next to 'Your engineering partner for a structurally sound future'.",
    group: "Homepage",
  },
  homeWhyUs: {
    label: "Homepage — Why Us",
    description: "Image opposite the four feature cards on the homepage.",
    group: "Homepage",
  },
  homeCtaBackground: {
    label: "Homepage — Bottom CTA banner",
    description: "Background image of the 'What's holding up your structural sign-off?' banner at the very bottom of the homepage.",
    group: "Homepage",
  },
  footerImage: {
    label: "Footer — column 4 image",
    description: "Small image in the footer's 'Follow Us' column.",
    group: "Site-wide",
  },
  aboutHero: {
    label: "About — hero",
    description: "Wide panoramic image at the top of the About page.",
    group: "About",
  },
  aboutStory1: {
    label: "About — Our Story (left)",
    description: "Left image in the two-column 'Our Story' grid.",
    group: "About",
  },
  aboutStory2: {
    label: "About — Our Story (right)",
    description: "Right image in the two-column 'Our Story' grid.",
    group: "About",
  },
  serviceStructural: {
    label: "Service — Structural Design",
    description: "Used on the Structural Design hero, services dropdown, and homepage Services accordion.",
    group: "Services",
  },
  serviceRetrofit: {
    label: "Service — Retrofit Design",
    description: "Used on the Retrofit Design hero, services dropdown, and homepage Services accordion.",
    group: "Services",
  },
  serviceTruss: {
    label: "Service — Truss Design",
    description: "Used on the Truss Design hero, services dropdown, and homepage Services accordion.",
    group: "Services",
  },
  serviceExpertWitness: {
    label: "Service — Expert Witness & Testimony",
    description: "Used on the Expert Witness hero, services dropdown, and homepage Services accordion.",
    group: "Services",
  },
  careersHero: {
    label: "Careers — Hero",
    description: "Square image at the top of the Careers page (left side of the dark hero).",
    group: "Page Heroes",
  },
  contactHero: {
    label: "Contact — Hero",
    description: "Square image at the top of the Contact page (left side of the dark hero).",
    group: "Page Heroes",
  },
  servicesHero: {
    label: "Services — Hero",
    description: "Square image at the top of the Services landing page (left side of the dark hero).",
    group: "Page Heroes",
  },
};

// ─── Cache layer ────────────────────────────────────────────────────────
const STORAGE_KEY = "ase-photos-cache-v1";

let cached: PhotosConfig | null = null;
let inflight: Promise<PhotosConfig> | null = null;
let initialized = false;

/** Sync-prime cache from localStorage on first call (browser only). */
function ensureInit() {
  if (initialized) return;
  initialized = true;
  if (typeof window === "undefined") return;
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return;
    const parsed = JSON.parse(raw);
    if (parsed && typeof parsed === "object") {
      cached = { ...DEFAULT_PHOTOS, ...(parsed as Partial<PhotosConfig>) };
    }
  } catch {
    /* ignore corrupt cache */
  }
}

function persistCache(config: PhotosConfig) {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(config));
  } catch {
    /* ignore quota errors */
  }
}

async function fetchPhotos(): Promise<PhotosConfig> {
  if (cached) return cached;
  if (inflight) return inflight;
  inflight = (async () => {
    try {
      // Resolve in this priority order:
      //   live override  →  user-saved defaults  →  hardcoded built-ins
      const [photosSnap, defaultsSnap] = await Promise.all([
        getDoc(doc(db, "settings", "photos")),
        getDoc(doc(db, "settings", "photoDefaults")),
      ]);
      const userDefaults = defaultsSnap.exists()
        ? (defaultsSnap.data() as Partial<PhotosConfig>)
        : {};
      const liveOverrides = photosSnap.exists()
        ? (photosSnap.data() as Partial<PhotosConfig>)
        : {};
      const merged: PhotosConfig = {
        ...DEFAULT_PHOTOS,
        ...userDefaults,
        ...liveOverrides,
      };
      cached = merged;
      persistCache(merged);
      return merged;
    } catch (err) {
      console.error("Failed to load photos config:", err);
      cached = DEFAULT_PHOTOS;
      return DEFAULT_PHOTOS;
    } finally {
      inflight = null;
    }
  })();
  return inflight;
}

/** Invalidate the in-memory and localStorage caches. */
export function invalidatePhotosCache() {
  cached = null;
  inflight = null;
  if (typeof window !== "undefined") {
    try {
      window.localStorage.removeItem(STORAGE_KEY);
    } catch {
      /* ignore */
    }
  }
}

/** Resolve the "default" image for a slot (Reset button). */
export async function resolveDefault(key: keyof PhotosConfig): Promise<string> {
  try {
    const snap = await getDoc(doc(db, "settings", "photoDefaults"));
    if (snap.exists()) {
      const data = snap.data() as Partial<PhotosConfig>;
      const v = data[key];
      if (typeof v === "string" && v) return v;
    }
  } catch {
    /* fall through */
  }
  return DEFAULT_PHOTOS[key];
}

// ─── Hooks ─────────────────────────────────────────────────────────────
//
// Both hooks return EMPTY values during the initial server render and
// during the very first client paint *if* the localStorage cache is empty.
// Components are expected to treat empty strings as "still loading" and
// render a transparent placeholder.

/** Read a single slot. Returns "" while loading. */
export function usePhoto(key: keyof PhotosConfig): string {
  const [url, setUrl] = useState<string>(""); // SSR-safe initial
  useEffect(() => {
    let mounted = true;
    ensureInit();
    if (cached) {
      setUrl(cached[key]);
    }
    fetchPhotos().then((p) => {
      if (mounted) setUrl(p[key]);
    });
    return () => {
      mounted = false;
    };
  }, [key]);
  return url;
}

/** Read the full config. Returns EMPTY_PHOTOS while loading. */
export function usePhotos(): PhotosConfig {
  const [photos, setPhotos] = useState<PhotosConfig>(EMPTY_PHOTOS);
  useEffect(() => {
    let mounted = true;
    ensureInit();
    if (cached) {
      setPhotos(cached);
    }
    fetchPhotos().then((p) => {
      if (mounted) setPhotos(p);
    });
    return () => {
      mounted = false;
    };
  }, []);
  return photos;
}
