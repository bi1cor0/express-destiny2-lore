const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

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