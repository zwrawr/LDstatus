
/*
* Simple wrapper over the twitter api to send a message.
*/

//TODO:: Refactor this awful code!
exports.sendMessage = function sendMessage(roomname, message, tokens){

  if (roomname != "ludumdare/ludumdare" && roomname != "LDstatus/Lobby"){
    return;
  }

  var Twitter = require('twitter');

  var client = new Twitter(tokens);

  client.post('statuses/update', {status: message})
  .then(function (tweet) {
    console.log(tweet);
  })
  .catch(function (error) {
    console.error('Not possible to tweet: ', error);
  })
}
