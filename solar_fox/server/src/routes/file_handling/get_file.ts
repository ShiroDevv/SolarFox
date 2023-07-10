import express from "express";
import fs from "fs";

const router = express.Router();

router.get("/get_file", (req, res) => {
    let arg1 = req.query.file?.toString();

    try {
        if(!arg1) {
            res.send("Non-Existant");
            return;     
        }

        let data = fs.readFileSync(arg1);

        if(!data.toString()) {
            res.send("Non-Existant");
            return;
        }

        return res.send(data.toString());
    } catch(err) {
        res.send("Non-Existant");
    }
});

module.exports = router;