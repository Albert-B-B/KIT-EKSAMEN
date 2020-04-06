
function setup() {
  Height = 400
  Width  = 400

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

class orbital {
  constructor() {
    this.x = random(width);
    this.y = random(height);
    this.diameter = 10;
    this.speedx = random(-0.5, 0.5)
    this.speedy = random(-0.5, 0.5)
  }

  move() {
    this.x += this.speedx
    this.y += this.speedy
  }

  display() {
    ellipse(this.x, this.y, this.diameter, this.diameter);
  }
}

class planet {
  constructor() {
  this.diameter = 55
  ellipse((Height/2), (Width/2), this.diameter);
  }

  moveorbital() {
  if (met.x > (Width/2)) {
    met.speedx -= 0.002
  }
  if (met.y > (Height/2)) {
    met.speedy -= 0.002
  }
  if (met.x < (Width/2)) {
    met.speedx += 0.002
  }
  if (met.y < (Height/2)) {
    met.speedy += 0.002
  }
  }
}

class collisionDetection {
  constructor() {

  }
  checkCollision()  {
    this.maxDis = mas.diameter/2 + met.diameter/2
    this.disx = (Width/2) - met.x
    this.disy = (Height/2) - met.y
    print(sqrt(this.disx^2 + this.disy^2))
    if (sqrt(this.disx^2 + this.disy^2) > this.maxDis) {
      print('hit')
    }
  }
}
