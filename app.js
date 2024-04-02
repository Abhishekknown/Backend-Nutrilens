require('dotenv/config')
const express = require("express")
const bodyParser = require("body-parser")
const checkAuth = require("./middleware/checkAuth");
const cors = require("cors");
const connectToMongo = require('./db');

const app = express();
const port = 5000;

connectToMongo()

app.use(cors())
app.use(express.json())
app.use(bodyParser.urlencoded({ extended: true }));
// app.use(checkAuth);


app.use("/api/auth/", require("./routes/auth"));
app.use("/api/user/", require("./routes/history"));
app.use("/api/user/", require("./routes/profile"));

// db.end();

app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});