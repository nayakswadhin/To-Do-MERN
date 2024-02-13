import { MongoClient } from "mongodb";
import bodyParser from "body-parser";
import express from "express";
import cors from "cors";

async function start() {
  try {
    const app = express();
    app.use(
      cors({
        origin: "http://localhost:5173",
        optionsSuccessStatus: 200,
        credentials: true,
      })
    );
    const mongo = await MongoClient.connect(
      "mongodb+srv://todoapp:e8kObIIvoyINjC3s@cluster0.nkvs1h3.mongodb.net/?retryWrites=true&w=majority"
    );
    //e8kObIIvoyINjC3s
    await mongo.connect();
    app.set("db", mongo.db());

    //body parser
    app.use(
      bodyParser.json({
        limit: "500kb",
      })
    );
    console.log("App is listening to database");

    //Routers
    app.use("/user", require("./routes/user"));
    app.use("/", require("./routes/task"));

    app.listen(8080, () => {
      console.log(`APP is listening in port:${8080}`);
    });
  } catch (error) {
    console.log(error);
  }
}

start();
