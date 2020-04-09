let img
function setup() {
  Height = 400;
  Width  = 400;
  createCanvas(Height, Width);
  met = new orbital()
  col = new collisionDetection()
}

function draw() {
  stroke(255);
  background(220);
  mas = new planet()
  met.display()
  mas.moveorbital()
  met.move()
  col.checkCollision()

}
function dist(x1,y1,x2,y2) {
  sqrt(sq((x1-x2)) + sq((y1-y2)^2));
}

class OrbitalB {
  constructor(x, y, radiusm, mass) {
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.speedx = random(-0.5, 0.5);
    this.speedy = random(-0.5, 0.5);
    this.mass = mass;
  }

  move() {
    this.x += this.speedx;
    this.y += this.speedy;
  }

  display() {
    ellipse(this.x, this.y, this.radius, this.radius);
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

checkCollision()  {
  this.maxDis = mas.diameter/2 + met.diameter/2
  this.disx = (Width/2) - met.x
  this.disy = (Height/2) - met.y
  print(sqrt(sq(this.disx) + sq(this.disy)))
  if (sqrt(sq(this.disx) + sq(this.disy)) < this.maxDis) {
    print('hit')
  }
}
