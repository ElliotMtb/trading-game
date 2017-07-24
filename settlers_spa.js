var app = (function() {

	function initGameVars() {

		app.kineticLayer = new Kinetic.Layer();
		app.Stage = new Kinetic.Stage({
			container: 'gameBoardContainer',
			width: 800,
			height: 700
		});

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
		
		// Game board gets assembled when the initialize event of SetupView is fired
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