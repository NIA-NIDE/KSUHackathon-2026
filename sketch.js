let player;
let cns;
let mainMenu = 0;

const CANVAS_W = 800;
const CANVAS_H = 600;

function updateViewportVars() {
 const vv = window.visualViewport;
 const viewportHeight = vv?.height ?? window.innerHeight;
 document.documentElement.style.setProperty('--vvh', `${viewportHeight}px`);
}

function createOrResizeCanvas() {
 if (!cns) {
   cns = createCanvas(CANVAS_W, CANVAS_H);
   cns.parent('sketch-holder');
 } else {
   resizeCanvas(CANVAS_W, CANVAS_H);
 }
}


function ensureCanvasParent() {
 if (cns && cns.elt && cns.elt.parentElement?.id !== 'sketch-holder') {
   cns.parent('sketch-holder');
 }
}


function setup() {
 // Create canvas first
 updateViewportVars();
 createOrResizeCanvas();

 background(200);


 if (window.visualViewport) {
   window.visualViewport.addEventListener('resize', () => {
     updateViewportVars();
   });
   window.visualViewport.addEventListener('scroll', updateViewportVars);
 }
 window.addEventListener('orientationchange', () => {
   updateViewportVars();
 });
  player = new Sprite();
 player.w = 100;
 //Notes
 /*
   player.image = "your image link/url"
 */
}


function windowResized() {
 updateViewportVars();
}




function firstRoom(){
// Draw rectangle at edge
background("green");
 rect(0, 0, width, height);


 // Move character to follow mouse
 if(keyIsDown('d')){
   player.moveTo(player.x + 50, player.y);
 } else if(kb.pressing('a')){
   player.moveTo(player.x - 20, player.y);
 } else if(kb.pressing('w')){
   player.moveTo(player.x, player.y - 20);
 } else if(kb.pressing('s')){
   player.moveTo(player.x, player.y + 20);
 }


}
function menuScreen() {
 background(bg); //background image for main menu
 textAlign (CENTER);
 stroke ('black');
 textSize (40);
 text ('Click to start', height/4, width/4);
}




function draw() {
//   ensureCanvasParent();
//   updateViewportVars();
//   background(255);
 //   stroke('pink');
//   strokeWeight(5);
//   noFill();
  if(screen == 0){
   menuScreen();
 } else if(screen = 1){
   firstRoom();
 }


}
