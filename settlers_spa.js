var app = (function() {

	var initModule = function () {
		
		SetupView.initView();
		PlayerView.initView();
		
		//--------------
		// Initializers
		//--------------   

		app.playerView = new app.SetupView(app.kineticLayer, app.testPolyHex); 

		app.Stage.add(app.kineticLayer);
		app.kineticLayer.draw();

		app.router = new app.Router();
		Backbone.history.start();    
	};
	
	return { initModule: initModule };
	
}());