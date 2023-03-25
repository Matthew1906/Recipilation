import express from "express";
import cors from "cors";
import config from "./config/index.js";
import db from "./config/db.js";
import userRouter from "./routes/user.js";

const app = express();

db(config.MONGO_URI);

app.use(cors({ origin: true }));
app.use(express.json());
app.use("/api/users", userRouter);

app.listen(config.PORT, () =>
  console.log(`App listening on PORT ${config.PORT}`)
);

app.use((_req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', '*');

  next();
});

app.get("/", async(req, res)=>{
    res.json({message:"Hello, It's me! I've been wondering if after all these years you would like to meet"})
})
