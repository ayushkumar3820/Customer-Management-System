
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import ConnectedDB from './src/database/data.js';

import router from "./src/Router/router.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT ? parseInt(process.env.PORT.trim()) : 5001;


app.use(cors());
app.use(express.json());


ConnectedDB();


app.use('/api/customers', router);
app.use('/api/memberships', router);




app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});