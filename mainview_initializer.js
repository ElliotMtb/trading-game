var ViewInitializer = (function() {

	var init = function(kineticLayer, practiceHex) {

		//hexboard

		app.GameBoardHexRadius = 45;
		
		var radiusToFirstRing = app.GameBoardHexRadius*Math.sqrt(3);
		
		app.GameBoardCenterX = 300;
		app.GameBoardCenterY = 250;
		
		var i;
		var initialHexId = 1;
		
		drawRing0(initialHexId, kineticLayer);
		
		// Center hex
		var numHexes = 1;

		drawRing1(initialHexId + numHexes, radiusToFirstRing, kineticLayer);
		
		// 6 hexes in ring 1
		numHexes = numHexes + 6;
		
		drawRing2(initialHexId + numHexes, radiusToFirstRing, kineticLayer);
		
		// 12 hexes in ring 2
		numHexes = numHexes + 12;
		
		drawOcean(initialHexId + numHexes, radiusToFirstRing, kineticLayer);
	  
		/*
		//IDEA! Should develop board as a collection of hex-center points, and unique list of vertices, when building the vertices (6 around each center point), can have a unique list of vertices...only add to the unique list if not there, if vertex "collides" with existing vertex (could use a box region for collision detection) then don't add new vertex, but rather add the hex-center point as an adjacency, and add the "previous" vertex as adjacency as well (even after collision, keep sweeping around all 6 vertices of the center-point...to make sure everything gets updated if necessary). In this way, a unique list of vertices will be build along with information regarding adjacent hexes and vertices.

		//note: when "sweeping" around a center point, any newly created vertices should have "null/empty" adjacent vertices and hexes...that way, the //edges of the board will already be initialized by the time the board is built (collisions will be how the "empty/null" adjacencies become occupied).

		//Then, roads can be build to adjacent vertices and settlements can occupy a vertex with knowledge of which 2 or 3 hexes it is adjacent to (for resource type and number
		*/

		//hexboard
		
		for (var i = 0; i < app.vertices.length; i++)
		{
			app.kineticLayer.add(app.vertices[i]);
			app.kineticLayer.add(app.verticesText[i]);
		}
		
		for (var r = 0; r < app.roads.length; r++)
		{
			app.kineticLayer.add(app.roads[r]);
		}
		
		for (var c = 0; c < app.roadCenterPoints.length; c++)
		{
			app.kineticLayer.add(app.roadCenterPoints[c]);
		}
		
		app.Stage.add(kineticLayer);
		kineticLayer.draw();

		// Print out hex-types adjacent to each intersection (in a natural/logical order)
		app.printManMappedLogicalOrderIntersectToHexTypes();
	};
	
	var drawRing0 = function(initialHexId, kineticLayer) {
	
		var radiusToRing = 0;
		var ringIndex = 0;
		var numHexesInRing = 1;
		
		buildBoardHex(initialHexId, radiusToRing, ringIndex, numHexesInRing, kineticLayer);

	};
	
	var drawRing1 = function(hexIdStart, radiusToFirstRing, kineticLayer) {
	
		var radiusToRing = radiusToFirstRing;
		
		var numHexesInRing = 6;
		
		var i;
		
		for(i=0; i < numHexesInRing; i++)
		{
			var hexId = i + hexIdStart;
			
			buildBoardHex(hexId, radiusToRing, i, numHexesInRing, kineticLayer);
		}
	};
	
	var drawRing2 = function(hexIdStart, radiusToFirstRing, kineticLayer) {
	
		var i;
		
		var numHexesInRing = 12;
		
		for(i=0; i < numHexesInRing; i++)
		{
			if (i % 2 == 1){
				radiusToSecondRing = 3 * app.GameBoardHexRadius;
			}
			else
			{
				radiusToSecondRing = 2 * radiusToFirstRing;	
			}
			
			var radiusToRing = radiusToSecondRing;
			var hexId = i + hexIdStart;
			
			buildBoardHex(hexId, radiusToRing, i, numHexesInRing, kineticLayer);
		}
	};
	
	var buildBoardHex = function(hexId, radiusToRing, ringIndex, numHexesInRing, kineticLayer) {

		var arcEndXYPair = app.Utility.GetXYatArcEnd(app.GameBoardCenterX, app.GameBoardCenterY, radiusToRing, -1*ringIndex*2*Math.PI/numHexesInRing);

		var arcEndX = arcEndXYPair[0];
		var arcEndY = arcEndXYPair[1];

		console.log("Ring1 Start (x,y): " + app.GameBoardCenterX + "," + app.GameBoardCenterY);
		console.log("Ring1 hex " + ringIndex + " end (x,y): " + arcEndX + "," + arcEndY);

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
		
		var intersectBuilder = new app.IntersectionBuilder.IntersectionBuilder();

		intersectBuilder.RadialSweep(arcEndX, arcEndY, app.GameBoardHexRadius, hexId);
	};
	
	var drawOcean = function(hexIdStart, radiusToFirstRing, kineticLayer) {
		
		var radiusToThirdRing;
		var k;
		var angle;
		var primaryAngle = -1*2*Math.PI/6;
		var ringNumber = 3;
		var m;

		var angleList = [ringNumber];
		var radiiList = [ringNumber];

		// Draw outside "ocean" border ring
		var x;
		for(x=0; x<1; x++)
		{
			var ringN;

			for(ringN =0; ringN<ringNumber; ringN++)
			{
				var aLeg = (ringNumber-0.5*ringN)*radiusToFirstRing;
				var bLeg = (0+1.5*ringN)*app.GameBoardHexRadius;

				angleList[ringN] = -1*Math.atan(bLeg/aLeg);
				radiiList[ringN] =  Math.sqrt(Math.pow(aLeg, 2) + Math.pow(bLeg,2));
			}

			var primaryPosition;
		  
			for(k=0; k <=(ringNumber*6)-1; k++)
			{
				primaryPosition = Math.floor(k/ringNumber)*primaryAngle;

				for(m=0; m<ringNumber; m++)
				{
					if( k % ringNumber == m)
					{
						var aLeg = (ringNumber-0.5*m)*radiusToFirstRing;
						var bLeg = (0+1.5*m)*app.GameBoardHexRadius;
						
						//radiusToThirdRing = Math.sqrt(Math.pow(aLeg, 2) + Math.pow(bLeg,2));
						radiusToThirdRing = radiiList[m];
						//angle = -1*Math.atan(bLeg/aLeg) + primaryPosition;
						angle = angleList[m] + primaryPosition;
					}

					ring1EndX = app.Utility.GetXYatArcEnd(app.GameBoardCenterX, app.GameBoardCenterY, radiusToThirdRing, angle)[0];
					ring1EndY = app.Utility.GetXYatArcEnd(app.GameBoardCenterX, app.GameBoardCenterY, radiusToThirdRing, angle)[1];

					var hexGuid = k + hexIdStart;

					var hexPiece = app.nextHexPiece();

					app.ring[hexGuid] = new Kinetic.RegularPolygon({
					x: ring1EndX,
					y: ring1EndY,
					sides: 6,
					radius: app.GameBoardHexRadius,
					fill: 'cyan',
					stroke: 'black',
					strokeWidth: 1,
					id: hexGuid
					});
					
					kineticLayer.add(app.ring[hexGuid]);
				}
			}
				  
			ringNumber++;
		}

	};
	
	return { init: init };
	
}());