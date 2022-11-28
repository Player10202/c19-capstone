var PLAY = 1;
var END = 0;
var gameState = PLAY;

var boy
var snake
var invisibleGround
var snakeGroup, snakeImage;
var backgroundImg
var score=0;

var gameOver, restart;
var gameOverImg,restartImg

function preload(){
  
  backgroundImg = loadImage("Jungle.jpg")
  

  
  
   snakeImage= loadImage("snake-removebg-preview.png");
  
  boyImage = loadImage("boy_run-removebg-preview.png");
  
  gameOverImg = loadImage("gameover-removebg-preview.png");
  restartImg = loadImage("restart-removebg-preview.png");
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  
  invisibleGround=createSprite(200,windowHeight-100,400,10)
  invisibleGround.visible=false
  boy = createSprite(50,height-200,20,50);
  boy.addImage(boyImage)
  boy.setCollider('circle',0,0,350)
  boy.scale = 0.5;
  
  
  gameOver = createSprite(width/2,height/2- 50);
  gameOver.addImage(gameOverImg);
  
  restart = createSprite(width/2,height/2);
  restart.addImage(restartImg);
  
  gameOver.scale = 0.5;
  restart.scale = 0.2;

  gameOver.visible = false;
  restart.visible = false;
  
  
  // invisibleGround.visible =false

  snakeGroup = new Group();
  boy.debug=true
  boy.setCollider("circle",0,0,140)
  score = 0;
}

function draw() {
  
  background(backgroundImg);
  textSize(20);
  fill("black")
  text("Score: "+ score,30,50);
  
  boy.collide(invisibleGround)
  if (gameState===PLAY){
    score = score + Math.round(getFrameRate()/60);
    snakeGroup.velocityX = -(6 + 3*score/100);
    
    if(keyDown(UP_ARROW)){
      boy.velocityY=-10
      
    }
    boy.velocityY=boy.velocityY+1
   
  
   
  
    
    spawnSnake();
  
    if(snakeGroup.isTouching(boy)){
        gameState = END;
    }
  }
  else if (gameState === END) {
    gameOver.visible = false;
    restart.visible = true;
    
    
    boy.velocityX = 0;
    snakeGroup.setVelocityXEach(0);
    
    
    snakeGroup.setLifetimeEach(-1);
    
    if(touches.length>0 || keyDown("SPACE") || mousePressedOver(restart)) {      
      reset();
      touches = []
    }
  }
  
  
  drawSprites();
}

function spawnSnake() {
  
  if (frameCount % 150 === 0) {
    var snake = createSprite(width+20,height-180,40,10);
    snake.addImage(snakeImage)
    snake.scale = 0.25;
    snake.velocityX = -3;
    
     
     snake.lifetime = 800;
    
   
    snake.depth = boy.depth;
    boy.depth = boy.depth+1;
    
    
    snakeGroup.add(snake);
  }
  
}


function reset(){
  gameState = PLAY;
  gameOver.visible = false;
  restart.visible = false;
  
  snakeGroup.destroyEach();
  
  score = 0;
  
}
