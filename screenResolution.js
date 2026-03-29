//Deals with Screen Resolution

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

function setupViewportListeners(){
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
function windowResized() {
 updateViewportVars();
}
