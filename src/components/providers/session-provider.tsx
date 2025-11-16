"use client";

import { createContext, useContext } from "react";
import type { ReactNode } from "react";
import type { Session } from "@supabase/supabase-js";

type SessionContextValue = {
  session: Session | null;
};

const SessionContext = createContext<SessionContextValue>({ session: null });

export const SessionProvider = ({
  session,
  children,
}: {
  session: Session | null;
  children: ReactNode;
}) => {
  return (
    <SessionContext.Provider value={{ session }}>{children}</SessionContext.Provider>
  );
};

export const useSession = () => useContext(SessionContext);
