"use client";

import { createContext, useContext } from "react";

import { useCompanies } from "@/hooks/useCompanies";
import { useProjects } from "@/hooks/useProjects";
import { useSkills } from "@/hooks/useSkills";

type FirebaseData = {
  skills: ReturnType<typeof useSkills>;
  companies: ReturnType<typeof useCompanies>;
  projects: ReturnType<typeof useProjects>;
};

const FirebaseContext = createContext<FirebaseData | null>(null);

export function FirebaseProvider({ children }: { children: React.ReactNode }) {
  const skills = useSkills();
  const companies = useCompanies();
  const projects = useProjects();

  return (
    <FirebaseContext.Provider value={{ skills, companies, projects }}>
      {children}
    </FirebaseContext.Provider>
  );
}

export function useFirebaseData() {
  const context = useContext(FirebaseContext);

  if (!context) {
    throw new Error("useFirebaseData must be used within FirebaseProvider");
  }

  return context;
}
