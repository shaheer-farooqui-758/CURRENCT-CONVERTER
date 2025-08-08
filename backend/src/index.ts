import express from "express";
import axios from "axios";
import cors from "cors";

const app = express();
app.use(cors());
app.use(express.json());

const PORT = 5000;
const API_KEY = "4E0VK7BnkdeUuh1vegAt808v2IUjzUR6lxcvBMT2";

app.get("/api/currencies", async (req, res) => {
  try {
    const response = await axios.get(
      "https://api.freecurrencyapi.com/v1/currencies?apikey=" + API_KEY
    );
    res.json(response.data.data);
  } catch (error) {
    res.status(500).json({ message: "Error fetching currencies" });
  }
});

app.get("/api/convert", async (req, res) => {
  const { from, to, amount } = req.query;
  try {
    const response = await axios.get(
      `https://api.freecurrencyapi.com/v1/latest?apikey=${API_KEY}&base_currency=${from}`
    );
    
    const rate = response.data.data[to as string];

    const result = Number(amount) * rate;

    res.json({ rate, result });
  } catch (error) {
    res.status(500).json({ message: "Error during conversion" });
  }
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
