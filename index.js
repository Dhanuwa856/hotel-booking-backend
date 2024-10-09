import bodyParser from "body-parser";
import express from "express";
import userRouter from "./routes/usersRoute.js";
import mongoose from "mongoose";
import galleryItemRouter from "./routes/galleryItemRoute.js";
import jwt from "jsonwebtoken";
import categoryRouter from "./routes/categoryRoute.js";

const app = express();
app.use(bodyParser.json());

const connectionString =
  "mongodb+srv://tester:123@cluster0.pku5g.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

app.use((req, res, next) => {
  const token = req.header("Authorization")?.replace("Bearer ", "");

  if (token != null) {
    jwt.verify(token, "secretKey", (err, decoded) => {
      if (decoded != null) {
        req.user = decoded;
        next();
      } else {
        next();
      }
    });
  } else {
    next();
  }
});

mongoose
  .connect(connectionString)
  .then(() => {
    console.log("Conected to the data base");
  })
  .catch(() => {
    console.log("Conection falid");
  });

app.use("/api/users/", userRouter);
app.use("/api/gallery/", galleryItemRouter);
app.use("/api/category/", categoryRouter);

app.listen(5000, (req, res) => {
  console.log("Sever is runing on on port 5000");
});
