import express from "express";

const router = express.Router();

router.get("/", (req, res) => {
    res.sendFile(`${__dirname.replaceAll("\\", "/").replace("/dist/routes", "")}/public/html/index.html`); 
});

module.exports = router;