import { withIronSessionApiRoute, withIronSessionSsr } from "iron-session/next";

const sessionOptions = {
  password: "complex_password_at_least_32_characters_long",
  cookieName: "myapp_cookiename",
  // secure: true should be used in production (HTTPS) but can't be used in development (HTTP)
  cookieOptions: {
    secure: false //process.env.NODE_ENV === "production",
  },
};

export function withSessionRoute(handler) {
  console.log(process.env.NODE_ENV);
  return withIronSessionApiRoute(handler, sessionOptions);
}

export function withSessionSsr(handler) {
  console.log(process.env.NODE_ENV);
  return withIronSessionSsr(handler, sessionOptions);
}
