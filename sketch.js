var spaceShip, spaceShipImage
var evilShip, evilShipImage, evilShipGroup
var laser, laserImage, laserGroup
var backGround, backGroundImage
var blueLaser, blueLaserImage, blueLaserGroup
var lifeCount = 3
var score = 0 
var gameState = "play"
function preload(){
  spaceShipImage = loadImage("Images/SpaceShip.png")
  laserImage = loadImage("Images/Laser.png")
  backGroundImage = loadImage("Images/SpaceBackground.jpg")
  evilShipImage = loadImage("Images/EvilShip.png")
  blueLaserImage = loadImage("Images/blueLaser.png")
}

function setup() {
  createCanvas(800,600);
  backGround = createSprite(400,600,100,100)
  backGround.addImage(backGroundImage)
  backGround.scale = 2.8
  spaceShip = createSprite(400,545,50,50);
  spaceShip.addImage("space",spaceShipImage);
  spaceShip.scale = 0.1
  evilShipGroup = new Group()
  blueLaserGroup = new Group()
  laserGroup = new Group()

 
}

function draw() {
  background(0);  
  if(gameState === "play"){
    backGround.velocityY = 2
    if(backGround.y >400) {
      backGround.y = backGround.height/2
    }
   spaceShip.x = mouseX
   if (keyDown("space")){
    laser = createSprite (400,545,50,50)
    laser.x = spaceShip.x
    laser.addImage(laserImage)
    laser.velocityY = -8
    laser.scale = 0.09
    laserGroup.add(laser)
   }
   for(var i = 0; i < evilShipGroup.length;i++){
     if(laserGroup.isTouching(evilShipGroup.get(i))){
     evilShipGroup.get(i).destroy();
     score = score +100
     }
   }
   for(var i = 0; i < blueLaserGroup.length;i++){
   if(blueLaserGroup.get(i).isTouching(spaceShip)){
     lifeCount = lifeCount -1
     blueLaserGroup.get(i).destroy()
   }
   }
   if(lifeCount === 0){
     gameState = "end"
     backGround.velocityY = 0
     spaceShip.x = 400
   }
   spawnEvilShip();
  }
 
  
  drawSprites();
  if(gameState === "end"){
    textSize(30)
    fill("red")
    text("Game Over",370,300)
    blueLaserGroup.destroyEach()
    laserGroup.destroyEach()
    }
  textSize(30)
  fill("white")
  text("score:"+score,600,80)
  text("lifeCount:"+lifeCount,50,500)
}
function spawnEvilShip() {
if(frameCount %75 === 0) {
  evilShip = createSprite(random,20,50,50);
  evilShip.addImage(evilShipImage);
  evilShip.scale = 0.5
  evilShip.x = Math.round(random(0,800))
 evilShipGroup.add(evilShip)
  blueLaser = createSprite(400,20,50,50)
  blueLaser.x = evilShip.x
  blueLaser.addImage(blueLaserImage)
  blueLaser.velocityY = 6
  blueLaser.scale = 0.09
  blueLaserGroup.add(blueLaser)
}
}