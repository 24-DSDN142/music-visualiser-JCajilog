let ending = 12418 //end of .csv
let lineHistory = [];
let linesegment = 30
let cinemaBar =360
let raining = [];
let rainTilt = 2
let grains = []
let stockCount = []
let balloon;
let balloonPosx;
let balloonPosY;
let firstRun = true

let character1 = []; //work in progress
let characterFrame;

let bgCharacter;

let bg;

let finalImg;

function draw_one_frame(words, vocal, drum, bass, other, counter) {

  //images loading
  if (firstRun) {
    rectMode(CENTER);
    character1.push(loadImage('takodachi.png'));
    character1.push(loadImage('takodachi1.png'));
    character1.push(loadImage('takodachi3.png'));
    character1.push(loadImage('takodachi2.png'));

    bgCharacter = loadImage('singing_character.png');
    bg = loadImage ('bgtest.png')
    finalImg = loadImage ('Title_Screen.png')

    firstRun = false
  }

  translate (0, -10* sin (counter)) //Camera shake
  rotate (0)
  rotate (0.2*sin(counter))
  angleMode (DEGREES)

  let From = color(61,52,69);
  let To = color(83,67,97);
  let Heartbeat = lerpColor(From, To, map(other, 70, 80, 0, 1))
  background(Heartbeat) //IMPORTANT BECAUSE RESET FRAME TO DRAW NEXT //This will change to a drawn background where I will use tint();

  textFont('Courier New'); // please use CSS safe fonts
  textStyle(BOLD)
  textSize(24);
  rectMode(CENTER)

  lineVisual = drum
  LVisMax = 200 //max for line

  
  push();
  imageMode(CORNER);
  image(bg, 0, 0);
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
push(); //background singing char.
imageMode(CENTER)
colorMode (HSB)
blendMode (SCREEN)
tint (map(counter, 0, ending, 150, 10))
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
  characterFrame = int(counter / 50) % 4
  image (character1[characterFrame], map(counter, 0, ending, 1190, 100)-220, 300)
  pop();

  //LINE
  if (counter > 0) { //so line doesn't move while not starting song
  push();
    drawingContext.setLineDash([3]);
    strokeJoin(ROUND)
    noFill()
    stroke(200,100)
   strokeWeight(4)
   lineHistory.push(lineVisual); //to change what the line models
   
    beginShape();
   for (let i=0; i<lineHistory.length; i++){

    if (lineHistory.length >= linesegment) { //for the line to cut
      lineHistory.splice(0, 1);
      linesegment = linesegment + 0.04
    }

     let x = map(i, 0, lineHistory.length, 1190, map(counter, 0, ending, 1190, 90));
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
    curveVertex (map(counter, 0, ending, 1190, 100)-120 + (100*sin(counter)), (height/2)+50 + (150*sin(counter*5))+42)
    curveVertex (map(counter, 0, ending, 1190, 100)-80, (height/2)+112)
    curveVertex (map(counter, 0, ending, 1190, 90), (height/2)+50-map(lineVisual, 0, 100, 0, LVisMax))
    curveVertex (map(counter, 0, ending, 1190, 90), (height/2)+50-map(lineVisual, 0, 100, 0, LVisMax))
    endShape();
    pop();
  pop();
  } else {
    lineHistory = [];  //reset the array when starting song again. 
  }

  push(); //BALLOON
  balloon = new Balloon (map(counter, 0, ending, 1190, 90)-1, (height/2)+10-map(lineVisual, 0, 100, 0, LVisMax))
  balloon.show(bass);
  pop()


  //CinematicBars + FilmStock + Refence text
 push();
 rectMode(CORNER);
 stroke(20)
 fill(20) 
  if (counter <720){ //For the fade in at the start
    cinemaBar = map (counter, 0, 720, 500, 70)

  } else {
    cinemaBar = 80
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
  if (counter>200){
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
 strokeJoin(ROUND)
 strokeWeight (random(4, 8))
 if (counter > 720){
  stroke (150 + random (-10, 10), 255)
 fill(150 + random (-10, 10), 255)
 }
 for (x=12 ; x < width; x += 300 ){
  for (y = 15; y < height; y+= 647){ 
 rect (x + random(2, 7), y + random(-2, -5), 45, 50)
    }
   }
 pop();

 if(counter >720){ //framecounter visual
 push();
 rectMode(CENTER)
 textAlign(CENTER)
 fill (255,random(10, 25))
 textStyle(BOLD)
 textSize (60);
 for (x=1080; x > 0; x-= 300){
  for (y=40; y<720; y += 645){
  stockCount.push(counter)
 if (stockCount.length > 4){
  stockCount.splice (0,1)
 }
 text (stockCount[0], x + random(2, 7), y + random(2, 4))
  }
 }
 pop();
}

  if (counter>12000){
    background (0)
    image (finalImg, 0, 85, 1280, 550)
  }




// push();
//   rectMode(CORNER)
//   textAlign(LEFT)
//  fill (255,0,0) 
//  text ("1280x720", 10, 30)  //reference text //REMOVE LATER ON!!
//  text (counter, 10, 60)
//  translate(0,0)
//  text (mouseX, 10, 90)
//  text (mouseY, 10, 120)
//   pop();
  
  //TESTING Place

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
    stroke (255, random (40, 130))
    line (this.x, this.y, this.x, this.y + this.length)
  }
  fall(bass){
    this.y += map(bass, 0, 100, 4, 12)
    this.x += rainTilt + map (bass, 0, 100, 0, 2)
    if  (raining.length> map(bass, 0, 100, 247, 297)){
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
    stroke (150, random (20, 60))
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

    stroke(0,10);
    fill (235,150,121)

 beginShape();
 push();
 translate (2,0);
 vertex (this.x,this.y+25)
 vertex (this.x-9,this.y+40)
 vertex (this.x+5,this.y+45)
 pop();
 endShape();
  
 push();
 translate (this.x+5, this.y+10)
 rotate (0)
 rotate (map(bass, 0, 100, 5, 15))
  ellipse(random (0, 2), 0,45,55)
 pop();
  }
}

