let fadein = 0
let ending = 12418 //end of .csv
let lineHistory = [];
let linesegment = 50
let cinemaBar =70
let raining = [];
let rainTilt = 2


function draw_one_frame(words, vocal, drum, bass, other, counter) {
  let From = color(61,52,69);
  let To = color(83,67,97);
  let Heartbeat = lerpColor(From, To, map(other, 70, 80, 0, 1))
  background(Heartbeat) //IMPORTANT BECAUSE RESET FRAME TO DRAW NEXT
  textFont('Verdana'); // please use CSS safe fonts
  textSize(24);
  rectMode(CENTER)
  lineVisual = drum
  LVisMax = 100

  //RAIN
  if (counter>0){
  push();
  for (let r of raining){ //this helps to target the individual values in the array
    r.show(bass)
    r.fall(bass)
  }

  for (let i=0; i<(map(bass, 0, 100, 1, 3)); i++){
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
    stroke(200, map(counter, 0, 1000, 0, 255))
   strokeWeight(4)
   lineHistory.push(lineVisual); //to change what the line models
   
    beginShape();
   for (let i=0; i<lineHistory.length; i++){

    if (lineHistory.length >= linesegment) { //for the line to cut
      lineHistory.splice(0, 1);
      linesegment = linesegment + 0.015
    }

     let x = map(i, 0, lineHistory.length, 1190, map(counter, 0, ending, 1190, 90));
     let y =(height/2)+50-map(lineHistory[i], 0, 100, 0, LVisMax);

      vertex (x, y);
  }
    endShape();
    // point (map(counter, 0, ending, 1190, 100)-80 + (100*sin(counter)), (height/2)+50+ (150*sin(counter*5))-20) //THIS MODELS THE CONTROL POINT WHICH ALLOWS THE TRAIL TO MOVE
    beginShape(); //Line connecting rect() to trail. MIGHT GET RID OF
    curveVertex (map(counter, 0, ending, 1190, 100)-80 + (100*sin(counter)), (height/2)+50 + (150*sin(counter*5))-20)
    curveVertex (map(counter, 0, ending, 1190, 100)-40, (height/2)+50)
    curveVertex (map(counter, 0, ending, 1190, 110), (height/2)+50-map(lineVisual, 0, 100, 0, LVisMax))
    curveVertex (map(counter, 0, ending, 1190, 110), (height/2)+50-map(lineVisual, 0, 100, 0, LVisMax))
    endShape();
  pop();
  } else {
    lineHistory = [];  //reset the array when starting song again. 
  }

   //CinematicBars +ref text
 push();
 rectMode(CORNER);
 stroke(0)
 fill(0)
 rect (0,0, 1280, cinemaBar)
 rect (0,720-cinemaBar, 1280, cinemaBar)

 fill (255,0,0) 
 text ("1280x720", 10, 30)  //reference text
 text (counter, 10, 60)
 pop();

}

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
    // this.Falling = Falling + random(20, 60)
    this.y += map(bass, 0, 100, 4, 12)
    this.x += rainTilt
    if  (raining.length> map(bass, 0, 100, 247, 297)){
      raining.splice(0,1);
    }
  }
}

