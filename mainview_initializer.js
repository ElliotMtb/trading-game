var ViewInitializer = (function() {

	var init = function(kineticLayer) {

		//hexboard

		app.GameBoardHexRadius = 45;
		
		
		app.GameBoardCenterX = 450;
		app.GameBoardCenterY = 350;
		
		var gameBoardBuilder = new app.BoardBuilder.GameBoardBuilder();

		gameBoardBuilder.AssembleBoard(kineticLayer);

		app.Stage.add(kineticLayer);
		kineticLayer.draw();

		var startingUnits = [
			"road",
			"road",
			"settlement",
			"settlement"
		];

		var player1 = {
			name: "Jon",
			color: "red",
			startingUnits: startingUnits
		};

		var player2 = {
			name: "Elliot",
			color: "blue",
			startingUnits: startingUnits
		};

		var player3 = {
			name: "AI1",
			color: "green",
			startingUnits: startingUnits
		};

		var playersList = new app.CircularLinkedList.CircularLinkedList([player1, player2, player3]);

		var gamePlayMachine = new app.GamePlay.GamePlayMachine(playersList);

		gamePlayMachine.Start();
		
		// Print out hex-types adjacent to each intersection (in a natural/logical order)
		app.printManMappedLogicalOrderIntersectToHexTypes();
	};
	
	return { init: init };
	
}());