import { collection } from "firebase/firestore";
import { useCollection } from "react-firebase-hooks/firestore";

import { firestore } from "@/lib/firebase";
import { Locales, ProjectRole } from "@/lib/enums";

export type Project = {
  companyId: string;
  id: string;
  endAt: Date;
  icon?: string;
  role: ProjectRole;
  startAt: Date;
  tech: string[];
  locales: {
    [key in Locales]: {
      desc: string;
      name: string;
    };
  }
};

function getDateValue(dateValue: unknown): number {
  if (!dateValue) return 0;
  if (dateValue instanceof Date) return dateValue.getTime();
  if (typeof dateValue === "object" && dateValue !== null && "toDate" in dateValue) {
    const parsed = (dateValue as { toDate: () => Date }).toDate();
    return parsed.getTime();
  }
  return new Date(dateValue as string | number).getTime();
}

function getCompanyIdFromProjectId(projectId: string): string {
  const match = projectId.match(/^(.*?)(\d+)$/);
  if (match && match[1]) return match[1];
  return projectId;
}

export function useProjects() {
  const [snapshot, loading, error] = useCollection(collection(firestore, "projects"));
  const projects: Project[] =
    snapshot?.docs
      .map((doc) => ({
        id: doc.id,
        companyId: getCompanyIdFromProjectId(doc.id),
        ...doc.data(),
      } as Project))
      .sort((a, b) => getDateValue(b.startAt) - getDateValue(a.startAt)) ?? [];

  return {
    projects,
    loading,
    error: error ?? null,
  };
}
