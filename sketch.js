var playerCar, car2, car3, car4;
var carImage1, carImage2, carImage3, carImage4;
var obstacle, obstacleGroup, obstacleImage;
var oil, oilGroup, oilImage;
var raceTrackImage
var obstacleState = 0;
var oilState = 0;
var speed = -8;

function preload() {
   carImage1 = loadImage("images/car1.png");
   carImage2 = loadImage("images/car2.png");
   carImage3 = loadImage("images/car3.png");
   carImage4 = loadImage("images/car4.png");
   
   raceTrackImage = loadImage("images/racetrack.jpg");

   oilImage = loadImage("images/oil.png");
   obstacleImage = loadImage("images/roadblock.png");
}

function setup() {
   createCanvas(800,2000);

   playerCar = createSprite(100,1900,20,20);
   car2 = createSprite(300,1900,20,20);
   car3 = createSprite(500,1900,20,20);
   car4 = createSprite(700,1900,20,20);

   playerCar.addImage(carImage1);
   playerCar.scale = 0.3;
   
   car2.addImage(carImage2);
   car2.scale = 0.5;

   car3.addImage(carImage3);
   car3.scale = 0.07;

   car4.addImage(carImage4);
   car4.scale = 0.08;

   obstacleGroup = new Group();
   oilGroup = new Group;
}

function draw() {
    background(raceTrackImage);
    console.log(playerCar.y);

    playerCar.velocityY = -8;
    car2.velocityY = -6;
    car3.velocityY = -random(4,8);
    car4.velocityY = -random(6,8);

  camera.position.x = 400;
  camera.position.y = playerCar.y;

    if(obstacleGroup.isTouching(playerCar)) {
        obstacleState = 1;
        oilState = 0;
    }
    if(obstacleState === 1) {
        playerCar.velocityY = -3;
    }
    if(car2.isTouching(playerCar) || car3.isTouching(playerCar) || car4.isTouching(playerCar)) {
        obstacleState = 1;
        oilState = 0;
    }
    if(oilGroup.isTouching(playerCar)) {
        oilState = 1;
        obstacleState = 0;
    }
    if(oilState === 1) {
        playerCar.velocityY = -15;
    }
    if(keyDown(LEFT_ARROW)) {
        playerCar.x = playerCar.x-4;
    }
    if(keyDown(RIGHT_ARROW)) {
        playerCar.x = playerCar.x+4;
    }

    spawnOil();
    spawnObstacles();
    drawSprites();
}
function spawnObstacles() {
    if(frameCount % 25 === 0) {
        obstacle = createSprite(random(50,800),playerCar.y-800,40,40);
        obstacle.addImage(obstacleImage);
        obstacle.scale = 0.5
        obstacleGroup.add(obstacle);
    }
}

function spawnOil() {
    if(frameCount % 75 === 0) {
        oil = createSprite(random(50,800),playerCar.y-800,40,40);
        oil.addImage(oilImage);
        oil.scale = 0.2
        oilGroup.add(oil);
    }
}