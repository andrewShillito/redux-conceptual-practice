const express = require("express");
const app = express();

app.use(express.static("./public"));

app.get("/", (req, res) => {
    res.sendFile("index.html")
});

app.listen(process.env.PORT, process.env.IP, (req, res) => {
    console.log("Todos server listening");
});