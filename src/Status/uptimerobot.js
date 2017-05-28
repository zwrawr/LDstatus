var qs = require("querystring");
var https = require("https");
var Promise = require('promise');

// ========
// uptimerobot.js
// ========
function UptimeRobot(api_key) {
  this.api_key = api_key;

  this.options = {
    "method": "POST",
    "hostname": "api.uptimerobot.com",
    "port": null,
    "headers": {
      "content-type": "application/x-www-form-urlencoded",
      "cache-control": "no-cache"
    },
    "form":{
      "api_key": 'enterYourAPIKeyHere',
      "format": 'json',
      "logs": '1'
    }
  };
}

UptimeRobot.prototype.foo = function foo() {
  console.log("API key is " + this.api_key);
};

UptimeRobot.prototype.getMonitors = function getMonitors() {
  console.log("getMonitors");

  var opt = this.options;
  opt.path = ver + "getMonitors";

  return getContent(opt);

};

module.exports = UptimeRobot;

var ver = '/v2/'

var qs = require("querystring");
var http = require("https");

const getContent = function(options) {

  // return new pending promise
  return new Promise((resolve, reject) => {

    // select http or https module, depending on reqested url
    var request = https.get(options, (response) => {

      // handle http errors
      if (response.statusCode < 200 || response.statusCode > 299) {
        reject(new Error('Failed to load page, status code: ' + response.statusCode));
      }

      // temporary data holder
      const body = [];

      // on every content chunk, push it to the data array
      response.on('data', (chunk) => body.push(chunk));

      // we are done, resolve promise with those joined chunks
      response.on('end', () => resolve(body.join('')));

    });

    // handle connection errors of the request
    request.on('error', (err) => reject(err))
  })
};
