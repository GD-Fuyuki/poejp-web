import CookieInput from "./cookieinput";
import Registuser from "./resistuser/regist";

export default function Page() {
  return (
    <div className="flex flex-col gap-2 p-4">
      開発用ページ
      <h1>Cookie Input</h1>
      <CookieInput cookieName="username" label="ユーザー名" />
      <CookieInput cookieName="accessToken" label="アクセストークン" />
      <h1>Regist User</h1>
      <Registuser />
    </div>
  );
}
