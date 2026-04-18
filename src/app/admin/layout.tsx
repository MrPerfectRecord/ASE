"use client";
import { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";
import { auth, db } from "@/lib/firebase";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";

const navItems = [
  { href: "/admin/team", label: "Team Members" },
  { href: "/admin/careers", label: "Careers" },
  { href: "/admin/contact", label: "Contact Info" },
  { href: "/admin/users", label: "Admin Users" },
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const isLoginPage = pathname === "/admin/login";
  const [checking, setChecking] = useState(!isLoginPage);
  const [authorized, setAuthorized] = useState(false);
  const [userEmail, setUserEmail] = useState("");

  useEffect(() => {
    if (isLoginPage) {
      setChecking(false);
      return;
    }

    const unsub = onAuthStateChanged(auth, async (u) => {
      if (!u) {
        router.replace("/admin/login");
        setChecking(false);
        return;
      }
      try {
        const adminDoc = await getDoc(doc(db, "admins", u.email!));
        if (!adminDoc.exists()) {
          await signOut(auth);
          router.replace("/admin/login?error=unauthorized");
          setChecking(false);
          return;
        }
        setUserEmail(u.email!);
        setAuthorized(true);
      } catch {
        router.replace("/admin/login");
      } finally {
        setChecking(false);
      }
    });

    return () => unsub();
  }, [isLoginPage, router]);

  if (isLoginPage) return <>{children}</>;

  if (checking) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <p className="text-sm text-steel-400">Checking access…</p>
      </div>
    );
  }

  if (!authorized) return null;

  return (
    <div className="min-h-screen flex" style={{ backgroundColor: "#f5f5f3" }}>
      {/* Sidebar */}
      <aside
        className="w-56 flex flex-col shrink-0 shadow-lg"
        style={{ backgroundColor: "var(--color-primary)" }}
      >
        <div className="px-6 py-5 border-b border-white/10">
          <p className="text-white font-bold text-sm tracking-wide">ASE Admin</p>
          <p className="text-white/50 text-xs mt-0.5 truncate">{userEmail}</p>
        </div>

        <nav className="flex-1 px-3 py-4 space-y-1">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center px-3 py-2 rounded text-sm font-medium transition-colors ${
                pathname.startsWith(item.href)
                  ? "bg-white/15 text-white"
                  : "text-white/65 hover:bg-white/10 hover:text-white"
              }`}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="px-3 py-4 border-t border-white/10 space-y-1">
          <Link
            href="/"
            target="_blank"
            className="flex items-center px-3 py-2 rounded text-sm text-white/50 hover:text-white/80 hover:bg-white/10 transition-colors"
          >
            ↗ View site
          </Link>
          <button
            onClick={async () => {
              await signOut(auth);
              router.push("/admin/login");
            }}
            className="w-full text-left flex items-center px-3 py-2 rounded text-sm text-white/50 hover:text-white/80 hover:bg-white/10 transition-colors"
          >
            Sign out
          </button>
        </div>
      </aside>

      {/* Main content */}
      <main className="flex-1 overflow-auto">{children}</main>
    </div>
  );
}
