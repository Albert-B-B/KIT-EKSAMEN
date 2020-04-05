let img
function setup() {
  createCanvas(800,800);
}

function preload() {
  img = loadImage("assets/ULOVLIGTSPRITE.JPG");
}

function draw() {
 image(img, 0, 0);
}
