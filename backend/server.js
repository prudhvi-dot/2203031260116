import express from "express";
import { connect } from "mongoose";
import cors from "cors";
import urlRoutes from "./routes/urlRoutes.js";

const app = express();

app.use(cors());

app.use(express.json());

connect("mongodb://localhost/urlShortener", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.use("/", urlRoutes);

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
