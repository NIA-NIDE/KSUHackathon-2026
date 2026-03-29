// sketch.js - Fixed for p5play

let player;
let playerWalk;
let startButton, creditButton;

let screen = 0; // 0 = menu, 1 = game, 2 = Lab, 3 = credits
let mainGameInitialized = false;
let showPopup = false;
let labStartTime = 0;

const CANVAS_W = 800;
const CANVAS_H = 600;
const speed = 4;
const speedBack = -4;

// Assets
let startImg, startHoverImg, creditImg;
let bg, jungleBg, gameBg, labBg; //added research lab background>
//let portalImg, BookShelfImg, CrystalImg, PaperImg, CabinetImg, GateImg, ChestImg;

// ---------------- PRELOAD ----------------
function preload() {
  // Load animation safely
  try {
    playerWalk = loadAnimation(
      "assets/Cavewomen001.png",
      "assets/Cavewomen002.png",
      "assets/Cavewomen003.png"
    );
    playerWalk.frameDelay = 10;
  } catch (e) {
  }

  // Load images directly in preload for p5
  startImg = loadImage("assets/Startreg.png");
  startHoverImg = loadImage("assets/Starthover.png");
  creditImg = loadImage("assets/Creditbutton.png");

  bg = loadImage("assets/MainMenu.png");
  jungleBg = loadImage("assets/Jungle.png");
  gameBg = loadImage("assets/pixilart-drawing.png");
  labBg = loadImage("assets/Research-Lab.png");

  
}

// ---------------- SETUP ----------------
function setup() {
  createCanvas(CANVAS_W, CANVAS_H).parent("sketch-holder");

  setupMenuButtons();
  window.addEventListener('keydown', handleGlobalKeydown);
}

// ---------------- MENU BUTTONS ----------------
function setupMenuButtons() {
  // Start Button
  startButton = createButton('');
  startButton.mousePressed(startGame);
  styleButton(startButton, "assets/Startreg.png", "assets/Starthover.png");
  startButton.position(width / 2 - 200, height / 2 - 120);
  startButton.show();

  // Credit Button
  creditButton = createButton('');
  creditButton.mousePressed(creditGame);
  styleButton(creditButton, "assets/Creditbutton.png", "assets/Creditbutton.png");
  creditButton.position(width / 2 - 200, height / 2 + 20);
  creditButton.show();
}

// Button styling helper
function styleButton(btn, normalImg, hoverImg) {
  const getSrc = (img) => {
    if (!img) return '';
    if (typeof img === 'string') return img;
    if (img.elt && img.elt.src) return img.elt.src;
    if (img.canvas && typeof img.canvas.toDataURL === 'function') return img.canvas.toDataURL();
    return '';
  };

  const normalSrc = getSrc(normalImg);
  const hoverSrc = getSrc(hoverImg);

  btn.elt.style.backgroundImage = `url('${normalSrc}')`;
  btn.elt.style.backgroundSize = "contain";
  btn.elt.style.backgroundRepeat = "no-repeat";
  btn.elt.style.backgroundPosition = "center";
  btn.elt.style.backgroundColor = "transparent";
  btn.elt.style.border = "none";
  btn.elt.style.width = "400px";
  btn.elt.style.height = "200px";
  btn.elt.style.cursor = "pointer";
  btn.elt.onmouseover = () => btn.elt.style.backgroundImage = `url('${hoverSrc}')`;
  btn.elt.onmouseout = () => btn.elt.style.backgroundImage = `url('${normalSrc}')`;
}

// ---------------- INIT GAME ----------------
function initMainGameRoom() {
  if (mainGameInitialized) return;
  mainGameInitialized = true;

  player = new Sprite();
  player.addAnimation("cave", playerWalk);
  player.x = width - 40;
  player.y = height - 40;
  player.scale = 3.5;
}

// ---------------- DRAW ----------------
function draw() {
  background(200);

  // DON'T TOUCH THIS BRUH
  if (screen == 0) {
      image(bg, 0, 0, width, height);
    menuScreen();
  } else if (screen == 1) {
    image(jungleBg, 0, 0, width, height);
    //image(portalImg, 100, 100, 100, 100);
    player.visible = true;
    mainGameRoom();
  } else if (screen == 2) {
    player.visible = true;
    image(labBg, 0, 0, width, height);
    //image(BookShelfImg, 150, 150, 100, 100);
    //image(CrystalImg, 300, 150, 100, 100);
    //image(PaperImg, 450, 150, 100, 100);
    //image(CabinetImg, 150, 300, 100, 100);
    //image(GateImg, 300, 300, 100, 100);
    //image(ChestImg, 450, 300, 100, 100);
    LabGameRoom();
  }
  else if (screen == 3) {
    creditScreen();
  }
  
  
}

// ---------------- MENU SCREEN ----------------
function menuScreen() {
  if (startButton) startButton.show();
  if (creditButton) creditButton.show();
  //player.visible = false;
  
}

// ---------------- MAIN GAME ----------------
function mainGameRoom() {
  updateMove();
  push();
  fill(255);
  stroke(0);
  textSize(16);
  text("Press B to enter portal", 20, 20);
  pop();
}

//----------------- LAB GAME ----------------
function LabGameRoom() {
  updateMove();
  push();
  fill(255);
  stroke(0);
  textSize(16);
  pop();;
}

// ---------------- PLAYER MOVEMENT ----------------
function updateMove() {
  if (!player) return;

  player.animation.stop();
  if (kb.pressing('d')) {
    player.vel.x = speed;
    player.animation.play();
    player.mirror.x = false;
  } else if (kb.pressing('a')) {
    player.vel.x = speedBack;
    player.animation.play();
    player.mirror.x = true;
  } else if (kb.pressing('w')) {
    player.vel.y = speedBack;
    player.animation.play();
  } else if (kb.pressing('s')) {
    player.vel.y = speed;
    player.animation.play();
  } else {
    player.vel.x = 0;
    player.vel.y = 0;
  }

  // Keep on screen
  player.x = constrain(player.x, 0, width);
  player.y = constrain(player.y, 0, height);
}

// ---------------- SCREENS ----------------
function startGame() {
  screen = 1;
  hideButtons();
  initMainGameRoom();
}

function labGame() {
  screen = 2;
  labStartTime = millis();
  initMainGameRoom(); // Ensure player is initialized for lab as well
  
}

function creditGame() {
  screen = 3;
  hideButtons();
}

function creditScreen() {
  fill(0);
  textAlign(CENTER, TOP);
  textSize(32);
  text('CREDITS', width / 2, 50);
  textSize(16);
  text('Game Created By: Myah Nix & Niesha Mccory', width / 2, 150);
  text('Music: [Your Music Credits]', width / 2, 200);
  text('Art: [Your Art Credits]', width / 2, 250);
  text('Press M to return to menu', width / 2, 500);
}

// ---------------- BUTTON HELPERS ----------------
function hideButtons() {
  if (startButton) startButton.hide();
  if (creditButton) creditButton.hide();
}

// ---------------- POPUP ----------------
function drawPopup() {
  push();
  rectMode(CENTER);
  fill(255, 255, 255, 230);
  stroke(0);
  rect(width/2, height/2, 300, 150, 10);
  noStroke();
  fill(0);
  textAlign(CENTER, CENTER);
  textSize(18);
  text("Hello! This is a popup", width/2, height/2 - 20);
  textSize(14);
  text("Press Y to close", width/2, height/2 + 30);
  pop();
}

// ---------------- KEYPRESSES ----------------
function handleGlobalKeydown(event) {
  const k = event.key.toLowerCase();
  if (k === 'e') startGame();
  if (k === 'b') labGame();
  if (k === 'c') creditGame();
  if (k === 'm') screen = 0;
  if (k === 'y') showPopup = !showPopup;
}

function keyPressed() {
  if (key === 'e' || key === 'E') startGame();
  if( key === 'b' || key === 'B') labGame();
  if (key === 'c' || key === 'C') creditGame();
  if (key === 'm' || key === 'M') screen = 0;
  if (key === 'y' || key === 'Y') showPopup = !showPopup;
}