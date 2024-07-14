export { auth as middleware } from "@/lib//auth";

// いくつかのパスではmiddlewareを動作させない
// macherは、以下で始まるものを除くすべてのリクエスト・パスにマッチする：
// - api (APIルート)
// - _next/static (静的ファイル)
// - _next/image (画像最適化ファイル)
// - favicon.ico (ファビコンファイル)
export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};