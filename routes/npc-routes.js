const express = require('express')
const router = express.Router();
const npcs = require('../data/npcs.js');

router.get('/', (req, res) => {
    res.json(npcs)
})

router.get("/:id", (req, res, next) => {
    const vanguard = npcs.find((e) => e.id == req.params.id)
    if(vanguard) {
     res.json(vanguard);
    } else{
        next();
       }
 })

module.exports = router;