var plane,plane_Img;
var planeCrashed,planeCrashed_Img,bg_Image,bg,startStateBg,Island_Img,bg_infinite;
var player_standing1_img,player_running_img,player,poisonApple_img,fruit_img,hunger_barImg,LifeBar_img;
var player_life = 10;
var game_state = "play"


var play,end;

function preload(){
  
  plane_Img = loadImage("Imgs/Plane.png");
  planeCrashed_Img = loadImage("Imgs/Plane_Crashed.png");
  bg_Image = loadImage("Imgs/plane bg.png");
  startStateBg = loadImage("Imgs/Plane_titlePage.png");
  Island_Img = loadImage("Imgs/Island.jpg");
  player_running_img = loadAnimation("Imgs/player_running1.png","Imgs/player_running2.png");
  player_standing1_img = loadImage("Imgs/player_standing.png");
  poisonApple_img = loadImage("Imgs/poision_fruit.png");
  fruit_img = loadImage("Imgs/fruit-removebg-preview.png");
  LifeBar_img = loadImage("Imgs/life_img.png");
  hunger_barImg = loadImage ("Imgs/hunger_bar.png");

  player_running_img.looping = false;
  player_running_img.playing = true;
  player_standing1_img.playing = true;
}

function setup(){
  createCanvas(windowWidth,windowHeight);
  
  form = new Start();

  //sprites

  bg_infinite = createSprite(windowWidth/2,windowHeight/2,windowWidth,windowHeight);
  bg_infinite.addImage(Island_Img);
  bg_infinite.scale = 4.5;
  bg_infinite.velocityX = -3;
  bg_infinite.visible = false;

  plane = createSprite(950,350,15,15);
  plane.addImage(plane_Img);
  plane.scale = 0.5;
  plane.visible = false;

  player = createSprite(760,600);
  player.addImage("player",player_standing1_img);
  player.addAnimation("running",player_running_img);
  player.scale = 3;
  player.visible = false;

  //groups
  poisonApplesGroup = new Group();
  fruitGroup = new Group();
  

}

function draw(){
  background(0);
 
  imageMode(CENTER);

  //-----------------------------------START----------------------------
  if(game_state === "start"){
    image(startStateBg,windowWidth/2,windowHeight/2,windowWidth,windowHeight);
    form.display()
  }
  //-----------------------------------PLANE CRASH----------------------------
  if(game_state === "planeCrash"){
    image(bg_Image,windowWidth/2,windowHeight/2,windowWidth,windowHeight);

    //The aero-plane sprite
    plane.visible=true;
    plane.velocityX = -4;
    
    if(plane.x <= windowWidth/2){
     plane.addImage(planeCrashed_Img);
     plane.x = windowWidth/2;
     plane.velocityY += 0.2; //gravity
     plane.scale=1.1;
    }

    //change game state to play
    if(plane.y > windowHeight - 100){
      game_state = "play";      
    }
  }
  //-----------------------------------PLAY - (Island)----------------------------
  if(game_state === "play"){
    // infinite background
    // bg_infinite.visible = true;
    // if(bg_infinite.x < 0){
    //   bg_infinite.x = windowWidth/2-200;
    // }

    player.visible = true;

    // player movement
    if(keyDown("left_arrow")){
      player.x -= 8;
      player.changeAnimation("running");
      player.mirrorX(-1);
      player_running_img.looping = true;
    }

    if(keyDown("right_arrow")){
      player.x += 8;
      player.changeAnimation("running");
      player.mirrorX(1);
      player_running_img.looping = true;
    }

    if(!keyDown("right_arrow") && !keyDown("left_arrow")){
      player.changeAnimation("player");
      
    }
  
    spawnObstacles();
    spawnFruit();
    
    //reduction of life
    if(player.isTouching(poisonApplesGroup[0])){
      player.Life -= 1 

    }
    if(player.isTouching(fruitGroups[0])){
      player.Life += 1 
    }
  }

  drawSprites();

  //THE MOUSE CURSOR
  fill("white");
  text(mouseX + "," + mouseY, mouseX, mouseY);

}

//obstacles
function spawnObstacles(){
  if(frameCount % 60 === 0){
    var poisonApples = createSprite(random(100, windowWidth-100), 0);
    poisonApples.addImage("obstacles",poisonApple_img);
    poisonApples.velocityY = 10;
    poisonApples.scale = 0.2;
    poisonApplesGroups.addGroup(poisonApples);
  }
}


function spawnFruit(){
 if(frameCount % 180 === 0){
  var fruit = createSprite(random(90,windowWidth-150),0);
  fruit.addImage("fruit",fruit_img);
  fruit.velocityY = 10;
  fruit.scale = 0.2 ;
  fruitGroups.addGroup(fruit);
 }

}

//  function lifeBar(){
//   var lifebar = createSprite(2,2); 
//   if(player.istouching(poisonApples)){
   
//  }

// function showLifeBar(){
//     push();
//     image(lifeBar, width / 2 - 130, height - player.positionY - 350, 20, 20);
//     fill("white");
//     rect(width / 2 - 100, height - player.positionY - 350, 185, 20);
//     fill("#ffc400");
//     rect(width / 2 - 100, height - player.positionY - 350, player.life, 20);
//     pop();
// }

// function showLifeBar(){
//     push();
//     image(hungerBar, width / 2 - 130, height - player.positionY - 350, 20, 20);
//     fill("white");
//     rect(width / 2 - 100, height - player.positionY - 350, 185, 20);
//     fill("#ffc400");
//     rect(width / 2 - 100, height - player.positionY - 350, player.hunger, 20);
//     pop();

// }
  


  