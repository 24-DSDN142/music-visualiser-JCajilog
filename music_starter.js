let ending = 12418 //end of .csv
let lineHistory = [];
let linesegment = 30
let cinemaBar =360
let raining = [];
let rainTilt = 2
let grains = []
let stockCount = []
let frameDiff;
let balloon;
let firstRun = true

let character1 = []; 
let characterFrame;

let bgCharacter;

let bg = []
let bgFrame;

let speed = 1

function draw_one_frame(words, vocal, drum, bass, other, counter) {

  //images loading
  if (firstRun) {
    rectMode(CENTER);
    character1.push(loadImage('takodachi.png'));
    character1.push(loadImage('takodachi1.png'));
    character1.push(loadImage('takodachi3.png'));
    character1.push(loadImage('takodachi2.png'));

    bgCharacter = loadImage('singing_character.png');
    bg.push(loadImage ('bgtest.png'));
    bg.push(loadImage ('bgtest1.png'))

    firstRun = false
  }

  translate (0, -10* sin (counter)) //Camera shake
  rotate (0)
  rotate (0.2*sin(counter))
  angleMode (DEGREES)

  textFont('Courier New'); // CSS safe fonts. I looked em' up 
  textStyle(BOLD)
  textSize(24);
  rectMode(CENTER)

  //BACKGROUND
  push();
  imageMode(CORNER);
  colorMode (HSB);
  tint (0,0,(map(other, 20, 100, 40, 100)))
  bgFrame = int(counter / 75) % 2
  image(bg[bgFrame], 0, 0);
  pop();

  //barricade code
  push();  
rectMode(CORNER)
translate (-30,0)  //so that the bar doesn't just appear on the screen
  for (x=0; x<width+30; x+=262){ // x += 1310/5 (dividing by 5 means visually five barricades)
    fill(13,13,14)
    strokeWeight(0)
    rect(x + speed, 360, 30, 165)
    
    fill(146,125,104);
    push();
    colorMode(HSL)
    fill(30,17,map(drum, 0, 100, 35, 75))
    rect(x + speed, 350, 30, 10, 4, 4, 0, 0)
    pop();

    speed += 0.1
    if (x+speed > width+30){
      speed = 0
    }
  }
pop();

push(); //background singing char.
imageMode(CENTER)
colorMode (HSB)
blendMode (SCREEN)
tint (map(counter, 0, ending, 120, 60))
translate (map(counter, 0, ending, 0, 640), 10*sin(counter))
image (bgCharacter, 320,370)

stroke(map(counter, 0, 1500, 10, 150))
fill(20)
beginShape();
stroke(map(counter, 0, ending, 200, 10))
curveVertex (368, map(vocal, 10, 90, 152, 242))
curveVertex (354, 152)

curveVertex (315, 153)
curveVertex (329, map(vocal, 10, 90, 153, 243))
endShape();
pop();

  //CHARACTER
  push();
  characterFrame = int(counter / 40) % 4
  image (character1[characterFrame], map(counter, 0, ending, 1190, 250)-220, 300)
  pop();

  //Grain
  if (counter>0){
    push();
    for (let g of grains){
      g.show();
    }
    pop();
  for (let i=0; i<2; i++){
    grains.push(new Grains(random(width), 0))
  }
}

  //RAIN
  if (counter>0){
  push();
  for (let r of raining){ //this helps to target the individual values in the array
    r.show(bass)
    r.fall(bass)
  }
  for (let i=0; i<(map(bass, 0, 100, 1, 3)); i++){ //the mapping maps the amount of rain that gets made per count
    raining.push(new Rain(random(width), 0))
  }
  pop();
} 

  //LINE
  lineVisual = drum
  LVisMax = 200 //max for line

  if (counter > 0) { //so line doesn't move while not starting song
  push();
    drawingContext.setLineDash([3]);
    strokeJoin(ROUND)
    noFill()
    stroke(200,150)
   strokeWeight(4)
   lineHistory.push(lineVisual); //to change what the line models
   
    beginShape();
   for (let i=0; i<lineHistory.length; i++){
    if (lineHistory.length >= linesegment) { //for the line to cut
      lineHistory.splice(0, 1);
      linesegment = linesegment + 0.04
    }
     let x = map(i, 0, lineHistory.length, 1190, map(counter, 0, ending, 1190, 240));
     let y =(height/2)+50-map(lineHistory[i], 0, 100, 0, LVisMax);

     push();
     drawingContext.setLineDash ([2])
     strokeWeight (map(other, 30, 90, 2, 20))
     stroke (200, 20)
     point (x,y)
     pop();
    
    vertex (x, y);
  }
    endShape();
    
    push();
   strokeWeight(4);
   stroke (255,200)
   drawingContext.setLineDash([0]);
    beginShape(); //Line connecting rect() to trail
    curveVertex (map(counter, 0, ending, 1190, 250)-120 + (100*sin(counter)), (height/2)+50 + (150*sin(counter*5))+42)
    curveVertex (map(counter, 0, ending, 1190, 250)-80, (height/2)+112)
    curveVertex (map(counter, 0, ending, 1190, 240), (height/2)+50-map(lineVisual, 0, 100, 0, LVisMax))
    curveVertex (map(counter, 0, ending, 1190, 240), (height/2)+50-map(lineVisual, 0, 100, 0, LVisMax))
    endShape();
    pop();
  pop();
  } else {
    lineHistory = [];  //reset the array when starting song again. 
  }

  push(); //BALLOON
balloon = new Balloon (map(counter, 0, ending, 1190, 240)-1, (height/2)+10-map(lineVisual, 0, 100, 0, LVisMax))
balloon.show(bass);
pop()

  //CinematicBars + FilmStock
 push();
 rectMode(CORNER);
 stroke(20)
 fill(20) 
  if (counter <720){ //For the fade in at the start
    cinemaBar = map (counter, 0, 720, 500, 70)
  } else {
    cinemaBar = 80
    if(counter > 11740){
      cinemaBar = 500
    }
  }
 rect (0,-10, 1280, cinemaBar+random(5, 10)) //the actual cinema bars
 rect (0,720-cinemaBar+random(5, 10), 1280, cinemaBar)

 push();//OPENING TITLE
 textFont('Monaco')
 textStyle (NORMAL)
 textAlign(CENTER)
 rectMode(CENTER)
 textSize(120)
 fill (255)
  if (counter>200 && counter<11740){
    fill(255, map(counter, 200, 450, 255, 0))
 text ("V   I   O   L   E   T", width/2, (height/2) -40 - (map(counter, 200, 720, 0, 360)))
    textSize(40);
    fill(200, map(counter, 200, 450, 255, 0))
 text ("Ninomae Ina'nis", width/2, (height/2)+40 +  map(counter, 200, 720, 0, 360))
    } else {
      text ("V   I   O   L   E   T", width/2, (height/2) -40)
    textSize(40);
    fill(200)
    text ("Ninomae Ina'nis", width/2, (height/2)+40)
    }
 pop();

 push(); //white squares
 translate (30*sin(counter),0)
 strokeJoin(ROUND)
 strokeWeight (4)
 if (counter > 720){
  stroke (100, 150)
 fill(100, random(80,160))
 }
 for (x=12 ; x < width; x += 300 ){
  for (y = 15; y < height; y+= 647){ 
    push();
    translate (50*cos(counter),0)
    pop();
 rect (x + random(2, 7), y + random(-2, -5), 45, 50)
    }
   }
 pop();

 if(counter >720){ //framecounter visual
 push();
 translate (30*sin(counter),0)
 rectMode(CENTER)
 textAlign(CENTER)
 fill (255,random(10, 25))
 textStyle(BOLD)
 textSize (60);
 frameDiff = 10
 for (x=1080; x > 0; x-= 300){
  for (y=40; y<720; y += 645){
    push();
    translate (50*cos(counter+1000),0)
    pop();
  stockCount.push(int(counter/5)) //so that the frame count isn't absurdly high
 if (stockCount.length > 4){
  stockCount.splice (0,1)
 }
 text (stockCount[0]-frameDiff, x + random(2, 7), y + random(2, 4))
  }
  frameDiff += 3
 }
 pop();
}

}  //end of DRAW FUNCTION

//RAIN 
class Rain {
  constructor (x, y) {
    this.x = x - 110
    this.y = y
    this.length = random (10, 15) 
  }
  show (bass){
    strokeWeight (random(1, map(bass, 0, 100, 5, 9)))
    if (bass > 60) {
      stroke (181,156,122)
    }else{
    stroke (255, random (40, 130))
  }
    line (this.x, this.y, this.x, this.y + this.length)
  }
  fall(bass){
    this.y += map(bass, 0, 100, 4, 15)
    this.x += rainTilt + map (bass, 0, 100, 0, 2.5)
    if  (raining.length> map(bass, 0, 100, 247, 297)){ //mapping this allows for more rain depending on the bass
      raining.splice(0,1);
    }
  }
}

//FILM GRAIN Lines
class Grains {
  constructor (x, y) {
    this.x = x 
    this.y = y
    this.length = 720
  }
  show (){
    drawingContext.setLineDash ([3]) //so that it doesn't look like perfect straight lines
    strokeWeight (random(1, 5))
    stroke (150, random (40, 80))
    line (this.x, this.y, this.x, this.y + this.length)
    if (grains.length > 3){
      grains.splice (0,1);
    }
  }
  }

  //BALLOON
class Balloon {
  constructor (x,y){
    this.x = x 
    this.y = y
  }
  show(bass){
    stroke(230,255);
    strokeWeight(1)
    fill (181,156,122)

 beginShape();
 push();
 translate (2,0);
 vertex (this.x,this.y+25)
 vertex (this.x-9,this.y+40)
 vertex (this.x+5,this.y+45)
 vertex (this.x,this.y+25)
 pop();
 endShape();
  
 push();
 translate (this.x+5, this.y-7)
 rotate (0)
 rotate (map(bass, 0, 100, 10, 20))
  ellipse(random (0, 2), 0,65,75)
  fill(255,180)
  rotate(30)
  ellipse(-23,-12,5,20)
 pop();
  }
}


