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
let activePlanet = 1;
let planetSkins = []
let speedChangeFlag = false;
let sunImg
let earthImg
let vectorScaler = 50000000;
let showVector = true;
let CollisionFlag = true;

OBnumber = 0;

function preload() {
  pauseicon = loadImage('https://i.imgur.com/9QKrCtH.png')
  backgroundImg = loadImage('https://i.imgur.com/MHu6bBY.jpg')
  lengthScaleImage = loadImage('https://i.imgur.com/BilmiNC.png')
  planetSkinsRaw = ['https://i.imgur.com/NlPmWqd.png','https://i.imgur.com/b5aWo6E.png','https://i.imgur.com/lG3jIA3.png','https://i.imgur.com/NbokweX.png']
  planetSkins = [loadImage('https://i.imgur.com/NlPmWqd.png'), loadImage('https://i.imgur.com/b5aWo6E.png'),loadImage('https://i.imgur.com/lG3jIA3.png'),loadImage('https://i.imgur.com/NbokweX.png')]
}

function drawVector(x1,y1,x2,y2,color) {
strokeWeight(2);
  if (color==="red") {
      stroke(245, 12, 51);
  }
  if (color==="blue") {
      stroke(0, 62, 161);
  }
  print("")
  print(x1)
  print(x2)
  print("")
  line(x1,y1,x2,y2);
  stroke(255, 255, 255);
  //Work on this if you want nice arrow
  // if (distance(x1,y1,x2,y2)*vectorScaler < 5) {
  //   return false
  // }
  //
  // beginShape();
  // vertex(5,12.5);
  // vertex(40,12.5);
  // vertex(40,10);
  // vertex(45,13.75);
  // vertex(40,17.5);
  // vertex(40,15);
  // vertex(5,15);
  // endShape(CLOSE);
  strokeWeight(1);
}

function setup() {
  Height = 1000;
  Width  = 1000;
  canvas = createCanvas(Height, Width);
  convert = new scaleConverter()
  canvas.parent('sketch-holder');
  OBList.push(new OrbitalB(Width/2, Height/2, 50, 1.989*Math.pow(10, 30), 0, 0, 1))
  OBList.push(new OrbitalB(500, 200, 10, 5.97*Math.pow(10,24), 0.00005956, 0, 2))


  loadPlanetEditor(activePlanet);

  //Buttons
  pauseButton = createImg('https://i.imgur.com/FWWyfdy.png');
  pauseButton.position(468,480);
  pauseButton.mousePressed(pause_unpause);
  //OBList.push(new OrbitalB(450, 185, 3, 7.34*5*Math.pow(10,22), -3, 0))
}

function speedBoxClicked() {
  speedChangeFlag = true;
}
function saveSettings() {
  showVector = document.getElementById("vectorCheckbox").checked
  OBList[activePlanet].image =  document.getElementById("planetSkinsSelect").options[document.getElementById("planetSkinsSelect").selectedIndex].value;
  document.getElementById("activePlanetPic").src = planetSkinsRaw[OBList[activePlanet].image];
  timeRatio = document.getElementById("timescaleBox").value*60
  document.getElementById("timescaleSlider").value = document.getElementById("timescaleBox").value
  CollisionFlag = document.getElementById("colissionCheckbox").checked
  OBList[activePlanet].radius = document.getElementById("radiusBox").value
  document.getElementById("radiusSlider").value = document.getElementById("radiusBox").value
  OBList[activePlanet].mass = document.getElementById("massBox").value*Math.pow(10,document.getElementById("massExponentBox").value)
  if (speedChangeFlag) {
    OBList[activePlanet].speedx = convert.disRTG(document.getElementById("speedxBox").value)*Math.pow(10,document.getElementById("speedxExponentBox").value)
    OBList[activePlanet].speedy = convert.disRTG(document.getElementById("speedyBox").value)*Math.pow(10,document.getElementById("speedyExponentBox").value)
    speedChangeFlag = false;
  }
  trailList[activePlanet].trailLength = document.getElementById("trailLengthBox").value
  trailList[activePlanet].trailOn = document.getElementById("trailCheckbox").checked
}

function removePlanet(planetIdx) {
  for (let i = planetIdx; i < OBList.length; i++) {
    OBList[i].idx -= 1
    trailList[i].idx -= 1
  }
  OBList.splice(planetIdx,1)
  trailList.splice(planetIdx,1)
  activePlanet -= 1
  loadPlanetEditor(activePlanet)
}

function createNewPlanet() {
  OBList.push(new OrbitalB(0, 0, 20, 1, 0, 0, 0))
}

function mousePressed(){
  for (let i = 0; i < OBList.length; i++) {
    if (distance(OBList[i].x, OBList[i].y, mouseX, mouseY) < OBList[i].radius) {
      activePlanet = OBList[i].idx
      loadPlanetEditor(activePlanet)
      if (OBList[i].moveByMouse == false) {
        OBList[i].moveByMouse = true
        OBList[i].x = mouseX
        OBList[i].y = mouseY
      } else {
        OBList[i].moveByMouse = false
      }
      break;
      // print('true')
      // OBList[i].x = mouseX
      // OBList[i].y = mouseY
    }
  }
}

function loadPlanetEditor(idx) {
  document.getElementById("planetSkinsSelect").selectedIndex = OBList[idx].image
  document.getElementById("activePlanetPic").src = planetSkinsRaw[OBList[idx].image]
  document.getElementById("radiusSlider").value = OBList[idx].radius
  document.getElementById("radiusBox").value = OBList[idx].radius
  temp = 0
  if (OBList[idx].mass > 1)
    for (let count = 0; OBList[idx].mass/(pow(10,count)) > 10; count++){
      temp = count + 1
      }
  else {

    for (let count = 0; OBList[idx].mass/(pow(10,count)) < 1; count--){
      temp = count - 1
      }
  }
  document.getElementById("massBox").value = OBList[idx].mass/(pow(10,temp))
  document.getElementById("massExponentBox").value = temp
  uglyFix(activePlanet);
  document.getElementById("trailLengthBox").value = trailList[idx].trailLength
  if (trailList[idx].trailOn === true){
    document.getElementById("trailCheckbox").checked = true;
  }
  else {
    document.getElementById("trailCheckbox").checked = false;
  }
}

function uglyFix(idx) {
  temp = 0
  negative_flag = false
  if (convert.disGTR(OBList[idx].speedx) < 0)  {
    negative_flag = true
    OBList[idx].speedx = -OBList[idx].speedx
  }
  if (convert.disGTR(OBList[idx].speedx) > 1) {
    for (let count = 0; convert.disGTR(OBList[idx].speedx)/(pow(10,count)) > 10; count++){
      temp = count + 1
      }
  }
  else if (OBList[idx].speedx === 0) {
    document.getElementById("speedxBox").value = 0
    document.getElementById("speedxExponentBox").value = 0
  }
  else {
    for (let count = 0; convert.disGTR(OBList[idx].speedx)/(pow(10,count)) < 1; count--){
      temp = count - 1
      }
  }
  if (negative_flag) {
    OBList[idx].speedx = -OBList[idx].speedx
  }
  document.getElementById("speedxBox").value = convert.disGTR(OBList[idx].speedx)/(pow(10,temp))
  document.getElementById("speedxExponentBox").value = temp
  temp = 0
  negative_flag = false
  if (convert.disGTR(OBList[idx].speedy) < 0)  {
    negative_flag = true
    OBList[idx].speedy = -OBList[idx].speedy
  }
  if (convert.disGTR(OBList[idx].speedy) > 1)
    for (let count = 0; convert.disGTR(OBList[idx].speedy)/(pow(10,count)) > 10; count++){
      temp = count + 1
      }
  else if (OBList[idx].speedy === 0) {
        document.getElementById("speedyBox").value = 0
        document.getElementById("speedyExponentBox").value = 0
      }
  else {
    for (let count = 0; convert.disGTR(OBList[idx].speedy)/(pow(10,count)) < 1; count--){
      temp = count - 1
      }
  }
  if (negative_flag) {
    OBList[idx].speedy = -OBList[idx].speedy
  }
  document.getElementById("speedyBox").value = convert.disGTR(OBList[idx].speedy)/(pow(10,temp))
  document.getElementById("speedyExponentBox").value = temp

}
function pause_unpause() {
  if (pause==false) {
    pauseButton.remove()
    pauseButton = createImg('https://i.imgur.com/mvth4yQ.png');
    pauseButton.position(468,480);
    pauseButton.mousePressed(pause_unpause);
    pause = true;
  } else {
    pauseButton.remove()
    pauseButton = createImg('https://i.imgur.com/FWWyfdy.png');
    pauseButton.position(468,480);
    pauseButton.mousePressed(pause_unpause);
    pause = false
  }
}

countFrames = 0;
function draw() {
  if(60*document.getElementById("timescaleSlider").value != timeRatio) {
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
  if (OBList[activePlanet].radius != document.getElementById("radiusSlider").value ) {
    OBList[activePlanet].radius = parseInt(document.getElementById("radiusSlider").value);
    document.getElementById("radiusSlider").value = OBList[activePlanet].radius
    document.getElementById("radiusBox").value = OBList[activePlanet].radius
  }
  if (pause===false) {
    stroke(255);
    background(220);
    image(backgroundImg, 0, 0, width, (backgroundImg.width/width)*backgroundImg.height)
    image(lengthScaleImage,850,850)
    stroke(0);
    fill(0, 102, 153);
    textSize(18);
    text('50 000 000 km', 850, 910);
    stroke(255);
    fill(255, 255, 255);
    for (let i = 0; i < OBList.length; i++) {
      if (countFrames === 10) {
        uglyFix(activePlanet);
        countFrames = 0;
      }
      else {
        countFrames += 1;
      }
      OBList[i].accelerate();
      OBList[i].move();
      OBList[i].display();
      if (CollisionFlag === true) {
        OBList[i].Collision();
      }
    }

  }
  else {
    image(backgroundImg, 0, 0, width, (backgroundImg.width/width)*backgroundImg.height)
    image(lengthScaleImage,850,850)
    stroke(0);
    fill(0, 102, 153);
    textSize(18);
    text('50 000 000 km', 850, 910);
    stroke(255);
    fill(255, 255, 255);
    for (let i = 0; i < OBList.length; i++) {
      if (OBList[i].moveByMouse == true) {
        OBList[i].move();
      }
      OBList[i].display();
    }
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

}

function rotation_vector(obj_1, obj_2) {
  return [(obj_2.x - obj_1.x)/distance(obj_1.x,obj_1.y,obj_2.x,obj_2.y), (obj_2.y - obj_1.y)/distance(obj_1.x,obj_1.y,obj_2.x,obj_2.y)];
}

class OrbitalB {
  constructor(x, y, radius, mass, InSpeedx, InSpeedy, skin) {
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.speedx = InSpeedx
    this.speedy = InSpeedy
    this.mass = mass;
    this.idx = OBnumber
    this.image = skin
    OBnumber += 1
    trailList.push(new trail(this.idx))
    this.moveByMouse = false
  }

  accelerate(obj) {
    if (this.moveByMouse == false) {
      for (let i = 0; i < OBList.length; i++) {
        if (i != this.idx) {
          if (showVector) {
            drawVector(this.x,this.y,this.x + vectorScaler*convert.disRTG(timeRatio/60*rotation_vector(this, OBList[i])[0]*calc_accel(gravity_force(this, OBList[i]),this)),this.y + vectorScaler*convert.disRTG(timeRatio/60*rotation_vector(this, OBList[i])[1]*calc_accel(gravity_force(this, OBList[i]),this)), "blue")
          }
          this.speedx += convert.disRTG(timeRatio/60*rotation_vector(this, OBList[i])[0]*calc_accel(gravity_force(this, OBList[i]),this));
          this.speedy += convert.disRTG(timeRatio/60*rotation_vector(this, OBList[i])[1]*calc_accel(gravity_force(this, OBList[i]),this));
        }
      }
    }
  }

  move() {
    if (this.moveByMouse != true) {
      if (showVector) {
        drawVector(this.x,this.y,this.x + vectorScaler*timeRatio/60*this.speedx/2000000,this.y + vectorScaler*timeRatio/60*this.speedy/2000000, "red")
      }
      this.x += timeRatio/60*this.speedx;
      this.y += timeRatio/60*this.speedy;
    } else {
      this.x = mouseX
      this.y = mouseY
    }
    trailList[this.idx].record()
  }

  display() {
    if(trailList[this.idx].trailOn) {
      trailList[this.idx].drawTrail()
    }
    if (this.image == null) {
      ellipse(this.x, this.y, this.radius*2, this.radius*2);
    } else {
      image(planetSkins[this.image], this.x - this.radius, this.y - this.radius, this.radius*2, this.radius*2)
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
  this.trailLength = 1000
  this.trailOn = true
  this.pointsX = []
  this.pointsY = []
}
  record(){
    this.pointsX.push(OBList[this.idx].x)
    this.pointsY.push(OBList[this.idx].y)
  }

  drawTrail(){
    if (this.pointsX.length > this.trailLength ){
    for (let i = this.pointsX.length - this.trailLength + 1; i < this.pointsX.length; i++){
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
