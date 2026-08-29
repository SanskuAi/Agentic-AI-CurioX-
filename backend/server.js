require("dotenv").config();

const express = require("express");
const cors = require("cors");
const path = require("path");

const connectDB = require("./db");

const authRoutes = require("./router/auth");
const reportRoutes = require("./router/report");
const taskRoutes = require("./router/task");

const PORT = 5000;

const app = express();


// DATABASE

connectDB();


// MIDDLEWARE

app.use(cors());

app.use(express.json());


// ROUTES

app.use("/api/auth", authRoutes);

app.use("/api/reports", reportRoutes);

app.use("/api/tasks", taskRoutes);


// HOME

app.get("/", (req, res) => {

    res.json({
        message: "Agentic ai backend run"
    });

});


// UPLOADS

app.use(
    "/uploads",
    express.static(
        path.join(__dirname, "uploads")
    )
);


// SERVER

app.listen(PORT, () => {

    console.log(
        `server run port-${PORT}`
    );

});