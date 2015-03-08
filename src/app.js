var UI = require('ui');
var Vibe = require('ui/vibe');
var Vector2 = require('vector2');

// Inicialize values
var friendScore = 0;
var foeScore = 0;

// Create the Window
var main = new UI.Window();

// Create a background Rect
var bgFriend = new UI.Rect({
  position: new Vector2(10, 20),
  size: new Vector2(124, 60),
  backgroundColor: 'white'
});
var bgFoe = new UI.Rect({
  position: new Vector2(10, 90),
  size: new Vector2(124, 60),
  backgroundColor: 'white'
});

// Add Rect to Window
main.add(bgFriend);
main.add(bgFoe);

// Create TimeText
var friend = new UI.Text({
  position: new Vector2(0, 25),
  size: new Vector2(144, 30),
  text: "0",
  font: 'bitham-42-bold',
  color: 'black',
  textAlign: 'center'
});
var foe = new UI.Text({
  position: new Vector2(0, 95),
  size: new Vector2(144, 30),
  text: "0",
  font: 'bitham-42-bold',
  color: 'black',
  textAlign: 'center'
});

// Add the TimeText
main.add(friend);
main.add(foe);

// Show the Window
main.show();

// Reset scores
main.on('longClick', 'select', function(e) {
  reset();
});

// Friend scores
main.on('click', 'up', function(e) {
  friendScores();
});

// Foe scores
main.on('click', 'down', function(e) {
  foeScores();
});

// Reset scores
function reset(){
  friendScore = 0;
  foeScore = 0;
  show();
}

// Update scores
function show(){
  friend.text(friendScore);
  foe.text(foeScore);
  if(foeScore == 41){
    foe.text('ADV');
    friend.text('');
  } else if (friendScore == 41){
    friend.text('ADV');
    foe.text('');
  } else if ((friendScore == 40) && (foeScore == 40)){
    foe.text('DCE');
    friend.text('DCE');
  }
}

// Friend scores function
function friendScores(){
  switch (friendScore){
    case 0:
      friendScore = 15;
      break;
    case 15:
      friendScore = 30;
      break;
    case 30:
      friendScore = 40;
      if(foeScore == 40){
        //show due
      }
      break;
    case 40:
      if(foeScore == 40){
        friendScore = 41;
      } else if(foeScore == 41){
        friendScore = 40;
        foeScore = 40;
      } else {
        friendScore = 0;
        foeScore = 0;
        Vibe.vibrate('long');
        //friend plus one round
      }
      break;
    case 41:
        friendScore = 0;
        foeScore = 0;
        Vibe.vibrate('long');
        //friend plus one round
        break;
  }
  show();
}
 
// Foe scores function
function foeScores(){
  switch (foeScore){
    case 0:
      foeScore = 15;
      break;
    case 15:
      foeScore = 30;
      break;
    case 30:
      foeScore = 40;
      if(friendScore == 40){
      }
      break;
    case 40:
      if(friendScore == 40){
        foeScore = 41;
      } else if(friendScore == 41){
        //show due
        foeScore = 40;
        friendScore = 40;
      } else {
        friendScore = 0;
        foeScore = 0;
        Vibe.vibrate('double');
        //foe plus one set
      }
      break;
    case 41:
      friendScore = 0;
      Vibe.vibrate('double');
      //foe plus one set
      foeScore = 0;
      break;
  }
  show();
}

