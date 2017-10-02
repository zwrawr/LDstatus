
/**
 * HTTP Cloud Function for servicing webhook's from uptime robot.
 *
 * @param {Object} req Cloud Function request context.
 * @param {Object} res Cloud Function response context.
 */
exports.webhook = function webhook (req, res) {

  const config = require('./config.json');

  return Promise.resolve()
    .then(() => {
      if (req.method !== 'POST') {
        console.error("Only POST requests are accepted");
        const error = new Error('Only POST requests are accepted');
        error.code = 405;
        throw error;
      }


      // Verify that this request came from uptimerobot
      if (req.body.provider != "uptimerobot" || req.body.token != config.UPTIMEROBOT_TOKEN){
        console.error("Invalid uptimerobot token");
        const error = new Error('Only Authorized requests are accepted');
        error.code = 500;
        throw error;
      }

      var query = require('url').parse(req.url,true).query;
      query.monitorFriendlyName = decodeURI(query.monitorFriendlyName);

      // Send message to twitter
      var twitter_tok = {
        "access_token_key" : config.TWITTER_PAT_TOKEN,
        "access_token_secret" : config.TWITTER_PAT_SECRET,
        "consumer_key" : config.TWITTER_CONSUMER_KEY,
        "consumer_secret" : config.TWITTER_CONSUMER_SECRET
      };
      require('./intergrations/twitter').sendMessage(req.body.room, makeMessage_plain(query,req.body),twitter_tok);

      // Send message to gitter
      return require('./intergrations/gitter').sendMessage(req.body.room, makeMessage_MD(query,req.body), config.GITTER_PAT_TOKEN);
    })
    .then((response) => {
      // Send a 400 ok back tp uptime robot
      res.status(400).send();
    })
    .catch((err) => {
      console.error(err);
      res.status(err.code || 500).send(err);
      return Promise.reject(err);
    });
};

// Build up the message to send to Gitter
function makeMessage_MD(query,data){

  var message = null;
  if (query.alertType == 2){
    message = "## " + query.monitorFriendlyName + "( " + query.monitorURL + " ) is back * " +
     query.alertTypeFriendlyName +  " *  \n" + "was down for " + query.alertFriendlyDuration;
  }
  else{
    message = "##" + query.monitorFriendlyName + "( " + query.monitorURL + " ) is * " +
     query.alertTypeFriendlyName +  " *";
  }

  message += "  \nDetails: " + query.alertDetails;

  if (data["statuspageurl"]){
    message += "  \n** [Status Page](" + data.statuspageurl + ") **";
  }

  return message;
}

// Build up the message to send to Twitter
function makeMessage_plain(query,data){

  var message =  query.monitorFriendlyName + " " + query.monitorURL + " is ";
  if (query.alertType == 2){
    message += "back " + query.alertTypeFriendlyName +  ".\n It was down for " + query.alertFriendlyDuration;
  }
  else{
    message += query.alertTypeFriendlyName;
  }

  if (data["statuspageurl"]){
    message += "\n" + data.statuspageurl;
  }

  if (message.length < 134){
    message += " #LDJAM";
  }
  
  return message;
}
