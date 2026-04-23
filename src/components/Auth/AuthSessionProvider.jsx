"use client";

import { createContext, useContext } from "react";

const AuthSessionContext = createContext(null);

export function AuthSessionProvider({ user, children }) {
  return (
    <AuthSessionContext.Provider value={user}>
      {children}
    </AuthSessionContext.Provider>
  );
}

export function useAuthSession() {
  const value = useContext(AuthSessionContext);

  if (value === undefined) {
    throw new Error("useAuthSession must be used within AuthSessionProvider.");
  }

  return value;
}
