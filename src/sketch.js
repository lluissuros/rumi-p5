let niceColors = [];
let squares = [];

function setup() {
  createCanvas(windowWidth, windowHeight);
  niceColors = [color("#85144b"), color(255, 204, 0), color(0, 0, 255)];
  const howManySquares = 3;
  const maxSize = Math.max(windowWidth, windowHeight);
  squares = Array(howManySquares).fill("placeholder");
  squares = squares.map((el, index) => {
    console.log(index);
    const side = (index * maxSize) / howManySquares;
    const color = niceColors[index];
    return new Square(side, color);
  });
  createDiv("this is some text");
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

function draw() {
  squares.sort((a, b) => b.side - a.side); // the smaller should be painted last
  squares.forEach(sq => {
    sq.grow();
    sq.display();
  });
}

class Square {
  constructor(startSide = 0, fillColor = 100) {
    this.side = startSide;
    this.speed = 3;
    this.fillColor = fillColor;
    this.strokeColor = 255;
    console.log(startSide);
  }

  grow() {
    this.side += 1 * this.speed;
    // console.log(this.side);
    if (this.side > Math.max(windowWidth, windowHeight) + 10) {
      this.side = 0;
    }
  }

  display() {
    rectMode(CENTER);
    strokeWeight(4);
    stroke(this.strokeColor);
    noStroke();

    fill(this.fillColor);
    square(windowWidth / 2, windowHeight / 2, this.side);
  }
}
