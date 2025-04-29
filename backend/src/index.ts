import express from "express";
import cors from "cors";
import dotenv from "dotenv";
dotenv.config();
import bodyParser from 'body-parser';
import emailRoutes from "./routes/emailRoutes";
import "./jobs/emailProcessor";

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
app.use(express.json());

app.use("/emails", emailRoutes);


const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
});
