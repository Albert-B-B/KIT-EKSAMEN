let img;
//Universal gravity constant
let g = 6.674*Math.pow(10,-11);
let timeRatio = 24*60*60*60;
let lengthRatio = 50000000;
let OBList = []
let trailList = []
OBnumber = 0;
function setup() {
  Height = 1000;
  Width  = 1000;
  createCanvas(Height, Width);
  convert = new scaleConverter()
  OBList.push(new OrbitalB(Width/2, Height/2, 40, 1.989*Math.pow(10, 30), 0, 0))
  OBList.push(new OrbitalB(450, 200, 10, 5.97*Math.pow(10,24), 3, 0))
  OBList.push(new OrbitalB(450, 185, 3, 7.34*5*Math.pow(10,22), 3, 0))
}

function draw() {
  stroke(255);
  background(220);

  for (let i = 0; i < OBList.length; i++) {
    OBList[i].accelerate();
    OBList[i].move();
    OBList[i].display();
    OBList[i].Collision();
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


class OrbitalB {
  constructor(x, y, radius, mass, InSpeedx, InSpeedy) {
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.speedx = InSpeedx
    this.speedy = InSpeedy
    this.mass = mass;
    this.idx = OBnumber
    OBnumber += 1
    trailList.push(new trail(this.idx))
  }

  accelerate(obj) {
    for (let i = 0; i < OBList.length; i++) {
      if (i != this.idx) {
        //print(timeRatio*rotation_vector(this, OBList[this.idx])[0]*calc_accel(gravity_force(this,OBList[this.idx]),this))
        this.speedx += timeRatio*convert.disRTG(rotation_vector(this, OBList[i])[0]*calc_accel(gravity_force(this, OBList[i]),this));
        this.speedy += timeRatio*convert.disRTG(rotation_vector(this, OBList[i])[1]*calc_accel(gravity_force(this, OBList[i]),this));
      }
    }
  }

  move() {
    this.x += this.speedx;
    this.y += this.speedy;
    trailList[this.idx].record()
  }

  display() {
    trailList[this.idx].drawTrail()
    ellipse(this.x, this.y, this.radius*2, this.radius*2);
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
    for (let i = 1; i < this.pointsX.length; i++){
      line(this.pointsX[i-1], this.pointsY[i-1], this.pointsX[i], this.pointsY[i])
    }
  }
}
