import express from "express";
import ngrok from "ngrok";
import dotenv from "dotenv";

dotenv.config();

const ROOT = require("./routes/root");

const APP = express();
const PORT = 8787;

const URL = ngrok.connect({
    addr: PORT,
    authtoken: process.env.NGROK_AUTH_TOKEN
}).then((URL) => {
    console.log(`NGROK URL is : ${URL}`);
});


APP.use(ROOT);

APP.listen(PORT, () => {
    console.log(`Sapphire server listening to port ${PORT}`);
})