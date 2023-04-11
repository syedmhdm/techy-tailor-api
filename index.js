import express from "express";
import bodyParser from "body-parser";
import customersRoutes from "./routes/customers.js";
import connection from "./database.js";
import cors from "cors";
const app = express();
const PORT = 5000;
const whitelist = ["http://localhost:3000"];
const corsOptions = {
  origin: (orgin, callback) => {
    if (!orgin || whitelist.indexOf(orgin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true,
};

// app.use(bodyParser.json());
app.use(cors(corsOptions), bodyParser.json());

app.use("/customers", customersRoutes);

app.get("/", (req, res) => res.send("express api"));

app.listen(PORT, () => {
  console.log(`server running at: http://localhost:${PORT}`);
  connection.connect((err) => {
    if (err) throw err;
    console.log("Database connected");
  });
});
