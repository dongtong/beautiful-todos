import express from "express";
import commonRouter from "./controllers/common";
import todoRouter from "./controllers/todos";
import bodyParser from "body-parser";

const app = express();

app.use(bodyParser.json());
app.use("/common", commonRouter);
app.use("/todos", todoRouter);

// catch global exception

app.listen(8000, () =>
  console.log("Beautiful todos server is running on port: 8000")
);
