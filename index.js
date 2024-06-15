const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

const guardians = require('./data/guardian-names.js');
const exotics = require('./data/weapons.js');
const npcS = require('./data/npcs.js');

app.use(express.urlencoded({ extended: true})) //using Express.js's built in body parser middleware
app.use(express.json()); //gives access to the req.body method when user gives us a request

app.use((req, res, next) => {
    const time = new Date();
  
    console.log(
      `-----
  ${time.toLocaleTimeString()}: Received a ${req.method} request to ${req.url}.`
    );
    if (Object.keys(req.body).length > 0) {
      console.log('Containing the data:');
      console.log(`${JSON.stringify(req.body)}`);
    }
    next();
  });
  

app.get('/api/guardians', (req, res) => {
    res.json(guardians)
})

app.get("/api/guardians/:id", (req, res, next) => {
   const guardOC = guardians.find((g) => g.id == req.params.id)
   if(guardOC) {
    res.json(guardOC);
   }  else{
    next();
   }
})

app.post("/api/guardians", (req, res) =>{
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

app.get('/api/exotics', (req, res) => {
    res.json(exotics)
})

app.get("/api/exotics/:id", (req, res, next) => {
    const exGuns = exotics.find((e) => e.id == req.params.id)
    if(exGuns) {
     res.json(exGuns);
    } else{
        next();
       }
 })

app.get("/", (req, res) => {
    console.log("Hello it's working!")
    res.send("Hello we're here now")
})

app.use((req, res) =>{
    res.status(404).send('Resource Not Found');
})

app.listen(PORT, () => {
    console.log('Server running on port: ' + PORT);
  });