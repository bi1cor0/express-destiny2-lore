const express = require('express')
const router = express.Router;
const exotics = require('../data/weapons.js');


router.get('/', (req, res) => {
    res.json(exotics)
})


router.get("/:id", (req, res, next) => {
    const exGuns = exotics.find((e) => e.id == req.params.id)
    if(exGuns) {
     res.json(exGuns);
    } else{
        next();
       }
 })


module.exports = router;