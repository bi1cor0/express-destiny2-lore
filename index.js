const express = require('express'); //importing express libraries to this project.
const app = express(); //setting up variable to manipulate and use express libraries
const PORT = process.env.PORT || 3000; //setting up PORT value
const guardRouter = require('./routes/guardians-routes.js'); //importing guardian routes from the routes folder
const exoRouter = require('./routes/exotics-routes.js'); //importing exotic weapon routes from route folder
const npcRouter = require('./routes/npc-routes.js'); //importing npc routes from route folder
const fs = require('fs'); //importing fs library into a variable
const path = require('path'); //importing a path library into a variable

app.use(express.urlencoded({ extended: true})) //using Express.js's built in body parser middleware
app.use(express.json()); //gives access to the req.body method when user gives us a request

app.use(express.static(path.join(__dirname,'/styles'))); //fixed stylesheets using .join method

app.engine('perscholas', (filePath, options, callback) => {
    fs.readFile(filePath, (err, content) => {
      if (err) return callback(err);
  
      // Here, we take the content of the template file,
      // convert it to a string, and replace sections of
      // it with the values being passed to the engine.
      const rendered = content
        .toString()
        .replaceAll('#title#', `${options.title}`)
        .replace('#content#', `${options.content}`)
      return callback(null, rendered);
    });
  });

app.set('views', './views'); //getting views folder and it's contents. 
app.set('view engine', 'perscholas'); //calling the use of the view engine

app.use((req, res, next) => { //setting up logging middleware to log all CRUD requests
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

app.get('/', (req, res) => { //setting up a welcoming message for the main page using an object that will directly pass through the view engine. 
    const options = {
      title: 'Submit your own Destiny 2 Guardian Character!',
      content:
        "Here, I've created a sample Express view for any Destiny 2 creatives out there. \
      If you've thought about backstories or character traits for your Destiny 2 Guardian, you're in the right place! \
      Just go ahead and submit a form here:\
      <a href='/guardians/new'>Form Submition</a>."
    };
  
    res.render('index', options);
  });

  
  // Adding some HATEOAS links just for extra CRUD requirements
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

  app.get('/guardians/new', (req, res) => { //form set up for a different route for new guardian characters
    res.send(`
        <div> 
          <h1>Create a Guardian Character</h1>
          <form action="/api/guardians"  method="POST">
            Name: <input type="text" name="name" /> <br />
            Race: <input type="text" name="race" /> <br />
            Class: <input type="text" name="class" /> <br />
            Subclass: <input type="text" name="subclass" /> <br />
            Role: <input type="text" name="role" /> <br />
            Primary Color: <input type="text" name="primary_color" /> <br />
            <input type="submit" value="Submit Guardian Character" />
          </form>
        </div>
      `);
  });

app.use((req, res) =>{ //small middleware for error handling
    res.status(404).send('Error 404: Resource Not Found');
})


app.listen(PORT, () => { //server start method
    console.log('Server running on port: ' + PORT);
  });