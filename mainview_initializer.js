var ViewInitializer = (function() {

	var init = function(kineticLayer) {

		//hexboard

		app.GameBoardHexRadius = 45;
		
		
		app.GameBoardCenterX = 450;
		app.GameBoardCenterY = 350;
		
		// TODO: Make a Shuffler object
		app.HexPieces = shuffleAndPrepHexes(app.RegularHexPieces, app.OceanPieces);

		var gameBoardBuilder = new app.BoardBuilder.GameBoardBuilder();

		// TODO: Pass in shuffled hex stack and factor out global references to app.HexPieces
		gameBoardBuilder.AssembleBoard(kineticLayer);

		app.Stage.add(kineticLayer);
		kineticLayer.draw();

		// Print out hex-types adjacent to each intersection (in a natural/logical order)
		app.printManMappedLogicalOrderIntersectToHexTypes();
	};

	function shuffleAndPrepHexes(regularHexPieces, oceanHexPieces) {

		var numRegularHexes = regularHexPieces.length;
		var i;

		var shuffledStack = [];

		for (i = 0; i < numRegularHexes; i++) {
			
			var indexToTake = Math.floor((Math.random() * regularHexPieces.length));

			console.log("piecesRemaining: " + regularHexPieces.length);
			console.log("index of regular hex to take: " + indexToTake);

			var piece = regularHexPieces.splice(indexToTake,1)[0];

			shuffledStack.push(piece);
		}

		// Put ocean pieces last in list
		shuffledStack = shuffledStack.concat(oceanHexPieces);

		return shuffledStack;
	}
	
	return { init: init };
	
}());