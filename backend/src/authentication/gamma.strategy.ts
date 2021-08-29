import Strategy from "./strategy";
import passport from "passport";

const default_options = {
  authorizationURL: "http://localhost:8081/api/oauth/authorize",
  tokenURL: "http://localhost:8081/api/oauth/token",
  profileURL: "http://localhost:8081/api/users/me",
  clientID: "id",
  clientSecret: "secret",
  callbackURL: "http://localhost:3001/auth/account/callback",
};

export const init = (pass: passport.PassportStatic) => {
  const strategy = new Strategy(
    {
      authorizationURL:
        process.env.GAMMA_AUTH_URL || default_options.authorizationURL,
      tokenURL: process.env.GAMMA_TOKEN_URL || default_options.tokenURL,
      profileURL: process.env.GAMMA_USER_URL || default_options.profileURL,
      clientID: process.env.GAMMA_CLIENT_ID || default_options.clientID,
      clientSecret:
        process.env.GAMMA_CLIENT_SECRET || default_options.clientSecret,
      callbackURL:
        process.env.GAMMA_CALLBACK_URL || default_options.callbackURL,
    },
    (accessToken, profile, cb) => {
      cb(
        null,
        {
          cid: profile.cid,
          phone: profile.phone,
          authorities: profile.authorities.map(a => a.authority),
          groups: profile.groups
            .filter(g => g.superGroup.type != "ALUMNI")
            .map(g => g.superGroup.name),
          accessToken: accessToken,
        },
        null,
      );
    },
  );
  passport.use(strategy);
  passport.deserializeUser(async (user: Express.User, cb) => {
    return cb(null, user);
  });
  passport.serializeUser(function (user: Express.User, cb) {
    cb(null, user);
  });
};
