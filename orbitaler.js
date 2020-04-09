let img
function setup() {
  Height = 400;
  Width  = 400;
 createCanvas(Height, Width);
  sun = new OrbitalB(Width/2, Height/2, 40, 100)
  planet = new OrbitalB(100, 100, 10, 10)

  print(rotation_vector(planet,sun))
}

function draw() {
  stroke(255);
  background(220);
  sun.display()
  planet.display()
  planet.move()

  planet.display()
  sun.display()

  //mas.moveorbital()
  //met.move()
}

function distance(x1,y1,x2,y2) {
  print(x1)
  print(y1)
  print(x2)
  print(y2)
  return sqrt(sq((x1-x2)) + sq((y1-y2)));
}

function rotation_vector(obj_1,obj_2) {
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
  }

  move() {
    this.x += this.speedx;
    this.y += this.speedy;
  }

  display() {
    ellipse(this.x, this.y, this.radius*2, this.radius*2);
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

function checkCollision(obj_1, obj_2)  {
  this.maxDis = obj_1.radius + obj_2.radius;
  if (dist(obj_1.x, obj_1.y, obj_2.x, obj_2.y) < this.maxDis) {
    print('hit');
  }
}
