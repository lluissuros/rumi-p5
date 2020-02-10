let niceColors = [];
let squares = [];
let rumiQuote = [
  "I",
  "have lived",
  "on the lip",
  "of insanity",
  "",
  "wanting to know reasons",
  "",
  "wanting to know reasons",
  "",
  "knocking",
  "on a door.",
  "",
  "It opens.",
  "",
  "",
  "I've been",
  "knocking",
  "from the inside.",
  "",
  "",
  "",
  ""
];
let mainRumiTextProvider;
let crazyFastRumiTextProvider;

function preload() {
  mainFont = loadFont("assets/DK Lemon Yellow Sun.otf");
  backgroundFont = loadFont("assets/RoyalHasterDemo-Monoline.ttf");
}

function setup() {
  createCanvas(windowWidth, windowHeight);

  rumiTextProvider = new TextProvider(rumiQuote);
  crazyFastRumiTextProvider = new TextProvider(rumiQuote);

  niceColors = [color("#85144b"), color(255, 204, 0), color(0, 0, 255)];
  niceColors = [color("#85144b"), color(255, 204, 0), color("#FF851B")];
  const howManyTextSquares = niceColors.length;
  const maxSize = Math.max(windowWidth, windowHeight);
  squares = Array(howManyTextSquares).fill("placeholder");
  squares = squares.map((el, index) => {
    const side = (index * maxSize) / howManyTextSquares;
    const color = niceColors[index];
    return new TextSquare(side, color, "I");
  });
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

class TextSquare {
  constructor(startSide = 0, fillColor = 100, text = "text here") {
    rectMode(CENTER);
    this.side = startSide;
    this.speed = 3;
    this.fillColor = fillColor;
    this.strokeColor = 255;
    this.mainText = text;
    this.fXText = "";
  }

  grow() {
    this.side += 1 * this.speed;
    this.fillColor.setAlpha(255 - this.side / 3);
    if (this.side > Math.max(windowWidth, windowHeight) + 10) {
      this.side = 0;
      this.mainText = crazyFastRumiTextProvider.next();
    }
    this.fXText = rumiTextProvider.next(); //Fast!!
  }

  display() {
    // square
    strokeWeight(4);
    stroke(this.strokeColor);
    noStroke();
    fill(this.fillColor);
    square(windowWidth / 2, windowHeight / 2, this.side, 5);

    //FX text
    rectMode(CENTER);
    textAlign(CENTER, CENTER);
    textFont(backgroundFont);
    textSize(this.side);
    text(this.fXText, windowWidth / 2, windowHeight / 2);

    //text per llegir
    fill("#111111");
    textFont(mainFont);
    textSize(this.side / 5);
    text(
      this.mainText,
      windowWidth / 2,
      windowHeight / 2,
      this.side,
      this.side
    );
  }
}

class TextProvider {
  constructor(textAsArray = ["hello", "world"]) {
    this.textAsArray = textAsArray;
    this.index = 0;
  }

  next() {
    const currentText = this.textAsArray[this.index];
    this.index = this.index + 1 < this.textAsArray.length ? this.index + 1 : 0;
    return currentText;
  }
}
