import express from "express";
import fs from "fs";
import https from "https";
import dotenv from "dotenv";
import cors from "cors";
import passportSetup from "./passport.js";
import passport from "passport";
import cookiSession from "cookie-session";
import authRoute from "./routes/auth.js";
const options = {
  key: fs.readFileSync("./key.pem"),
  cert: fs.readFileSync("./cert.pem"),
};
const app = express();
app.use(
  cookiSession({ name: "session", keys: ["lama"], maxAge: 24 * 60 * 60 * 1000 })
);
app.use(passport.initialize());
app.use(passport.session());
dotenv.config();
app.use(express.urlencoded({ extended: true }));

app.use(express.json());
app.use(
  cors({
    origin: "https://localhost:3000",
    methods: "GET,POST,PUT,DELETE",
    credentials: true,
  })
);
app.use("/auth", authRoute);
const port = process.env.PORT || 4500;
app.get("/", cors(), (req, res) => {
  res.send("Hello World!");
});
app.post("/post_name", async (req, res) => {
  let { name } = req.body;
  console.log(name);
});
app.get("/home", cors(), async (req, res) => {
  res.send({ name: "Ali", age: 54 });
});
const server = https.createServer(options, app);
server.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
