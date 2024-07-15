import { Session } from "next-auth";

import { auth } from "@/lib/auth";

export default async function AuthCheck() {
  const session: Session | null = await auth();
  return (
    <div>
      {session ? 
      <p>ログイン済<br/>{session.user?.name || "Guest"}</p> : 
      <p>未ログイン</p>}
    </div>  
  );
}
