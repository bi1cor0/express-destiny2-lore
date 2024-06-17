const express = require('express')
const router = express.Router(); //setting up variable to do router things
const guardians = require('../data/guardian-names.js'); //importing data from guardian-names file in the data folder


router.get('/', (req, res) => { //setting up GET method for the guardians route
    res.json(guardians) //print out guardians json data
})
router.get("/:id", (req, res, next) => { 
   const guardOC = guardians.find((g) => g.id == req.params.id)
   if(guardOC) {
    res.json(guardOC);
   }  else{
    next();
   }
})
router.post("/", (req, res) =>{
    if(req.body.name && req.body.race && req.body.class && req.body.subclass && req.body.role && req.body.primary_color){
        if(guardians.find((g) => g.name === req.body.name)) {
            res.send("Guardian Name Already Taken");
            return;
        }
        const newOC ={
            id: guardians.length + 1,
            name: req.body.name,
            race: req.body.race,
            class: req.body.class,
            subclass: req.body.subclass,
            role: req.body.role, 
            primary_color: req.body.primary_color
        }

        guardians.push(newOC)
        res.json(newOC)
    }else{
        res.status(400).send("Insufficient Data")
    }
})
router.patch('/:id', (req, res) => {
    const editG = guardians.find((u, i) => {
        if (u.id == req.params.id) {
            for (const key in req.body){
                guardians[i][key] = req.body[key];
            }
            return true;
        }
    });
    if (editG) res.json(editG)
    else next();
})
router.delete('/:id', (req, res) => {
    const deleteG = guardians.find((u, i) => {
        if (u.id == req.params.id) {
            guardians.splice(i, 1);
            return true
        }
    });
    if (deleteG) {res.send(deleteG)}
    else {next()};
})


module.exports = router;