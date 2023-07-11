import express from "express";
import fs from "fs";
import { glob } from "glob";

const router = express.Router();

/**
 * This file gets the syntax extension for the current file.
 * 
 * get {SERVER_URL}/syntax_handling/get_syntax_extension
 * 
 * response :
 *  if found:
 *      {SYNTAX_EXTENSION_JSON_CONTENTS}
 *  if not found:
 *      No valid syntax!
 */

router.get("/syntax_handling/get_syntax_extension", (req, res) => {
    let file_extension = req.query.file_type;

    if(!file_extension) return res.send("No valid syntax!");

    glob(`${__dirname.replaceAll("\\", "/").replace("/dist/routes/syntax_handling", "")}/extensions/**/*.json`).then(async (files) => {
        for(let i = 0;i < files.length; i++) {
            let JSON_DATA = JSON.parse(fs.readFileSync(files[i]).toString());
            
            if(JSON_DATA?.language == file_extension && JSON_DATA?.enabled == true) {
                return res.sendFile(files[i]);
            }
        }
        res.send("No valid syntax!");
    });
});

router.get("/syntax_handling/get_all_syntax_extensions", (req, res) => {

    let file_contents : Array<object> = [];

    glob(`${__dirname.replaceAll("\\", "/").replace("/dist/routes/syntax_handling", "")}/extensions/**/*.json`).then(async (files) => {
        for(let i = 0;i < files.length; i++) {
            let JSON_DATA = JSON.parse(fs.readFileSync(files[i]).toString());
            
            if(JSON_DATA?.extension_type == "syntax") {
                file_contents.push(JSON_DATA);
            }
        }

        res.send({
            file_data: file_contents
        })
    });
});

module.exports = router;