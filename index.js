const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

const guardNames = require('./data/guardian-names.js');
const exWeapons = require('./data/weapons.js');
const npcS = require('./data/npcs.js');

app.get('/api/guardians', (req, res) => {
    res.json(guardNames)
})

app.get("/", (req, res) => {
    console.log("Hello it's working!")
    res.send("Hello we're here now")
})

app.listen(PORT, () => {
    console.log('Server running on port: ' + PORT);
  });