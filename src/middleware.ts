import NextAuth from "next-auth";
import authConfig from "./auth.config";
import { API_URL, HOME_PAGE_URL } from "./routes";

const { auth } = NextAuth(authConfig);

export default auth((req) => {
  const user = !!req.auth;
  const { nextUrl } = req;

  const apiRouteUrl = API_URL.includes(nextUrl.pathname);

  if (apiRouteUrl) {
    if (user) {
      return Response.redirect(new URL(HOME_PAGE_URL, nextUrl));
    }

    return;
  }

  if (!apiRouteUrl && !user) {
    return Response.redirect(new URL(API_URL[0], nextUrl));
  }

  return;
});

export const config = {
  matcher: ["/((?!.*\\..*|_next).*)", "/", "/(api|trpc)(.*)"],
};
