import { collection } from "firebase/firestore";
import { useCollection } from "react-firebase-hooks/firestore";
import { useMemo } from "react";

import { firestore } from "@/lib/firebase";
import { CompanyLocation, CompanyRole } from "@/lib/enums";

export type Company = {
  id: string;
  endAt: Date;
  location: CompanyLocation;
  name: string;
  place: string;
  role: CompanyRole;
  startAt: Date;
  url: string;
};

export function useCompanies() {
  const [snapshot, loading, error] = useCollection(collection(firestore, "companies"));
  const companies: Company[] = snapshot?.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  } as Company)) ?? [];
  const companyById = useMemo(
    () => new Map(companies.map((company) => [company.id, company])),
    [companies]
  );

  const getCompany = (id: string) => companyById.get(id);

  return {
    companies,
    getCompany,
    loading,
    error: error ?? null,
  };
}
