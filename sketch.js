let player;
let cns;
let startButton;
let creditButton; 
let mainCharacter;
let screen = 0;
let img;
let bg;
let gameBg;
let playerImg;
let mainGameInitialized = false;

const CANVAS_W = 800;
const CANVAS_H = 600;

function updateViewportVars() { //updates depending on screen resolutuion and orientation
 const vv = window.visualViewport;
 const viewportHeight = vv?.height ?? window.innerHeight;
 document.documentElement.style.setProperty('--vvh', `${viewportHeight}px`); 
}

function createOrResizeCanvas() { //forces canvas to be child of div with id 'sketch-holder'
 if (!cns) {
   cns = createCanvas(CANVAS_W, CANVAS_H); 
   cns.parent('sketch-holder'); 
 } else {
   resizeCanvas(CANVAS_W, CANVAS_H);
 }
}

//For Saftey
function ensureCanvasParent() { //ensures canvas is child of div with id 'sketch-holder', in case it gets detached for some reason
 if (cns && cns.elt && cns.elt.parentElement?.id !== 'sketch-holder') {
   cns.parent('sketch-holder');
 }
}

function preload(){
 if (window.visualViewport) { //only add event listeners if visualViewport API is supported
   window.visualViewport.addEventListener('resize', () => {
     updateViewportVars();
   });
   window.visualViewport.addEventListener('scroll', updateViewportVars);
 }
 
 window.addEventListener('orientationchange', () => {
   updateViewportVars();
 });
 
}

function setup() {
 // Create canvas first
 updateViewportVars();
 createOrResizeCanvas();
 preload();
 background(200); //temporary background color, can be removed when main menu is implemented
 bg = loadImage('assets/Main-Menu.png');
 playerImg = loadImage('assets/Cavewomen.png');
 gameBg = loadImage('assets/pixilart-drawing.png');
 // Create UI once
 startButton = createButton('Start Game');
 startButton.mousePressed(startGame);
 startButton.show();
 
 

}

function windowResized() {
 updateViewportVars();
}


function mainGameRoom(){
 initMainGameRoom(); //this intializes the player sprite and their mechanisms

// Draw rectangle at edge
// rect(0, 0, width, height);

 // Move character to follow mouse
 if(kb.pressing('d')){
    player.vel.x = +5;
   //player.moveTo(player.x + 50, player.y);
 } else if(kb.pressing('a')){
     player.vel.x = - 5;
  // player.moveTo(player.x - 20, player.y);
 } else if(kb.pressing('w')){
   player.vel.y = -5;
   //player.moveTo(player.x, player.y - 20);
 } else if(kb.pressing('s')){
    player.vel.y = +5;
   player.moveTo(player.x, player.y + 20);
 } else {
  player.vel.x = 0;
  player.vel.y = 0;
 }


}
function initMainGameRoom() {
  if (mainGameInitialized) return;
  mainGameInitialized = true;
  world.gravity.y = 0;
  player = new Sprite();
  player.collider = 'kinematic';
  player.x = width / 2;
  player.y = height / 2;
  player.image = playerImg;
  player.scale = 3.5;
}

function menuScreen() {
 //background(); //background image for main menu
 if (startButton) {
   startButton.position(width / 2 - 50, height / 2);
   startButton.show();
 } else if(creditsScreen){
  //will do last
 }
 

}

function startGame() {
  screen = 1;
  hideButton();
  initMainGameRoom();
}

function hideButton(){
  if (startButton) 
  {
  startButton.hide();
  } else if (creditButton){
  creditButton.hide();
  }
}

function creditsScreen(){
 Text("hello", 10, 30);
}

function draw() {

  if(screen == 0){
   background(bg);
   menuScreen();
 } else if(screen == 1){
   background(gameBg);
   mainGameRoom();
 } else if(screen == 2){
 
 }


}
