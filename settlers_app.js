'use strict';

var app = {}; // create namespace for our app

app.kineticLayer = new Kinetic.Layer();
app.Stage = new Kinetic.Stage({
	container: 'gameBoardContainer',
	width: 900,
	height: 900
});

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
					
app.handleSweepCollide = function (idOfCurrentHex, collisionIndex, lastIntersectionInSweep) {
	// Don't create a new intersection
	// ...rather, update adjacent hexes list for existing intersection.
	var currentHexType = app.ring[idOfCurrentHex];
	
	if (app.intersectToHexesAdjacency[collisionIndex].indexOf(idOfCurrentHex) === -1)
	{
		app.intersectToHexesAdjacency[collisionIndex].push(idOfCurrentHex);
	}
	
	if (lastIntersectionInSweep)
	{
		if (app.intersectToIntersectAdjacency[collisionIndex].indexOf(lastIntersectionInSweep) === -1)
		{
			app.intersectToIntersectAdjacency[collisionIndex].push(lastIntersectionInSweep);
		}
	}
};
				
app.bindIntersectClick = function(intersectionId) {
	
	app.vertices[intersectionId].on('click', function(e){

		var intersectId = this.attrs.id;
		var intersectX = this.attrs.x;
		var intersectY = this.attrs.y;
		
		app.SelectIntersect(intersectId);
		
		var settlement = $("<button>", {
			"class": "settlement-btn",
			"text": "Settlement"
		});
		
		settlement.on("click", function() {
			makeSettlement(intersectX, intersectY, 10, 'red', app.kineticLayer);
			app.kineticLayer.draw();
		});
		
		var city = $("<button>", {
			"class": "city-btn",
			"text": "City"
		});
		
		city.on("click", function() {
			makeCity(intersectX, intersectY, 10, 'red', app.kineticLayer);
			app.kineticLayer.draw();
		});
		
		$("#selectedIntersect").html("Selected Intersection: <br> Id: " + intersectId + "<br>"
		+ "Adjacent Hexes: " + app.intersectToHexesAdjacency[intersectionId] + "<br>"
		+ "Adjacent Intersections: " + app.intersectToIntersectAdjacency[intersectionId] + "<br>");
		
		$("#selectedIntersect").append(settlement, city);
	
	});
};

app.SelectHex = function(id){

	if (app.SelectedHex == id)
	{
		app.toggleSelectedHex(id);

	}
	else
	{
		if (app.SelectedHex != "")
		{
			app.deselectHex(app.SelectedHex);
			app.toggleSelectedHex(id);
		}
		else
		{
			app.toggleSelectedHex(id);
		}
	}
};

app.SelectIntersect = function(id) {
	
	if (app.SelectedIntersection === id)
	{
		app.toggleSelectedIntersection(id);
	}
	else
	{
		if (app.SelectedIntersection !== "")
		{
			app.deselectIntersection(app.SelectedIntersection);
			app.toggleSelectedIntersection(id);
		}
		else
		{
			app.toggleSelectedIntersection(id);
		}
	}
};

app.toggleSelectedHex = function(id){

	if(app.ring[id].getAttr('selected'))
	{
		app.ring[id].setStroke("black");
		app.ring[id].setStrokeWidth("1");
		app.ring[id].setAttr('selected', false);
		app.SelectedHex = "";

	}
	else
	{
		app.ring[id].setStroke("blue");
		app.ring[id].setStrokeWidth("3");
		app.ring[id].setAttr('selected', true);

		app.SelectedHex = id;
	}

	app.kineticLayer.draw();
	app.ring[id].draw();

};

app.toggleSelectedIntersection = function(id) {

	if(app.vertices[id].getAttr('selected'))
	{
		app.vertices[id].setStroke("black");
		app.vertices[id].setStrokeWidth("1");
		app.vertices[id].setAttr('selected', false);
		app.SelectedIntersection = "";

	}
	else
	{
		app.vertices[id].setStroke("blue");
		app.vertices[id].setStrokeWidth("3");
		app.vertices[id].setAttr('selected', true);

		app.SelectedIntersection = id;
	}

	app.kineticLayer.draw();
	app.vertices[id].draw();
};

app.deselectHex = function(id){
	app.ring[id].setStroke("black");
	app.ring[id].setStrokeWidth("1");
	app.ring[id].setAttr('selected', false);
	app.SelectedHex = "";
};

app.deselectIntersection = function(id) {
	app.vertices[id].setStroke("black");
	app.vertices[id].setStrokeWidth("1");
	app.vertices[id].setAttr('selected', false);
	app.SelectedIntersection = "";
};

app.SelectedHex = "";
app.SelectedIntersection = "";

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


app.ring = {};

app.vertices = [];
app.verticesText = [];

app.intersectToHexesAdjacency = [];
app.intersectToIntersectAdjacency = [];

app.Player = Backbone.Model.extend({
	defaults: {
		name: '',
		point: 2
	},
	addPoint: function(){
		var points = this.get('point');
		console.log(this.get('name') + ' has ' + points + ' points!');

		this.save({ 'point': ++points});
	}
});

app.IntersectionModel = Backbone.Model.extend({
	defaults: {
		id: '',
		x: '',
		y: ''
	},
	addAdjacentHex: function(hexId){
		this.adjacentHexes.push(hexId);
	},
	highlightOnBoard: function(){
	
		app.vertices[this.id].setStroke("yellow");
		app.vertices[this.id].setStrokeWidth(3);
		app.vertices[this.id].draw();
	},
	alertAdjacencies: function() {
	
		var adjacentHexes = app.intersectToHexesAdjacency[this.id];
		
		var stringListOfHexes = "";
		
		for(var i=0; i<adjacentHexes.length; i++)
		{
			stringListOfHexes+= (adjacentHexes[i] + ",");
		}
		
		var stringAdjacentIntersects = "";
		
		var adjancentIntersections = app.intersectToIntersectAdjacency[this.id];
		
		for (var i=0; i < adjancentIntersections.length; i++)
		{
			stringAdjacentIntersects+= (adjancentIntersections[i] + ",");
		}
		
		alert("adjacent to hex #: " + stringListOfHexes + " adjacent to intersections: " + stringAdjacentIntersects);
		
	}
});

app.CatanHex = Backbone.Model.extend({
	defaults: {
		resourceType: 'desert',
		collectNumber: 0
	},
	hex: new Kinetic.RegularPolygon({
		x: 150,
		y: 150,
		sides: 6,
		radius: 25,
		fill: 'yellow',
		stroke: 'black',
		strokeWidth: 1
		}),
	id: app.newGuid()

});

app.CatanHexView = Backbone.View.extend({
	tagName: 'gameBoardContainer',
	render: function(){
		
	},
	initialize: function(){
		
		this.model.hex.on('click', this.hexClick);
	},      
	events: {
	
	},
	hexClick: function(e){

		if (this.selected == true)
		{
			this.setStroke("black");
			this.setStrokeWidth("1");
			this.draw();

			this.selected = false;
		}
		else
		{

			this.setStroke("blue");
			this.setStrokeWidth("3");
			this.draw();

			this.selected = true;
		}
	},
	selected: false

});

//--------------
// Collections
//--------------

app.HexIntersectionsList = Backbone.Collection.extend({
	model: app.IntersectionModel,
	localStorage: new Store("hex-intersection")
});


app.PlayerList = Backbone.Collection.extend({
	model: app.Player,
	localStorage: new Store("settlers-of-catan"),
	playersWith2Points: function(){
		return this.filter(function(player) {

			var playerName = player.get('name');
		
			if (player.get('point') == 2)
			{	
				console.log(playerName + ' has EXACTLY 2 points');
				return true;
			}

			console.log(playerName + ' has more than 2 points');

			return false;
		});
	}
});

// instance of the Collection
app.playerList = new app.PlayerList();
app.hexIntersectList = new app.HexIntersectionsList();

//--------------
// Views
//--------------

// renders list of intersections
app.IntersectionView = Backbone.View.extend({
	tagName: 'li',
	template: _.template($('#intersect-template').html()),
	render: function(){
		this.$el.html(this.template(this.model.toJSON()));
		return this; // enable chained calls
	},
	initialize: function(){
		this.model.on('change', this.render, this);
	},
	events: {
		'click .highlight': 'highlight'
	},
	highlight: function(e){
	this.model.highlightOnBoard();
	this.model.alertAdjacencies();
	}
});

// renders individual player items list (li)
app.PlayerView = Backbone.View.extend({
	tagName: 'li',
	template: _.template($('#item-template').html()),
	render: function(){
	this.$el.html(this.template(this.model.toJSON()));
		this.input = this.$('.edit');
		return this; // enable chained calls
	},
	initialize: function(){
		this.model.on('change', this.render, this);
	},      
	events: {
		'keypress .edit' : 'updateOnEnter',
		'click .destroy': 'destroy',
		'click .addPoint': 'addPoint'
	},
	updateOnEnter: function(e){
		if(e.which == 13){
			this.close();
		}
	},
	destroy: function(){
		this.model.destroy();
		app.playerList.trigger('reset');
	},
	addPoint: function(){
		this.model.addPoint();
	}
});

app.CurrentIntersectionId = 0;

app.nextIntersectionId = function(){
	
	// Return BEFORE incrementing
	return app.CurrentIntersectionId++;
}

// renders the full list of todo items calling TodoView for each one.
app.SetupView = Backbone.View.extend({
	el: '#settlersapp',
	hexVerticesRadialSweep: function(centerX, centerY, hexRadius, idOfCurrentHex){
	
		var vertexX;
		var vertexY;
		var i;
	
		var lastIntersectionInSweep;
		
		// Forward sweep
		for (i= 0; i < 7; i++)
		{
			vertexX = this.getXYatArcEnd(centerX, centerY, hexRadius, (-1*i*2*Math.PI/6) - (-1*2*Math.PI/12))[0];
			vertexY = this.getXYatArcEnd(centerX, centerY, hexRadius, (-1*i*2*Math.PI/6) - (-1*2*Math.PI/12))[1];
			
			var collisionIndex = this.checkForCollision(vertexX,vertexY);

			if (collisionIndex == -1)
			{
				var intersectionId = app.nextIntersectionId();
				
				app.vertices[intersectionId] = new Kinetic.Circle({
				x: vertexX,
				y: vertexY,
				radius: 10,
				fill: 'magenta',
				stroke: 'black',
				strokeWidth: 1,
				id: intersectionId
				});
				
				app.verticesText[intersectionId] = new Kinetic.Text({
				x: vertexX + 10,
				y: vertexY,
				text: intersectionId,
				fontSize: 15,
				fontFamily: 'Calibri',
				fill: 'red'
				});
				
				this.createIntersection(intersectionId, vertexX, vertexY);
				
				var currentHexType = app.ring[idOfCurrentHex];
				
				app.intersectToHexesAdjacency[intersectionId] = [];
				
				if (app.intersectToHexesAdjacency[intersectionId].indexOf(idOfCurrentHex) === -1)
				{
					app.intersectToHexesAdjacency[intersectionId].push(idOfCurrentHex);
				}
				
				app.intersectToIntersectAdjacency[intersectionId] = [];
				
				if (app.intersectToIntersectAdjacency[intersectionId].indexOf(intersectionId) === -1)
				{
					app.intersectToIntersectAdjacency[intersectionId].push(intersectionId);
				}
				
				// At the start of the sweep, there is no "previous" intersection in the sweep
				if (lastIntersectionInSweep !== undefined)
				{
				
					if (app.intersectToIntersectAdjacency[intersectionId].indexOf(lastIntersectionInSweep) === -1)
					{
						app.intersectToIntersectAdjacency[intersectionId].push(lastIntersectionInSweep);
					}
				}
				
				lastIntersectionInSweep = intersectionId;

				app.bindIntersectClick(intersectionId);
			}
			else
			{
				app.handleSweepCollide(idOfCurrentHex, collisionIndex, lastIntersectionInSweep);
				
				lastIntersectionInSweep = collisionIndex;
			}
		
		// Perhaps should delay adding until the end to show on top of everything else
		//app.kineticLayer.add(app.vertices[intersectionId]);
		}
		
		var vertexX;
		var vertexY;
		var i;
	
		var lastIntersectionInSweep;
		
		// Reverse sweep (makes sure to get all the vertice adjacencies on the boundaries of the game board)
		for (i= 6; i >= 0; i--)
		{
			vertexX = this.getXYatArcEnd(centerX, centerY, hexRadius, (-1*i*2*Math.PI/6) - (-1*2*Math.PI/12))[0];
			vertexY = this.getXYatArcEnd(centerX, centerY, hexRadius, (-1*i*2*Math.PI/6) - (-1*2*Math.PI/12))[1];
			
			var collisionIndex = this.checkForCollision(vertexX,vertexY);

			if (collisionIndex == -1)
			{
				// There should be no new intersections, because this is the second pass (in reverse)
			}
			else
			{
				app.handleSweepCollide(idOfCurrentHex, collisionIndex, lastIntersectionInSweep);
				
				lastIntersectionInSweep = collisionIndex;
			}
		}
	},
	checkForCollision: function (x,y){
	
		for (var i = 0; i < app.vertices.length; i++)
		{
			var intersectionPosition = app.vertices[i].getPosition();
			
			if (this.distance(intersectionPosition.x, intersectionPosition.y, x, y) < 2)
			{
				console.log("Collision detected!");
				return i;
			}
		}
	
		return -1;
	},
	distance: function(fromX, fromY, toX, toY) {
		var aSqr = Math.pow(fromX - toX, 2);
		var bSqr = Math.pow(fromY - toY, 2);
	
		var c = Math.sqrt(aSqr + bSqr);
	
		return c;
	},
	initialize: function (kineticLayer, practiceHex) {
  
		//window.localStorage.removeItem('hex-intersection');
		//window.localStorage.removeItem('settlers-of-catan');
		window.localStorage.clear();
		
		this.input = this.$('#new-player');
		app.playerList.on('add', this.addAll, this);
		app.playerList.on('reset', this.addAll, this);
		app.playerList.fetch(); // Loads list from local storage
		
		app.hexIntersectList.on('showIntersections', this.addAllIntersections, this);
		

		//var myHex = new app.CatanHexView({model: new app.CatanHex()});
		//hexboard

		var hexRadius = 45;
		var radiusToFirstRing = hexRadius*Math.sqrt(3);
		var radiusToSecondRing;
		
		var ring1StartX = 300; //+ radiusToFirstRing;
		var ring1StartY = 250;
		
		var ring1EndX = ring1StartX;
		var ring1EndY = ring1StartY;
		
		var i;
		var hexId = 1;
		
		//var firstRing = new Array();
		
		var theCenter = app.nextHexPiece();
		//var centerGuid = app.newGuid();
		var centerGuid = 1;

		app.ring[centerGuid] = new Kinetic.RegularPolygon({
			x: ring1StartX,
			y: ring1StartY,
			sides: 6,
			radius: hexRadius,
			//fill: theCenter.color,
			fillPatternImage: theCenter.image,
			fillPatternOffset: [-78, 70],
			hexType: theCenter.type,
			stroke: 'black',
			strokeWidth: 1,
			id: centerGuid
		});

		var centerText = new Kinetic.Text({
			x: ring1StartX - 7,
			y: ring1StartY - 15,
			text: 1,
			fontSize: 30,
			fontFamily: 'Calibri',
			fill: 'red'
		});
	 
		this.hexVerticesRadialSweep(ring1StartX, ring1StartY, hexRadius, centerGuid);
		
		kineticLayer.add(app.ring[centerGuid]);

		kineticLayer.add(centerText);

		app.ring[centerGuid].on('click', function(e){

			app.SelectHex(this.getAttr('id'));
		});

		for(i=0; i <=5; i++)
		{
			ring1EndX =this.getXYatArcEnd(ring1StartX, ring1StartY, radiusToFirstRing, -1*i*2*Math.PI/6)[0];
			ring1EndY =this.getXYatArcEnd(ring1StartX, ring1StartY, radiusToFirstRing, -1*i*2*Math.PI/6)[1];

			console.log("Ring1 Start (x,y): " + ring1StartX + "," + ring1StartY);
			console.log("Ring1 hex " + i + " end (x,y): " + ring1EndX + "," + ring1EndY);

			//var hexGuid = app.newGuid();
			var hexGuid = i + 2;

			var hexPiece = app.nextHexPiece();

			app.ring[hexGuid] = new Kinetic.RegularPolygon({
				x: ring1EndX,
				y: ring1EndY,
				sides: 6,
				radius: hexRadius,
				//fill: hexPiece.color,
				fillPatternImage: hexPiece.image,
				fillPatternOffset: [-78, 70],
				hexType: hexPiece.type,
				stroke: 'black',
				strokeWidth: 1,
				id : hexGuid
			});

			var ring1Text = new Kinetic.Text({
				x: ring1EndX - 7,
				y: ring1EndY - 15,
				text: i + 2,
				fontSize: 30,
				fontFamily: 'Calibri',
				fill: 'red'
			});

			kineticLayer.add(app.ring[hexGuid]);
		
			this.hexVerticesRadialSweep(ring1EndX, ring1EndY, hexRadius, hexGuid);

			kineticLayer.add(ring1Text);

			app.ring[hexGuid].on('click', function(e){

				app.SelectHex(this.getAttr('id'));
			});
		}

		var j;
		
		for(j=0; j <=11; j++)
		{
			if (j % 2 == 1){
				radiusToSecondRing = 3 * hexRadius;
			}
			else
			{
				radiusToSecondRing = 2 * radiusToFirstRing;	
			}
			
			ring1EndX = this.getXYatArcEnd(ring1StartX, ring1StartY, radiusToSecondRing, -1*j*2*Math.PI/12)[0];
			ring1EndY = this.getXYatArcEnd(ring1StartX, ring1StartY, radiusToSecondRing, -1*j*2*Math.PI/12)[1];

			console.log("Ring1 Start (x,y): " + ring1StartX + "," + ring1StartY);
			console.log("Ring1 hex " + j + " end (x,y): " + ring1EndX + "," + ring1EndY);

			//var hexGuid = app.newGuid();
			var hexGuid = j + 8;

			var hexPiece = app.nextHexPiece();

			app.ring[hexGuid] = new Kinetic.RegularPolygon({
				x: ring1EndX,
				y: ring1EndY,
				sides: 6,
				radius: hexRadius,
				//fill: hexPiece.color,
				fillPatternImage: hexPiece.image,
				fillPatternOffset: [-78, 70],
				hexType: hexPiece.type,
				stroke: 'black',
				strokeWidth: 1,
				id: hexGuid
			});

			var ring2Text = new Kinetic.Text({
				x: ring1EndX - 7,
				y: ring1EndY - 15,
				text: j + 8,
				fontSize: 30,
				fontFamily: 'Calibri',
				fill: 'red'
			});

			kineticLayer.add(app.ring[hexGuid]);
			
			this.hexVerticesRadialSweep(ring1EndX, ring1EndY, hexRadius, hexGuid);

			kineticLayer.add(ring2Text);

			app.ring[hexGuid].on('click', function(e){

				app.SelectHex(this.getAttr('id'));
			});	
		}

		var radiusToThirdRing;
		var k;
		var angle;
		var primaryAngle = -1*2*Math.PI/6;
		var ringNumber = 3;
		var m;

		var angleList = [ringNumber];
		var radiiList = [ringNumber];

		// Draw outside "ocean" border ring
		var x;
		for(x=0; x<1; x++)
		{
			var ringN;

			for(ringN =0; ringN<ringNumber; ringN++)
			{
				var aLeg = (ringNumber-0.5*ringN)*radiusToFirstRing;
				var bLeg = (0+1.5*ringN)*hexRadius;

				angleList[ringN] = -1*Math.atan(bLeg/aLeg);
				radiiList[ringN] =  Math.sqrt(Math.pow(aLeg, 2) + Math.pow(bLeg,2));
			}

			var primaryPosition;
		  
			for(k=0; k <=(ringNumber*6)-1; k++)
			{
				primaryPosition = Math.floor(k/ringNumber)*primaryAngle;

				for(m=0; m<ringNumber; m++)
				{
					if( k % ringNumber == m)
					{
						var aLeg = (ringNumber-0.5*m)*radiusToFirstRing;
						var bLeg = (0+1.5*m)*hexRadius;
						
						//radiusToThirdRing = Math.sqrt(Math.pow(aLeg, 2) + Math.pow(bLeg,2));
						radiusToThirdRing = radiiList[m];
						//angle = -1*Math.atan(bLeg/aLeg) + primaryPosition;
						angle = angleList[m] + primaryPosition;
					}

					ring1EndX = this.getXYatArcEnd(ring1StartX, ring1StartY, radiusToThirdRing, angle)[0];
					ring1EndY = this.getXYatArcEnd(ring1StartX, ring1StartY, radiusToThirdRing, angle)[1];

					var hexGuid = k + 20;

					var hexPiece = app.nextHexPiece();

					app.ring[hexGuid] = new Kinetic.RegularPolygon({
					x: ring1EndX,
					y: ring1EndY,
					sides: 6,
					radius: hexRadius,
					fill: 'cyan',
					stroke: 'black',
					strokeWidth: 1,
					id: hexGuid
					});
					
					kineticLayer.add(app.ring[hexGuid]);
				}
			}
				  
			ringNumber++;
		}
	  
		/*
		//IDEA! Should develop board as a collection of hex-center points, and unique list of vertices, when building the vertices (6 around each center point), can have a unique list of vertices...only add to the unique list if not there, if vertex "collides" with existing vertex (could use a box region for collision detection) then don't add new vertex, but rather add the hex-center point as an adjacency, and add the "previous" vertex as adjacency as well (even after collision, keep sweeping around all 6 vertices of the center-point...to make sure everything gets updated if necessary). In this way, a unique list of vertices will be build along with information regarding adjacent hexes and vertices.

		//note: when "sweeping" around a center point, any newly created vertices should have "null/empty" adjacent vertices and hexes...that way, the //edges of the board will already be initialized by the time the board is built (collisions will be how the "empty/null" adjacencies become occupied).

		//Then, roads can be build to adjacent vertices and settlements can occupy a vertex with knowledge of which 2 or 3 hexes it is adjacent to (for resource type and number
		*/

		//hexboard
		
		for (var i = 0; i < app.vertices.length; i++)
		{
			app.kineticLayer.add(app.vertices[i]);
			app.kineticLayer.add(app.verticesText[i]);
		}
		
		//kineticLayer.add(myHex.model.hex);

		app.Stage.add(kineticLayer);
		kineticLayer.draw();

		for(var x = 1; x <= app.IntersectionMap.length; x++)
		{
			console.log("Intersection " + x + ":");

			for(var index = 0; index < app.IntersectionMap[x-1].length; index++)
			{
				//alert(app.ring[index].getAttr('id'));
				var ringIndex = app.IntersectionMap[x-1][index];
				//alert(app.ring[ringIndex].getAttr('id'));

				console.log("\t" + app.ring[ringIndex].getAttr('hexType'));
			}
		}
	},
	getXYatArcEnd: function(c1,c2,radius,angle){
		return [c1+Math.cos(angle)*radius,c2+Math.sin(angle)*radius];
	},
	events: {
		'keypress #new-player': 'createPlayer'
	},
	createIntersection: function(id, x, y){
		app.hexIntersectList.create({'id':id,'x':x,'y':y});
	},
	createPlayer: function(e){
		if ( e.which !== 13 || !this.input.val().trim() )
		{ // ENTER_KEY = 13
			return;
		}
		
		app.playerList.create(this.newAttributes());
		this.input.val(''); // clean input box
	},
	addOne: function(player){
		var view = new app.PlayerView({model: player});
		$('#players-list').append(view.render().el);
	},
	addAll: function(){
		var theList = this.$('#players-list');
		theList.html(''); // clean the todo list
		switch(window.filter){

			case 'playersWith2Points':
				_.each(app.playerList.playersWith2Points(), this.addOne);
				break;
			case 'begin':
				break;		
			default:
				app.playerList.each(this.addOne, this);
				break;
		}
	},
	addAllIntersections: function(){
		var theList = this.$('#intersections-list');
		theList.html('');
		app.hexIntersectList.each(this.addOneIntersection, this);
	},
	addOneIntersection: function(intersection){
		var view = new app.IntersectionView({model: intersection});
		$('#intersections-list').append(view.render().el);
	},
	newAttributes: function(){
		return {
			name: this.input.val().trim()
		}
	}
});

//--------------
// Routers
//--------------

app.Router = Backbone.Router.extend({
	routes: {
		'*filter' : 'setFilter'
	},
	setFilter: function(params) {
		if (params)
		{ 
			console.log('app.router.params = ' + params);
			window.filter = params.trim();
		}
		else
		{
			window.filter = '';
		}

		app.playerList.trigger('reset');
		app.hexIntersectList.trigger('showIntersections');
	}
});     

//--------------
// Initializers
//--------------   

app.playerView = new app.SetupView(app.kineticLayer, app.testPolyHex); 

app.Stage.add(app.kineticLayer);
app.kineticLayer.draw();

app.router = new app.Router();
Backbone.history.start();    
