import express from "express";
import fs from "fs";
import chalk from "chalk";
import DEBUG from "../..";

const router = express.Router();

/**
 * Gets the file trying to load in the webpage.
 * 
 * 
 * get : {SERVER_URL}/file_handling/get_file?file={NEEDED_FILE}
 * response : 
 *  if found:
 *      {FILE_TEXT}
 *  if not found:
 *      Non-Existant
 */

router.get("/file_handling/get_file", (req, res) => {
    let file_arg = req.query.file?.toString();

    try {
        if(!file_arg) {
            if(DEBUG) {
                console.error(chalk.red("[ERROR]: Missing file argument."));
            }
            res.send("Non-Existant");
            return;     
        }

        let data = fs.readFileSync(file_arg);

        if(!data.toString()) {
            if(DEBUG) {
                console.error(chalk.red("[ERROR]: Failed to find file."));
            }
            res.send("Non-Existant");
            return;
        }

        return res.send(data.toString());
    } catch(err) {
        if(DEBUG) {
            console.error(chalk.red(`[ERROR]:
            ${err}`));
        }

        res.send("Non-Existant");
    }
});

module.exports = router;