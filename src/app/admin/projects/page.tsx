"use client";
import { useEffect, useRef, useState } from "react";
import { db, storage } from "@/lib/firebase";
import {
  collection, getDocs, addDoc, updateDoc, deleteDoc,
  doc, query, orderBy,
} from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";

interface Project {
  id: string;
  title: string;
  type: string;
  img: string;
  // Optional metadata strip shown only on cards that have it filled in
  metaKind?: string;
  metaLocation?: string;
  metaYear?: string;
  active: boolean;
  order: number;
}

const emptyForm = {
  title: "",
  type: "",
  img: "",
  metaKind: "",
  metaLocation: "",
  metaYear: "",
  active: true,
};

export default function AdminProjectsPage() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editId, setEditId] = useState<string | null>(null);
  const [form, setForm] = useState(emptyForm);
  const [uploading, setUploading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [deleting, setDeleting] = useState<string | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const fileRef = useRef<HTMLInputElement>(null);

  const fetchProjects = async () => {
    setLoading(true);
    try {
      const q = query(collection(db, "projects"), orderBy("order", "asc"));
      const snap = await getDocs(q);
      setProjects(snap.docs.map((d) => ({ id: d.id, ...d.data() } as Project)));
    } catch {
      const snap = await getDocs(collection(db, "projects"));
      setProjects(snap.docs.map((d) => ({ id: d.id, ...d.data() } as Project)));
    }
    setLoading(false);
  };

  useEffect(() => { fetchProjects(); }, []);

  const openAdd = () => {
    setEditId(null);
    setForm(emptyForm);
    setPreview(null);
    if (fileRef.current) fileRef.current.value = "";
    setShowForm(true);
  };

  const openEdit = (p: Project) => {
    setEditId(p.id);
    setForm({
      title: p.title,
      type: p.type,
      img: p.img,
      metaKind: p.metaKind ?? "",
      metaLocation: p.metaLocation ?? "",
      metaYear: p.metaYear ?? "",
      active: p.active,
    });
    setPreview(p.img || null);
    if (fileRef.current) fileRef.current.value = "";
    setShowForm(true);
  };

  const cancel = () => {
    setShowForm(false);
    setEditId(null);
    setPreview(null);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) setPreview(URL.createObjectURL(file));
  };

  const handleSave = async () => {
    if (!form.title.trim() || !form.type.trim()) {
      alert("Title and Type are required.");
      return;
    }
    setSaving(true);
    let imgUrl = form.img;

    const file = fileRef.current?.files?.[0];
    if (file) {
      setUploading(true);
      const storageRef = ref(storage, `projects/${editId ?? "new"}-${Date.now()}`);
      await uploadBytes(storageRef, file);
      imgUrl = await getDownloadURL(storageRef);
      setUploading(false);
    }

    const data = {
      title: form.title.trim(),
      type: form.type.trim().toUpperCase(),
      img: imgUrl,
      metaKind: form.metaKind.trim(),
      metaLocation: form.metaLocation.trim(),
      metaYear: form.metaYear.trim(),
      active: form.active,
    };

    if (editId) {
      await updateDoc(doc(db, "projects", editId), data);
    } else {
      await addDoc(collection(db, "projects"), { ...data, order: projects.length });
    }

    setSaving(false);
    setShowForm(false);
    setEditId(null);
    setPreview(null);
    fetchProjects();
  };

  const handleDelete = async (id: string, title: string) => {
    if (!confirm(`Delete project "${title}"?`)) return;
    setDeleting(id);
    await deleteDoc(doc(db, "projects", id));
    setDeleting(null);
    fetchProjects();
  };

  const toggleActive = async (p: Project) => {
    await updateDoc(doc(db, "projects", p.id), { active: !p.active });
    fetchProjects();
  };

  const move = async (p: Project, dir: -1 | 1) => {
    const idx = projects.findIndex((x) => x.id === p.id);
    const swapIdx = idx + dir;
    if (swapIdx < 0 || swapIdx >= projects.length) return;
    const other = projects[swapIdx];
    await Promise.all([
      updateDoc(doc(db, "projects", p.id), { order: other.order }),
      updateDoc(doc(db, "projects", other.id), { order: p.order }),
    ]);
    fetchProjects();
  };

  return (
    <div className="p-8 max-w-5xl">
      <div className="flex items-start justify-between mb-8 gap-6">
        <div>
          <h1 className="text-2xl font-bold text-steel-800">Projects</h1>
          <p className="text-steel-500 text-sm mt-1 max-w-2xl">
            Manage the project cards shown in the &quot;Our Projects&quot; section on the
            homepage. Up to eight active projects are displayed in order — the first
            four are visible at once and the rest are reachable via the carousel arrows.
          </p>
        </div>
        {!showForm && (
          <button onClick={openAdd} className="btn-primary shrink-0">
            + Add Project
          </button>
        )}
      </div>

      {showForm && (
        <div className="bg-white border border-steel-200/40 rounded-lg p-6 mb-8 shadow-sm">
          <h2 className="font-bold text-steel-800 mb-5">
            {editId ? "Edit Project" : "New Project"}
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
            <div>
              <label className="form-label">Project Title *</label>
              <input
                className="form-input"
                value={form.title}
                onChange={(e) => setForm({ ...form, title: e.target.value })}
                placeholder="e.g. Commercial Build"
              />
            </div>
            <div>
              <label className="form-label">Type / Category *</label>
              <input
                className="form-input"
                value={form.type}
                onChange={(e) => setForm({ ...form, type: e.target.value })}
                placeholder="e.g. STRUCTURAL DESIGN"
              />
              <p className="text-xs text-steel-400 mt-1">
                Saved in uppercase; shown above the title in small letters.
              </p>
            </div>
          </div>

          <div className="mb-6">
            <label className="form-label">Project Image</label>
            {preview && (
              <div className="mb-3">
                <img
                  src={preview}
                  alt="Preview"
                  className="w-48 h-32 object-cover rounded-lg border border-steel-200"
                />
              </div>
            )}
            <input
              ref={fileRef}
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              className="block text-sm text-steel-600 file:mr-3 file:py-1.5 file:px-3 file:rounded file:border-0 file:text-xs file:font-semibold file:bg-steel-100 file:text-steel-700 hover:file:bg-steel-200"
            />
            <p className="text-xs text-steel-400 mt-1.5">
              JPG or PNG. Leave blank to keep existing image. Tall (3:4) crops look best.
            </p>
          </div>

          <div className="border-t border-steel-200/40 pt-5 mb-4">
            <p className="text-[10px] font-bold uppercase tracking-[0.12em] text-steel-500 mb-3">
              Optional Metadata Strip
            </p>
            <p className="text-xs text-steel-400 mb-4">
              If filled in, a small badge shows beneath the title with these details. Leave
              all three blank to hide the badge.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="form-label">Kind</label>
                <input
                  className="form-input"
                  value={form.metaKind}
                  onChange={(e) => setForm({ ...form, metaKind: e.target.value })}
                  placeholder="e.g. New Build"
                />
              </div>
              <div>
                <label className="form-label">Location</label>
                <input
                  className="form-input"
                  value={form.metaLocation}
                  onChange={(e) => setForm({ ...form, metaLocation: e.target.value })}
                  placeholder="e.g. Phoenix, AZ"
                />
              </div>
              <div>
                <label className="form-label">Year</label>
                <input
                  className="form-input"
                  value={form.metaYear}
                  onChange={(e) => setForm({ ...form, metaYear: e.target.value })}
                  placeholder="e.g. 2024"
                />
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3 mb-5">
            <label className="form-label mb-0">Status</label>
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={form.active}
                onChange={(e) => setForm({ ...form, active: e.target.checked })}
                className="w-4 h-4 rounded"
              />
              <span className="text-sm text-steel-600">
                {form.active ? "Active — visible on homepage" : "Inactive — hidden"}
              </span>
            </label>
          </div>

          <div className="flex gap-3">
            <button
              onClick={handleSave}
              disabled={saving || uploading}
              className="btn-primary disabled:opacity-50"
            >
              {uploading ? "Uploading…" : saving ? "Saving…" : "Save Project"}
            </button>
            <button onClick={cancel} className="btn-outline-dark">Cancel</button>
          </div>
        </div>
      )}

      {loading ? (
        <p className="text-steel-400 text-sm">Loading…</p>
      ) : projects.length === 0 ? (
        <div className="text-center py-20 bg-white rounded-lg border border-steel-200/40">
          <p className="text-steel-400 text-sm mb-3">No projects yet.</p>
          <button onClick={openAdd} className="btn-primary">Add your first project</button>
        </div>
      ) : (
        <div className="space-y-3">
          {projects.map((p, i) => (
            <div
              key={p.id}
              className={`bg-white border rounded-lg p-4 shadow-sm flex items-center gap-4 ${
                p.active ? "border-steel-200/40" : "border-steel-200/40 opacity-60"
              }`}
            >
              <div className="w-20 h-20 bg-steel-100 rounded overflow-hidden flex-shrink-0">
                {p.img ? (
                  <img src={p.img} alt={p.title} className="w-full h-full object-cover" />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-[10px] text-steel-400">
                    No image
                  </div>
                )}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <h3 className="font-bold text-steel-800 truncate">{p.title}</h3>
                  <span
                    className={`text-[10px] font-bold tracking-wide uppercase px-2 py-0.5 rounded-full ${
                      p.active
                        ? "bg-green-100 text-green-700"
                        : "bg-steel-100 text-steel-500"
                    }`}
                  >
                    {p.active ? "Active" : "Inactive"}
                  </span>
                </div>
                <p className="text-[10px] font-bold tracking-wide uppercase text-accent-500 mb-1">
                  {p.type}
                </p>
                {(p.metaKind || p.metaLocation || p.metaYear) && (
                  <p className="text-xs text-steel-500">
                    {[p.metaKind, p.metaLocation, p.metaYear].filter(Boolean).join(" · ")}
                  </p>
                )}
              </div>
              <div className="flex flex-col gap-1 items-end shrink-0">
                <div className="flex gap-1">
                  <button
                    onClick={() => move(p, -1)}
                    disabled={i === 0}
                    title="Move up"
                    className="text-steel-400 hover:text-steel-700 text-sm disabled:opacity-30"
                  >
                    ↑
                  </button>
                  <button
                    onClick={() => move(p, 1)}
                    disabled={i === projects.length - 1}
                    title="Move down"
                    className="text-steel-400 hover:text-steel-700 text-sm disabled:opacity-30"
                  >
                    ↓
                  </button>
                </div>
                <button
                  onClick={() => openEdit(p)}
                  className="text-xs font-semibold text-accent-500 hover:underline"
                >
                  Edit
                </button>
                <button
                  onClick={() => toggleActive(p)}
                  className="text-xs font-semibold text-steel-500 hover:underline"
                >
                  {p.active ? "Deactivate" : "Activate"}
                </button>
                <button
                  onClick={() => handleDelete(p.id, p.title)}
                  disabled={deleting === p.id}
                  className="text-xs font-semibold text-red-500 hover:underline disabled:opacity-50"
                >
                  {deleting === p.id ? "Deleting…" : "Delete"}
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
