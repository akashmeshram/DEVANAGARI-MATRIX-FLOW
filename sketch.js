var symbolSize = 30;
var streams = [];

function setup() {
  createCanvas(windowWidth, windowHeight);
  textSize(symbolSize);
  var x = 0 ;
  for(var j = 0 ; j< width/(symbolSize*1.2) ; j++){
	 var stream = new Stream();
	 stream.generateSymbols(x,random(-1000,0));
	 streams.push(stream);
	 x += symbolSize*1.2;
  }
}

function draw() {
	background(250,193,0, 100);
	streams.forEach(function(strm){
	strm.render();
	});
}

function Symbols(x, y, speed, first) {
	this.x = x;
	this.y = y;
	this.value;
	this.speed = speed;
	this.switchInterval = round(random(2, 20));
	this.first = first;
	
	this.setToRandomSymbol= function(){
		if(frameCount % this.switchInterval == 0){
			this.value = String.fromCharCode(
			0x0904 + round(random(0, 35)));
		}
	}

	this.rain = function(){
		this.y = (this.y >= height)? 0 : this.y = this.y + this.speed;
	}
}

function Stream() {
	this.symbol = [];
	this.totalSymbols = round(random(5, 20));
	this.speed = random(2, 10);
	this.generateSymbols = function(x, y) {
		var first = round(random(0,4)) != 0;
		for(var i = 0 ; i< this.totalSymbols ; i++){
			var Symbol = new Symbols(x, y, this.speed, first);
			Symbol.setToRandomSymbol();
			this.symbol.push(Symbol);
			y-= symbolSize*1.2;		
			first = false;
		}
	}
	this.render = function() {
		this.symbol.forEach(function(sym){
		if(sym.first){
			fill(255,116,0);
		} else {
		    fill(255,0,0);
		}
		text(sym.value, sym.x, sym.y);
		sym.rain();
		sym.setToRandomSymbol();	
	});
	}
}