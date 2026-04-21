"use client";
import { useEffect, useMemo, useState } from "react";
import { db } from "@/lib/firebase";
import { doc, getDoc, setDoc } from "firebase/firestore";

type License = "none" | "pe" | "se" | "pese";

// Full list of jurisdictions we support: 50 states + DC + USVI.
const ALL_JURISDICTIONS: { abbr: string; name: string }[] = [
  { abbr: "AL", name: "Alabama" },
  { abbr: "AK", name: "Alaska" },
  { abbr: "AZ", name: "Arizona" },
  { abbr: "AR", name: "Arkansas" },
  { abbr: "CA", name: "California" },
  { abbr: "CO", name: "Colorado" },
  { abbr: "CT", name: "Connecticut" },
  { abbr: "DE", name: "Delaware" },
  { abbr: "DC", name: "Washington DC" },
  { abbr: "FL", name: "Florida" },
  { abbr: "GA", name: "Georgia" },
  { abbr: "HI", name: "Hawaii" },
  { abbr: "ID", name: "Idaho" },
  { abbr: "IL", name: "Illinois" },
  { abbr: "IN", name: "Indiana" },
  { abbr: "IA", name: "Iowa" },
  { abbr: "KS", name: "Kansas" },
  { abbr: "KY", name: "Kentucky" },
  { abbr: "LA", name: "Louisiana" },
  { abbr: "ME", name: "Maine" },
  { abbr: "MD", name: "Maryland" },
  { abbr: "MA", name: "Massachusetts" },
  { abbr: "MI", name: "Michigan" },
  { abbr: "MN", name: "Minnesota" },
  { abbr: "MS", name: "Mississippi" },
  { abbr: "MO", name: "Missouri" },
  { abbr: "MT", name: "Montana" },
  { abbr: "NE", name: "Nebraska" },
  { abbr: "NV", name: "Nevada" },
  { abbr: "NH", name: "New Hampshire" },
  { abbr: "NJ", name: "New Jersey" },
  { abbr: "NM", name: "New Mexico" },
  { abbr: "NY", name: "New York" },
  { abbr: "NC", name: "North Carolina" },
  { abbr: "ND", name: "North Dakota" },
  { abbr: "OH", name: "Ohio" },
  { abbr: "OK", name: "Oklahoma" },
  { abbr: "OR", name: "Oregon" },
  { abbr: "PA", name: "Pennsylvania" },
  { abbr: "RI", name: "Rhode Island" },
  { abbr: "SC", name: "South Carolina" },
  { abbr: "SD", name: "South Dakota" },
  { abbr: "TN", name: "Tennessee" },
  { abbr: "TX", name: "Texas" },
  { abbr: "UT", name: "Utah" },
  { abbr: "VT", name: "Vermont" },
  { abbr: "VA", name: "Virginia" },
  { abbr: "WA", name: "Washington" },
  { abbr: "WV", name: "West Virginia" },
  { abbr: "WI", name: "Wisconsin" },
  { abbr: "WY", name: "Wyoming" },
  { abbr: "VI", name: "US Virgin Islands" },
];

// Defaults mirror the original hardcoded arrays in USMap.tsx.
const DEFAULTS: Record<License, string[]> = {
  pe: ["AL", "AR", "CO", "FL", "KY", "LA", "NM", "NC", "OR", "SC", "TN", "TX", "VI"],
  se: ["HI", "IL", "NE", "NV"],
  pese: ["AZ", "CA", "UT", "DC"],
  none: [],
};

const LICENSE_OPTIONS: { value: License; label: string; color: string }[] = [
  { value: "none", label: "Not licensed", color: "bg-steel-100 text-steel-600 border-steel-200" },
  { value: "pe", label: "PE only", color: "bg-primary-500 text-white border-primary-500" },
  { value: "se", label: "SE only", color: "bg-accent-500 text-white border-accent-500" },
  { value: "pese", label: "PE & SE", color: "bg-steel-700 text-white border-steel-700" },
];

function assignmentsFromArrays(d: { pe: string[]; se: string[]; pese: string[] }): Record<string, License> {
  const map: Record<string, License> = {};
  ALL_JURISDICTIONS.forEach((j) => (map[j.abbr] = "none"));
  d.pe.forEach((a) => (map[a] = "pe"));
  d.se.forEach((a) => (map[a] = "se"));
  d.pese.forEach((a) => (map[a] = "pese"));
  return map;
}

function arraysFromAssignments(a: Record<string, License>): { pe: string[]; se: string[]; pese: string[] } {
  const pe: string[] = [], se: string[] = [], pese: string[] = [];
  ALL_JURISDICTIONS.forEach(({ abbr }) => {
    const lic = a[abbr];
    if (lic === "pe") pe.push(abbr);
    else if (lic === "se") se.push(abbr);
    else if (lic === "pese") pese.push(abbr);
  });
  return { pe, se, pese };
}

export default function AdminJurisdictionsPage() {
  const [assignments, setAssignments] = useState<Record<string, License>>(() =>
    assignmentsFromArrays({ pe: DEFAULTS.pe, se: DEFAULTS.se, pese: DEFAULTS.pese })
  );
  const [initial, setInitial] = useState<Record<string, License> | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const load = async () => {
      try {
        const snap = await getDoc(doc(db, "settings", "jurisdictions"));
        if (snap.exists()) {
          const data = snap.data() as { peOnly?: string[]; seOnly?: string[]; peSe?: string[] };
          const a = assignmentsFromArrays({
            pe: data.peOnly ?? [],
            se: data.seOnly ?? [],
            pese: data.peSe ?? [],
          });
          setAssignments(a);
          setInitial(a);
        } else {
          const a = assignmentsFromArrays({ pe: DEFAULTS.pe, se: DEFAULTS.se, pese: DEFAULTS.pese });
          setAssignments(a);
          setInitial(a);
        }
      } catch (err) {
        console.error("Failed to load jurisdictions:", err);
        setError("Could not load current jurisdictions.");
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  const dirty = useMemo(() => {
    if (!initial) return false;
    return ALL_JURISDICTIONS.some(({ abbr }) => initial[abbr] !== assignments[abbr]);
  }, [assignments, initial]);

  const counts = useMemo(() => {
    let pe = 0, se = 0, pese = 0;
    ALL_JURISDICTIONS.forEach(({ abbr }) => {
      const l = assignments[abbr];
      if (l === "pe") pe++;
      else if (l === "se") se++;
      else if (l === "pese") pese++;
    });
    return { pe, se, pese };
  }, [assignments]);

  const setLicense = (abbr: string, lic: License) => {
    setAssignments((prev) => ({ ...prev, [abbr]: lic }));
    setSaved(false);
  };

  const handleSave = async () => {
    setSaving(true);
    setError(null);
    try {
      const arrs = arraysFromAssignments(assignments);
      await setDoc(doc(db, "settings", "jurisdictions"), {
        peOnly: arrs.pe,
        seOnly: arrs.se,
        peSe: arrs.pese,
        updatedAt: Date.now(),
      });
      setInitial({ ...assignments });
      setSaved(true);
      setTimeout(() => setSaved(false), 2500);
    } catch (err) {
      console.error("Failed to save jurisdictions:", err);
      setError("Save failed. Check console for details.");
    } finally {
      setSaving(false);
    }
  };

  const handleReset = () => {
    if (!initial) return;
    setAssignments({ ...initial });
    setSaved(false);
  };

  return (
    <div className="p-8 max-w-5xl">
      <div className="flex items-start justify-between mb-8 gap-6">
        <div>
          <h1 className="text-2xl font-bold text-steel-800">Licensed Jurisdictions</h1>
          <p className="text-steel-500 text-sm mt-1 max-w-2xl">
            Set each U.S. state, DC, and USVI to the license type shown on the public map and
            jurisdiction list. Save to publish your changes.
          </p>
        </div>
        <div className="flex gap-3 shrink-0">
          {dirty && (
            <button onClick={handleReset} className="btn-outline-dark">Reset</button>
          )}
          <button
            onClick={handleSave}
            disabled={!dirty || saving}
            className="btn-primary disabled:opacity-50"
          >
            {saving ? "Saving…" : saved ? "Saved" : "Save Changes"}
          </button>
        </div>
      </div>

      {/* Summary counts */}
      <div className="grid grid-cols-3 gap-4 mb-6">
        <div className="bg-white border border-steel-200/40 rounded-lg p-4">
          <p className="text-[10px] font-bold uppercase tracking-[0.12em] text-accent-500">PE Only</p>
          <p className="text-2xl font-bold text-steel-800 mt-1">{counts.pe}</p>
        </div>
        <div className="bg-white border border-steel-200/40 rounded-lg p-4">
          <p className="text-[10px] font-bold uppercase tracking-[0.12em] text-accent-500">SE Only</p>
          <p className="text-2xl font-bold text-steel-800 mt-1">{counts.se}</p>
        </div>
        <div className="bg-white border border-steel-200/40 rounded-lg p-4">
          <p className="text-[10px] font-bold uppercase tracking-[0.12em] text-accent-500">PE &amp; SE</p>
          <p className="text-2xl font-bold text-steel-800 mt-1">{counts.pese}</p>
        </div>
      </div>

      {error && (
        <div className="mb-4 px-4 py-3 bg-red-50 border border-red-200 rounded text-sm text-red-700">
          {error}
        </div>
      )}

      {dirty && !saving && !saved && (
        <div className="mb-4 px-4 py-3 bg-yellow-50 border border-yellow-200 rounded text-sm text-yellow-800">
          You have unsaved changes.
        </div>
      )}

      {loading ? (
        <p className="text-steel-400 text-sm">Loading…</p>
      ) : (
        <div className="bg-white border border-steel-200/40 rounded-lg overflow-hidden">
          <div className="grid grid-cols-[1fr_auto] items-center px-5 py-3 bg-steel-50 border-b border-steel-200/40 text-[10px] font-bold uppercase tracking-[0.12em] text-steel-500">
            <span>Jurisdiction</span>
            <span>License Type</span>
          </div>
          <div className="divide-y divide-steel-200/40">
            {ALL_JURISDICTIONS.map(({ abbr, name }) => {
              const current = assignments[abbr] ?? "none";
              return (
                <div
                  key={abbr}
                  className="grid grid-cols-[1fr_auto] items-center gap-4 px-5 py-3 hover:bg-steel-50/50"
                >
                  <div className="flex items-center gap-3">
                    <span className="text-[10px] font-bold uppercase tracking-wide text-steel-400 w-8">
                      {abbr}
                    </span>
                    <span className="text-sm text-steel-700">{name}</span>
                  </div>
                  <div className="flex gap-1.5 flex-wrap justify-end">
                    {LICENSE_OPTIONS.map((opt) => {
                      const active = current === opt.value;
                      return (
                        <button
                          key={opt.value}
                          onClick={() => setLicense(abbr, opt.value)}
                          className={`text-xs font-medium px-2.5 py-1 rounded border transition-all ${
                            active
                              ? opt.color
                              : "bg-white text-steel-500 border-steel-200 hover:border-steel-300"
                          }`}
                        >
                          {opt.label}
                        </button>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      <div className="mt-8 text-xs text-steel-400">
        Changes save to <code>settings/jurisdictions</code> in Firestore and take effect on the
        public map as soon as the page is reloaded.
      </div>
    </div>
  );
}
