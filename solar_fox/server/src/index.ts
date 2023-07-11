/**
 * This file just creates the express app, and loads all of the files.
 * Nothing to see here!
 */

import express from "express";
import ngrok from "ngrok";
import dotenv from "dotenv";

dotenv.config();

const ROOT = require("./routes/root");
const EDITOR = require("./routes/editor");
const GET_FILE = require("./routes/file_handling/get_file");
const SETTINGS = require("./routes/settings");
const GET_SYNTAX_EXTENSION = require("./routes/syntax_handling/get_extension");

const APP = express();
const PORT = 8787;

const URL = ngrok.connect({
    addr: PORT,
    authtoken: process.env.NGROK_AUTH_TOKEN
}).then((URL) => {
    console.log(`NGROK URL is : ${URL}`);
});

APP.use("/public", express.static(`${__dirname.replaceAll("\\", "/").replace("/dist", "")}/public`));


APP.use(ROOT);
APP.use(EDITOR);
APP.use(GET_FILE);
APP.use(SETTINGS);
APP.use(GET_SYNTAX_EXTENSION);

APP.listen(PORT, () => {
    console.log(`Lunar Fox server listening to port ${PORT}`);
})