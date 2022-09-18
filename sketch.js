var space
var bloco
var inimigos_all =[];
var life = 3
var score = 0
var gameState =1
function preload(){

  space  = loadImage("assets/space.jpeg");
  alien_img = loadAnimation("assets/alien1.png", "assets/alien2.png");
  squid_img = loadAnimation("assets/polvo1.png", "assets/polvo2.png");
  skull_img = loadAnimation("assets/caveira1.png", "assets/caveira2.png");
  boss_img = loadImage("assets/inimigo5.png");
  nave_img = loadImage("assets/nave.png");
  bala_img = loadImage("assets/bala.png");
}

function setup() {

  createCanvas(windowWidth,windowHeight);
  //edges = createEdgesSprite();
  nave = createSprite(width/2, height-60);
  nave.addImage(nave_img);
  nave.scale = 0.1;

  paredeInv = createSprite(100,height,4000,300);
  paredeInv.visible = false

  
  alienG =new Group();
  skullG = new Group();
  polvoG=new Group();
  bulletGroup = new Group();

  heading= createElement("h1");
  scoreboard= createElement("h1");

  gameOver = createElement("h1");

}


function draw() {
  background(space); 

  heading.html("Vida: "+ life)
  heading.style('color:red'); 
  heading.position(150,10)

  scoreboard.html("Pontuação: "+ score)
  scoreboard.style('color:red'); 
  scoreboard.position(width-200,20)


  if (keyDown("a") && nave.x > 50){
    nave.x -=5

  }

  if (keyDown("d") && nave.x < width-50){
    nave.x +=5

  }

  if(gameState===1){
    

    if (frameCount % 60 === 0) {
      drawAlien();
    }
    if (frameCount % 80 === 0) {
      drawSkull();
    }
    if (frameCount % 120 === 0) {
      drawPolvo();
    }

    if(keyDown("space")){
      shootBullet();
    }

  
    if (alienG.collide(paredeInv)) {
      handleGameover(alienG);
    }

    if(alienG.collide(bulletGroup)){
      handleEnemyCollision(alienG);
    }

    if (skullG.collide(paredeInv)) {
      handleGameover(skullG);
    }

    if(skullG.collide(bulletGroup)){
      handleEnemyCollision(skullG);
    }

    if (polvoG.collide(paredeInv)) {
      handleGameover(polvoG);
    }

    if(polvoG.collide(bulletGroup)){
      handleEnemyCollision(polvoG);
    }

  }

  if(gameState===2){

    nave.destroy();
    polvoG.destroyEach();
    skullG.destroyEach();
    alienG.destroyEach();

    gameOver.html("Game Over!")
    gameOver.style('color:red'); 
    gameOver.position(width/2,height/2)

  }


  drawSprites();
}


function drawAlien(){
  alien = createSprite(random(width/4 ,width/2+50),0,40,40);
  alien.addAnimation("alien",alien_img);
  
  alien.velocityY = 6 ;
  alienG.add(alien);
}

function drawPolvo(){
  polvo = createSprite(random(width/4 ,width/2+50),0,40,40);
  polvo.addAnimation("polvo ",squid_img);
  
  polvo.velocityY = 3 ;
  polvoG.add(polvo);

}
function drawSkull(){
  skull = createSprite(random(width/4 ,width/2+50),0,40,40);
  skull.addAnimation("skull",skull_img);
  skull.velocityY = 4;
  skullG.add(skull);

}
  function shootBullet(){
    bullet= createSprite(150, width/2, 50,20)
    bullet.x= nave.x-20
    bullet.addImage(bala_img)
    bullet.scale=0.12
    bullet.velocityY= -7
    bulletGroup.add(bullet)
  }
  
  function handleEnemyCollision(inimigoGroup){
      if (life > 0) {
         score=score+1;
      }
  
   
      bulletGroup.destroyEach()
      inimigoGroup.destroyEach()
      
  }
  
  function handleGameover(inimigoGroup){
    
      life=life-1;
      inimigoGroup.destroyEach();
  
 
      if (life === 0) {
        gameState=2
        
       
      }
}

