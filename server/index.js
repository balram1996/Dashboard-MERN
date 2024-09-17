import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import helmet from "helmet";
import dotenv from "dotenv";
import morgan from "morgan";
import clientRoutes from "./routes/client.js";
import generalRoutes from "./routes/general.js";
import managementRoutes from "./routes/management.js";
import salesRoutes from "./routes/sales.js";
import mongoose from "mongoose";

//data import
import User from "./models/User.js";
import Products from "./models/Product.js";
import ProductStat from "./models/ProductStat.js";
import { dataUser, dataProduct, dataProductStat } from "./data/index.js";

dotenv.config();

const app = express();
app.use(express.json());
app.use(helmet());
// app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin " }));
app.use(morgan("common"));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());

//Routes

app.use("/client", clientRoutes);
app.use("/general", generalRoutes);
app.use("/management", managementRoutes);
app.use("/sales", salesRoutes);

//mogoose setup
const PORT = process.env.PORT || 9000;
const connectionString = process.env.MONGOURL;
mongoose
  .connect(connectionString, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    app.listen(PORT, () => {
      console.log(`server is listing on ${PORT}`);
      //mock data insert in database;
      //add data only one Time
      // User.insertMany(dataUser);
      // Products.insertMany(dataProduct);
      // ProductStat.insertMany(dataProductStat);
    });
  })
  .catch((e) => {
    console.log(e, "server didnt connect");
  });
