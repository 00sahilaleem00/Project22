const Engine = Matter.Engine;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Body = Matter.Body;

var helicopterIMG, helicopterSprite;
var packageBody, packageSprite, packageIMG;
var groundBody, groundSprite, safeGroundSprite;
var win;

function preload()
{
	helicopterIMG=loadImage("helicopter.png");
	packageIMG=loadImage("package.png");
}

function setup() {
	createCanvas(800, 700);
	rectMode(CENTER);

	//Creating the Package
	packageSprite=createSprite(0, 100, 10,10);
	packageSprite.addImage(packageIMG)
	packageSprite.scale=0.2

	//Creating the Helicopter
	helicopterSprite=createSprite(0, 100, 10,10);
	helicopterSprite.velocityX = 3;
	helicopterSprite.addImage(helicopterIMG);
	helicopterSprite.scale=0.6

	//Creating Ground and Safe Zone
	groundSprite=createSprite(width/2, height-35, width,10);
	groundSprite.shapeColor=color(200,0,0);
	safegroundSprite=createSprite(width/2, height-35, width/8,10);
	safegroundSprite.shapeColor=color(0,200,0);


	engine = Engine.create();
	world = engine.world;
	Engine.run(engine);

	//Creating the Bodies
	packageBody = Bodies.circle(0 , 100 , 5 , {restitution:0.6, isStatic:true});
	World.add(world, packageBody);
	groundBody = Bodies.rectangle(width/2, 650, width, 10 , {isStatic:true} );
 	World.add(world, groundBody);
	
	textSize(30);
}


function draw() {
  rectMode(CENTER);
  background(0);

  //Package Sprite is alligned with the Body
  packageSprite.x= packageBody.position.x;
  packageSprite.y= packageBody.position.y;

  //Package Moves with Helicopter
  if(packageBody.isStatic == true){
	Body.setPosition(packageBody,{x:helicopterSprite.x,y:helicopterSprite.y});
  }

  //If you drop the package in the safe zone, you win
  if(packageSprite.collide(safegroundSprite)){
	win=1;
  }
  else if(packageSprite.collide(groundSprite)){
	win = 0;
  } 

  //Various Texts
  if(win == 1){
	text("MISSION SUCCEEDED",300,200);
  }
  else if(win == 0){
	text("MISSION FAILED",300,200);
  } 
  else{
	text("LAND THE PACKAGE IN THE SAFE ZONE",130,200);
	text("PRESS [DOWN] TO RELEASE",200,250);
  }

  drawSprites();
 
}

//If the down arrow is pressed, package is released
function keyPressed() {
 if (keyCode === DOWN_ARROW) {
    Body.setStatic(packageBody,false);
  }
}