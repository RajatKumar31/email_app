import express from "express";
import cors from "cors";
import dotenv from "dotenv";
dotenv.config();
import bodyParser from 'body-parser';
import emailRoutes from "./routes/emailRoutes";
import "./jobs/emailWorker";

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
app.use(express.json());

app.use("/emails", emailRoutes);


app.listen(5000, () => {
    console.log(`Server is running on port 5000`);
});
