var monkey, monkey_running;
var banana, bananaImage, obstacle, obstacleImage;
var FoodGroup, obstacleGroup;
var score;
var ground;
var survivalTime = 0;
var score = 0;

function preload() {


  monkey_running = loadAnimation("sprite_0.png", "sprite_1.png", "sprite_2.png", "sprite_3.png", "sprite_4.png", "sprite_5.png", "sprite_6.png", "sprite_7.png", "sprite_8.png");

  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");

}



function setup() {
  setFrameRate(40);
  
  ground = createSprite(width / 2, height - 15, width * 2, 30);
  ground.velocityX = -4;

  monkey = createSprite(50, ground.y - 35, 20, 20);
  monkey.addAnimation("monkeyAnim", monkey_running);
  monkey.scale = 0.08;
  monkey.setCollider("circle", 0, 0, 45);

  FoodGroup = createGroup();
  obstacleGroup = createGroup();

}


function draw() {
  background("white");

  gravity(0.8);

  monkey.collide(ground);

  if (keyDown("space") && monkey.y > ground.y - 20) {
    monkey.velocityY = -12;
  }

  if (ground.x > 0) {
    ground.x = width / 2;
  }
  
  textAlign(CENTER);
  textSize(20);
  fill("black");
  text("Score : " + score, 350, 50);
  noFill();
  
  textAlign(CENTER);
  textSize(20);
  fill("black");
  text("Survival Time : " + survivalTime, width / 2 - 100, height - 350);
  
  if(frameCount %10 == 0){
    survivalTime ++;
  }

  spawnFood();
  spawnObstacles(); 
  
  for(var i = 0; i < FoodGroup.length; i++){
    if(monkey.isTouching(FoodGroup.get(i))){
      FoodGroup.get(i).destroy();
      
      score += 2;
    }
  }

  drawSprites();
}

function gravity(g) {
  monkey.velocityY += g;
}

function spawnFood() {
  if (frameCount % 80 == 0) {
    banana = createSprite(width, 20, 20, 20);
    banana.addImage("food", bananaImage);
    banana.scale = 0.08;
    banana.y = random(ground.y - 20, 250);
    banana.velocityX = ground.velocityX;
    
    banana.lifetime = width - banana.velocityX;

    FoodGroup.add(banana);
  }
}


function spawnObstacles() {
  if (frameCount % 300 == 0 || frameCount == 20) {
    obstacle = createSprite(width, 20, 20, 20);
    obstacle.addImage("obstacle", obstacleImage);
    obstacle.y = ground.y - 30;
    obstacle.scale = 0.1;
    obstacle.velocityX = ground.velocityX;
    
    obstacle.lifetime = width - obstacle.velocityX;
    
    obstacleGroup.add(obstacle);
  }
}