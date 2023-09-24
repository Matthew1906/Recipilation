import express from "express";
import cors from "cors";
import config from "./config/index.js";
import db from "./config/db.js";
// import cache from "./services/cache.js";
import categoryRouter from "./routes/category.js";
import equipmentRouter from "./routes/equipment.js";
import userRouter from "./routes/user.js";
import recipeRouter from "./routes/recipe.js";
import reviewRouter from "./routes/review.js";

const app = express();

db(config.MONGODB_URI);

app.use(express.json({limit: '50mb'}));
app.use(express.urlencoded({limit: '50mb', extended:true}));
app.use(cors({ origin: true }));
app.use("/api/categories", categoryRouter);
app.use("/api/equipments", equipmentRouter);
app.use("/api/users", userRouter);
app.use('/api/recipes', recipeRouter);
app.use('/api/reviews', reviewRouter);

app.listen(config.PORT, () =>
  console.log(`App listening on PORT ${config.PORT}`)
);

app.use((_req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', '*');
  res.header('Access-Control-Allow-Methods', "POST, PUT, PATCH, GET, DELETE");
  next();
});

// await cache.expireAt("history", parseInt((+new Date)/1000) + 86400)

app.get("/", async(req, res)=>{
    res.json({message:"Hello, It's me! I've been wondering if after all these years you would like to meet"})
})
