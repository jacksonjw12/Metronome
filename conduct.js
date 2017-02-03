var b;
var play = true;
var change = true;
var newSig = 4;

function setup() {
	createCanvas(300, 300).parent('innerLeft');
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
	var rad = height/8, vely = 0, count = 0;

	this.update = function(){
		//CHANGE TIME SIGNATURE
		console.log(vely);

		if(count%this.sig==0 && vely==0 && newSig!=this.sig){
			this.sig = newSig;
			count = 0;
			console.log('switch');
		}

		//BOUNCING
		if(this.y>height-rad-10){
			vely=-vely;
			count++;
		}else{
			vely-=this.inc;
		}

		if(this.sig==4){
			if(count%this.sig==1||count%this.sig==3){
				this.x-=4;
			}
			if(count%this.sig==2){
				this.x+=8;
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

		/*if(count!=0&&count%this.sig==0){
			this.y = this.y-vely/2;
		}*/
		//INCREMENT
		this.y-=vely;
	}

	this.display = function(){
		background(255);
		stroke(1);
		fill('black');
		line(0, height-20, width, height-20);
		if(count%this.sig==1)
			fill('red');
		noStroke();
		ellipse(this.x, this.y, rad);
	}
};