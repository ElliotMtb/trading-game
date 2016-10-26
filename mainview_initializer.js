var ViewInitializer = (function() {

	var init = function(kineticLayer, practiceHex) {

		//hexboard

		app.GameBoardHexRadius = 45;
		
		var radiusToFirstRing = app.GameBoardHexRadius*Math.sqrt(3);
		
		app.GameBoardCenterX = 450;
		app.GameBoardCenterY = 350;
		
		var i;
		var initialHexId = 1;
		
		// Center hex
		drawRing0(initialHexId, kineticLayer);
		
		var numHexes = 1;

		// TODO: There has to be enough hexes defined (to draw from) in order to complete the number of rings specified.
		// ...do a check to make sure there are enough hexes defined (or perhaps automatically make more ocean hexes if there aren't enough)
		drawHexRings(1, 3, placeNextHex, initialHexId + numHexes, radiusToFirstRing, kineticLayer);
		
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
	
	var placeNextHex = function(hexId, radiusToRing, angle, kineticLayer) {

		var arcEndXYPair = app.Utility.GetXYatArcEnd(app.GameBoardCenterX, app.GameBoardCenterY, radiusToRing, angle);

		var arcEndX = arcEndXYPair[0];
		var arcEndY = arcEndXYPair[1];

		var hexBuilder = new app.HexBuilder.HexBuilder();

		// TODO: factor-out/paramaterize global call
		var hexInfo = app.nextHexPiece();
		
		if (hexInfo === null)
			throw "Ran out of hexes";

		if (hexInfo.type === "ocean")
		{
			// Build next hex
			hexBuilder.BuildOceanHex(hexId, hexInfo, arcEndX, arcEndY, kineticLayer);
		}
		else
		{
			// Build next hex
			hexBuilder.BuildHex(hexId, hexInfo, arcEndX, arcEndY, kineticLayer);
		
			// Connect new intersections
			var intersectBuilder = new app.IntersectionBuilder.IntersectionBuilder();

			// When placing regular (non-ocean) hexes, need to assemble intersection adjacency info
			intersectBuilder.RadialSweep(arcEndX, arcEndY, app.GameBoardHexRadius, hexId);
		}
	}

	var drawRing0 = function(initialHexId, kineticLayer) {
	
		var radiusToRing = 0;
		var i = 0;
		var numHexesInRing = 1;

		var hexAngle = -1*i*2*Math.PI/numHexesInRing;
		
		placeNextHex(initialHexId, radiusToRing, hexAngle, kineticLayer);
	};
	
	var drawHexRings = function(ringStart, numRingsToDraw, hexTypePlacer, hexIdStart, radiusToFirstRing, kineticLayer) {
		
		var radiusToNthRing;
		var ringHexOffset;
		var angle;

		// -60 degrees
		var primaryAngle = -1*2*Math.PI/6;
		
		var ringNumber = ringStart;//3;
		var m;

		var angleList = [];
		var radiiList = [];

		// Draw outside "ocean" border ring
		var x;

		for (x = 0; x < numRingsToDraw; x++)
		{
			var ringN;

			var primaryPosition;
			var numHexesInRing = ringNumber * 6;
			var numHexesToPlaceEvery60Deg = ringNumber;

			// There are n angles and n radii, where n is the ring number, because there are n hexes that will be places at
			// each major/primary vector off the center hex i.e. a primary hex is placed in line with each 60 deg vector off
			// the center hex, and then n-1 additional "filler" hexes.
			// (e.g. ring number 3 will have 1 primary hex places and 2 "filler hexes")
			for (ringN = 0; ringN < numHexesToPlaceEvery60Deg; ringN++)
			{
				var aLeg = (numHexesToPlaceEvery60Deg - 0.5 * ringN) * radiusToFirstRing;
				var bLeg = (0 + 1.5 * ringN) * app.GameBoardHexRadius;

				angleList[ringN] = -1 * Math.atan(bLeg / aLeg);
				radiiList[ringN] =  Math.sqrt(Math.pow(aLeg, 2) + Math.pow(bLeg, 2));
			}

			for (ringHexOffset = 0; ringHexOffset < numHexesInRing; ringHexOffset++)
			{
				primaryPosition = Math.floor(ringHexOffset / numHexesToPlaceEvery60Deg) * primaryAngle;

				// For each hex to place off of the primary 60 degree vector (there will be n to place),
				// lookup the precalculated radius and the appropriate angle offset.
				for (m = 0; m < numHexesToPlaceEvery60Deg; m++)
				{
					if (ringHexOffset % numHexesToPlaceEvery60Deg == m)
					{
						radiusToNthRing = radiiList[m];

						angle = angleList[m] + primaryPosition;

						var hexGuid = ringHexOffset + hexIdStart;

						hexTypePlacer(hexGuid, radiusToNthRing, angle, kineticLayer);
					}
				}
			}

			// Update the startId for the next ring
			hexIdStart = hexIdStart + ringHexOffset;
				  
			ringNumber++;
		}

	};

	return { init: init };
	
}());