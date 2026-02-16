import { collection } from "firebase/firestore";
import { useCollection } from "react-firebase-hooks/firestore";

import { firestore } from "@/lib/firebase";

export type Skill = {
  id: string;
  major?: boolean;
  name: string;
  years?: number;
};

export function useSkills() {
  const [snapshot, loading, error] = useCollection(collection(firestore, "skills"));
  const skillsCollection: Skill[] = snapshot?.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  } as Skill)) ?? [];

  const skills = skillsCollection.reduce(
    (acc, skill) => {
      if (skill.major === true) {
        acc.major.push(skill);
      } else if (skill.years === 0 || skill.years === undefined) {
        acc.interested.push(skill);
      } else {
        acc.minor.push(skill);
      }
      return acc;
    },
    { major: [] as Skill[], minor: [] as Skill[], interested: [] as Skill[] }
  );

  return { 
    skills,
    loading, 
    error: error ?? null,
  };
}
