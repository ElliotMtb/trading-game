var app = app || {};

app.HexBuilder = (function() {

    function HexBuilder() {}

    function HexBuilder_BuildHex(hexId, arcEndX, arcEndY, radiusToRing, ringIndex, numHexesInRing, kineticLayer) {

        // TODO: factor-out/paramaterize global call
		var hexPiece = app.nextHexPiece();
		
		var numPiece;
		
		if (hexPiece.type == "desert")
		{
			numPiece = app.createZeroPiece();
			createTheHex();
		}
		else
		{
			numPiece = app.nextNumPiece();
			createTheHex();
			createTheNumber();
		}
		
		function createTheHex() {
			
			app.ring[hexId] = new Kinetic.RegularPolygon({
				x: arcEndX,
				y: arcEndY,
				sides: 6,
				radius: app.GameBoardHexRadius,
				//fill: hexPiece.color,
				fillPatternImage: hexPiece.image,
				fillPatternOffset: [-78, 70],
				hexType: hexPiece.type,
				hexNumber: numPiece.value,
				stroke: 'black',
				strokeWidth: 1,
				id: hexId
			});
			
			app.ringText[hexId] = new Kinetic.Text({
				x: arcEndX - 12,
				y: arcEndY + 14,
				text: hexId,
				fontSize: 25,
				fontFamily: 'Calibri',
				fill: 'blue',
			});

			app.ringText[hexId].hide();
			
			kineticLayer.add(app.ring[hexId]);
			kineticLayer.add(app.ringText[hexId]);
		}

		function createTheNumber() {
			
			app.hexNumbers[hexId] = new Kinetic.Circle({
				x: arcEndX,
				y: arcEndY,
				radius: 15,
				fill: '#EAE0C8', // Pearl
				stroke: 'black',
				strokeWidth: 1,
				id: hexId
			});
			
			app.hexNumbersText[hexId] = new Kinetic.Text({
				x: arcEndX - 7,
				y: arcEndY - 11,
				text: numPiece.value,
				fontSize: 20,
				fontFamily: 'Calibri',
				fill: numPiece.color,
			});
			
			kineticLayer.add(app.hexNumbers[hexId]);
			kineticLayer.add(app.hexNumbersText[hexId]);	
		}
    }

    HexBuilder.prototype.BuildHex = HexBuilder_BuildHex;

    return {
        HexBuilder : HexBuilder
    };
})();