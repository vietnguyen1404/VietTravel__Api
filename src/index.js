const path = require("path");
const express = require("express");
const morgan = require("morgan");
const methodOverride = require("method-override");
const dotenv = require("dotenv");
const route = require("./routes");
const db = require("./config/db");
const cors = require("cors");
const cookieSession = require("cookie-session");

// Connect to DB
db.connect();

const app = express();
const port = 3000;

dotenv.config();
app.use(
    cookieSession({
        name: "session",
        keys: ["key1", "key2"],
    })
);
app.set("trust proxy", 1);
// Use static folder
// app.use((req, res, next) => {
//     res.setHeader("Access-Control-Allow-Origin", "http://localhost:8081");
//     res.setHeader("Access-Control-Allow-Credentials", "true");
//     next();
// });

app.use(cors({ credentials: true, origin: "http://localhost:8080" }));

app.use(
    express.urlencoded({
        extended: true,
    })
);

//Save images
app.use(express.static(path.join(__dirname, "public")));

app.use(express.json());

app.use(methodOverride("_method"));

// HTTP logger
// app.use(morgan('combined'));

app.set("views", path.join(__dirname, "resources", "views"));

// Routes init
route(app);

app.listen(port, () =>
    console.log(`App listening at http://localhost:${port}`)
);
