
app.Intersections = new Array();

app.IntersectionMap = new Array();

app.IntersectionMap.push([1,2,7]);
app.IntersectionMap.push([1,2,3]);
app.IntersectionMap.push([1,3,4]);
app.IntersectionMap.push([1,4,5]);
app.IntersectionMap.push([1,5,6]);
app.IntersectionMap.push([1,6,7]);
app.IntersectionMap.push([2,7,19]);
app.IntersectionMap.push([2,19,8]);
app.IntersectionMap.push([2,8,9]);
app.IntersectionMap.push([2,9,3]);
app.IntersectionMap.push([3,9,10]);
app.IntersectionMap.push([3,10,11]);
app.IntersectionMap.push([3,11,4]);
app.IntersectionMap.push([4,11,12]);
app.IntersectionMap.push([4,12,13]);
app.IntersectionMap.push([4,13,5]);
app.IntersectionMap.push([5,13,14]);
app.IntersectionMap.push([5,14,15]);
app.IntersectionMap.push([5,15,6]);
app.IntersectionMap.push([6,15,16]);
app.IntersectionMap.push([6,16,17]);
app.IntersectionMap.push([6,17,7]);
app.IntersectionMap.push([7,17,18]);
app.IntersectionMap.push([7,18,19]);
app.IntersectionMap.push([19,8]);
app.IntersectionMap.push([8,9]);
app.IntersectionMap.push([9,10]);
app.IntersectionMap.push([10,11]);
app.IntersectionMap.push([11,12]);
app.IntersectionMap.push([12,13]);
app.IntersectionMap.push([13,14]);
app.IntersectionMap.push([14,15]);
app.IntersectionMap.push([15,16]);
app.IntersectionMap.push([16,17]);
app.IntersectionMap.push([17,18]);
app.IntersectionMap.push([18,19]);

// Hex 2 added
// 	1{1.type, 2.type}
//	2{1.type, 2.type}

//Hex 3 added
//	2{3.type}
//	3{1.type, 3.type}
//	10{2.type, 3.type}

//Hex 4 added
//  3{4.type}
//	4{1.type, 4.type}
//	13{3.type, 4.type}

//Hex 5 added
//	4{5.type}
//	5{1.type, 5.type}
//	16{4.type, 5.type}

//Hex 6 added
//	5{6.type}
//	6{1.type, 6.type}
//	19{5.type, 6.type}

//Hex 7 added (last of ring 1)
//	6{7.type}
//	1{7.type}
//	7{2.type, 7.type}
//	22{6.type, 7.type}


//Complete intersection mapping

//	in-order-intersection#:{intersecting-resource-hex-by-in-order#}
//	1:{1,2,7} 
//	2:{1,2,3}
//	3:{1,3,4}
//	4:{1,4,5}
//	5:{1,5,6}
//	6:{1,6,7}
//	7:{2,7,19}
//	8:{2,19,8}
//	9:{2,8,9}
//	10:{2,9,3}
//	11:{3,9,10}
//	12:{3,10,11}
//	13:{3,11,4}
//	14:{4,11,12}
//	15:{4,12,13}
//	16:{4,13,5}
//	17:{5,13,14}
//	18:{5,14,15}
//	19:{5,15,6}
//	20:{6,15,16}
//	21:{6,16,17}
//	22:{6,17,7}
//	23:{7,17,18}
//	24:{7,18,19}
//	25:{19,8}
//	26:{8,9}
//	27:{9,10}
//	28:{10,11}
//	29:{11,12}
//	30:{12,13}
//	31:{13,14}
//	32:{14,15}
//	33:{15,16}
//	34:{16,17}
//	35:{17,18}
//	36:{18,19}

// 0 = rock
// 1 = brick
// 2 = wheat
// 3 = sheep
// 4 = wood
// 5 = desert

app.rockImage = new Image();

// once an image is loaded, refresh the draw...
// seems that once 1 has loaded, they all have loaded
// ...so I don't think more than 1 onload event is needed
// right now. Although I could have a check to make sure 
// that all images are loaded correctly...then if not, use the colors...
app.rockImage.onload = function(){
	app.kineticLayer.draw();
};

app.rockImage.src = "./rock (150x134).jpg";

app.brickImage = new Image()	
app.brickImage.src = "./brick (150x132).jpg";

app.wheatImage = new Image();
app.wheatImage.src = "./wheat.jpg";

app.sheepImage = new Image();
app.sheepImage.src = "./sheep (150x141).jpg";

app.woodImage = new Image();
app.woodImage.src = "./wood.jpg";

app.desertImage = new Image();
app.desertImage.src = "./desert (150x139).jpg";

app.rockPiece = function(){
	this.type = 'rock';
	this.color = 'grey';
	this.image = app.rockImage;

};
app.brickPiece = function(){
	this.type = 'brick';
	this.color = '#e3352b';
	this.image = app.brickImage;
};
app.wheatPiece = function(){
	this.type = 'wheat';
	this.color = 'yellow';
	this.image = app.wheatImage;
};
app.sheepPiece = function(){
	this.type = 'sheep';
	this.color = '#8EF13C';
	this.image = app.sheepImage;
};
app.woodPiece = function(){
	this.type = 'wood';
	this.color = 'green';
	this.image = app.woodImage;
};
app.desertPiece = function(){
	this.type = 'desert';
	this.color = '#f8cd8b';
	this.image = app.desertImage;
};

app.HexPieces = [	new app.rockPiece(),
					new app.rockPiece(),
					new app.rockPiece(),
					new app.brickPiece(),
					new app.brickPiece(),
					new app.brickPiece(),
					new app.wheatPiece(),
					new app.wheatPiece(),
					new app.wheatPiece(),
					new app.wheatPiece(),
					new app.sheepPiece(),
					new app.sheepPiece(),
					new app.sheepPiece(),
					new app.sheepPiece(),
					new app.woodPiece(),
					new app.woodPiece(),
					new app.woodPiece(),
					new app.woodPiece(),
					new app.desertPiece()];
				
