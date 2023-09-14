import express from "express";
import mongoose from "mongoose";
import router from "./routes/user-routes";

const app = express();
app.use(express.json());
app.use("/api/user", router);

mongoose
  .connect(
    "mongodb+srv://userAdmin:vfmtYUetjDcXwTGl@cluster0.uodrgot.mongodb.net/Blog?retryWrites=true&w=majority"
  )
  .then(() => app.listen(5000))
  .then(() =>
    console.log("Connected to Database and Listening to localhos 5000")
  )
  .catch((err) => console.log(err));

// vfmtYUetjDcXwTGl
