var dogImg, dogImg1;
var milkBottle;
var feedButton;
var addfoodButton;
var fedTime;
var lastFed;
var foodObj;
var database;
var foodS;
var foodStock;
var addFood;
var changinggameState;
var readState;

function preload()
{
  dogImg = loadImage("sprites/dogImg.png");
  milkBottle = loadImage("sprites/Milk(1).png");
  dogImg2 = loadImage("sprites/dog Sad.jpg")
}

function setup() {
canvas = createCanvas(1000,600);
var dogImg = createSprite(900,400,10,10);
var dogImg1 = createSprite(1400,450,10,10);
var dogImg2 = createSprite(1800,450,10,10);
database = firebase.database();
foodStock = database.ref('food');
foodStock.on("value",readStock);
food = new Food();

feed = createButton("Feed the dog");
feed.position(900,50);
feed.mousePressed(feedDog);

addFood = createButton("Add Button");
addFood.position(900,90);
addFood.mousePressed(addFoods);

readState = database.ref('gameState');
gameState.on("value",function(data){
  gameState = data.val();
})
}

function draw() {  
  display();
fill(255,255,254);
textSize(15);
if(lastFed <= 12){
  text("Last Feed :" + lastFed%12 + "PM",350,30);
}  
else if(lastFed === 0){
text("Last Feed : 12 AM",350,30);
}
else{
  text("Last Feed : " + lastFed + "AM",350,30);
}

fedTime = database.ref('Feed Time');
fedTime.on("value",function(data){
lastFed = data.val();
});
}

addfoodButton.mousePressed( function(){
  button.hide();
  foodStock += 1;
foodStock.update(Food);
});

feedButton.mousePressed(function(){
button.hide();
hour();
dogImg1 = loadImage("sprites/dogImg1.png");
food += 1;
foodStock.update(Food);

if(gameState!="Hungry"){
  feedButton.hide();
  addfoodButton.hide();
  dog.remove();
}
else{
  feedButton.show();
  addfoodButton.show();
  dog.addImage(dogImg2);
}

})


function readStock(data){
  foodS = data.val();
}

function writeStock(x){
if(x <= 0){
  x = 0;
}
else{
x = x - 1;
}

  database.ref('/').update({
    Food : x
  })
}


function update(state){
database.ref('/').update({
  gameState : state
});
}


