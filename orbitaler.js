let img
let OBList = []
OBnumber = 0
function setup() {
  Height = 400;
  Width  = 400;
  createCanvas(Height, Width);
  OBList.push(new OrbitalB(Width/2, Height/2, 40, 100))
  OBList.push(new OrbitalB(100, 100, 10, 10))
}

function draw() {
  stroke(255);
  background(220);

  for (let i = 0; i < OBList.length; i++) {
    if (i != 0){
    OBList[i].move();
  }
    OBList[i].display();
    OBList[i].Collision();
  }
}

function distance(x1,y1,x2,y2) {
  return sqrt(sq((x1-x2)) + sq((y1-y2)));
}

function checkCollision(obj_1, obj_2)  {
  this.maxDis = obj_1.radius + obj_2.radius
  if (distance(obj_1.x, obj_1.y, obj_2.x, obj_2.y) < this.maxDis) {
    return true
  }
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
    this.speedx = random(-1, 1);
    this.speedy = random(-1, 1);
    this.mass = mass;
    this.idx = OBnumber
    OBnumber +=1
  }

  move() {
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
}

class scaleConverter(){
  constructor{
  }

  disRTG(input) {
    
  }

  disGTR(input) {
  }

  velRTG(input) {
  }

  velGTR(input) {
  }

}
