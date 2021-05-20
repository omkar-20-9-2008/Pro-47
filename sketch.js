var robot;
var gamestate = 1;
var enemies, enemimg, graniteimg,bomb,bombimg;
var laser,laserimg;
var coinimg,coin;
var jumps = 0;
var coins = 0;
var anime;
var ground,invisibleground;
var line1, line2, line3, line4, line5, line6, line7, line8;
var rect1, rect2, rect3, rect4, rect5,rect6;

var coinG,laserG,bombG,graniteG,enemyG;

function preload(){

  anime = loadAnimation("1.png","2.png","3.png","4.png","5.png","6.png","7.png","8.png");
  laserimg = loadImage("laser.png");
  coinimg = loadImage("coin.png");
  bombimg = loadImage("bomb.png");
  graniteimg = loadImage("granite.png");
  enemimg = loadAnimation("11.png","22.png","33.png","44.png","55.png","66.png","77.png","88.png","99.png","100.png")

}
function setup() {
  createCanvas(800,600);

  rect1 = createSprite(363,60,22,50);
  rect1.shapeColor = rgb(255,0,0);

  rect2 = createSprite(387,60,22,50);
  rect2.shapeColor = rgb(255,128,0)

  rect3 = createSprite(411,60,22,50);
  rect3.shapeColor = rgb(255,255,0)

  rect4 = createSprite(436,60,22,50);
  rect4.shapeColor = rgb(128,255,0)

  rect5 = createSprite(460,60,22,50);
  rect5.shapeColor = rgb(0,255,0);

  rect6 = createSprite(475,60,15,20)
  rect6.shapeColor="black";

  line1 = createSprite(350,60,5,50);
  line1.shapeColor = "black";
  
  line2 = createSprite(410,37.5,120,5);
  line2.shapeColor = "black";

  line3 = createSprite(470,60,5,50);
  line3.shapeColor = "black";

  line4 = createSprite(410,82.5,120,5);
  line4.shapeColor = "black";

  line5 = createSprite(374,60,5,50);
  line5.shapeColor = "black";

  line6 = createSprite(398,60,5,50);
  line6.shapeColor = "black";

  line7 = createSprite(422,60,5,50);
  line7.shapeColor = "black";
  
  line8 = createSprite(446,60,5,50);
  line8.shapeColor = "black";

  robot = createSprite(100,480,50,50);
  robot.addAnimation("robot",anime);
  robot.scale = 0.20;

  ground = createSprite(400,580,800,10);
  ground.shapeColor = "brown";
  
  invisibleground = createSprite(400,595,800,10);
  invisibleground.visible = false;

  coinG = new Group();
  laserG = new Group();
  bombG = new Group();
  enemyG = new Group();

}

function draw() {
  background(255,255,255);  

  if(gamestate===1){
  robot.collide(invisibleground);


  if(keyWentDown("space")&&robot.y>=470){
    robot.velocityY=-15.5;
    jumps++
  }
  console.log(frameCount);

  robot.velocityY = robot.velocityY +0.4;

  if(frameCount%150===0){

    coin = createSprite(850,random(500,200),50,50);
    coin.addImage("coin",coinimg);
    coin.scale = 0.3;
    coin.velocityX = -3;  
    
    coinG.add(coin)
  }
  


  if(frameCount%400===0){
    bomb = createSprite(900,random(400,550));

    ran = Math.round(random(1,2))
    switch(ran){
      case 1 : bomb.addImage("bomb",graniteimg);
      bomb.scale = 0.15;
      break;
      
      case 2 : bomb.addImage("bomb",bombimg);
      bomb.scale = 0.15;
      break;
    }
    bomb.velocityX = -3;

    bombG.add(bomb);
  }

  if(frameCount%350===0){

    enemies = createSprite(900,480,50,50);
    enemies.addAnimation("enemies",enemimg);
    enemies.scale=1.4;
    enemies.velocityX=-6;

    enemyG.add(enemies);
  }

  if(keyWentDown(RIGHT_ARROW)){
    laser = createSprite(210,210,10,10);
    laser.addImage("laser",laserimg);
    laser.scale=0.1;
    laser.y = robot.y-60;
    laser.velocityX=10
    laserG.add(laser);

  }

  if(laserG.isTouching(enemyG)){
    enemyG.destroyEach();
    laserG.destroyEach();
  }

  if(frameCount>=500 || jumps===10 && rect5.visible===true){
    rect5.visible = false;
  }

  if(frameCount>=1000 || jumps===20 && rect4.visible===true && rect5.visible===false){
    rect4.visible = false;

  }
  if(frameCount>=1500 || jumps===30 && rect5.visible===false && rect4.visible===false && rect3.visible===true){
    rect3.visible = false;
 
  }

  if(frameCount>=2000 || jumps===30 && rect5.visible===false && rect4.visible===false && rect3.visible===false && rect2.visible === true){ 
    rect2.visible = false;

  }
  if(frameCount>=2500 || jumps===40 && rect5.visible===false && rect4.visible===false && rect3.visible===false && rect2.visible === false && rect1.visible===true){ 
    rect1.visible = false;
    gamestate=2

  }

  if(coinG.isTouching(robot)){
    coinG.destroyEach();
    coins++;
  }

  if(keyWentDown("I")){
    robot.visible = false
  }
  if(frameCount%100===0){
  robot.visible = true
  }
  textSize(40);
  fill(0);
  text("Coins:" + coins,50,75);
  }

  if(gamestate===2){

    fill(0);
    text("GAME END",150,400);
    coinG.destroyEach();
    rect6.visible=false;
    robot.visible=false;
    ground.visible=false;
    bombG.destroyEach();
    laserG.destroyEach();
    enemyG.destroyEach();
    line1.visible=false;
    line2.visible=false;
    line3.visible=false;
    line4.visible=false;
    line5.visible=false;
    line6.visible=false;
    line7.visible=false;
    line8.visible=false;

  }




  drawSprites();
}