const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;
const guardRouter = require('./routes/guardians-routes.js');
const exoRouter = require('./routes/exotics-routes.js');
const npcRouter = require('./routes/npc-routes.js');


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



//Connecting to the router files by using the address extensions.
app.use('/api/guardians', guardRouter)
app.use('/api/exotics', exoRouter)
app.use('/api/npc', npcRouter)


app.get('/', (req, res) => {
    res.json({
      links: [
        {
          href: '/api',
          rel: 'api',
          type: 'GET',
        },
      ],
    });
  });
  
  // Adding some HATEOAS links.
  app.get('/api', (req, res) => {
    res.json({
      links: [
        {
          href: 'api/guardians',
          rel: 'guardians',
          type: 'GET',
        },
        {
          href: 'api/guardians',
          rel: 'guardians',
          type: 'POST',
        },
        {
          href: 'api/exotics',
          rel: 'exotics',
          type: 'GET',
        },
        {
          href: 'api/exotics',
          rel: 'exotics',
          type: 'POST',
        },
      ],
    });
  });
app.use((req, res) =>{
    res.status(404).send('Resource Not Found');
})

app.listen(PORT, () => {
    console.log('Server running on port: ' + PORT);
  });