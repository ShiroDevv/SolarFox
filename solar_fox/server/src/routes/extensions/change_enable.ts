import express from "express";
import fs from "fs";
import { glob } from "glob";

const router = express.Router();

router.get("/extensions/change_enabled", (req, res) => {
    let extension_name = req.query.extension_name;
    let extension_developer = req.query.extension_developer;
    let extension_type = req.query.extension_type;
    let extension_enabled = req.query.enabled;

    if(!extension_name || !extension_developer || !extension_type || !extension_enabled) return res.send("Missing required arguments");
    

    glob(`${__dirname.replaceAll("\\", "/").replace("/dist/routes/extensions", "")}/extensions/**/*.json`).then(async (files) => {
        for(let i = 0;i < files.length; i++) {
            let file_data = fs.readFileSync(files[i]);

            let file_json = JSON.parse(file_data.toString());

            if(extension_name == file_json.name && extension_developer == file_json.developer && extension_type == file_json.extension_type) {
                if(extension_enabled == 'true') {
                    file_json.enabled = true;
                } else {
                    file_json.enabled = false;
                }

                fs.writeFileSync(files[i], JSON.stringify(file_json));
                return res.send("Updated!");
            }
        }
        return res.send("Failed to find file!");
    });

});

module.exports =  router;