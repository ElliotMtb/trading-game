var app = (function() {

	var initModule = function () {
		
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