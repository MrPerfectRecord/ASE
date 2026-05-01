"use client";
import { useEffect, useRef, useState } from "react";
import { db } from "@/lib/firebase";
import { collection, getDocs, query, orderBy } from "firebase/firestore";

interface TeamMember {
  id: string;
  name: string;
  role: string;
  photoUrl: string;
  order: number;
}

const fallback: TeamMember[] = [
  { id: "1", name: "Marcor Platt", role: "Principal Structural Engineer", photoUrl: "", order: 0 },
  { id: "2", name: "Laura Platt", role: "Operations and Client Relations", photoUrl: "", order: 1 },
  { id: "3", name: "Eduardo", role: "Structural Engineer", photoUrl: "", order: 2 },
  { id: "4", name: "Sam", role: "Forensic Engineering Specialist", photoUrl: "", order: 3 },
];

export default function TeamSection() {
  const [members, setMembers] = useState<TeamMember[]>(fallback);

  useEffect(() => {
    const fetchTeam = async () => {
      try {
        const q = query(collection(db, "team"), orderBy("order", "asc"));
        const snap = await getDocs(q);
        const data = snap.docs.map((d) => ({ id: d.id, ...d.data() } as TeamMember));
        if (data.length > 0) setMembers(data);
      } catch {
        // fallback already set
      }
    };
    fetchTeam();
  }, []);

  return (
    <section id="team" className="bg-section-a py-20 md:py-24">
      <div className="max-w-7xl mx-auto px-6">
        {/* Centered header — Lumexa-style */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <p className="text-xs font-semibold tracking-[0.18em] uppercase text-primary-500 mb-4">
            <span className="text-accent-500 mr-1.5">//</span> the experts
          </p>
          <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-light leading-[1.1] text-primary-500">
            The Core Engineering Team
          </h2>
        </div>

        {/* Animated card grid */}
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {members.map((member, i) => (
            <TeamCard key={member.id} member={member} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}

/**
 * Single team card with the Lumexa entrance animation:
 *   - Initial state: translateY(30%) + blur(10px) + opacity:0
 *   - On scroll into view: translateY(0) + blur(0) + opacity:1
 *   - Stagger delay per index so cards reveal in sequence
 */
function TeamCard({ member, index }: { member: TeamMember; index: number }) {
  const ref = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    // Respect prefers-reduced-motion — skip animation entirely.
    if (window.matchMedia?.("(prefers-reduced-motion: reduce)").matches) {
      setVisible(true);
      return;
    }

    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          // Stagger reveal — each card waits 120ms longer than the previous
          const delay = index * 120;
          window.setTimeout(() => setVisible(true), delay);
          io.disconnect();
        }
      },
      { threshold: 0.15, rootMargin: "0px 0px -10% 0px" }
    );
    io.observe(node);
    return () => io.disconnect();
  }, [index]);

  return (
    <article
      ref={ref}
      className="flex flex-col will-change-transform"
      style={{
        opacity: visible ? 1 : 0,
        filter: visible ? "blur(0)" : "blur(10px)",
        transform: visible ? "translate3d(0, 0, 0)" : "translate3d(0, 30%, 0)",
        transition: "opacity 0.8s ease-out, filter 0.8s ease-out, transform 0.8s ease-out",
      }}
    >
      <div className="aspect-[4/5] overflow-hidden rounded-lg mb-5 bg-steel-100">
        <img
          src={member.photoUrl || "/team/team-silhouette-placeholder.svg"}
          alt={member.name}
          className="w-full h-full object-cover object-top"
        />
      </div>
      <h3 className="font-display text-lg md:text-xl font-semibold text-steel-800 leading-tight">
        {member.name}
      </h3>
      <p className="text-sm text-steel-500 mt-1.5">{member.role}</p>
    </article>
  );
}
