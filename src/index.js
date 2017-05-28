require('dotenv').config();

var uptimerobot = require("./Status/uptimerobot.js");

var utr = new uptimerobot("u428192-6247427a726698f68ec643fd");

const updateInterval = 10000;

var laststates = [];

function getStatusUpdates () {

  utr.getMonitors()
  .then((json) => {
    console.log(json);
    var monitors = (json['monitors'])?json.monitors:null;
    if (monitors){
      checkStatus(monitors);
    }
  })
  .catch((err) => {
    console.error(err);
  });
}

function checkStatus(monitors){
  var states = monitors.forEach(m => {
    return {
      "id" : m.id,
      "status" : m.status
    }
  });


  if (states == laststates) {
    return true;
  }

  return false;
}


// Setup job to keep running our api job
setInterval(getStatusUpdates, updateInterval);
