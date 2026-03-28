let player;
let cns;
let mainMenu = 0;


function getViewportSize() {
 const vv = window.visualViewport;
 const viewportWidth = vv?.width ?? window.innerWidth;
 const viewportHeight = vv?.height ?? window.innerHeight;
 return {
   w: Math.max(1, Math.floor(viewportWidth)),
   h: Math.max(1, Math.floor(viewportHeight))
 };
}


function updateViewportVars() {
 const vv = window.visualViewport;
 const viewportHeight = vv?.height ?? window.innerHeight;
 document.documentElement.style.setProperty('--vvh', `${viewportHeight}px`);
}

function createOrResizeCanvas() {
 const { w, h } = getViewportSize();

 if (!cns) {
   cns = createCanvas(w, h);
   cns.parent('sketch-holder');
 } else {
   resizeCanvas(w, h);
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
     createOrResizeCanvas();
   });
   window.visualViewport.addEventListener('scroll', updateViewportVars);
 }
 window.addEventListener('orientationchange', () => {
   updateViewportVars();
   createOrResizeCanvas();
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
 createOrResizeCanvas();
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
<<<<<<< HEAD
 //   stroke('pink');
//   strokeWeight(5);
//   noFill();
  if(screen == 0){
   menuScreen();
 } else if(screen = 1){
   firstRoom();
 }


}
=======
  
//   stroke('pink');
//   strokeWeight(5);
//   noFill();
  
  if(screen == 0){
    menuScreen();
  } else if(screen = 1){
    firstRoom();
  }

}
>>>>>>> f9cc2a2 (The prototype)
