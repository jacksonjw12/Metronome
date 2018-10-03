var b;
var play = true;
var change = true;
var newSig = 4;
var click;

click = new Audio();
// click = new Audio('media/shine.wav');

function setup() {
	var cw = $("#canvas").width();
	var ch = $("#canvas").height();
	console.log(cw, ch);
	createCanvas(cw, cw).parent('canvas');
	b = new Baton();
}

function draw() {
	if(!play)
		return;
	b.update();
	b.display();
}

function Baton() {
	var p1 = [width/2, height/2];
	this.x = p1[0];
	this.y = p1[1];
	this.sig = 4;
	this.beat = 4;
	this.tempo = 120;
	this.inc = 1;
	var rad = height/16, vely = 0, count = 0;

	this.update = function(){
		//CHANGE TIME SIGNATURE

		if(count%this.sig==0 && vely==0 && newSig!=this.sig){
			this.sig = newSig;
			count = 0;
			console.log('switch');
		}

		//BOUNCING
		if(this.y>height-rad-20){
			vely*=-1;
			click.play();
			count++;
		}else{
			vely-=this.inc;
		}

		if(this.sig==4){
			if(count%this.sig==1||count%this.sig==3){
				this.x-=width/100;
			}
			if(count%this.sig==2){
				this.x+=width/50;
			}
		}
		if(this.sig==3){
			if(count%this.sig==1){
				this.x-=4;
			}
			if(count%this.sig==2){
				this.x+=4;
			}
		}
		if(this.sig==2){
			if(count%this.sig!=0){
				this.x=this.y;
			}
		}

		//INCREMENT
		this.y-=vely;
	}

	this.display = function(){
		background('#f6f6f6');
		displayLine(this.x, this.y);
		noStroke();
		fill('black');
		if(count%this.sig==1)
			fill('red');
		ellipse(this.x, this.y, 2*rad);
	}

	function displayLine(x,y) {
		stroke(2);
		noFill();
		beginShape();
		curveVertex(0, height-60);
		curveVertex(0, height-60);
		if(y+rad>height-60){
			if(x<width/4){
				vertex(x, y+rad);
				curveVertex((width+x)/2, y+rad-5);
			}else if(x>3*width/4){
				curveVertex(x/2, y+rad-5);
				vertex(x, y+rad);
			}else{
				vertex(x, y+rad);
			}
		}else{
			curveVertex(x, height-60);
		}
		curveVertex(width, height-60);
		curveVertex(width, height-60);
		endShape();
	}
};
