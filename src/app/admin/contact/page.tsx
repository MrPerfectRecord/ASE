"use client";
import { useState, useEffect } from "react";
import { db } from "@/lib/firebase";
import { doc, getDoc, setDoc } from "firebase/firestore";

interface ContactInfo {
  address: string;
  phone: string;
  email: string;
  hoursWeekday: string;
  hoursFriday: string;
}

const defaults: ContactInfo = {
  address: "South Jordan, Utah",
  phone: "(602) 313-1422",
  email: "admin@azstructuralexperts.com",
  hoursWeekday: "Monday – Thursday 7am to 5pm",
  hoursFriday: "Friday 8am to 12pm",
};

export default function AdminContactPage() {
  const [form, setForm] = useState<ContactInfo>(defaults);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    const fetch = async () => {
      const snap = await getDoc(doc(db, "settings", "contact"));
      if (snap.exists()) {
        setForm({ ...defaults, ...snap.data() } as ContactInfo);
      }
      setLoading(false);
    };
    fetch();
  }, []);

  const handleSave = async () => {
    setSaving(true);
    await setDoc(doc(db, "settings", "contact"), form);
    setSaving(false);
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  if (loading) {
    return (
      <div className="p-8">
        <p className="text-steel-400 text-sm">Loading…</p>
      </div>
    );
  }

  return (
    <div className="p-8 max-w-2xl">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-steel-800">Contact Info</h1>
        <p className="text-steel-500 text-sm mt-1">
          Update the address, phone, email, and hours shown on the Contact page.
        </p>
      </div>

      <div className="bg-white border border-steel-200/40 rounded-lg p-6 shadow-sm space-y-5">
        <div>
          <label className="form-label">Visit Us — Address</label>
          <input
            className="form-input"
            value={form.address}
            onChange={(e) => setForm({ ...form, address: e.target.value })}
            placeholder="e.g. South Jordan, Utah"
          />
          <p className="text-xs text-steel-400 mt-1">
            This appears as the clickable office location link.
          </p>
        </div>

        <div>
          <label className="form-label">Weekday Hours</label>
          <input
            className="form-input"
            value={form.hoursWeekday}
            onChange={(e) => setForm({ ...form, hoursWeekday: e.target.value })}
            placeholder="e.g. Monday – Thursday 7am to 5pm"
          />
        </div>

        <div>
          <label className="form-label">Friday Hours</label>
          <input
            className="form-input"
            value={form.hoursFriday}
            onChange={(e) => setForm({ ...form, hoursFriday: e.target.value })}
            placeholder="e.g. Friday 8am to 12pm"
          />
        </div>

        <div>
          <label className="form-label">Phone Support</label>
          <input
            className="form-input"
            value={form.phone}
            onChange={(e) => setForm({ ...form, phone: e.target.value })}
            placeholder="e.g. (602) 313-1422"
          />
        </div>

        <div>
          <label className="form-label">Email Inquiries</label>
          <input
            type="email"
            className="form-input"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            placeholder="e.g. admin@azstructuralexperts.com"
          />
        </div>

        <div className="pt-2 flex items-center gap-4">
          <button
            onClick={handleSave}
            disabled={saving}
            className="btn-primary disabled:opacity-50"
          >
            {saving ? "Saving…" : "Save Changes"}
          </button>
          {saved && (
            <span className="text-sm text-green-600 font-medium">
              ✓ Saved!
            </span>
          )}
        </div>
      </div>
    </div>
  );
}
