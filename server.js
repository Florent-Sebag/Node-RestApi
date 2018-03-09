var express = require('express'),
  app = express(),
  port = process.env.PORT || 3000,
  mongoose = require('mongoose'),
  Task = require('./api/models/ApiModel'), //created model loading here
  bodyParser = require('body-parser');

// mongoose instance connection url connection
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://test_user:test_password@ds263408.mlab.com:63408/heroku_rwkw9nj3');


app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.text());
app.use(bodyParser.json());


var routes = require('./api/routes/ApiRoutes'); //importing route
routes(app); //register the route


app.listen(port);


app.use(function(req, res) {
  res.status(404).send({url: req.originalUrl + ' not found'})
});


console.log('RESTful API server started on: ' + port);
