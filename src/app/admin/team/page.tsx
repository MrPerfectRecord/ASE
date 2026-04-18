"use client";
import { useState, useEffect, useRef } from "react";
import { db, storage } from "@/lib/firebase";
import {
  collection, getDocs, addDoc, updateDoc, deleteDoc,
  doc, query, orderBy,
} from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";

interface TeamMember {
  id: string;
  name: string;
  role: string;
  photoUrl: string;
  order: number;
}

const emptyForm = { name: "", role: "", photoUrl: "" };

export default function AdminTeamPage() {
  const [members, setMembers] = useState<TeamMember[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editId, setEditId] = useState<string | null>(null);
  const [form, setForm] = useState(emptyForm);
  const [uploading, setUploading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [deleting, setDeleting] = useState<string | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const fileRef = useRef<HTMLInputElement>(null);

  const fetchMembers = async () => {
    setLoading(true);
    try {
      const q = query(collection(db, "team"), orderBy("order", "asc"));
      const snap = await getDocs(q);
      setMembers(snap.docs.map((d) => ({ id: d.id, ...d.data() } as TeamMember)));
    } catch {
      // order field may not exist yet — fetch without ordering
      const snap = await getDocs(collection(db, "team"));
      setMembers(snap.docs.map((d) => ({ id: d.id, ...d.data() } as TeamMember)));
    }
    setLoading(false);
  };

  useEffect(() => { fetchMembers(); }, []);

  const openAdd = () => {
    setEditId(null);
    setForm(emptyForm);
    setPreview(null);
    if (fileRef.current) fileRef.current.value = "";
    setShowForm(true);
  };

  const openEdit = (m: TeamMember) => {
    setEditId(m.id);
    setForm({ name: m.name, role: m.role, photoUrl: m.photoUrl });
    setPreview(m.photoUrl || null);
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
    if (file) {
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleSave = async () => {
    if (!form.name.trim() || !form.role.trim()) {
      alert("Name and role are required.");
      return;
    }
    setSaving(true);
    let photoUrl = form.photoUrl;

    const file = fileRef.current?.files?.[0];
    if (file) {
      setUploading(true);
      const storageRef = ref(storage, `team/${editId ?? "new"}-${Date.now()}`);
      await uploadBytes(storageRef, file);
      photoUrl = await getDownloadURL(storageRef);
      setUploading(false);
    }

    if (editId) {
      await updateDoc(doc(db, "team", editId), {
        name: form.name.trim(),
        role: form.role.trim(),
        photoUrl,
      });
    } else {
      await addDoc(collection(db, "team"), {
        name: form.name.trim(),
        role: form.role.trim(),
        photoUrl,
        order: members.length,
      });
    }

    setSaving(false);
    setShowForm(false);
    setEditId(null);
    setPreview(null);
    fetchMembers();
  };

  const handleDelete = async (id: string, name: string) => {
    if (!confirm(`Remove ${name} from the team?`)) return;
    setDeleting(id);
    await deleteDoc(doc(db, "team", id));
    setDeleting(null);
    fetchMembers();
  };

  return (
    <div className="p-8 max-w-5xl">
      {/* Header */}
      <div className="flex items-start justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-steel-800">Team Members</h1>
          <p className="text-steel-500 text-sm mt-1">
            Manage the team shown on the About page. Add photos and bios for each member.
          </p>
        </div>
        {!showForm && (
          <button onClick={openAdd} className="btn-primary shrink-0">
            + Add Member
          </button>
        )}
      </div>

      {/* Form */}
      {showForm && (
        <div className="bg-white border border-steel-200/40 rounded-lg p-6 mb-8 shadow-sm">
          <h2 className="font-bold text-steel-800 mb-5">
            {editId ? "Edit Team Member" : "Add New Member"}
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
            <div>
              <label className="form-label">Full Name *</label>
              <input
                className="form-input"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                placeholder="e.g. Marcor Platt"
              />
            </div>
            <div>
              <label className="form-label">Role / Title *</label>
              <input
                className="form-input"
                value={form.role}
                onChange={(e) => setForm({ ...form, role: e.target.value })}
                placeholder="e.g. Principal Structural Engineer"
              />
            </div>
          </div>

          <div className="mb-6">
            <label className="form-label">Photo</label>
            {preview && (
              <div className="mb-3">
                <img
                  src={preview}
                  alt="Preview"
                  className="w-24 h-24 object-cover rounded-lg border border-steel-200"
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
              JPG or PNG recommended. Leave blank to keep existing photo.
            </p>
          </div>

          <div className="flex gap-3">
            <button
              onClick={handleSave}
              disabled={saving || uploading}
              className="btn-primary disabled:opacity-50"
            >
              {uploading ? "Uploading photo…" : saving ? "Saving…" : "Save Member"}
            </button>
            <button onClick={cancel} className="btn-outline-dark">
              Cancel
            </button>
          </div>
        </div>
      )}

      {/* Member grid */}
      {loading ? (
        <p className="text-steel-400 text-sm">Loading team…</p>
      ) : members.length === 0 ? (
        <div className="text-center py-20 bg-white rounded-lg border border-steel-200/40">
          <p className="text-steel-400 text-sm mb-3">No team members yet.</p>
          <button onClick={openAdd} className="btn-primary">
            Add your first member
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-5">
          {members.map((m) => (
            <div key={m.id} className="bg-white border border-steel-200/40 rounded-lg overflow-hidden shadow-sm">
              <div className="aspect-[4/3] bg-gray-100 overflow-hidden">
                <img
                  src={m.photoUrl || "/team/team-silhouette-placeholder.svg"}
                  alt={m.name}
                  className="w-full h-full object-cover object-top"
                />
              </div>
              <div className="p-4">
                <p className="font-semibold text-steel-800 text-sm leading-snug">{m.name}</p>
                <p className="text-steel-500 text-xs mt-0.5 leading-snug">{m.role}</p>
                <div className="flex gap-3 mt-3 pt-3 border-t border-steel-100">
                  <button
                    onClick={() => openEdit(m)}
                    className="text-xs font-semibold text-accent-500 hover:underline"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(m.id, m.name)}
                    disabled={deleting === m.id}
                    className="text-xs font-semibold text-red-500 hover:underline disabled:opacity-50"
                  >
                    {deleting === m.id ? "Removing…" : "Remove"}
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
