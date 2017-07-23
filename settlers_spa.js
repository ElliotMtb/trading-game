var app = (function() {

	function initGameVars() {

		app.kineticLayer = new Kinetic.Layer();
		app.Stage = new Kinetic.Stage({
			container: 'gameBoardContainer',
			width: 800,
			height: 700
		});

		function shuffleAndPrepHexes() {

			var numRegularHexes = app.RegularHexPieces.length;
			var i;

			for (i = 0; i < numRegularHexes; i++) {
				
				var indexToTake = Math.floor((Math.random() * app.RegularHexPieces.length));

				console.log("piecesRemaining: " + app.RegularHexPieces.length);
				console.log("index of regular hex to take: " + indexToTake);

				var piece = app.RegularHexPieces.splice(indexToTake,1)[0];

				app.HexPieces.push(piece);
			}

			// Put ocean pieces last in list
			app.HexPieces = app.HexPieces.concat(app.OceanPieces);
		}

		shuffleAndPrepHexes();

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

		app.gamePhases = [];
		app.turns = [];
		app.rounds = [];
		//app.turnPhases = ["preRollPhase", "rollPhase", "collectResources", "trade", "build"];

		//var linkedList = new app.CircularLinkedList.CircularLinkedList(["abra", "cadabra", "poof"]);

		//console.log("The link list looks like: " + linkedList.ToString());
	}

	var initModule = function () {
		
		initGameVars();

		// Setup the Backbone components (I particularly delayed the creation
		// of the Backbone views because there seemed to be a timing issue
		// with underscore being ready for use in setting up templates)
		app.IntersectionViewInitializer.initView();
		app.SetupViewInitializer.initView();
		app.PlayerViewInitializer.initView();
		app.RouterInitializer.init();

		app.CurrentIntersectionId = 0;

		app.nextIntersectionId = function(){
			
			// Return BEFORE incrementing
			return app.CurrentIntersectionId++;
		}
		
		app.CurrentRoadCenterId = 0;
		
		app.nextRoadCenterId = function() {
			return app.CurrentRoadCenterId++;
		}

		app.playerList = new app.PlayerList();
		app.hexIntersectList = new app.HexIntersectionsList();

		app.playerView = new app.SetupView(app.kineticLayer, app.testPolyHex); 

		app.Stage.add(app.kineticLayer);
		app.kineticLayer.draw();

		app.router = new app.Router();
		Backbone.history.start();    
	};
	
	return { initModule: initModule };
	
}());