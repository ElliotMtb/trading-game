var app = app || {};

app.NumPiecePuller = (function() {

    function PiecesPuller(numPieces, pullType) {

        this.numPieces = numPieces;

        // Default to pulling in order
        this.pullType = pullType;
    }

    function PiecesPuller_NextNumPiece() {

        var piece;

        if (this.pullType === 'ordered') {

            piece = this.NextNumPieceOrdered();
        }
        else if (this.pullType === 'random'){

            piece = this.NextNumPieceRandom();
        }
        else {

            throw "Unknown num piece pull type";
        }

        return piece;
    }

    function PiecesPuller_NextNumPieceOrdered() {

        this.numPieces = this.numPieces.sort(function(a,b) {
            return (a.order>b.order) ? 1 : ((b.order > a.order) ? -1 : 0);
        });

        console.log(this.numPieces.map(function (num) { return num.order; }))
        
		var piece = this.numPieces.pop();

		return piece;
	};

	function PiecesPuller_NextNumPieceRandom() {
		
		var indexToTake = Math.floor((Math.random() * this.numPieces.length));
		
		// TODO: factor out app.NumPieces...and make sure it gets initialized
		var piece = this.numPieces[indexToTake];

		this.numPieces.splice(indexToTake,1);

		return piece;
	};

    PiecesPuller.prototype.NextNumPiece = PiecesPuller_NextNumPiece;
    PiecesPuller.prototype.NextNumPieceOrdered = PiecesPuller_NextNumPieceOrdered;
    PiecesPuller.prototype.NextNumPieceRandom = PiecesPuller_NextNumPieceRandom;

    return {
        PiecesPuller : PiecesPuller
    }
})();