"use server"
import { signIn } from "../../../../auth";

export async function handleRegister(provider:string){
  await signIn(provider, { redirectTo: '/dashboard' });
}