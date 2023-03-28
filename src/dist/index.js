import express from "express";

const app = express();

app.get("/", (req, resp) => {
  resp.send("Hello world");
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
