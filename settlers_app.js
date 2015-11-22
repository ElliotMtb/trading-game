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


app.ring = {};

app.vertices = [];
app.verticesText = [];

app.roads = [];

app.intersectToHexesAdjacency = [];
app.intersectToIntersectAdjacency = [];

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

app.CurrentIntersectionId = 0;

app.nextIntersectionId = function(){
	
	// Return BEFORE incrementing
	return app.CurrentIntersectionId++;
}

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

