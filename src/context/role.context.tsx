import { createContext, useContext, useMemo, useState } from "react";

export type AppRole = "guest" | "rider" | "driver" | "admin" | "superadmin";

type RoleContextState = {
  role: AppRole;
  setRole: (role: AppRole) => void;
};

const RoleContext = createContext<RoleContextState | undefined>(undefined);

export function RoleProvider({ children }: { children: React.ReactNode }) {
  const [role, setRole] = useState<AppRole>("guest");
  const value = useMemo(() => ({ role, setRole }), [role]);
  return <RoleContext.Provider value={value}>{children}</RoleContext.Provider>;
}

export function useRole() {
  const ctx = useContext(RoleContext);
  if (!ctx) throw new Error("useRole must be used within RoleProvider");
  return ctx;
}

export function RequireRole({ allow, children }: { allow: AppRole[]; children: React.ReactNode }) {
  const { role } = useRole();
  if (!allow.includes(role)) {
    return null;
  }
  return <>{children}</>;
}


