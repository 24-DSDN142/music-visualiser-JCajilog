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

let img;


function draw_one_frame(words, vocal, drum, bass, other, counter) {

  //images loading
  if (firstRun) {
    rectMode(CENTER);
    //character1.push(loadImage('Title_Screen.png'));
    img = loadImage ('Title_Screen.png')
    firstRun = false
  }

  translate (0, -10* sin (counter)) //camera shake
  rotate (0)
  rotate (0.2*sin(counter))
  angleMode (DEGREES)

  let From = color(61,52,69);
  let To = color(83,67,97);
  let Heartbeat = lerpColor(From, To, map(other, 70, 80, 0, 1))
  background(Heartbeat) //IMPORTANT BECAUSE RESET FRAME TO DRAW NEXT

  textFont('Courier New'); // please use CSS safe fonts
  textStyle(BOLD)
  textSize(24);
  rectMode(CENTER)

  lineVisual = drum
  LVisMax = 100 //max for line

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

  //CHARACTER
  push();  
  stroke (200, map(counter, 0, 1500, 0,255))
  fill (255, map(counter, 0, 1500, 0, 255))  //fade in from start
  rect(map(counter, 0, ending, 1190, 100)-50, height/2, 20, 100)
  pop();

  //LINE
  if (counter > 0) { //so line doesn't move while not starting song
  push();
    drawingContext.setLineDash([3]);
    strokeJoin(ROUND)
    noFill()
    stroke(200, map(counter, 0, 1000, 0, 200))
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
     drawingContext.setLineDash ([0])
     strokeWeight (map(other, 30, 90, 2, 20))
     stroke (200, 20)
     point (x,y)
     pop();
    
    vertex (x, y);

     
  }
    endShape();
    
   // point (map(counter, 0, ending, 1190, 100)-80 + (100*sin(counter)), (height/2)+50+ (150*sin(counter*5))-20) //THIS MODELS THE CONTROL POINT WHICH ALLOWS THE TRAIL TO MOVE
    push();
   strokeWeight(4);
   drawingContext.setLineDash([0]);
    beginShape(); //Line connecting rect() to trail
    curveVertex (map(counter, 0, ending, 1190, 100)-80 + (100*sin(counter)), (height/2)+50 + (150*sin(counter*5))-20)
    curveVertex (map(counter, 0, ending, 1190, 100)-40, (height/2)+50)
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
 text ("V   I   O   L   E   T", width/2, (height/2) -30 - (map(counter, 200, 720, 0, 360)))
    textSize(40);
    fill(200)
 text ("Ninomae Ina'nis", width/2, (height/2)+30 +  map(counter, 200, 720, 0, 360))
    } else {
      text ("V   I   O   L   E   T", width/2, (height/2) -30)
    textSize(40);
    fill(200)
    text ("Ninomae Ina'nis", width/2, (height/2)+30)
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
 rectMode(CORNER)
 textAlign(LEFT)
 fill (255,random(10, 25))
 textStyle(BOLD)
 textSize (60);
 for (x=1090; x > 0; x-= 300){
  for (y=55; y<720; y += 645){
  stockCount.push(counter)
 if (stockCount.length > 4){
  stockCount.splice (0,1)
 }
 text (stockCount[0], x + random(2, 7), y + random(2, 4))
  }
 }
 pop();
}

push();
  rectMode(CORNER)
  textAlign(LEFT)
 fill (255,0,0) 
 text ("1280x720", 10, 30)  //reference text //REMOVE LATER ON!!
 text (counter, 10, 60)
 translate(0,0)
 text (mouseX, 10, 90)
 text (mouseY, 10, 120)
  pop();

  //image (img, 0,100) //placing image

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


