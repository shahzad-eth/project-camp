import dotenv from "dotenv";
import app from "./app.js";
import connnectDB from "./db/index.js";
dotenv.config({
  path: "./.env",
});

const port = process.env.PORT || 3000;

connnectDB()
  .then(() => {
    app.listen(port, () => {
      console.log(`Faaaaaaaaaaaaaaaaa, http://localhost:${port}`);
    });
  })
  .catch((err) => {
    console.log("MongodB connection Error", err);
  });
