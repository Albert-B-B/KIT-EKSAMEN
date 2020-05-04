let img;
//Universal gravity constant
let g = 6.674*Math.pow(10,-11);
let timeRatio = 60*60*60*10;
let lengthRatio = 500000000;
let OBList = [];
let trailList = [];
let pause = false;

let pauseButton;
let createPlanetButton;
let createFlag = false;
let activePlanet = 0;

let sunImg
let earthImg

OBnumber = 0;

function preload() {
  pauseicon = loadImage('https://i.imgur.com/9QKrCtH.png')
  sunImg = loadImage('https://i.imgur.com/b5aWo6E.png')
  earthImg = loadImage('https://i.imgur.com/lG3jIA3.png')
  backgroundImg = loadImage('https://i.imgur.com/MHu6bBY.jpg')
}

function setup() {
  Height = 1000;
  Width  = 1000;
  canvas = createCanvas(Height, Width);
  convert = new scaleConverter()
  canvas.parent('sketch-holder');
  OBList.push(new OrbitalB(Width/2, Height/2, 100, 1.989*Math.pow(10, 30), 0, 0))
  OBList.push(new OrbitalB(500, 200, 10, 5.97*Math.pow(10,24), 0.00005956, 0))
  document.getElementById("massBox").value = 1.989*Math.pow(10, 30)
  OBList[0].setImg(sunImg)
  OBList[1].setImg(earthImg)



  //Buttons
  pauseButton = createImg('https://i.imgur.com/mvth4yQ.png');
  pauseButton.position(200,20);
  createPlanetButton = createButton('New planet');
  pauseButton.mousePressed(pause_unpause);
  createPlanetButton.position(400,925);
  createPlanetButton.mousePressed(setFlagPlanetCreation());
  //OBList.push(new OrbitalB(450, 185, 3, 7.34*5*Math.pow(10,22), -3, 0))
}

function removePlanet(planetIdx) {
  for (let i = planetIdx; i < OBList.length; i++) {
    OBList[i].idx -= 1
  }
  OBList.splice(planetIdx,1)
}

function setFlagPlanetCreation () {
  createFlag = 1;
}
function mouseClicked() {
  if (createFlag === 2) {
    userAddPlanet(mouseX,mouseY)
  }
  if (createFlag === 1) {
    createFlag = 2;
  }
}
function userAddPlanet(x_pos,y_pos) {

}

// function pause_unpause() {
//   if (pause===false) {
//
//     stroke(255);
//     background(220);
//     // pauseButton = image(pauseicon, 50, 50, 100, 100);
//     for (let i = 0; i < OBList.length; i++) {
//       OBList[i].accelerate();
//       OBList[i].move();
//       OBList[i].display();
//       OBList[i].Collision();
//     }
//   }
//   else {
//
//   }
// }


function mousePressed() {
  if (value === 0) {
    value = 255;
  } else {
    value = 0;
  }
}

function pause_unpause() {
  print('pause triggered')
  if (pause===false) {
    pause=true;
    print('paused')
  } else {
    pause = false
    print('resumed')
  }
}
//
function draw() {
  if(60*document.getElementById("timescaleSlider").value != timeRatio || 60*document.getElementById("timescaleBox").value != timeRatio) {
    oldTimeRatio = timeRatio;
    if (60*document.getElementById("timescaleSlider").value != timeRatio) {
      timeRatio = 60*document.getElementById("timescaleSlider").value
    }
    else if (60*document.getElementById("timescaleBox").value != timeRatio) {
      timeRatio = 60*document.getElementById("timescaleBox").value
    }
    document.getElementById("timescaleSlider").value = timeRatio/60
    document.getElementById("timescaleBox").value = timeRatio/60
  }

  if (OBList[activePlanet].radius != document.getElementById("radiusSlider").value || OBList[activePlanet].radius != document.getElementById("radiusBox").value) {
    if (document.getElementById("radiusSlider").value != OBList[activePlanet].radius) {
      OBList[activePlanet].radius = parseInt(document.getElementById("radiusSlider").value);
    }
    else if (document.getElementById("radiusBox").value != OBList[activePlanet].radius) {
      OBList[activePlanet].radius = parseInt(document.getElementById("radiusBox").value);
    }
    document.getElementById("radiusSlider").value = OBList[activePlanet].radius
    document.getElementById("radiusBox").value = OBList[activePlanet].radius
  }

  if (OBList[activePlanet].mass != document.getElementById("massBox").value) {
    OBList[activePlanet].mass = parseInt(document.getElementById("massBox").value);
    document.getElementById("massBox").value = OBList[activePlanet].mass
  }
  if (pause===false) {
    stroke(255);
    background(220);
    image(backgroundImg, 0, 0, width, (backgroundImg.width/width)*backgroundImg.height)
    for (let i = 0; i < OBList.length; i++) {
      OBList[i].accelerate();
      OBList[i].move();
      OBList[i].display();
      OBList[i].Collision();
    }

  }
  else {
    pause=false;
  }
}


function gravity_force(obj_1,obj_2) {
  return (g*obj_1.mass * obj_2.mass)/ sq(convert.disGTR(distance(obj_1.x, obj_1.y, obj_2.x, obj_2.y)))
}

function distance(x1,y1,x2,y2) {
  return sqrt(sq((x1-x2)) + sq((y1-y2)))
}

function checkCollision(obj_1, obj_2)  {
  this.maxDis = obj_1.radius + obj_2.radius
  if (distance(obj_1.x, obj_1.y, obj_2.x, obj_2.y) < this.maxDis) {
    return true
  }
}

function calc_accel(force,obj) {
  return force/obj.mass
}

function resetSketch() {
  OBList = []
  OBnumber = 0
  OBList.push(new OrbitalB(Width/2, Height/2, 40, 1.989*Math.pow(10, 30), 0, 0))
  OBList.push(new OrbitalB(450, 200, 10, 5.97*Math.pow(10,24), 3, 0))
  OBList.push(new OrbitalB(450, 185, 3, 7.34*5*Math.pow(10,22), 3, 0))
}

function rotation_vector(obj_1, obj_2) {
  return [(obj_2.x - obj_1.x)/distance(obj_1.x,obj_1.y,obj_2.x,obj_2.y), (obj_2.y - obj_1.y)/distance(obj_1.x,obj_1.y,obj_2.x,obj_2.y)];
}

// class SVG {
//   constructor(path, posx, posy, sizex, sizey){
//     this.svgimg = loadImage(path)
//     this.posx
//     this.posy
//     this.sizex
//     this.sizey
//   }
//
//   drawSVG() {
//     image(this.svgimg, this.posx, this.posy, this.sizex, this.posy);
//   }
// }


class OrbitalB {
  constructor(x, y, radius, mass, InSpeedx, InSpeedy) {
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.speedx = InSpeedx
    this.speedy = InSpeedy
    this.mass = mass;
    this.idx = OBnumber
    this.image = null
    OBnumber += 1
    trailList.push(new trail(this.idx))
  }

  setImg(img){
    this.image = img
  }

  accelerate(obj) {
    for (let i = 0; i < OBList.length; i++) {
      if (i != this.idx) {
        this.speedx += convert.disRTG(timeRatio/60*rotation_vector(this, OBList[i])[0]*calc_accel(gravity_force(this, OBList[i]),this));
        this.speedy += convert.disRTG(timeRatio/60*rotation_vector(this, OBList[i])[1]*calc_accel(gravity_force(this, OBList[i]),this));
      }
    }
  }

  move() {
    this.x += timeRatio/60*this.speedx;
    this.y += timeRatio/60*this.speedy;
    trailList[this.idx].record()
  }

  display() {
    trailList[this.idx].drawTrail()
    if (this.image == null) {
    ellipse(this.x, this.y, this.radius*2, this.radius*2);
    } else {
    image(this.image, this.x - this.radius, this.y - this.radius, this.radius*2, this.radius*2)
    }
  }

  Collision() {
    for (let i = 0; i < OBList.length; i++) {
      if (i != this.idx) {
        if (checkCollision(OBList[this.idx], OBList[i])) {
          resetSketch()
        }
      }
    }
  }
}

class scaleConverter {
  constructor(){
  }

  disRTG(input) {
    return input/lengthRatio
  }

  disGTR(input) {
    return input*lengthRatio
  }

  timeRTG(input) {
    return input/timeRatio
  }

  timeGTR(input) {
    return input*timeRatio
  }

}

class trail{
  constructor(idx){
  this.idx = idx
  this.pointsX = []
  this.pointsY = []
}
  record(){
    this.pointsX.push(OBList[this.idx].x)
    this.pointsY.push(OBList[this.idx].y)
  }

  drawTrail(){
    stroke
    if (this.pointsX.length > 100){
    for (let i = this.pointsX.length - 99; i < this.pointsX.length; i++){
      line(this.pointsX[i-1], this.pointsY[i-1], this.pointsX[i], this.pointsY[i])
      }
    }
    else {
      for (let i = 1; i < this.pointsX.length; i++){
        line(this.pointsX[i-1], this.pointsY[i-1], this.pointsX[i], this.pointsY[i])
        }
    }
  }
}
