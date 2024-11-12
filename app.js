const express = require('express');
const hbs = require('express-handlebars');
const path = require('path');
const bodyParser = require('body-parser');
const connectDB = require('./modules/db');
const routes = require('./routes/routes');
const config = require('./modules/config');

const app = express();

// Set the port and host
const port = config.server.port;
const host = config.server.host;

// Set Handlebars as the view engine
app.set('view engine', 'hbs');

// Configure Handlebars
app.engine('hbs', hbs.engine({
    layoutsDir: path.join(__dirname, '/views/layouts'),
    defaultLayout: 'main',
    extname: 'hbs',
}));

// Set static file directory
app.use(express.static(path.join(__dirname, 'public')));

// Use body-parser to parse request body data
app.use(bodyParser.urlencoded({ extended: true }));

// Middleware to add the current date to each request
app.use(function (req, res, next) {
    res.locals.currentDate = new Date().toISOString().slice(0, 10);
    next();
});

// Middleware to set appName for all views
app.use(function (req, res, next) {
    res.locals.appName = config.appName;  // Set appName as a local variable
    next();
});

// Use the defined routes
app.use('/', routes);

// Connect to the database
connectDB(true);

// Start the server
app.listen(port, host, function() {
    console.log("Server started on http://" + host + ":" + port);
});
