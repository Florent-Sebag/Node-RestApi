'use strict';
module.exports = function(app) {
  var Controller = require('../controllers/ApiController');

  app.route('/api/token')
    .get(Controller.no_email)
    .post(Controller.create_user);

  app.route('/api/justify')
    .get(Controller.no_msg)
    .post(Controller.justify);
};
