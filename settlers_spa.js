var app = (function() {

	function initGameVars() {

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

		app.config = {};

		app.NextNumPieceOrdered = function() {
			
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

		app.ToggleNumTokenPullOrder = function() {
			
			if (app.nextNumPiece === app.NextNumPieceRandom)
			{
				app.SetNumPiecePullOrder(app.NextNumPieceOrdered);
			}
			else
			{
				app.SetNumPiecePullOrder(app.NextNumPieceRandom);
			}
		}
		app.SetNumPiecePullOrder = function(method) {
			
			app.nextNumPiece = method;
		};

		// Uncomment to pull randomly
		//app.SetNumPiecePullOrder(app.NextNumPieceRandom);
		// Default to pulling in order
		app.SetNumPiecePullOrder(app.NextNumPieceOrdered);

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
		app.turnPhases = ["preRollPhase", "rollPhase", "collectResources", "trade", "build"];

		var linkedList = new app.DataStructures.DoublyLinkedList(["abra", "cadabra", "poof"]);

		console.log("The link list looks like: " + linkedList.ToString());
	}

	var initModule = function () {
		
		initGameVars();

		IntersectionView.initView();
		IntersectionModel.initModel();
		SetupView.initView();
		PlayerView.initView();
		Router.init();
		CatanHexView.initView();
		CatanHexModel.initModel();
		
		//--------------
		// Initializers
		//--------------   

		// instance of the Collection
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

		
		//--------------
		// Collections
		//--------------

		app.HexIntersectionsList = Backbone.Collection.extend({
			model: app.IntersectionModel,
			localStorage: new Store("hex-intersection")
		});

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