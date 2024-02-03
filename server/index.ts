import express from "express";
import commonRouter from "./controllers/common";
import todoRouter from "./controllers/todos";
import bodyParser from "body-parser";
import {
  requestLogger,
  errorHandler,
  errorLogger,
  invalidPathHandler,
} from "lib/common";

const app = express();

app.use(bodyParser.json());
app.use(requestLogger);

app.use("/common", commonRouter);
app.use("/todos", todoRouter);

// Step 1: Attach the first Error handling Middleware
// function defined above (which logs the error)
app.use(errorLogger);

// Step 2: catch error and response client
app.use(errorHandler);

// Attach the fallback Middleware
// function which sends back the response for invalid paths)
app.use(invalidPathHandler);

app.listen(8000, () =>
  console.log("Beautiful todos server is running on port: 8000")
);
