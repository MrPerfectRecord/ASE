"use client";
import { useState, useEffect } from "react";
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
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const fetch = async () => {
      try {
        const q = query(collection(db, "team"), orderBy("order", "asc"));
        const snap = await getDocs(q);
        const data = snap.docs.map((d) => ({ id: d.id, ...d.data() } as TeamMember));
        if (data.length > 0) setMembers(data);
      } catch {
        // fallback already set
      }
      setLoaded(true);
    };
    fetch();
  }, []);

  return (
    <section id="team" className="bg-section-a py-20">
      <div className="max-w-7xl mx-auto px-6">
        <div className="mb-12 flex flex-col items-end justify-between gap-8 md:flex-row">
          <div className="max-w-xl">
            <span className="mb-4 block text-xs font-semibold tracking-widest text-accent-500 uppercase">
              The Experts
            </span>
            <h2 className="font-display text-3xl font-semibold text-primary-500 md:text-4xl">
              The Core Engineering Team
            </h2>
            <div className="mt-3 h-1 w-1/3 max-w-[7.5rem] bg-accent-500" />
          </div>
          <p className="max-w-sm border-l-2 border-primary-500 pl-6 italic text-steel-600">
            Structural engineers and specialists focused on code-aligned design, practical solutions,
            and clear communication.
          </p>
        </div>

        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {members.map((member) => (
            <article key={member.id} className="flex flex-col">
              <div className="relative w-full overflow-visible">
                <div className="overflow-hidden rounded" style={{ aspectRatio: "9/10" }}>
                  <img
                    src={member.photoUrl || "/team/team-silhouette-placeholder.svg"}
                    alt={member.name}
                    className="w-full h-full object-cover object-top"
                  />
                </div>
                <div className="relative z-10 mx-auto -mt-8 w-[88%] max-w-[280px] bg-white px-6 py-5 text-center shadow-[0_4px_20px_rgba(47,47,47,0.10)]">
                  <h3 className="font-display text-base font-semibold leading-snug text-steel-800">
                    {member.name}
                  </h3>
                  <p className="mt-1.5 text-sm font-normal leading-snug text-steel-500">
                    {member.role}
                  </p>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
