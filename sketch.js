let player;
let cns;
let startButton;
let creditButton; 
let mainCharacter;
let screen = 0;
let img;
let bg;
let gameBg;
let jungleBg;
let goalSprite;
let playerWalk;
let playerImg_create;
let walkingAnimation;
let mainGameInitialized = false;
let showPopup = false;
let labTimer = 0;
let labStartTime = 0;

const CANVAS_W = 800;
const CANVAS_H = 600;
const speed = 4;
const speedBack = -4;


let startImg;
let startHoverImg;
let creditImg;

function preload(){
 playerWalk = loadAnimation("assets/Cave-women001.png", "assets/Cave-women003.png");
 playerWalk.frameDelay = 10; // Higher value = slower animation
 startImg = loadImage('assets/Start-reg.png');
 startHoverImg = loadImage('assets/Start-hover.png');
 creditImg = loadImage('assets/Credit-button.png');
}

function preloadSprites(){
 bg = loadImage('assets/Main-Menu.png');
 gameBg = loadImage('assets/pixil-drawing.png');
 jungleBg = loadImage('assets/jungle.png');
}

function setup() {
 // Create canvas first
 updateViewportVars();
 createOrResizeCanvas();
 //updateMove();
 preloadSprites();

 
 // Create UI once
 startButton = createButton('');
  keyPressed();
 startButton.elt.style.backgroundImage = "url('assets/Start-reg.png')";
 startButton.elt.style.backgroundSize = "contain";
 startButton.elt.style.backgroundRepeat = "no-repeat";
 startButton.elt.style.backgroundPosition = "center";
 startButton.elt.style.backgroundColor = "transparent";
 startButton.elt.style.border = "none";
 startButton.elt.style.width = "400px";
 startButton.elt.style.height = "200px";
 startButton.elt.style.cursor = "pointer";
 startButton.elt.onmouseover = () => startButton.elt.style.backgroundImage = "url('assets/Start-hover.png')";
 startButton.elt.onmouseout = () => startButton.elt.style.backgroundImage = "url('assets/Start-reg.png')";

 creditButton = createButton('');
  keyPressed();
 creditButton.elt.style.backgroundImage = "url('assets/Credit-button.png')";
 creditButton.elt.style.backgroundSize = "contain";
 creditButton.elt.style.backgroundRepeat = "no-repeat";
 creditButton.elt.style.backgroundPosition = "center";
 creditButton.elt.style.backgroundColor = "transparent";
 creditButton.elt.style.border = "none";
 creditButton.elt.style.width = "400px";
 creditButton.elt.style.height = "200px";
 creditButton.elt.style.cursor = "pointer";

 creditButton.show();
 startButton.show();
} 

function updateAnimation(){
}


function updateMove(){
 // Move character to follow mouse
 player.animation.stop();
 if(kb.pressing('d')){
  player.vel.x = speed;
  player.animation.play();
  player.mirror.x = false;
 } else if(kb.pressing('a')){
     player.vel.x = speedBack; 
       player.animation.play();
       player.mirror.x = true;
 } else if(kb.pressing('w')){
   player.vel.y = speedBack;
     player.animation.play();
 } else if(kb.pressing('s')){
    player.vel.y = speed;
      player.animation.play();
 } else {
  player.vel.x = 0;
  player.vel.y = 0;
 }

 // Keep character on screen
 if (player.x < 0) player.x = 0;
 if (player.x > width) player.x = width;
 if (player.y < 0) player.y = 0;
 if (player.y > height) player.y = height;
}



function mainGameRoom(){
 updateMove();
 push();
 textAlign(LEFT, TOP);
 fill(255);
 stroke(0);
 strokeWeight(3);
 textSize(16);
 text("Press B to enter portal", 20, 20);
 pop();
}


function initMainGameRoom() {
  if (mainGameInitialized) return;
  mainGameInitialized = true;
  world.gravity.y = 0;
  player = new Sprite();
  player.addAnimation("cave", playerWalk);
  player.collider = 'kinematic';
  player.x = width - 40;
  player.y = height - 40;
  player.scale = 3.5;
}

function menuScreen() {
 //background(); //background image for main menu
 if (startButton) {
   startButton.position(width / 2 - 200, height / 2 - 120); // Center start button
   startButton.show();
 }
 if (creditButton) {
   creditButton.position(width / 2 - 200, height / 2 - 20);  // Center credit button below
   creditButton.show();
 }
}

function startGame() {
  screen = 1;
  hideButton();
  initMainGameRoom();
}

function creditGame() {
  screen = 2;
  hideButton();
}

function labScreen() {
  textAlign(CENTER, CENTER);
  fill(0);
  textSize(32);
  text("LABORATORY", width / 2, 50);
  
  // Update and Display Timer
  let elapsed = floor((millis() - labStartTime) / 1000);
  let remaining = max(0, 5 - elapsed);
  
  let minutes = floor(remaining / 60);
  let seconds = remaining % 60;
  let timeStr = nf(minutes, 1) + ":" + nf(seconds, 2);
  
  textSize(24);
  fill(remaining < 10 ? 'red' : 0); // Turn red in last 10 seconds
  text("Time Remaining: " + timeStr, width / 2, 100);
  
  if (remaining <= 0) {
    screen = 3; // Game over if time runs out
  }

  fill(0);
  textSize(16);
  text("Science in progress...", width / 2, height / 2);
  text("Press M to return to menu", width / 2, height / 2 + 100);
}

function creditScreen() {
  text('CREDITS', width / 2 - 50, 50);
  text('Game Created By: Myah Nix & Niesha Mccory', width / 2 - 100, 150);
  text('Music: [Your Music Credits]', width / 2 - 100, 200);
  text('Art: [Your Art Credits]', width / 2 - 100, 250);
  text('Press M to return to menu', width / 2 - 120, 500);
}

function hideButton(){
  if (startButton) 
  {
  startButton.hide();
  creditButton.hide();
  } else if (creditButton){
  creditButton.hide();
  }
}

function keyPressed() {
  if (key === 'e' || key === 'E') {
    startGame();
  } else if (key === 'c' || key === 'C') {
    creditGame();
  } else if (key === 'm' || key === 'M') {
    screen = 0;
    mainGameInitialized = false;
  } else if (key === 'y' || key === 'Y') {
    showPopup = !showPopup; // Toggle stationary popup
  } else if (key === 'b' || key === 'B') {
    screen = 4; // Lab Screen
    hideButton();
    // Start 2 minute timer (120 seconds)
    labStartTime = millis();
    labTimer = 120;
    // Reset player position for the lab screen
    if (player) {
      player.x = width - 40;
      player.y = height - 40;
    }
  }
}


function draw() {

  if(screen == 0){
   background(bg);
   menuScreen();
 } else if(screen == 1){
   background(jungleBg);
   if (player) player.visible = true;
   mainGameRoom();
 } else if(screen == 2){
   background(100, 150, 255);
   creditScreen();
 } else if(screen == 3){
   background(255, 0, 0); // Red screen
   if (player) player.visible = false;
   if (goalSprite) goalSprite.visible = false;
   textAlign(CENTER, CENTER);
   fill(255);
   textSize(32);
   text("GAME OVER / REACHED GOAL", width / 2, height / 2);
   textSize(16);
   text("Press M for Menu", width / 2, height / 2 + 50);
 } else if(screen == 4){
   background(200); // Light gray lab floor
   if (player) player.visible = true;
   labScreen();
   mainGameRoom(); // Use this function to keep player movement logic active
 }

 if (showPopup) {
   drawPopup();
 }

}

function drawPopup() {
  push();
  rectMode(CENTER);
  fill(255, 255, 255, 230); // White with transparency
  stroke(0);
  strokeWeight(2);
  
  // Center of the screen
  let x = width / 2;
  let y = height / 2;
  
  rect(x, y, 300, 150, 10);
  
  fill(0);
  noStroke();
  textAlign(CENTER, CENTER);
  textSize(18);
  text("Hello! This is a popup", x, y - 20);
  textSize(14);
  text("Press Y to close", x, y + 30);
  pop();
}
