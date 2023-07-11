import express from "express";
import { glob } from "glob";
import fs from "fs";

const router = express.Router();

router.get("/settings", (req, res) => {
    res.sendFile(`${__dirname.replaceAll("\\", "/").replace("/dist/routes", "")}/public/html/settings.html`); 
});

/**
 * Edits a setting based off of the request
 * 
 * get {SERVER_URL}/edit_setting?setting={CSS-ELEMENT-TO-EDIT}&value={CSS-VALUE}
 * response : 
 * 
 *  if missing setting
 *      No setting
 *  if missing value
 *      No value
 *  if all are given
 *      Edited! Reload the page to show change!
 */

router.get("/edit_setting", (req, res) => {
    let setting_data = req.query.setting;
    let value_data = req.query.value;

    if(!setting_data) return res.send("No setting");
    if(!value_data) return res.send("No value");

    let setting = setting_data.toString();
    let value = value_data.toString();

    glob(`${__dirname.replaceAll("\\", "/").replace("/dist/routes", "")}/public/css/**/*.css`).then((files) => {
        edit_files(files, setting, value);
    });

    return res.send("Edited! Reload the page to show change!");
})

/**
 * 
 * @param files 
 * @param css_attribute 
 * @param data 
 * @returns { void }
 * 
 * 
 * Edits css files based off of the setting requested.
 */
function edit_files(files : Array<string>, css_attribute : string, data : string) {
    for(let i = 0; i < files.length; i++) {
        let file_data_array = fs.readFileSync(files[i]).toString().split("\n");

        for(let j = 0; j < file_data_array.length; j++) {
            if(file_data_array[j].includes(css_attribute)) {
                file_data_array[j] = `    ${css_attribute} : ${data};`
            }
        }

        let edited_file = file_data_array.join("\n");

        fs.writeFileSync(files[i], edited_file);
    }

    return;
}

module.exports = router;