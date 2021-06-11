var balloon,balloonImage1,balloonImage2,bg;
// create database and position variable here
var database,balloonPosition;


function preload(){
   bg =loadImage("cityImage.png");
   balloonImage1=loadAnimation("hotairballoon1.png");
   balloonImage2=loadAnimation("hotairballoon1.png",
  "hotairballoon2.png","hotairballoon2.png",);
  }

//Function to set initial environment


function setup() {
  database=firebase.database();
  console.log(database);
  createCanvas(1500,700);


  balloon=createSprite(250,450,150,150);
  balloon.addAnimation("hotAirBalloon",balloonImage1);
  balloon.scale=0.5;

  

  textSize(20); 
}

// function to display UI


function draw() {
  background(bg);

  if(keyDown(LEFT_ARROW)){
   balloon.x=balloon.x-10;
    balloon.addAnimation("hotAirBalloon",balloonImage2);
    balloon.scale=0.5;
    //write code to move air balloon in left direction
   
  }
  else if(keyDown(RIGHT_ARROW)){
    balloon.x=balloon.x+10;
    balloon.addAnimation("hotAirBalloon",balloonImage2);
    balloon.scale=0.8;
    //write code to move air balloon in right direction
  }
  else if(keyDown(UP_ARROW)){
    balloon.y=balloon.y-10;
    balloon.scale=0.5;
    //write code to move air balloon in up direction
    
    balloon.addAnimation("hotAirBalloon",balloonImage2);
  }
  else if(keyDown(DOWN_ARROW)){
    balloon.y=balloon.y+10;
    balloon.addAnimation("hotAirBalloon",balloonImage2);
    balloon.scale=0.5;
    //write code to move air balloon in down direction
  }
  

  drawSprites();
  fill(0);
  stroke("white");
  textSize(25);
  text("**Use arrow keys to move Hot Air Balloon!",40,40);

  
}

var balloonHeight=database.ref('balloon/height');
  balloonHeight.on("value",readPosition,showError);

function updateHeight(x,y){
 
  database.ref('balloon/height').set({
    'x':innerHeight.x+x,
   'y':innerHeight.y+y
  })
}

function readHeight(data){
  height=data.val();
  balloon.x=height.x;
  balloon.y=height.y;
}

function showError(){
  console.log("Error in writing to the database");
  var balloonPosition=database.ref('balloon/height');
balloonPosition.on("value",readPosition,showError);
}
