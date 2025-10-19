import { auth } from "../../auth";

export const getAuthSession = async () => {
  const session = await auth();
  return session;
}
export default getAuthSession;

