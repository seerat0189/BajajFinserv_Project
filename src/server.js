// require("dotenv").config();
const express = require("express");

const bfhlRoutes = require("./routes/bfhl.routes");
const healthRoutes = require("./routes/health.routes");

const app = express();

app.use(express.json());

app.use("/bfhl", bfhlRoutes);
app.use("/health", healthRoutes);

// const PORT = process.env.PORT || 3000;

// if (process.env.NODE_ENV !== "production") {
//   app.listen(PORT, () => {
//     console.log(`Server running on http://localhost:${PORT}`);
//   });
// }

module.exports = app;
