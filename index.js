import fetch from "node-fetch";
import fs from "fs";
import dotenv from "dotenv";

dotenv.config();

const args = process.argv.slice(2);
if (!args[0]) {
  console.error("Please provide a prompt.");
  process.exit(1);
}

const prompt = args.join(" ");
const API_TOKEN = process.env.HF_API_TOKEN;
const MODEL = "stabilityai/stable-diffusion-2";

(async () => {
  try {
    const res = await fetch(`https://api-inference.huggingface.co/models/${MODEL}`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${API_TOKEN}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ inputs: prompt })
    });

    if (!res.ok) {
      const text = await res.text();
      throw new Error(text);
    }

    const data = await res.arrayBuffer();
    const buffer = Buffer.from(data);
    const fileName = "output.png";
    fs.writeFileSync(fileName, buffer);
    console.log(`Image saved as ${fileName}`);
  } catch (err) {
    console.error("Error:", err.message);
  }
})();
