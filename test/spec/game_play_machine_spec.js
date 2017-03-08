var app = app || {};

describe("GamePlayMachine", function() {


    var gameMachine;

    beforeEach(function() {
	  
        var playersLinkedList = getNewPlayerLinkedList();

        gameMachine = new app.GamePlay.GamePlayMachine(playersLinkedList);

    });

    it("Start() verify", function() {

        //spyOn(gameMachine, "Start");
        
        gameMachine.Start();

        expect(gameMachine.currentTurnPhase.data.name).toEqual("placeunit");
        expect(gameMachine.currentTurnPlayer.data.name).toEqual("Jon");
        expect(gameMachine.currentGamePhase.data.name).toEqual("placement");

        //expect(gameMachine.Start).toHaveBeenCalled();
    });

    it("Placement Phase TurnSequencer sequences turns in a horseshoe pattern", function() {

        // Note that this automatically triggers the first turn
        gameMachine.Start();

        var turnSequence = gameMachine.currentTurnPlayer.data.name;

        var i;
        
        for (i = 0; i < 10; i++) {
            
            // gameMachine.PlayerPlaceRoad(currentplayer, location);
            // gameMachine.PlayerPlaceSettlement(currentPlayer, location);

            // try{
            //     gameMachine.PlayerTryAdvanceTurn(currentPlayer);
            // }
            // catch (e) {

            // }

            gameMachine.NextTurn();

            turnSequence += ", " + gameMachine.currentTurnPlayer.data.name;
        }

        expect(turnSequence).toEqual("Jon, Elliot, AI_1, AI_2, AI_3, AI_3, AI_2, AI_1, Elliot, Jon, Jon");

    });

    function getNewPlayerLinkedList() {

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
			name: "AI_1",
			color: "green",
			startingUnits: startingUnits
		};

        var player4 = {
			name: "AI_2",
			color: "brown",
			startingUnits: startingUnits
		};

        var player5 = {
			name: "AI_3",
			color: "orange",
			startingUnits: startingUnits
		};

        return new app.CircularLinkedList.CircularLinkedList([player1, player2, player3, player4, player5]);
    }

});