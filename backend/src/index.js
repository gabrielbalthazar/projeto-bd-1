import cors from "cors";
import express from "express";
import patientRouter from "./routes/patientRouter.js";
const app = express();
const port = 8001;

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.use("/api/patients", cors(), patientRouter);

app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});