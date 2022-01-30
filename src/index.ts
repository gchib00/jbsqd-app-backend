import express from "express";
const app = express();
const cors = require("cors");
const countryRouter = require("./controllers/countryRouter")

app.use(express.json());
app.use(cors());
app.use('/countries', countryRouter);

const PORT = 3001;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});