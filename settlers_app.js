'use strict';

app.kineticLayer = new Kinetic.Layer();
app.Stage = new Kinetic.Stage({
	container: 'gameBoardContainer',
	width: 600,
	height: 500
});

app.newGuid = function(){
	var guid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
		var r = Math.random()*16|0, v = c == 'x' ? r : (r&0x3|0x8);
		 return v.toString(16);
	});     
	return guid;
};

app.piecesRemaining = 19;
app.nextHexPiece = function(){

	var indexToTake = Math.floor((Math.random() * app.HexPieces.length));
	console.log("piecesRemaining: " + app.HexPieces.length);
	console.log("index of hex to take: " + indexToTake);
	var piece = app.HexPieces[indexToTake];

	app.HexPieces.splice(indexToTake,1);

	return piece;
};

app.nextNumPiece = function() {
	
	app.NumPieces = app.NumPieces.sort(function(a,b){return a.order>b.order});
	
	var piece = app.NumPieces.pop();

	return piece;
};

app.NextNumPieceRandom = function() {
	
	var indexToTake = Math.floor((Math.random() * app.NumPieces.length));
	
	var piece = app.NumPieces[indexToTake];

	app.NumPieces.splice(indexToTake,1);

	return piece;
};

app.ring = {};
app.ringText = {};
app.hexNumbers = {};
app.hexNumbersText = {};

app.vertices = [];
app.verticesText = [];

app.roads = [];
app.roadCenterPoints = [];

app.intersectToHexesAdjacency = [];
app.intersectToIntersectAdjacency = [];
