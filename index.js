const express = require("express");
const cors = require("cors");
require("dotenv").config();
const auth = require("./routes/auth.routes");
const boards = require("./routes/boards.routes");
const lists = require("./routes/lists.routes");
const cards = require("./routes/cards.routes");
const verifyAuthentication = require("./middlewares/auth.middleware");

const app = express();
const connectToDB = require("./db/db");
const url = process.env.DB_URL;

connectToDB(url);

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.status(200).json({
    message: "Data fetched successfully.",
    response: "Welcome to the Tasko API!",
  });
});

app.use("/auth", auth);
app.use(verifyAuthentication);

app.use("/api/boards", boards);
app.use("/api/lists", lists);
app.use("/api/cards", cards);

const port = process.env.PORT || 3001;
app.listen(port, () => console.log(`Listening on port 3001`));
