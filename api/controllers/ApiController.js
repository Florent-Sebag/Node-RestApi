'use strict';

var mongoose = require('mongoose'),
  Task = mongoose.model('Users');

var hat = require('hat');

var justify = require('../justify/justify');

function date_diff(date1, date2)
{
  var diff = {}
    var tmp = date2 - date1;

    tmp = Math.floor(tmp/1000);
    diff.sec = tmp % 60;

    tmp = Math.floor((tmp-diff.sec)/60);
    diff.min = tmp % 60;

    tmp = Math.floor((tmp-diff.min)/60);
    diff.hour = tmp % 24;

    tmp = Math.floor((tmp-diff.hour)/24);
    diff.day = tmp;

    return diff;
}

function save_user(task, res)
{
  task.save(function (err) {
  if(err) {
      res.json(err);
    }
  res.json(task);
  });
}

//check if token is expired and update it
function check_last_reset(task, res)
{
  var date = new Date(Date.now());
  var diff = date_diff(task["last_reset"], date);
  if (diff.day >= 1)
    {
      task.last_reset = date;
      task.Token = hat();
      save_user(task, res);
    }
  else
    res.json(task);
}

//return error
function bad_header(res, err)
{
  res.status(400).send({error: "Bad " + err});
  return (false);
}

//Send justified text
function send_justify(res, ret, result)
{
  res[0].nb_word += ret[1];
  res[0].save(function (err) {
    if (err)
      result.json(err);
    result.type('text/plain');
    result.status(200).send(ret[0]);
  });
}

//Check token and return Bad token if error
function check_token(req, token, result)
{
  Task.find({'Token':token}, function(err, res)
  {
    if (err)
      {
        result.status(400).send({error: err});
        return (false);
      }
    if (res.length == 0)
      return (bad_header(result, "Token"));

    //justify the text
    var ret = justify.convert_to_justify(req.body);
    if (ret[1] + res[0].nb_word > 80000)
      return (result.status(402).send({error:"Payment Required"}));
    send_justify(res, ret, result);
    return (true);
  });
}

//Check if "authorization" is present in the header
function check_header(req, res, header, need_token = false)
{
  //check content-type
  if (!req.is(header))
    return (bad_header(res, "header"));

  if (need_token)
  {
    //check authorization
    if (!req.headers.authorization)
      return (bad_header(res, "Token"));
    var reg = /^Bearer /;
    if (!reg.test(req.headers.authorization))
      return (bad_header(res, "Token"));
    var tab = req.headers.authorization.split(" ");
    if (tab.length != 2)
      return (bad_header(res, "Token"));

    //test authorization
    return (check_token(req, tab[1], res));
  }
  return (true);
}

exports.create_user = function(req, res)
{
  //check header
  if (!check_header(req, res, "application/json"))
    return ;

  //check if body contain "email"
  if (!req.body["email"])
    return (res.status(400).send({error: "Please send your email"}));

  //find the email in database
  Task.findOne({'email':req.body["email"]}, function(err, task) {
    if (err)
      return (res.send(err));
    if (!task)
    {
      var Token = hat();
      task = new Task({
        'email': req.body["email"],
        'Token': Token,
        'nb_word': 0,
        'last_reset': new Date(Date.now())
        });
        save_user(task, res);
    }
    else
      check_last_reset(task, res);
  });
}

exports.justify = function(req, res, next)
{
  check_header(req, res, "text/plain", true);
};

exports.no_email = function(req, res)
{
  res.status(400).send({error: "Please enter your email"});
};

exports.no_msg = function(req, res)
{
  res.status(400).send({error: "Please send a text to justify"});
};
