import express from "express";
import fs from "fs";
import { glob } from "glob";
import chalk from "chalk";
import DEBUG from "../..";

const router = express.Router();

/**
 * Gets the file trying to load in the webpage.
 * 
 * 
 * get : {SERVER_URL}/extensions/change_enabled?extension_name={extension_name}&extension_developer={extension_developer}&extension_type={extension_type}&enabled={enabled}
 * response : 
 *  if missing argumens:
 *      "Missing required arguments"
 *  if not found:
 *      "Failed to find file"
 * if changed
 *      "Updated!"
 */
router.get("/extensions/change_enabled", (req, res) => {
    let extension_name = req.query.extension_name;
    let extension_developer = req.query.extension_developer;
    let extension_type = req.query.extension_type;
    let extension_enabled = req.query.enabled;

    if(DEBUG) {
        if(!extension_name) {
            console.error(chalk.red("[ERROR]: Missing field extension_name"));
        }
        if(!extension_developer) {
            console.error(chalk.red("[ERROR]: Missing field extension_developer"));
        }
        if(!extension_type) {
            console.error(chalk.red("[ERROR]: Missing field extension_type"));
        }
        if(!extension_enabled) {
            console.error(chalk.red("[ERROR]: Missing field extension_enabled"));
        }
    }

    if(!extension_name || !extension_developer || !extension_type || !extension_enabled) return res.send("Missing required arguments");
    

    glob(`${__dirname.replaceAll("\\", "/").replace("/dist/routes/extensions", "")}/extensions/**/*.json`).then(async (files) => {
        for(let i = 0;i < files.length; i++) {
            if(DEBUG) {
                console.log(chalk.green(`[LOG]: Checking file ${files[i]}`));
            }
            let file_data = fs.readFileSync(files[i]);

            let file_json = JSON.parse(file_data.toString());

            if(extension_name == file_json.name && extension_developer == file_json.developer && extension_type == file_json.extension_type) {
                if(extension_enabled == 'true') {
                    file_json.enabled = true;
                } else {
                    file_json.enabled = false;
                }

                fs.writeFileSync(files[i], JSON.stringify(file_json, null, "\t"));
                return res.send("Updated!");
            }
        }
        return res.send("Failed to find file!");
    });

});

module.exports =  router;