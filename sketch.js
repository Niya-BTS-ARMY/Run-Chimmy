var s, score = 0;
var path, pathImg;
var ch, chimmy, chimmy1, chImg;
var p1Img, p2Img;
var obstacle, obstacle_group;
var invisibleBlockGroup, invisibleBlock;
var gameState = "play";
var chImg1, chimmy2;
var chImg2, chimmy3;

function preload() {
  s = loadSound("BTS - Butter.mp3");
  pathImg = loadImage("path.png");
  ch = loadAnimation("Chimmy.png");
  p1Img = loadImage("Platform1.png");
  p2Img = loadImage("Platform.png");
  chImg = loadImage("Chimmy-2.png");
  chImg1 = loadImage("chimmy-bt21.gif");
  chImg2 = loadImage("Chimmy-1.png");
}

function setup() {
  createCanvas(400, 600);
  s.loop();

  path = createSprite(200, 350);
  path.addImage(pathImg);
  path.velocityY = 2
  path.scale = 1.2;

  chimmy = createSprite(200, 300);
  chimmy.addAnimation("chimmy", ch);
  chimmy.scale = 0.15;

  chimmy1 = createSprite(300, 500);
  chimmy1.addImage(chImg);
  chimmy1.scale = 0.2;
  chimmy1.visible = false;

  chimmy2 = createSprite(100, 500);
  chimmy2.addImage(chImg1);
  chimmy2.scale = 0.3;
  chimmy2.visible = false;

  chimmy3 = createSprite(200, 450);
  chimmy3.addImage(chImg2);
  chimmy3.scale = 0.5;
  chimmy3.visible = false;

  obstacle_group = createGroup();
  invisibleBlockGroup = createGroup();
}

function draw() {
  background("black");

  if (gameState == "play") {

    if (keyDown(LEFT_ARROW)) {
      chimmy.x -= 20;
    }

    if (keyDown(RIGHT_ARROW)) {
      chimmy.x += 20;
    }


    if (path.y > 400) {
      path.y = 300
    }

    if (keyDown("space")) {
      chimmy.velocityY = -7;
    }

    if (chimmy.isTouching(obstacle_group)) {
      chimmy.velocityY = 0;
      score += 5;
    }
path.velocityY= +(2+score/100);
    chimmy.velocityY = chimmy.velocityY + 0.4;

    if (score>0  && score% 100 == 0) {
      chimmy2.visible = true;
    }

    if (score>0 && score % 100 != 0) {
      chimmy2.visible = false;
    }

    if (score >0 && score % 50 == 0) {
      chimmy1.visible = true;
    }

    if (score>0 && score % 50 != 0) {
      chimmy1.visible = false;
    }

    if (chimmy.isTouching(invisibleBlockGroup) || chimmy.y > 600) {
      gameState = "end";
    }

    if (chimmy.x > 400) {
      chimmy.x = 400;
    }


    if (chimmy.x < 0) {
      chimmy.x = 0;
    }


    spawn_obstacles();
    drawSprites();
    fill("dark white");
    textSize(20);
    text("Score : " + score, 20, 20);
  }

  else if (gameState == "end") {
    background("black");
    chimmy3.visible = true;
    drawSprites();
    fill("purple");
    textSize(40);
    text("GAME OVER", 80, 200);

    textSize(30)
    text("Press Space To Restart", 35, 300);

    chimmy.x = -20
    chimmy.y = -20;
    path.velocityY = 0;
    chimmy.velocityY = 0;

    if (keyDown("space")) {
      reset();
    }
  }

}

function reset() {
  chimmy.x = 200;
  chimmy.y = 500;
  chimmy.velocityY = 0;
  obstacle_group.destroyEach();
  gameState = "play";
  score = 0;
  chimmy3.visible = false;
  path.velocityY = 2;
}




function spawn_obstacles() {
  if (frameCount % 120 == 0) {
    obstacle = createSprite(random(100, 350), 0);
    obstacle.velocityY = +(3+score/100);
    obstacle_group.add(obstacle)
    obstacle.scale = 0.5;
    chimmy.depth = obstacle.depth;
    chimmy.depth += 1;

    var option = Math.round(random(1, 2));
    console.log(option);

    switch (option) {

      case 1: obstacle.addImage(p1Img);
        obstacle.scale = 0.45;
        break;

      case 2: obstacle.addImage(p2Img);
        obstacle.scale = 0.35;
        break;

    }

    invisibleBlock = createSprite(obstacle.x, 0, obstacle.width - 5, 5);
    invisibleBlock.velocityY = +(3+score/100);
    invisibleBlock.visible = false;
    invisibleBlockGroup.add(invisibleBlock);

  }

}






