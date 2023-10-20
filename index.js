import express from "express";
const app = express();
app.use(express.json());

app.get("/health", (req, res) => {
  res.send("all good ");
});

const PORT = 5000;

app.listen(PORT, () => {
  console.log(`listening on port 1 ${PORT}`);
});
