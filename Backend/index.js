const connectToMongo = require("./db");
require("dotenv").config();
connectToMongo();

const express = require("express");
const app = express();
const port = process.env.PORT || 5000;
const cors = require("cors");

app.use(cors());

app.use(express.json());

app.use("/api/auth", require("./routes/auth.js"));
app.use("/api/notes", require("./routes/notes.js"));

app.listen(port, () => {
  console.log(`MynoteBook app listening at http://localhost:${port}`);
});
