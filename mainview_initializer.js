var ViewInitializer = (function() {

	var init = function(kineticLayer, practiceHex) {

		//hexboard

		app.GameBoardHexRadius = 45;
		
		var radiusToFirstRing = app.GameBoardHexRadius*Math.sqrt(3);
		
		app.GameBoardCenterX = 450;
		app.GameBoardCenterY = 350;
		
		var i;
		var initialHexId = 1;
		
		drawRing0(initialHexId, kineticLayer);
		
		// Center hex
		var numHexes = 1;

		// TODO: find a way to combine the following 2 calls to drawHexRings(..)
		// Note: It's mostly ready to go, just need to make make the call agnostic to what type of hexes are being drawn
		// i.e. the algorithm/method used to build/place the hexes should inherently be selected based on the next hex to
		// be placed. This could be accomplished if I make an "ocean" type hex and populate a queue with all the regular
		// hexes at the front of the queue, and put all the ocean hexes at the back of the queue
		drawHexRings(1, 2, placeNextHex, initialHexId + numHexes, radiusToFirstRing, kineticLayer);
		
		// 6 hexes in ring 1
		// 12 hexes in ring 2
		numHexes = numHexes + 6 + 12;
		
		drawHexRings(3, 1, placeOceanHex, initialHexId + numHexes, radiusToFirstRing, kineticLayer);
	  
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

		// Build next hex
		hexBuilder.BuildHex(hexId, arcEndX, arcEndY, radiusToRing, kineticLayer);

		// Connect new intersections
		var intersectBuilder = new app.IntersectionBuilder.IntersectionBuilder();

		// When placing regular (non-ocean) hexes, need to assemble intersection adjacency info
		intersectBuilder.RadialSweep(arcEndX, arcEndY, app.GameBoardHexRadius, hexId);
	}

	var placeOceanHex = function(hexId, radiusToRing, angle, kineticLayer) {

		ring1EndX = app.Utility.GetXYatArcEnd(app.GameBoardCenterX, app.GameBoardCenterY, radiusToRing, angle)[0];
		ring1EndY = app.Utility.GetXYatArcEnd(app.GameBoardCenterX, app.GameBoardCenterY, radiusToRing, angle)[1];

		app.ring[hexId] = new Kinetic.RegularPolygon({
			x: ring1EndX,
			y: ring1EndY,
			sides: 6,
			radius: app.GameBoardHexRadius,
			fill: 'cyan',
			stroke: 'black',
			strokeWidth: 1,
			id: hexId
		});
		
		kineticLayer.add(app.ring[hexId]);
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