"use client";

import { SessionProvider } from "next-auth/react";
interface IProvider {
  children: React.ReactNode;
}
export default function AuthProvider({ children }: IProvider) {
  return <SessionProvider>{children}</SessionProvider>;
}
