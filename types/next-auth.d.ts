import { DefaultSession } from "next-auth";

declare module "next-auth" {
  interface Session {
    user: User & DefaultSession["user"]
  }
}

interface User {
  id: string;
  name: string | null;
  email: string | null;
  emailVerified?: string | null | boolean;
  image?: string;
  address?: string;
  phone: string;
  status?: boolean;
  stripeCustomerId?: string ;
  createdAt: string;
  updatedAt: string;
}