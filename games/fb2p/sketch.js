var bird, bird2;
var pipes;
var parallax = 0.8;
var scoreBlue = 0; scoreGreen = 0;
var birdSprite, bird2Sprite;
var pipeBodySprite;
var pipePeakSprite;
var bgImg;
var bgX;
var gameoverFrame = 0;
var isOver = false;
var birdAlive = true, bird2Alive = true;

var touched = false;
var prevTouched = touched;


function preload() {
  pipeBodySprite = loadImage('graphics/pipe_marshmallow_fix.png');
  pipePeakSprite = loadImage('graphics/pipe_marshmallow_fix.png');
  birdSprite = loadImage('graphics/train.png');
  bird2Sprite = loadImage('graphics/train2.png');
  bgImg = loadImage('graphics/background.png');
}

function setup() {
  createCanvas(window.innerWidth, window.innerHeight);
  reset();
}

function draw() {
  background(0);
  // Draw our background image, then move it at the same speed as the pipes
  image(bgImg, bgX, 0, bgImg.width, height);
  bgX -= pipes[0].speed * parallax;
  if (bgX <= -bgImg.width + width) {
    image(bgImg, bgX + bgImg.width, 0, bgImg.width, height);
    if (bgX <= -bgImg.width) {
      bgX = 0;
    }
  }

  for (var i = pipes.length - 1; i >= 0; i--) {
    pipes[i].update();
    pipes[i].show();

    if (pipes[i].hits(bird)) {
      birdAlive = false;
    }

    if (pipes[i].hits(bird2)) {
      bird2Alive = false
    }

    if (pipes[i].offscreen()) {
      pipes.splice(i, 1);
    }

    if(!birdAlive ||!bird2Alive) gameover();
  }

  if(birdAlive) {
    bird.update();
    bird.show();
  }

  if(bird2Alive) {
    bird2.update();
    bird2.show();
  }
  
  if ((frameCount - gameoverFrame) % 150 == 0) {
    pipes.push(new Pipe());
  }

  showScores();

  touched = (touches.length > 0);

  if (touched && !prevTouched) {
    bird.up();
  }

  prevTouched = touched;


}

function showScores() {
  textSize(32);
  text('Blue: ' + scoreBlue, 1, 32);
  text('Green: ' + scoreGreen, 1, 64);
}

function gameover() {
  textSize(64);
  textAlign(CENTER, CENTER);
  if (birdAlive) {
    console.log("BLUE");
    scoreBlue += 1;
    text('Blue wins', width / 2, height / 2);
  } else if (bird2Alive) {
    console.log("GREEN");
    scoreGreen += 1;
    text('Green wins', width / 2, height / 2);
  } else {
    text('DRAW', width / 2, height / 2);
  }
  textAlign(LEFT, BASELINE);
  isOver = true;
  noLoop();
}

function reset() {
  isOver = false;
  bgX = 0;
  pipes = [];
  bird = new Bird();
  bird2 = new Bird2();
  pipes.push(new Pipe());
  birdAlive = true;
  bird2Alive = true;
  gameoverFrame = frameCount - 1;
  loop();
}

function keyPressed() {
  if (key === ' ') {
    bird.up();
    if (isOver) reset();
  }

  if (keyCode === ENTER) {
    bird2.up();
    if (isOver) reset();
  }

  if (keyCode === ESCAPE) {
    alert("Pause");
  }
}

function touchStarted() {
  if (isOver) reset();
}