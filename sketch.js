var balloon, balloonimg;
var back;
var database;
var position;
var h;

function preload(){
back = loadImage("images/Hot Air Ballon-01.png")
balloonimg = loadAnimation("images/Hot Air Ballon-02.png","images/Hot Air Ballon-03.png","images/Hot Air Ballon-04.png"); 
}

function setup() {
 
  createCanvas(500,500);
  
  database = firebase.database();
  
  balloon = createSprite(250,390,10,10);
  balloon.addAnimation("balloonimage",balloonimg);
  balloon.scale = 0.5;
  
  var position = database.ref('balloon/position');
  position.on("value", readHeight, showError);
  
}

function draw() {
  background(back);  
  
  if(keyDown(LEFT_ARROW)){
    balloon.x = balloon.x -10;
   }
  else if(keyDown(RIGHT_ARROW)){
    balloon.x = balloon.x +10;
  }
  else if(keyDown(UP_ARROW)){
    balloon.y = balloon.y -10;
    balloon.scale = balloon.scale - 0.01;
  }
  else if(keyDown(DOWN_ARROW)){
    balloon.y = balloon.y +10;
    balloon.scale = balloon.scale + 0.01;
  }
  drawSprites();
  
  text("USE ARROW KEYS TO MOVE THE BALLOON",10,10);
  
}

function updateHeight(x,y){
database.ref('balloon/position').set({
'x': h.x + x,
'y': h.y + y
})
}

function readHeight(data){
h = data.val();
balloon.x = h.x;
balloon.y = h.y;
}

function showError(){
console.log("Error in writing to the database")
}
