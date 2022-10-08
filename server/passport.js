import passport from "passport";
import passportGoogleOauth20 from "passport-google-oauth20";
const GoogleStrategy = passportGoogleOauth20.Strategy;
import passportGithub2 from "passport-github2";
const GithubStrategy = passportGithub2.Strategy;
import passportFacebook from "passport-facebook";
const FacebookStrategy = passportFacebook.Strategy;

const GOOGLE_CLIENT_ID =
  "283121911503-6n2lhts72oaq3d75u654f6rbq0mb4ljc.apps.googleusercontent.com";

const GOOGLE_CLIENT_SECRET = "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";

const GITHUB_CLIENT_ID = "Iv1.78dc20e17dd56737";
const GITHUB_CLIENT_SECRET = "1b10e39a7d3e72397f7eb590931837cf2f919631";

const FACEBOOK_APP_ID = "1224249467925888";
const FACEBOOK_APP_SECRET = "ba8c87b358a4da97cbe88db318e0a62a";

passport.use(
  new GoogleStrategy(
    {
      clientID: GOOGLE_CLIENT_ID,
      clientSecret: GOOGLE_CLIENT_SECRET,
      callbackURL: "/auth/google/callback",
    },
    function (accessToken, refreshToken, profile, done) {
      done(null, profile);
    }
  )
);

passport.use(
  new GithubStrategy(
    {
      clientID: GITHUB_CLIENT_ID,
      clientSecret: GITHUB_CLIENT_SECRET,
      callbackURL: "/auth/github/callback",
    },
    function (accessToken, refreshToken, profile, done) {
      done(null, profile);
    }
  )
);

passport.use(
  new FacebookStrategy(
    {
      clientID: FACEBOOK_APP_ID,
      clientSecret: FACEBOOK_APP_SECRET,
      callbackURL: "/auth/facebook/callback",
    },
    function (accessToken, refreshToken, profile, done) {
      done(null, profile);
    }
  )
);

passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((user, done) => {
  done(null, user);
});
export default passport;
