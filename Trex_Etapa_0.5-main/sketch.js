var trex, trex_running, edges, trex_colider;
var groundImage;
var suelo;
var sueloinvisible;
var nubeImagen;
var obj1,obj2,obj3,obj4,obj5,obj6;
var score;
var PLAY = 1;
var END = 0;
var gamestate = PLAY;
var gameover, gameoverImg;
var restart, restartImg;
var salto;
var muerte;
var checkPoint;
function preload(){
  trex_running = loadAnimation("trex1.png","trex3.png","trex4.png");
  groundImage = loadImage("ground2.png");
  nubeImage=loadImage("cloud.png");
  obj1=loadImage("obstacle1.png");
  obj2=loadImage("obstacle2.png");
  obj3=loadImage("obstacle3.png");
  obj4=loadImage("obstacle4.png");
  obj5=loadImage("obstacle5.png");
  obj6=loadImage("obstacle6.png");
  trex_colider=loadImage("trex1.png");
  gameoverImg=loadImage("gameOver.png");
  restartImg=loadImage("restart.png");
  salto=loadSound("jump.mp3");
  muerte=loadSound("die.mp3");
  checkPoint=loadSound("checkPoint.mp3");
}

function setup(){
  createCanvas(600,200);
  
  //crear sprite de Trex
  trex = createSprite(50,160,20,50);
  trex.addAnimation("running", trex_running);
  trex.addAnimation("trexx", trex_colider);
  edges = createEdgeSprites();
  gameover=createSprite(300,100,30,30);
  restart=createSprite(300,150,30,30);
  gameover.addImage(gameoverImg);
restart.addImage(restartImg);
gameover.scale=0.5;
restart.scale=0.5;
  //agregar tamaño y posición al Trex
  trex.scale = 0.5;
  trex.x = 50
  suelo=createSprite(180,180,400,30);
  suelo.addImage("suelo",groundImage);
  //trex.setCollider ("rectangle",0,0,600,trex.heigth);
  sueloinvisible=createSprite(200,200,400,30);
  sueloinvisible.visible = false;
  score=0;
  cloudss=new Group();
  cactus_=new Group();
}


function draw(){
  //establecer color de fondo.
  background("white");
  if (gamestate===PLAY) {
    //Mover aqui la velocidad de suelo
    suelo.velocityX = -(3 + 2* score/100);
    //Mover aqui conteo de puntos 
    score = score + Math.round(frameCount/60);
  if(score>0&&score%100===0){
    checkPoint.play();
  }
  if(score>1000){
    background(0,0,0)
  }
  if(score>3000){
    background("white")
  }
        //Mover aqui puntuacion
    text("Puntuacion: " + score, 500, 50);
    //Mover aqui ciclo de repeticion de suelo
    if(suelo.x<0){
      suelo.x=suelo.width/2;
    }
    //Mover aqui salto de trex
    if(keyDown("space")&&trex.y>=160){
      trex.velocityY = -10;
  salto.play();
    }
    //Mover aqui efecto gravedad  
    trex.velocityY = trex.velocityY + 0.5;
    //Mover aqui nubes
    gameover.visible = false;
    restart.visible = false;
    clouds();
    //Mover aqui obstaculos
    cactus();
    //Establecer cambio de estado de juego GS
        if (cactus_.isTouching(trex)  ) {
         // trex.velocityY = - 12;

//salto.play();
          gamestate=END;
muerte.play();
        }
        
    } else if (gamestate===END){
      trex.changeAnimation ("trexx", trex_colider);
      cactus_.setLifetimeEach(-1);
      cloudss.setLifetimeEach(-1);
        //Establecer aqui movimiento 0 del suelo
    suelo.velocityX=0;
    trex.velocityY=0;
    cactus_.setVelocityXEach(0);
    cloudss.setVelocityXEach(0);
    gameover.visible = true;
    restart.visible = true;

    }
  if(mousePressedOver(restart)){
    reset();
  }
  
 
  //cargar la posición Y del Trex
  console.log(trex.y)
  
  //hacer que el Trex salte al presionar la barra espaciadora
  
  
 
  
  //evitar que el Trex caiga
  trex.collide(sueloinvisible);
 
  drawSprites();
}
function clouds(){
  if(frameCount%60===0){
    cloud=createSprite(600,50,50,10);
  cloud.velocityX=-3;
  cloud.addImage(nubeImage);
  cloud.y = Math.round(random(10,60));
  cloud.depth = trex.depth;
   trex.depth = trex.depth +1;
   cloud.lifetime =200;
   cloudss.add(cloud);
   clouds.depth = trex.depth;

trex.depth = trex.depth + 1;
  }
  

}
function cactus(){
if(frameCount%60===0){
  var cactuss=createSprite(400,168,10,50);
  cactuss.velocityX = -(6 + score/100);
  var rand=Math.round(random(1,6));
  switch(rand){
    case 1: cactuss.addImage(obj1);
    break;
    case 2: cactuss.addImage(obj2);
    break;
    case 3: cactuss.addImage(obj3);
    break;
    case 4: cactuss.addImage(obj4);
    break;
    case 5: cactuss.addImage(obj5);
    break;
    case 6: cactuss.addImage(obj6);
    break;
    default:
      break;
  }
  cactuss.scale=0.5;
  cactus_.add(cactuss);
  cactus.depth = trex.depth;
cactuss.lifetime=200;
trex.depth = trex.depth + 1;
}
}
function reset(){
  gamestate=PLAY;
  cactus_.destroyEach();
  cloudss.destroyEach();
  trex.changeAnimation("running", trex_running);
  score=0;
}