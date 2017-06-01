
/*
* Simple wrapper over the gitter api to send a message.
*/

//TODO:: Refactor this awful code!
exports.sendMessage = function sendMessage(roomname, message, token){

  var Gitter = require('node-gitter');

  var gitter = new Gitter(token);

  gitter.currentUser()
  .then(function(user) {
    console.log('You are logged in as:', user.username);


    gitter.rooms.join(roomname)
    .then(function(room) {
      console.log('Joined room: ', room.name);


      room.send(message)
      .then(function(val) {
        console.log('Sent message: ', val);

      })
      .fail(function(err) {
        console.error('Unable to send message: ', err);
      })


    })
    .fail(function(err) {
      console.error('Not possible to join the room: ', roomname, err);
    })


  })
  .fail(function(err) {
    console.error('Unable to authenticate to gitter: ', err);
  });
}
