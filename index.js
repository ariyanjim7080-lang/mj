const express = require("express");
const axios = require("axios");

const app = express();
const API_KEY = "2fe137fbb84be28bf3d00347676528d0";

app.get("/upload", async (req, res) => {
  try {
    const imageUrl = req.query.url;
    if (!imageUrl) {
      return res.status(400).json({ error: "No image URL provided" });
    }

    const response = await axios.post(
      `https://api.imgbb.com/1/upload?key=${API_KEY}`,
      new URLSearchParams({ image: imageUrl }).toString(),
      { headers: { "Content-Type": "application/x-www-form-urlencoded" } }
    );

    res.json({
      success: true,
      url: response.data.data.url,
      delete_url: response.data.data.delete_url
    });
  } catch (err) {
    console.error(err.response?.data || err.message);
    res.status(500).json({
      success: false,
      error: err.response?.data || err.message
    });
  }
});

app.get("/", (req, res) => {
  res.send("ImgBB GET API running");
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
