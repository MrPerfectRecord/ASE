"use client";
import { useState, useEffect } from "react";
import { db, auth } from "@/lib/firebase";
import {
  collection, getDocs, doc, setDoc, deleteDoc, serverTimestamp,
} from "firebase/firestore";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, updatePassword } from "firebase/auth";

interface AdminUser {
  id: string; // email
  addedAt?: any;
}

export default function AdminUsersPage() {
  const [users, setUsers] = useState<AdminUser[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({ email: "", password: "" });
  const [saving, setSaving] = useState(false);
  const [removing, setRemoving] = useState<string | null>(null);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const fetchUsers = async () => {
    setLoading(true);
    const snap = await getDocs(collection(db, "admins"));
    setUsers(snap.docs.map((d) => ({ id: d.id, ...d.data() } as AdminUser)));
    setLoading(false);
  };

  useEffect(() => { fetchUsers(); }, []);

  const handleAdd = async () => {
    setError("");
    setSuccess("");
    if (!form.email.trim() || !form.password.trim()) {
      setError("Email and password are required.");
      return;
    }
    if (form.password.length < 6) {
      setError("Password must be at least 6 characters.");
      return;
    }
    setSaving(true);

    // Save current user's auth state so we can restore it
    const currentUser = auth.currentUser;
    const currentEmail = currentUser?.email ?? "";

    try {
      // Create the new Firebase Auth account
      await createUserWithEmailAndPassword(auth, form.email.trim(), form.password);
      // Add to admins Firestore collection
      await setDoc(doc(db, "admins", form.email.trim()), {
        email: form.email.trim(),
        addedAt: serverTimestamp(),
        addedBy: currentEmail,
      });
      setSuccess(`Admin account created for ${form.email.trim()}. Share the password with them.`);
      setForm({ email: "", password: "" });
      setShowForm(false);
      fetchUsers();
    } catch (err: any) {
      const code = err?.code ?? "";
      if (code === "auth/email-already-in-use") {
        // Account exists in Auth but maybe not in Firestore — just add to Firestore
        await setDoc(doc(db, "admins", form.email.trim()), {
          email: form.email.trim(),
          addedAt: serverTimestamp(),
          addedBy: currentEmail,
        });
        setSuccess(`${form.email.trim()} has been granted admin access.`);
        setForm({ email: "", password: "" });
        setShowForm(false);
        fetchUsers();
      } else {
        setError(err.message ?? "Failed to create account.");
      }
    } finally {
      setSaving(false);
    }
  };

  const handleRemove = async (email: string) => {
    if (email === auth.currentUser?.email) {
      alert("You can't remove your own admin access.");
      return;
    }
    if (!confirm(`Remove admin access for ${email}? They will no longer be able to log in.`)) return;
    setRemoving(email);
    await deleteDoc(doc(db, "admins", email));
    setRemoving(null);
    fetchUsers();
  };

  return (
    <div className="p-8 max-w-3xl">
      <div className="flex items-start justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-steel-800">Admin Users</h1>
          <p className="text-steel-500 text-sm mt-1">
            Manage who has access to this admin panel.
          </p>
        </div>
        {!showForm && (
          <button onClick={() => { setShowForm(true); setError(""); setSuccess(""); }} className="btn-primary shrink-0">
            + Add Admin
          </button>
        )}
      </div>

      {success && (
        <div className="mb-6 bg-green-50 border border-green-200 rounded px-4 py-3 text-sm text-green-700">
          {success}
        </div>
      )}

      {/* Add form */}
      {showForm && (
        <div className="bg-white border border-steel-200/40 rounded-lg p-6 mb-8 shadow-sm">
          <h2 className="font-bold text-steel-800 mb-4">Add New Admin</h2>
          <div className="space-y-4 mb-4">
            <div>
              <label className="form-label">Email Address *</label>
              <input
                type="email"
                className="form-input"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                placeholder="colleague@example.com"
              />
            </div>
            <div>
              <label className="form-label">Temporary Password *</label>
              <input
                type="text"
                className="form-input"
                value={form.password}
                onChange={(e) => setForm({ ...form, password: e.target.value })}
                placeholder="Min 6 characters — share this with them"
              />
              <p className="text-xs text-steel-400 mt-1">
                This creates their login. Share the password with them so they can sign in.
              </p>
            </div>
          </div>
          {error && <p className="text-sm text-red-600 mb-4">{error}</p>}
          <div className="flex gap-3">
            <button onClick={handleAdd} disabled={saving} className="btn-primary disabled:opacity-50">
              {saving ? "Creating…" : "Create Admin Account"}
            </button>
            <button onClick={() => { setShowForm(false); setError(""); }} className="btn-outline-dark">
              Cancel
            </button>
          </div>
        </div>
      )}

      {/* Users list */}
      {loading ? (
        <p className="text-steel-400 text-sm">Loading…</p>
      ) : (
        <div className="bg-white border border-steel-200/40 rounded-lg shadow-sm divide-y divide-steel-100">
          {users.map((u) => (
            <div key={u.id} className="flex items-center justify-between px-5 py-4">
              <div>
                <p className="text-sm font-semibold text-steel-800">{u.id}</p>
                {u.id === auth.currentUser?.email && (
                  <p className="text-xs text-steel-400 mt-0.5">You</p>
                )}
              </div>
              {u.id !== auth.currentUser?.email && (
                <button
                  onClick={() => handleRemove(u.id)}
                  disabled={removing === u.id}
                  className="text-xs font-semibold text-red-500 hover:underline disabled:opacity-50"
                >
                  {removing === u.id ? "Removing…" : "Remove access"}
                </button>
              )}
            </div>
          ))}
        </div>
      )}

      <div className="mt-8 bg-amber-50 border border-amber-200 rounded-lg p-4">
        <p className="text-xs font-bold text-amber-700 uppercase tracking-wide mb-1">How access works</p>
        <p className="text-xs text-amber-700 leading-relaxed">
          Only email addresses in this list can log into the admin panel. Removing someone revokes
          their access immediately — they won&apos;t be able to sign in even if they remember the password.
        </p>
      </div>
    </div>
  );
}
