var balloon,anib,bgimg;
var databse,position;

function preload() {
  anib = loadAnimation("images/balloon01.png","images/balloon02.png","images/balloon03.png")
  bgimg = loadImage("images/background.png")
}

function setup() {
  database = firebase.database();
  createCanvas(1000,500);
  balloon = createSprite( 500, 250, 50, 50);
  balloon.addAnimation("spinb",anib);
  balloon.scale = 0.4;
  var blnposition = database.ref('balloon/position');
  blnposition.on("value",readPosition,showError);
}

function draw() {
  background(bgimg);  

  if(keyDown("left")){
    writePosition(-1,0);
}
else if(keyDown("right")){
  writePosition(1,0);
}
else if(keyDown("up")){
  writePosition(0,-1);
}
else if(keyDown("down")){
  writePosition(0,+1);
}

  drawSprites();
}

function writePosition(x,y){
  database.ref('balloon/position').set({
      'x': position.x + x,
      'y': position.y + y
  })
}

function showError() {
  console.log("error 404");
}

function readPosition(data) {
    position = data.val();
    balloon.x = position.x;
    balloon.y = position.y;
}