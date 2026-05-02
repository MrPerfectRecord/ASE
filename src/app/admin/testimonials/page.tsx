"use client";
import { useState, useEffect } from "react";
import { db } from "@/lib/firebase";
import {
  collection, getDocs, addDoc, updateDoc, deleteDoc,
  doc, query, orderBy,
} from "firebase/firestore";

interface Testimonial {
  id: string;
  quote: string;
  name: string;
  title: string;
  active: boolean;
  order: number;
}

const emptyForm = { quote: "", name: "", title: "", active: true };

export default function AdminTestimonialsPage() {
  const [items, setItems] = useState<Testimonial[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editId, setEditId] = useState<string | null>(null);
  const [form, setForm] = useState(emptyForm);
  const [saving, setSaving] = useState(false);
  const [deleting, setDeleting] = useState<string | null>(null);

  const fetchItems = async () => {
    setLoading(true);
    try {
      const q = query(collection(db, "testimonials"), orderBy("order", "asc"));
      const snap = await getDocs(q);
      setItems(snap.docs.map((d) => ({ id: d.id, ...d.data() } as Testimonial)));
    } catch {
      const snap = await getDocs(collection(db, "testimonials"));
      setItems(snap.docs.map((d) => ({ id: d.id, ...d.data() } as Testimonial)));
    }
    setLoading(false);
  };

  useEffect(() => { fetchItems(); }, []);

  const openAdd = () => {
    setEditId(null);
    setForm(emptyForm);
    setShowForm(true);
  };

  const openEdit = (t: Testimonial) => {
    setEditId(t.id);
    setForm({
      quote: t.quote,
      name: t.name,
      title: t.title,
      active: t.active,
    });
    setShowForm(true);
  };

  const cancel = () => {
    setShowForm(false);
    setEditId(null);
  };

  const handleSave = async () => {
    if (!form.quote.trim() || !form.name.trim()) {
      alert("Quote and Name are required.");
      return;
    }
    setSaving(true);
    const data = {
      quote: form.quote.trim(),
      name: form.name.trim(),
      title: form.title.trim(),
      active: form.active,
    };
    if (editId) {
      await updateDoc(doc(db, "testimonials", editId), data);
    } else {
      await addDoc(collection(db, "testimonials"), { ...data, order: items.length });
    }
    setSaving(false);
    setShowForm(false);
    setEditId(null);
    fetchItems();
  };

  const handleDelete = async (id: string, name: string) => {
    if (!confirm(`Delete testimonial from "${name}"?`)) return;
    setDeleting(id);
    await deleteDoc(doc(db, "testimonials", id));
    setDeleting(null);
    fetchItems();
  };

  const toggleActive = async (t: Testimonial) => {
    await updateDoc(doc(db, "testimonials", t.id), { active: !t.active });
    fetchItems();
  };

  const move = async (t: Testimonial, dir: -1 | 1) => {
    const idx = items.findIndex((x) => x.id === t.id);
    const swapIdx = idx + dir;
    if (swapIdx < 0 || swapIdx >= items.length) return;
    const other = items[swapIdx];
    await Promise.all([
      updateDoc(doc(db, "testimonials", t.id), { order: other.order }),
      updateDoc(doc(db, "testimonials", other.id), { order: t.order }),
    ]);
    fetchItems();
  };

  return (
    <div className="p-8 max-w-4xl">
      <div className="flex items-start justify-between mb-8 gap-6">
        <div>
          <h1 className="text-2xl font-bold text-steel-800">Testimonials</h1>
          <p className="text-steel-500 text-sm mt-1 max-w-2xl">
            Manage the &ldquo;What Our Clients Say&rdquo; cards on the homepage.
            The first three active testimonials are shown.
          </p>
        </div>
        {!showForm && (
          <button onClick={openAdd} className="btn-primary shrink-0">
            + Add Testimonial
          </button>
        )}
      </div>

      {showForm && (
        <div className="bg-white border border-steel-200/40 rounded-lg p-6 mb-8 shadow-sm">
          <h2 className="font-bold text-steel-800 mb-5">
            {editId ? "Edit Testimonial" : "New Testimonial"}
          </h2>

          <div className="space-y-4 mb-4">
            <div>
              <label className="form-label">Quote *</label>
              <textarea
                className="form-input resize-y"
                rows={4}
                value={form.quote}
                onChange={(e) => setForm({ ...form, quote: e.target.value })}
                placeholder="What did they say?"
              />
              <p className="text-xs text-steel-400 mt-1">
                Don&apos;t wrap in quotes — they&apos;re added automatically on the public page.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="form-label">Name / Role *</label>
                <input
                  className="form-input"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  placeholder="e.g. Project Architect"
                />
                <p className="text-xs text-steel-400 mt-1">
                  Shown bold on the card.
                </p>
              </div>
              <div>
                <label className="form-label">Title / Location</label>
                <input
                  className="form-input"
                  value={form.title}
                  onChange={(e) => setForm({ ...form, title: e.target.value })}
                  placeholder="e.g. Phoenix, AZ"
                />
                <p className="text-xs text-steel-400 mt-1">
                  Shown smaller below the name.
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <label className="form-label mb-0">Status</label>
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={form.active}
                  onChange={(e) => setForm({ ...form, active: e.target.checked })}
                  className="w-4 h-4 rounded"
                />
                <span className="text-sm text-steel-600">
                  {form.active ? "Active — shown on homepage" : "Inactive — hidden"}
                </span>
              </label>
            </div>
          </div>

          <div className="flex gap-3 pt-2">
            <button
              onClick={handleSave}
              disabled={saving}
              className="btn-primary disabled:opacity-50"
            >
              {saving ? "Saving…" : "Save Testimonial"}
            </button>
            <button onClick={cancel} className="btn-outline-dark">Cancel</button>
          </div>
        </div>
      )}

      {loading ? (
        <p className="text-steel-400 text-sm">Loading…</p>
      ) : items.length === 0 ? (
        <div className="text-center py-20 bg-white rounded-lg border border-steel-200/40">
          <p className="text-steel-400 text-sm mb-3">No testimonials yet.</p>
          <button onClick={openAdd} className="btn-primary">Add your first testimonial</button>
        </div>
      ) : (
        <div className="space-y-3">
          {items.map((t, i) => (
            <div
              key={t.id}
              className={`bg-white border rounded-lg p-5 shadow-sm ${
                t.active ? "border-steel-200/40" : "border-steel-200/40 opacity-60"
              }`}
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-2">
                    <h3 className="font-bold text-steel-800">{t.name}</h3>
                    {t.title && (
                      <span className="text-steel-500 text-sm">— {t.title}</span>
                    )}
                    <span
                      className={`text-[10px] font-bold tracking-wide uppercase px-2 py-0.5 rounded-full ${
                        t.active
                          ? "bg-green-100 text-green-700"
                          : "bg-steel-100 text-steel-500"
                      }`}
                    >
                      {t.active ? "Active" : "Inactive"}
                    </span>
                  </div>
                  <p className="text-sm text-steel-600 italic leading-relaxed">
                    &ldquo;{t.quote}&rdquo;
                  </p>
                </div>
                <div className="flex flex-col gap-1 items-end shrink-0">
                  <div className="flex gap-1">
                    <button
                      onClick={() => move(t, -1)}
                      disabled={i === 0}
                      title="Move up"
                      className="text-steel-400 hover:text-steel-700 text-sm disabled:opacity-30"
                    >
                      ↑
                    </button>
                    <button
                      onClick={() => move(t, 1)}
                      disabled={i === items.length - 1}
                      title="Move down"
                      className="text-steel-400 hover:text-steel-700 text-sm disabled:opacity-30"
                    >
                      ↓
                    </button>
                  </div>
                  <button
                    onClick={() => openEdit(t)}
                    className="text-xs font-semibold text-accent-500 hover:underline"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => toggleActive(t)}
                    className="text-xs font-semibold text-steel-500 hover:underline"
                  >
                    {t.active ? "Deactivate" : "Activate"}
                  </button>
                  <button
                    onClick={() => handleDelete(t.id, t.name)}
                    disabled={deleting === t.id}
                    className="text-xs font-semibold text-red-500 hover:underline disabled:opacity-50"
                  >
                    {deleting === t.id ? "Deleting…" : "Delete"}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
