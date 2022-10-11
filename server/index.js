import express from "express";
import colors from "colors";
colors.enable();
import fs from "fs";
import https from "https";
import dotenv from "dotenv";
import cors from "cors";
import passportSetup from "./passport.js";
import { connectDB } from "./config/db.js";
import passport from "passport";
import cookiSession from "cookie-session";
import authRoute from "./routes/auth.js";
import goalRoutes from "./routes/goalRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import { errorHandler } from "./middleware/errorMiddleware.js";
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
connectDB();
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(
  cors({
    origin: "https://localhost:3000",
    methods: "GET,POST,PUT,DELETE",
    credentials: true,
  })
);
app.use("/auth", authRoute);
app.use(errorHandler);

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
app.use("/api/goals", goalRoutes);
app.use("/api/users", userRoutes);
const server = https.createServer(options, app);
server.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
//colors
console.log(colors.green("hello")); // outputs green text
console.log(colors.red.underline("i like cake and pies")); // outputs red underlined text
console.log(colors.inverse("inverse the color")); // inverses the color
console.log(colors.rainbow("OMG Rainbows!")); // rainbow
console.log(colors.trap("Run the trap"));
