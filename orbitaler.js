let img;
//Universal gravity constant
let g = 6.674*Math.pow(10,-11);
let timeRatio = 24*60*60*60;
let lengthRatio = 10;
let OBList = []
OBnumber = 0;
function setup() {
  Height = 1000;
  Width  = 1000;
  createCanvas(Height, Width);
  OBList.push(new OrbitalB(Width/2, Height/2, 40, 100))
  OBList.push(new OrbitalB(100, 100, 10, 10))
}

function draw() {
  stroke(255);
  background(220);

  for (let i = 0; i < OBList.length; i++) {
    if (i != 0){
    OBList[i].accelerate();
    OBList[i].move();
  }
    OBList[i].display();
    OBList[i].Collision();
  }
}


function gravity_force(obj_1,obj_2) {
  return (g*obj_1.mass * obj_2.mass)/ sq(distance(obj_1.x, obj_1.y, obj_2.x, obj_2.y))
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
  OBList.push(new OrbitalB(Width/2, Height/2, 40, 100))
  OBList.push(new OrbitalB(100, 100, 10, 10))
}

function rotation_vector(obj_1, obj_2) {

  return [(obj_2.x - obj_1.x)/distance(obj_1.x,obj_1.y,obj_2.x,obj_2.y), (obj_2.y - obj_1.y)/distance(obj_1.x,obj_1.y,obj_2.x,obj_2.y)];
}


class OrbitalB {
  constructor(x, y, radius, mass) {
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.speedx = 0;
    this.speedy = 0;
    this.mass = mass;
    this.idx = OBnumber
    OBnumber += 1
  }

  accelerate(obj) {
    for (let i = 0; i < OBList.length; i++) {
      if (i != this.idx) {
        print(this.idx)
        this.speedx += timeRatio*rotation_vector(this, OBList[i])[0]*calc_accel(gravity_force(this,OBList[i]),this);
        this.speedy += timeRatio*rotation_vector(this, OBList[i])[1]*calc_accel(gravity_force(this,OBList[i]),this);
      }
    }
  }

  move() {
     print(this.speedx);
     print(this.speedx);
    this.x += this.speedx;
    this.y += this.speedy;
  }

  display() {
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

  // moveorbital() {
  // if (met.x > (Width/2)) {
  //   met.speedx -= 0.002;
  // }
  // if (met.y > (Height/2)) {
  //   met.speedy -= 0.002;
  // }
  // if (met.x < (Width/2)) {
  //   met.speedx += 0.002;
  // }
  // if (met.y < (Height/2)) {
  //   met.speedy += 0.002;
  // }
  // }
}
