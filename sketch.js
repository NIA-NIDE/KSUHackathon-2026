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
let labBg;
let portalImg;
let goalSprite;
let notePadImg;
let alphabetImg;
let gameMusic;
let playerWalk;
let playerImg_create;
let walkingAnimation;
let mainGameInitialized = false;
let showPopup = false;
let showNotePopup = false;
let showKeypadPopup = false;
let labTimer = 0;
let labStartTime = 0;
let labInput;
let labSubmitBtn;
let keypadInput;
let keypadSubmitBtn;
let keypadMessage = "";
let labText = "";
let labMessage = "";

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
 gameMusic = loadSound('assets/001 - Welcome.mp3');
}

function preloadSprites(){
 bg = loadImage('assets/Main-Menu.png');
 gameBg = loadImage('assets/pixil-drawing.png');
 jungleBg = loadImage('assets/jungle.png');
 labBg = loadImage('assets/lab04.png');
 portalImg = loadImage('assets/portal.png');
 alphabetImg = loadImage('assets/alphebet_sprite.jpg');
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

 // Create hidden components for Lab Popup
 labInput = createInput('');
 labInput.size(150);
 labInput.elt.style.zIndex = "9999";
 labInput.hide();
 
 labSubmitBtn = createButton('Save Note');
 labSubmitBtn.size(80);
 labSubmitBtn.elt.style.zIndex = "9999";
 labSubmitBtn.mousePressed(() => {
   let inputVal = labInput.value();
   if (inputVal === "HELLO") {
     labText = inputVal;
     labMessage = "Correct! Returning to Menu...";
     labInput.value('');
     // Wait longer (3 seconds) so user can actually see the success message
     setTimeout(() => {
       if (screen == 0) return; // Already moved
       screen = 0;
       showPopup = false;
       labInput.hide();
       labSubmitBtn.hide();
       labMessage = "";
     }, 3000);
   } else {
     labMessage = "Wrong password!";
     // Clear the "Wrong password" message after 2 seconds so it doesn't just stay there forever
     setTimeout(() => {
       if (labMessage === "Wrong password!") labMessage = "";
     }, 2000);
   }
 });
 labSubmitBtn.hide();

 // Create hidden components for Keypad Popup
 keypadInput = createInput('');
 keypadInput.size(150);
 keypadInput.elt.style.backgroundColor = "#000";
 keypadInput.elt.style.color = "#0f0";
 keypadInput.elt.style.border = "2px solid #0f0";
 keypadInput.elt.style.fontFamily = "monospace";
 keypadInput.elt.style.padding = "10px";
 keypadInput.elt.style.fontSize = "16px";
 keypadInput.elt.style.zIndex = "9999";
 //keypadInput.hide();
 
 keypadSubmitBtn = createButton('Submit Code');
 keypadSubmitBtn.size(120, 40);
 keypadSubmitBtn.elt.style.zIndex = "9999";
 keypadSubmitBtn.mousePressed(() => {
   let inputVal = keypadInput.value().replace(/\s/g, ""); // Remove any spaces entered
   if (inputVal === "10634") {
     screen = 5; // Congratulations Screen
     showKeypadPopup = false;
     keypadInput.hide();
     keypadSubmitBtn.hide();
     keypadMessage = "";
   } else {
     keypadMessage = "ACCESS DENIED: ERROR 404";
     setTimeout(() => {
       if (keypadMessage === "ACCESS DENIED: ERROR 404") keypadMessage = "";
     }, 2000);
   }
 });
 keypadSubmitBtn.hide();
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
}

function showPortalInstruction() {
 push();
 textAlign(LEFT, TOP);
 fill(255);
 stroke(0);
 strokeWeight(3);
 textSize(16);
 text("Press B to enter portal", 20, 20);
 pop();
}

function showlabInstruction() {
 push();
 textAlign(LEFT, TOP);
 fill(255);
 stroke(0);
 strokeWeight(3);
 textSize(16);
 text("Press  N to view note enter portal", 20, 20);
 text("Press B to enter portal", 20, 20);
 text("Press B to enter portal", 20, 20);
 pop();
}



function initMainGameRoom() { //Player Movement mechanics
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
 
 // Instructions in upper left
 push();
 textAlign(LEFT, TOP);
 fill(255);
 textSize(16);
 text("E for start", 20, 20);
 text("C for credits", 20, 50);
 pop();
}

function startGame() {
  screen = 1;
  hideButton();
  initMainGameRoom();
  if (gameMusic) {
    gameMusic.play();
  }
}

function creditGame() {
  screen = 2;
  hideButton();
}

function labScreen() {
  // Instructions in upper left
  push();
  textAlign(LEFT, TOP);
  fill(0);
  textSize(16);
  text("Press N to view note", 20, 20);
  pop();
  
  // Alphabet image in upper right corner
  if (alphabetImg) {
    image(alphabetImg, width - 120, 50, 100, 100);
  }
  
  textAlign(CENTER, CENTER);
  fill(0);
  textSize(32);
  text("LABORATORY", width / 2, 50); 
  textSize(24);
  text("Input SECRET LETTER to Escape!!", width / 2, 90); 
  
  // Update and Display Timer
  let elapsed = floor((millis() - labStartTime) / 1000);
  let remaining = max(0, 120 - elapsed);
  
  let minutes = floor(remaining / 60);
  let seconds = remaining % 60;
  let timeStr = nf(minutes, 1) + ":" + nf(seconds, 2);
  
  textSize(24);
  fill(remaining < 10 ? 'red' : 0); // Turn red in last 10 seconds
  text("Time Remaining: " + timeStr, width / 2, height - 40);
  
  if (remaining <= 0) {
    screen = 3; // Game over if time runs out
  }

  // Draw Notepad in upper right corner
  if (notePadImg) {
    image(notePadImg, width - 120, 20, 100, 100);
  }

  fill(0);
  textSize(16);
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
    showPopup = false;
    showNotePopup = false;
    showKeypadPopup = false;
    if (labInput) labInput.hide();
    if (labSubmitBtn) labSubmitBtn.hide();
    if (keypadInput) keypadInput.hide();
    if (keypadSubmitBtn) keypadSubmitBtn.hide();
  } else if (key === 'n' || key === 'N') {
    if (screen == 4) { // Only allow in the Lab
      showNotePopup = !showNotePopup;
    }
  } else if (key === 'k' || key === 'K') {
    if (screen == 4) {
      showKeypadPopup = !showKeypadPopup;
      if (!showKeypadPopup) {
        keypadInput.hide();
        keypadSubmitBtn.hide();
      }
    }
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
  } else if (key === 'h' || key === 'H') {
    screen = 5; // Congratulations Screen
    if (keypadInput) keypadInput.hide();
    if (keypadSubmitBtn) keypadSubmitBtn.hide();
  }
}


function draw() {

  if(screen == 0){
   background(bg);
   menuScreen();
 } else if(screen == 1){
   background(jungleBg);
   if (portalImg) {
     image(portalImg, 100, 300, 170, 170);
   }
   if (player) player.visible = true;
   mainGameRoom();
   showPortalInstruction();
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
   text("GAME OVER", width / 2, height / 2);
   textSize(16);
   text("Press M for Menu", width / 2, height / 2 + 50);
 } else if(screen == 4){
   background(labBg || 200); // Use labBg image, fallback to gray if not loaded
   if (player) player.visible = true;
   labScreen();
   mainGameRoom(); // Use this function to keep player movement logic active
 } else if(screen == 5){
   background(0, 255, 0); // Green congratulations screen
   if (player) player.visible = false;
   textAlign(CENTER, CENTER);
   fill(0);
   textSize(48);
   text("CONGRATULATIONS!", width / 2, height / 2 - 50);
   textSize(24);
   text("You ESCAPE the lab", width / 2, height / 2 + 20);
   textSize(16);
   text("Press M for Main Menu", width / 2, height / 2 + 100);
 }

  // Draw screen border on top of everything
  drawScreenBorder();

 if (showPopup) {
   drawPopup();
 } else {
   if (labInput) labInput.hide();
   if (labSubmitBtn) labSubmitBtn.hide();
 }

 if (showNotePopup) {
   drawNotePopup();
 }

 if (showKeypadPopup) {
   drawKeypadPopup();
 } else {
   if (keypadInput) keypadInput.hide();
   if (keypadSubmitBtn) keypadSubmitBtn.hide();
 }

}

function drawNotePopup() {
  push();
  rectMode(CENTER);
  fill(50, 50, 50, 230); // Darker popup
  stroke(255);
  strokeWeight(2);
  
  let x = width / 2;
  let y = height / 2;
  
  rect(x, y, 500, 300, 10);
  
  fill(255);
  noStroke();
  textAlign(CENTER, CENTER);
  textSize(24);
  text("SECRET JOURNAL", x, y - 100);
  
  textSize(16);
  let journalText = "Entry 42:\n\nthe Project is almost complete. the portal is a little unstAble,\n holdIng at 45%. so far, we've collected a great amouNT of evidence \n of how earth was lIke during the cavemaN era. the specimens\n we have collected will help as built innovative technoloGy for the \n future to come. \n\n Up -> Up -> Down -> Down";
  text(journalText, x, y);
  
  textSize(14);
  fill(255, 200, 0);
  text("Press N to close journal", x, y + 120);
  pop();
}

function drawScreenBorder() {
  push();
  noFill();
  stroke(0); // Black border
  strokeWeight(20); // Width of the border
  rectMode(CORNER);
  rect(0, 0, width, height);
  pop();
}

