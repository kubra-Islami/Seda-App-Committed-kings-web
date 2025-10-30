import express from "express";
import OpenAI from "openai";
import bodyParser from "body-parser";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

const app = express();
app.use(cors());
app.use(bodyParser.json());
const client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });


const PORT = process.env.PORT || 3000;

app.post("/chat", async (req, res) => {
    try {
        const { message } = req.body;

        const response = await client.chat.completions.create({
            model: "gpt-4o-mini",
            messages: [{ role: "user", content: message }]
        });
        res.setHeader("Content-Type", "application/json; charset=utf-8");
        res.json({ reply: response.choices[0].message.content });
    } catch (error) {
        console.error("OpenAI Error:", error);
        res.status(500).json({ error: "Something went wrong!" });
    }
});

app.listen(PORT, () => {
    console.log("App listening at port " + PORT);
});
