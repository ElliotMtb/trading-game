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

        gameMachine.Start();

        var turnSequence = "";

        var i;

        turnSequence += gameMachine.currentTurnPlayer.data.name;
        
        for (i = 0; i < 10; i++) {
            
            gameMachine.NextTurn();

            turnSequence += ", " + gameMachine.currentTurnPlayer.data.name;
        }

        expect(turnSequence).toEqual("Jon, Elliot, ...");

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
			name: "AI1",
			color: "green",
			startingUnits: startingUnits
		};

        return new app.CircularLinkedList.CircularLinkedList([player1, player2, player3]);
    }

});