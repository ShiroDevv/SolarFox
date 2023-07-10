import express from "express";

const router = express.Router();

router.get("/editor", (req, res) => {
    res.sendFile(`${__dirname.replaceAll("\\", "/").replace("/dist/routes", "")}/public/html/editor.html`); 
});

module.exports = router;