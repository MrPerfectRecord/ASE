"use client";
import { useState, useEffect } from "react";
import { db } from "@/lib/firebase";
import {
  collection, getDocs, addDoc, updateDoc, deleteDoc,
  doc, query, orderBy,
} from "firebase/firestore";

interface Job {
  id: string;
  title: string;
  description: string;
  qualifications: string[];
  category?: string;
  location?: string;
  employmentType?: string;
  active: boolean;
  order: number;
}

const emptyForm = {
  title: "",
  description: "",
  qualifications: [""],
  category: "",
  location: "",
  employmentType: "Full-time",
  active: true,
};

export default function AdminCareersPage() {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editId, setEditId] = useState<string | null>(null);
  const [form, setForm] = useState(emptyForm);
  const [saving, setSaving] = useState(false);
  const [deleting, setDeleting] = useState<string | null>(null);

  const fetchJobs = async () => {
    setLoading(true);
    try {
      const q = query(collection(db, "careers"), orderBy("order", "asc"));
      const snap = await getDocs(q);
      setJobs(snap.docs.map((d) => ({ id: d.id, ...d.data() } as Job)));
    } catch {
      const snap = await getDocs(collection(db, "careers"));
      setJobs(snap.docs.map((d) => ({ id: d.id, ...d.data() } as Job)));
    }
    setLoading(false);
  };

  useEffect(() => { fetchJobs(); }, []);

  const openAdd = () => {
    setEditId(null);
    setForm(emptyForm);
    setShowForm(true);
  };

  const openEdit = (j: Job) => {
    setEditId(j.id);
    setForm({
      title: j.title,
      description: j.description,
      qualifications: j.qualifications.length ? j.qualifications : [""],
      category: j.category ?? "",
      location: j.location ?? "",
      employmentType: j.employmentType ?? "Full-time",
      active: j.active,
    });
    setShowForm(true);
  };

  const cancel = () => { setShowForm(false); setEditId(null); };

  // Qualifications list helpers
  const updateQual = (i: number, val: string) => {
    const q = [...form.qualifications];
    q[i] = val;
    setForm({ ...form, qualifications: q });
  };
  const addQual = () => setForm({ ...form, qualifications: [...form.qualifications, ""] });
  const removeQual = (i: number) => {
    if (form.qualifications.length === 1) return;
    setForm({ ...form, qualifications: form.qualifications.filter((_, idx) => idx !== i) });
  };

  const handleSave = async () => {
    if (!form.title.trim()) { alert("Title is required."); return; }
    setSaving(true);
    const quals = form.qualifications.map((q) => q.trim()).filter(Boolean);
    const data = {
      title: form.title.trim(),
      description: form.description.trim(),
      qualifications: quals,
      category: form.category.trim(),
      location: form.location.trim(),
      employmentType: form.employmentType.trim(),
      active: form.active,
    };
    if (editId) {
      await updateDoc(doc(db, "careers", editId), data);
    } else {
      await addDoc(collection(db, "careers"), { ...data, order: jobs.length });
    }
    setSaving(false);
    setShowForm(false);
    setEditId(null);
    fetchJobs();
  };

  const handleDelete = async (id: string, title: string) => {
    if (!confirm(`Delete "${title}"?`)) return;
    setDeleting(id);
    await deleteDoc(doc(db, "careers", id));
    setDeleting(null);
    fetchJobs();
  };

  const toggleActive = async (j: Job) => {
    await updateDoc(doc(db, "careers", j.id), { active: !j.active });
    fetchJobs();
  };

  return (
    <div className="p-8 max-w-4xl">
      <div className="flex items-start justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-steel-800">Career Opportunities</h1>
          <p className="text-steel-500 text-sm mt-1">
            Add job listings and qualifications shown on the Careers page.
          </p>
        </div>
        {!showForm && (
          <button onClick={openAdd} className="btn-primary shrink-0">
            + Add Position
          </button>
        )}
      </div>

      {/* Form */}
      {showForm && (
        <div className="bg-white border border-steel-200/40 rounded-lg p-6 mb-8 shadow-sm">
          <h2 className="font-bold text-steel-800 mb-5">
            {editId ? "Edit Position" : "New Position"}
          </h2>

          <div className="space-y-4 mb-4">
            <div>
              <label className="form-label">Job Title *</label>
              <input
                className="form-input"
                value={form.title}
                onChange={(e) => setForm({ ...form, title: e.target.value })}
                placeholder="e.g. Structural Engineer"
              />
            </div>
            <div>
              <label className="form-label">Description</label>
              <textarea
                className="form-input resize-y"
                rows={4}
                value={form.description}
                onChange={(e) => setForm({ ...form, description: e.target.value })}
                placeholder="Describe the role, responsibilities, and what you're looking for."
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="form-label">Category</label>
                <input
                  className="form-input"
                  value={form.category}
                  onChange={(e) => setForm({ ...form, category: e.target.value })}
                  placeholder="e.g. Engineering"
                />
                <p className="text-xs text-steel-400 mt-1">
                  Used as a filter pill on the public Careers page.
                </p>
              </div>
              <div>
                <label className="form-label">Location</label>
                <input
                  className="form-input"
                  value={form.location}
                  onChange={(e) => setForm({ ...form, location: e.target.value })}
                  placeholder="e.g. Phoenix, AZ"
                />
                <p className="text-xs text-steel-400 mt-1">
                  Shown as a tag pill on the role card.
                </p>
              </div>
              <div>
                <label className="form-label">Employment Type</label>
                <select
                  className="form-input"
                  value={form.employmentType}
                  onChange={(e) =>
                    setForm({ ...form, employmentType: e.target.value })
                  }
                >
                  <option value="">— None —</option>
                  <option value="Full-time">Full-time</option>
                  <option value="Part-time">Part-time</option>
                  <option value="Contract">Contract</option>
                  <option value="Internship">Internship</option>
                </select>
                <p className="text-xs text-steel-400 mt-1">
                  Shown next to the location.
                </p>
              </div>
            </div>

            <div>
              <label className="form-label">Qualifications</label>
              <div className="space-y-2">
                {form.qualifications.map((q, i) => (
                  <div key={i} className="flex gap-2 items-center">
                    <input
                      className="form-input flex-1"
                      value={q}
                      onChange={(e) => updateQual(i, e.target.value)}
                      placeholder={`Qualification ${i + 1}`}
                    />
                    <button
                      onClick={() => removeQual(i)}
                      disabled={form.qualifications.length === 1}
                      className="text-red-400 hover:text-red-600 text-lg leading-none disabled:opacity-30 px-1"
                      title="Remove"
                    >
                      ×
                    </button>
                  </div>
                ))}
              </div>
              <button
                onClick={addQual}
                className="mt-2 text-xs font-semibold text-accent-500 hover:underline"
              >
                + Add qualification
              </button>
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
                  {form.active ? "Active — visible on Careers page" : "Inactive — hidden from public"}
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
              {saving ? "Saving…" : "Save Position"}
            </button>
            <button onClick={cancel} className="btn-outline-dark">Cancel</button>
          </div>
        </div>
      )}

      {/* Job list */}
      {loading ? (
        <p className="text-steel-400 text-sm">Loading…</p>
      ) : jobs.length === 0 ? (
        <div className="text-center py-20 bg-white rounded-lg border border-steel-200/40">
          <p className="text-steel-400 text-sm mb-3">No job listings yet.</p>
          <button onClick={openAdd} className="btn-primary">Add your first position</button>
        </div>
      ) : (
        <div className="space-y-4">
          {jobs.map((j) => (
            <div
              key={j.id}
              className={`bg-white border rounded-lg p-5 shadow-sm ${
                j.active ? "border-steel-200/40" : "border-steel-200/40 opacity-60"
              }`}
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="font-bold text-steel-800">{j.title}</h3>
                    <span
                      className={`text-[10px] font-bold tracking-wide uppercase px-2 py-0.5 rounded-full ${
                        j.active
                          ? "bg-green-100 text-green-700"
                          : "bg-steel-100 text-steel-500"
                      }`}
                    >
                      {j.active ? "Active" : "Inactive"}
                    </span>
                  </div>
                  {j.description && (
                    <p className="text-sm text-steel-500 leading-relaxed mb-3">{j.description}</p>
                  )}
                  {j.qualifications.length > 0 && (
                    <ul className="space-y-1">
                      {j.qualifications.map((q, i) => (
                        <li key={i} className="text-xs text-steel-600 flex gap-2">
                          <span className="text-accent-500 shrink-0">✓</span>
                          {q}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
                <div className="flex flex-col gap-2 shrink-0 text-right">
                  <button
                    onClick={() => openEdit(j)}
                    className="text-xs font-semibold text-accent-500 hover:underline"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => toggleActive(j)}
                    className="text-xs font-semibold text-steel-500 hover:underline"
                  >
                    {j.active ? "Deactivate" : "Activate"}
                  </button>
                  <button
                    onClick={() => handleDelete(j.id, j.title)}
                    disabled={deleting === j.id}
                    className="text-xs font-semibold text-red-500 hover:underline disabled:opacity-50"
                  >
                    {deleting === j.id ? "Deleting…" : "Delete"}
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
