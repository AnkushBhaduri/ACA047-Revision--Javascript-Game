  var restart, restartImg;
  var shootingsound;
   var gameState = "play";
   var score =0;
   
   function preload(){
    restartImg= loadImage("images/restart.png")
    spaceImage= loadImage("images/bgspace.jpg");
    enemyImage= loadImage("images/enemy.png");
    spaceshipImage= loadImage("images/spaceShip.png");
    shootingsound= loadSound("sounds/shooting.mp3");
    
   }
   
   function setup(){
    createCanvas(1000,600)
    space = createSprite(width, height);
    restart= createSprite(500,300);
    space.addImage(spaceImage);  
    space.scale=5
    space.y = space.height/2;
    restart.addImage(restartImg)
    player = createSprite(width/2, height-200);
    player.addImage(spaceshipImage);
    restart.addImage(restartImg);
    
    EnemyGroup = new Group();
    BulletGroup = new Group();
    textSize(25);
    fill("yellow")
   }


   
   function draw() {
  

   
   if(gameState === "play"){
    restart.visible=false;
    if(keyWentDown("space"))  {
      generateBullets();  
   }

     space.velocityY= 6;
     player.x = World.mouseX;
   
     if (space.y > 550) {       
       space.y = space.height/4;
     }
  
     generateEnemy();
       
   }
   
   for (var i = 0; i < EnemyGroup.length; i++) {
   var temp=EnemyGroup.get(i);
   if(temp.isTouching(BulletGroup)){
     temp.destroy();
     score = score+1;
     shootingsound.play();
   }
 }  
 
   for (var i = 0; i < EnemyGroup.length; i++) {
     var temp1=EnemyGroup.get(i);
     if(temp1.y>height+50){
     temp1.destroy();
     score = score-1;
   }
 }  
   if (score <=-1 || player.isTouching(EnemyGroup)){
       gameState="end";
      space.velocityY=0;
      restart.visible=true;
      
      if (mousePressedOver(restart)){
        restartGame();
      }
   }
   else if (gameState==="end"){
     player.velocityY=0;
     enemy.velocityY=0;
     EnemyGroup.setVelocityXEach(0);
     EnemyGroup.setLifetimeEach(-1);
     
   }

   
   drawSprites();
    
     text("Score:  "+score,300,30); 
   }
  
  function generateEnemy() {
   if(World.frameCount%40===0){
     var enemy = createSprite(300,0);
     enemy.addImage(enemyImage);
    enemy.x = random(20,width-20);
     enemy.velocityY = 5;
     enemy.scale = 0.5;
     enemy.lifetime = 300;
     EnemyGroup.add(enemy);
   }
 }
 
 function generateBullets() {
   var bullet = createSprite(300,380,5,10);
   bullet.x = player.x;
   bullet.y = player.y;
   bullet.shapeColor = "red"; 
   bullet.velocityY = -10;
   bullet.depth = player.depth-1;
   bullet.lifetime = 200;  
   BulletGroup.add(bullet);
   
 }  
 function restartGame(){
    gameState="play";
    EnemyGroup.destroyEach();
    BulletGroup.destroyEach();  
    score=0;
    
    
  }
