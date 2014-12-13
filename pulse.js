var mic, fft;
var max=0;
var imax=0;
var binNum=2048.;
var audioCtx = new AudioContext();
var mySampleRate = audioCtx.sampleRate;
var sampleRate=mySampleRate;
var dF = sampleRate/binNum;

var imA;
var imB;
var imShow;
var freqShow=500;

function setup() {
//   createCanvas(710,400);
createCanvas(window.innerWidth,window.innerHeight-50);

   mic = new p5.AudioIn();
   mic.start();
   fft = new p5.FFT();
   fft.setInput(mic);

   imA=loadImage('coolCat.jpg');
   imB=loadImage('berkman.jpg');
   //imB=loadImage('coqui1.jpg');
}

function getPianoKeyFreq(n) {
return 440*pow(pow(2,1./12.),n-49);
}

function draw() {
   background(200);
   stroke(255,0,0);

   var xScaleFactor = 3;
   var spectrum = fft.analyze();

   beginShape();
   var ampmax=0;
   for (i = 0; i<spectrum.length; i++) {
    vertex(i*xScaleFactor, map(spectrum[i], 0, 255, height, 0) );
    if (spectrum[i]>ampmax) {
    //if (i>imax) imax=i;
      ampmax=spectrum[i];
      imax=i;
     }
   }
   endShape();
   x=imax*xScaleFactor;
  // y=map(ampmax,0,255,height,0);
   y=height/2;
   fx=50;
   fy=50;
tint(200, 200, 200, 200); 
   
var displayText;


var baseFreq=800;
var fStep=100;
var fBound=baseFreq;
var fi=1;
var thisF=imax*dF;
var fout;
var n = 64; //start at 61st key on piano --- 'a'
displayText="The folks";

if (thisF>getPianoKeyFreq(61) && thisF<getPianoKeyFreq(63)) {displayText="at";}

if (thisF>getPianoKeyFreq(63) && thisF<getPianoKeyFreq(64)) {displayText="Berkman";
image(imB,x,y,(height-y)/4.,(height-y)/4.);
}

if (thisF>getPianoKeyFreq(64) && thisF<getPianoKeyFreq(66)) {displayText="are";}

if (thisF>getPianoKeyFreq(66) && thisF<getPianoKeyFreq(68)){displayText="really";}

if (thisF>getPianoKeyFreq(68) && thisF<getPianoKeyFreq(70)) {displayText="very";}

if (thisF>getPianoKeyFreq(70) && thisF<getPianoKeyFreq(72)) {displayText="cool";

}

if (thisF>getPianoKeyFreq(72) ) {displayText="cats";
image(imA,x,y,(height-y)/4.,(height-y)/4.);
}

textSize(32);
fill(0,102,153);
text(displayText,x,y);

textSize(12);
noStroke(0);
fill(0,102,153);
text("(whistle an octave, starting at A5 / 800 Hz)",30.,height-10);

   // document.getElementById('number').innerHTML = "Frequency equals: " + imax*dF;
 //document.getElementById('number').innerHTML = "Frequency equals: " + getFreq(4);


}
