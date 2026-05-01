"use client";
import { useEffect, useRef, useState } from "react";
import { auth, db, storage } from "@/lib/firebase";
import {
  reauthenticateWithCredential,
  EmailAuthProvider,
} from "firebase/auth";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import {
  DEFAULT_PHOTOS,
  PHOTO_LABELS,
  invalidatePhotosCache,
  resolveDefault,
  type PhotosConfig,
} from "@/lib/photos";

export default function AdminDevPage() {
  const [unlocked, setUnlocked] = useState(false);
  const [password, setPassword] = useState("");
  const [authing, setAuthing] = useState(false);
  const [authError, setAuthError] = useState("");

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    const user = auth.currentUser;
    if (!user || !user.email) {
      setAuthError("You must be signed in as an admin.");
      return;
    }
    setAuthing(true);
    setAuthError("");
    try {
      const credential = EmailAuthProvider.credential(user.email, password);
      await reauthenticateWithCredential(user, credential);
      setUnlocked(true);
    } catch {
      setAuthError("Incorrect password.");
    } finally {
      setAuthing(false);
    }
  };

  if (!unlocked) {
    return (
      <div className="p-8 max-w-md mx-auto pt-24">
        <h1 className="text-2xl font-bold text-steel-800 mb-2">
          Developer Tools
        </h1>
        <p className="text-steel-500 text-sm mb-8">
          Confirm your admin password to continue. This is a restricted area
          for managing the public-facing photos used across the site.
        </p>
        <form
          onSubmit={handleAuth}
          className="bg-white border border-steel-200/40 rounded-lg p-6 shadow-sm space-y-4"
        >
          <div>
            <label className="form-label">Admin Password</label>
            <input
              type="password"
              className="form-input"
              autoFocus
              autoComplete="current-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            {authError && (
              <p className="text-sm text-red-500 mt-2" role="alert">
                {authError}
              </p>
            )}
          </div>
          <button
            type="submit"
            disabled={authing || !password}
            className="btn-primary w-full disabled:opacity-50"
          >
            {authing ? "Verifying…" : "Unlock"}
          </button>
        </form>
      </div>
    );
  }

  return <PhotoManager />;
}

// ─── Photo manager UI (shown after password unlock) ─────────────────

function PhotoManager() {
  const [photos, setPhotos] = useState<PhotosConfig>(DEFAULT_PHOTOS);
  const [loading, setLoading] = useState(true);
  const [saveDefaultsState, setSaveDefaultsState] = useState<
    "idle" | "saving" | "saved" | "error"
  >("idle");

  useEffect(() => {
    const load = async () => {
      try {
        const snap = await getDoc(doc(db, "settings", "photos"));
        if (snap.exists()) {
          setPhotos({
            ...DEFAULT_PHOTOS,
            ...(snap.data() as Partial<PhotosConfig>),
          });
        }
      } catch (err) {
        console.error("Failed to load photos:", err);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  const updateSlot = (key: keyof PhotosConfig, url: string) => {
    setPhotos((prev) => ({ ...prev, [key]: url }));
  };

  const handleSaveAsDefaults = async () => {
    if (
      !confirm(
        "Lock in the current photos as the new built-in defaults? Going forward, every 'Reset to default' will revert to these images instead of the original placeholders."
      )
    )
      return;
    setSaveDefaultsState("saving");
    try {
      // Snapshot the current live photos config into the defaults doc.
      const snapshot = { ...photos, updatedAt: Date.now() };
      await setDoc(doc(db, "settings", "photoDefaults"), snapshot);
      invalidatePhotosCache();
      setSaveDefaultsState("saved");
      setTimeout(() => setSaveDefaultsState("idle"), 3000);
    } catch (err) {
      console.error("Failed to save defaults:", err);
      setSaveDefaultsState("error");
      setTimeout(() => setSaveDefaultsState("idle"), 3000);
    }
  };

  // Group slots by their `group` field so they render with section headers.
  const grouped: Record<string, Array<keyof PhotosConfig>> = {};
  (Object.keys(PHOTO_LABELS) as Array<keyof PhotosConfig>).forEach((k) => {
    const g = PHOTO_LABELS[k].group;
    if (!grouped[g]) grouped[g] = [];
    grouped[g].push(k);
  });

  return (
    <div className="p-8 max-w-5xl">
      <div className="flex items-start justify-between gap-6 mb-8">
        <div>
          <h1 className="text-2xl font-bold text-steel-800">Photo Manager</h1>
          <p className="text-steel-500 text-sm mt-1 max-w-2xl">
            Replace any image used across the public site. Uploads save
            independently — refresh the public page after saving to see it live.
          </p>
        </div>
        <div className="flex flex-col items-end gap-2 shrink-0">
          <button
            onClick={handleSaveAsDefaults}
            disabled={saveDefaultsState === "saving"}
            className="btn-outline-dark disabled:opacity-50 whitespace-nowrap"
          >
            {saveDefaultsState === "saving"
              ? "Saving…"
              : "Lock in current as defaults"}
          </button>
          {saveDefaultsState === "saved" && (
            <span className="text-xs text-green-600 font-medium">
              ✓ Defaults saved
            </span>
          )}
          {saveDefaultsState === "error" && (
            <span className="text-xs text-red-500 font-medium">
              Save failed — see console
            </span>
          )}
        </div>
      </div>

      {loading ? (
        <p className="text-steel-400 text-sm">Loading current photos…</p>
      ) : (
        <div className="space-y-10">
          {Object.entries(grouped).map(([group, keys]) => (
            <section key={group}>
              <h2 className="text-[10px] font-bold uppercase tracking-[0.18em] text-accent-500 mb-3">
                {group}
              </h2>
              <div className="space-y-3">
                {keys.map((key) => (
                  <PhotoSlot
                    key={key}
                    slotKey={key}
                    currentUrl={photos[key]}
                    onChange={(url) => updateSlot(key, url)}
                  />
                ))}
              </div>
            </section>
          ))}
        </div>
      )}
    </div>
  );
}

// ─── Single editable photo slot ────────────────────────────────────

function PhotoSlot({
  slotKey,
  currentUrl,
  onChange,
}: {
  slotKey: keyof PhotosConfig;
  currentUrl: string;
  onChange: (url: string) => void;
}) {
  const [uploading, setUploading] = useState(false);
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const fileRef = useRef<HTMLInputElement>(null);
  const meta = PHOTO_LABELS[slotKey];

  const flashSaved = () => {
    setSaved(true);
    setError(null);
    setTimeout(() => setSaved(false), 2500);
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    setError(null);
    try {
      const sref = ref(storage, `photos/${slotKey}-${Date.now()}-${file.name}`);
      await uploadBytes(sref, file);
      const url = await getDownloadURL(sref);
      await setDoc(
        doc(db, "settings", "photos"),
        { [slotKey]: url, updatedAt: Date.now() },
        { merge: true }
      );
      onChange(url);
      invalidatePhotosCache();
      flashSaved();
    } catch (err) {
      console.error("Upload failed:", err);
      setError("Upload failed. Check console for details.");
    } finally {
      setUploading(false);
      if (fileRef.current) fileRef.current.value = "";
    }
  };

  const handleReset = async () => {
    if (!confirm(`Reset "${meta.label}" to the saved default image?`)) return;
    try {
      const fallback = await resolveDefault(slotKey);
      await setDoc(
        doc(db, "settings", "photos"),
        { [slotKey]: fallback, updatedAt: Date.now() },
        { merge: true }
      );
      onChange(fallback);
      invalidatePhotosCache();
      flashSaved();
    } catch (err) {
      console.error("Reset failed:", err);
      setError("Reset failed. Check console for details.");
    }
  };

  return (
    <div className="bg-white border border-steel-200/40 rounded-lg p-5 flex gap-5 items-start shadow-sm">
      <div className="w-32 h-24 flex-shrink-0 bg-steel-100 rounded overflow-hidden border border-steel-200/60">
        <img
          src={currentUrl}
          alt={meta.label}
          className="w-full h-full object-cover"
        />
      </div>
      <div className="flex-1 min-w-0">
        <h3 className="font-bold text-steel-800 text-sm">{meta.label}</h3>
        <p className="text-xs text-steel-500 mt-0.5 mb-3 leading-relaxed">
          {meta.description}
        </p>
        <div className="flex items-center gap-3 flex-wrap">
          <input
            ref={fileRef}
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            disabled={uploading}
            className="text-xs text-steel-600 file:mr-3 file:py-1.5 file:px-3 file:rounded file:border-0 file:text-xs file:font-semibold file:bg-steel-100 file:text-steel-700 hover:file:bg-steel-200 disabled:opacity-50"
          />
          <button
            type="button"
            onClick={handleReset}
            disabled={uploading}
            className="text-xs font-semibold text-steel-500 hover:underline disabled:opacity-50"
          >
            Reset to default
          </button>
          {uploading && (
            <span className="text-xs text-accent-500 font-medium">
              Uploading…
            </span>
          )}
          {saved && (
            <span className="text-xs text-green-600 font-medium">✓ Saved</span>
          )}
          {error && (
            <span className="text-xs text-red-500 font-medium">{error}</span>
          )}
        </div>
      </div>
    </div>
  );
}
