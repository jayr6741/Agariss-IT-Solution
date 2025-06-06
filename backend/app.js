const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const mongodb = require("./library/mongodb");
const v1 = require("./routes/v1");
const helmet = require("helmet");

dotenv.config();

const app = express();

// Middlewares
app.use(cors());
app.use(helmet());
app.use(express.json());

// Serve uploads folder statically

app.use("/uploads", express.static("uploads"));

// Use versioned routes
app.use("/v1", v1);

// Connect to DB and start server
mongodb();

const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
