const express = require("express");
const cookiParser = require("cookie-parser");
const cors = require("cors");
require("dotenv").config();
const mongoose = require("mongoose");

mongoose.set("strictQuery", false);

const app = express();
const PORT = process.env.PORT || 8000;
const DB = process.env.DB;
app.use(express.json({ limit: "50mb" }));
mongoose
  .connect(DB, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log("DATA BASE CONNECTION SUCCESFUL");
  })
  .catch((error) => {
    console.log(error);
  });

app.use(cookiParser());
app.use(
  cors({
    origin: ["http://localhost:3000"],
    credentials: true,
  })
);
app.use("/public", express.static("public"));

app.use(express.json());

const Register = require("./Routers/Registation");
const Login = require("./Routers/Login");
const LogOut = require("./Routers/logout");
const AddProject = require("./Routers/Addproject");
const getuser = require("./Routers/getUser");
const MyProject = require("./Routers/Myproject");
const PublicProjectPost = require("./Routers/PublicProject");
const GetPublicProject = require("./Routers/GetPublicProject");
const SerchePublicProject = require("./Routers/SechPublicProject");

app.use("/user", GetPublicProject);
app.use("/user", PublicProjectPost);
app.use("/user", getuser);
app.use("/user", Register);
app.use("/user", Login);
app.use("/user", AddProject);
app.use("/user", LogOut);
app.use("/user", MyProject);
app.use("/user", SerchePublicProject);

// if (process.env.NODE_ENV == "production") {
//   app.use(express.static("clent/build"));
// }

app.listen(PORT, () => {
  console.log(`app listening on port ${PORT}`);
});
