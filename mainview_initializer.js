var ViewInitializer = (function() {
	
	var distance = function(fromX, fromY, toX, toY) {
		
		var aSqr = Math.pow(fromX - toX, 2);
		var bSqr = Math.pow(fromY - toY, 2);
	
		var c = Math.sqrt(aSqr + bSqr);
	
		return c;
	};
	
	var createIntersection = function(id, x, y) {
		
		app.hexIntersectList.create({'id':id,'x':x,'y':y});
	};
			
	var checkForCollision = function (x,y){
		
		for (var i = 0; i < app.vertices.length; i++)
		{
			var intersectionPosition = app.vertices[i].getPosition();
			
			if (distance(intersectionPosition.x, intersectionPosition.y, x, y) < 2)
			{
				console.log("Collision detected!");
				return i;
			}
		}
	
		return -1;
	};
	
	var placeRoadMarker = function(x2, x1, y2, y1, intersectId1, intersectId2) {

		var xLeg = (x2 - x1);
		var yLeg = (y2 - y1);
		
		// The road center point is half way between the 2 vertices
		var verticesMidpointX = x2 - xLeg/2;
		var verticesMidpointY = y2 - yLeg/2;
	
		var oppositeSideLen = y2-y1;
		var adjacentSideLen = x2-x1;
		
		// in radians
		var theta = Math.atan(oppositeSideLen/adjacentSideLen);
		
		// Restore "quadrant" (...because arctan loses signs)
		if (oppositeSideLen < 0 && adjacentSideLen < 0)
		{
			theta += Math.PI;
		}
		else if (adjacentSideLen < 0)
		{
			theta += Math.PI;
		}
		
		var inDegrees = theta/(Math.PI/180);
		
		// Translate the road so that the center point matches the center point between the 2 intersections.
		// First, find the ratio of half the road length compared to the distance between
		// the 2 intersections (vertices). Then use that ratio to calculate the corresponding x and y values
		// (i.e. scaling down the legs that form a right triangle between the vertices)
		
		var roadLength = 20;
		var halfLength = roadLength/2;
		
		var vertexDistance = Math.sqrt(Math.pow(xLeg, 2) + Math.pow(yLeg, 2));
		
		var ratio = halfLength/vertexDistance;
		
		var roadCenterXAdjust = ratio * xLeg;
		var roadCenterYAdjust = ratio * yLeg;
		
		// roadXCenter after offset translation to put center of road on vertex midpoint
		var roadXCenter = verticesMidpointX - roadCenterXAdjust;
		var roadYCenter = verticesMidpointY - roadCenterYAdjust;
		
		var roadCenterId = app.nextRoadCenterId();
		
		app.roadCenterPoints[roadCenterId] = new Kinetic.Circle({
			x: verticesMidpointX,
			y: verticesMidpointY,
			radius: 10,
			fill: 'white',
			stroke: 'black',
			strokeWidth: 1,
			intersectionIds: [intersectId1, intersectId2],
			id: roadCenterId,
			angle: theta,
			roadX: roadXCenter,
			roadY: roadYCenter
		});
		
		app.roadCenterPoints[roadCenterId].hide();
		
		app.bindRoadCenterClick(roadCenterId);
	};
	
	updateIntersection = function(idOfCurrentHex, vertexX, vertexY, collisionIndex, lastIntersectionInSweep) {

		var currentHexType = app.ring[idOfCurrentHex];
		
		if (app.intersectToHexesAdjacency[collisionIndex].indexOf(idOfCurrentHex) === -1)
		{
			app.intersectToHexesAdjacency[collisionIndex].push(idOfCurrentHex);
		}
		
		if (lastIntersectionInSweep !== undefined)
		{
			if (app.intersectToIntersectAdjacency[collisionIndex].indexOf(lastIntersectionInSweep) === -1)
			{
				app.intersectToIntersectAdjacency[collisionIndex].push(lastIntersectionInSweep);
			}
			
			// Create a new road marker at the midway point between the current intersection (collisionIndex)
			// and the last intersection in the sweep, only if the 2 points are not the same point.
			if (lastIntersectionInSweep !== collisionIndex && !isCenterPointDrawn(collisionIndex, lastIntersectionInSweep))
			{
				var lastVertexX = app.vertices[lastIntersectionInSweep].attrs.x;
				
				var lastVertexY = app.vertices[lastIntersectionInSweep].attrs.y;
				
				placeRoadMarker(vertexX, lastVertexX, vertexY, lastVertexY, collisionIndex, lastIntersectionInSweep);
			}
		}
	};
	
	var isCenterPointDrawn = function(intersect1, intersect2) {
		
		for (var i = 0; i < app.roadCenterPoints.length; i++)
		{
			var intersectIdsArray = app.roadCenterPoints[i].attrs.intersectionIds;
			
			// If both intersection Ids are found in the center point, then we know
			// the center point has already been drawn
			if (intersectIdsArray.indexOf(intersect1) !== -1 &&
					intersectIdsArray.indexOf(intersect2) !== -1)
			{
				return true;
			}
		}
		
		return false;
	};
	
	var buildBoardIntersection = function(idOfCurrentHex, vertexX, vertexY, lastIntersectionInSweep) {
		
		// TODO: refactor global call
		var intersectionId = app.nextIntersectionId();
		
		app.vertices[intersectionId] = new Kinetic.Circle({
			x: vertexX,
			y: vertexY,
			radius: 10,
			fill: 'magenta',
			stroke: 'black',
			strokeWidth: 1,
			id: intersectionId
		});
		
		app.vertices[intersectionId].hide();
		
		app.verticesText[intersectionId] = new Kinetic.Text({
			x: vertexX + 10,
			y: vertexY,
			text: intersectionId,
			fontSize: 15,
			fontFamily: 'Calibri',
			fill: 'red'
		});
		
		app.verticesText[intersectionId].hide();
		
		createIntersection(intersectionId, vertexX, vertexY);
		
		var currentHexType = app.ring[idOfCurrentHex];
		
		app.intersectToHexesAdjacency[intersectionId] = [];
		
		if (app.intersectToHexesAdjacency[intersectionId].indexOf(idOfCurrentHex) === -1)
		{
			app.intersectToHexesAdjacency[intersectionId].push(idOfCurrentHex);
		}
		
		app.intersectToIntersectAdjacency[intersectionId] = [];
		
		// Add self to intersection-intersection adjacency table
		if (app.intersectToIntersectAdjacency[intersectionId].indexOf(intersectionId) === -1)
		{
			app.intersectToIntersectAdjacency[intersectionId].push(intersectionId);
		}
		
		// At the start of the sweep, there is no "previous" intersection in the sweep
		if (lastIntersectionInSweep !== undefined)
		{
			// Add previous to intersection-intersection adjacency table
			if (app.intersectToIntersectAdjacency[intersectionId].indexOf(lastIntersectionInSweep) === -1)
			{
				app.intersectToIntersectAdjacency[intersectionId].push(lastIntersectionInSweep);
			}
		}

		app.bindIntersectClick(intersectionId);
		
		return intersectionId;
	};

	var updateTheAdjacencies = function(idOfCurrentHex, vertexX, vertexY, lastIntersectionInSweep) {
		
		var collisionIndex = checkForCollision(vertexX,vertexY);

		// No collision
		if (collisionIndex === -1)
		{
			var newIntersectionId = buildBoardIntersection(idOfCurrentHex, vertexX, vertexY, lastIntersectionInSweep);
			
			lastIntersectionInSweep = newIntersectionId;
		}
		else
		{
			//this.handleSweepCollide(idOfCurrentHex, collisionIndex, lastIntersectionInSweep);
		
			// Don't create a new intersection
			// ...rather, update adjacent hexes list for existing intersection.
			updateIntersection(idOfCurrentHex, vertexX, vertexY, collisionIndex, lastIntersectionInSweep);
				
			lastIntersectionInSweep = collisionIndex;
		}
		
		return lastIntersectionInSweep;
	};
		
	var getXYatArcEnd = function(c1,c2,radius,angle) {
		
		return [c1+Math.cos(angle)*radius,c2+Math.sin(angle)*radius];
	};
	
	var radialSweep = function(centerX, centerY, hexRadius, idOfCurrentHex) {
		
		var vertexX;
		var vertexY;
		var i;
	
		var lastIntersectionInSweep;
		
		// Forward sweep
		for (i= 0; i < 7; i++)
		{
			vertexX = getXYatArcEnd(centerX, centerY, hexRadius, (-1*i*2*Math.PI/6) - (-1*2*Math.PI/12))[0];
			vertexY = getXYatArcEnd(centerX, centerY, hexRadius, (-1*i*2*Math.PI/6) - (-1*2*Math.PI/12))[1];
		
			lastIntersectionInSweep = updateTheAdjacencies(idOfCurrentHex, vertexX, vertexY, lastIntersectionInSweep);
		// Perhaps should delay adding until the end to show on top of everything else
		//app.kineticLayer.add(app.vertices[intersectionId]);
		}
		
		var vertexX;
		var vertexY;
		var i;
	
		var lastIntersectionInSweep;
		
		// Reverse sweep (makes sure to get all the vertices adjacencies on the boundaries of the game board)
		for (i= 6; i >= 0; i--)
		{
			vertexX = getXYatArcEnd(centerX, centerY, hexRadius, (-1*i*2*Math.PI/6) - (-1*2*Math.PI/12))[0];
			vertexY = getXYatArcEnd(centerX, centerY, hexRadius, (-1*i*2*Math.PI/6) - (-1*2*Math.PI/12))[1];
			
			lastIntersectionInSweep = updateTheAdjacencies(idOfCurrentHex, vertexX, vertexY, lastIntersectionInSweep);
		}
	};

	var init = function(kineticLayer, practiceHex) {

		//var myHex = new app.CatanHexView({model: new app.CatanHex()});
		//hexboard

		app.GameBoardHexRadius = 45;
		
		var radiusToFirstRing = app.GameBoardHexRadius*Math.sqrt(3);
		var radiusToSecondRing;
		
		app.GameBoardCenterX = 300;
		app.GameBoardCenterY = 250;
		
		//var ring1EndX = ring1StartX;
		//var ring1EndY = ring1StartY;
		
		var i;
		var initialHexId = 1;
		
		//var firstRing = new Array();
		
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
		
		//kineticLayer.add(myHex.model.hex);

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
	
		var arcEndX;
		var arcEndY;
		
		var hexX = app.GameBoardCenterX;
		var hexY = app.GameBoardCenterY;
		
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
	
		var arcEndX;
		var arcEndY;
		
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

		var arcEndX = getXYatArcEnd(app.GameBoardCenterX, app.GameBoardCenterY, radiusToRing, -1*ringIndex*2*Math.PI/numHexesInRing)[0];
		var arcEndY = getXYatArcEnd(app.GameBoardCenterX, app.GameBoardCenterY, radiusToRing, -1*ringIndex*2*Math.PI/numHexesInRing)[1];

		console.log("Ring1 Start (x,y): " + app.GameBoardCenterX + "," + app.GameBoardCenterY);
		console.log("Ring1 hex " + ringIndex + " end (x,y): " + arcEndX + "," + arcEndY);

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
		
		radialSweep(arcEndX, arcEndY, app.GameBoardHexRadius, hexId);
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

					ring1EndX = getXYatArcEnd(app.GameBoardCenterX, app.GameBoardCenterY, radiusToThirdRing, angle)[0];
					ring1EndY = getXYatArcEnd(app.GameBoardCenterX, app.GameBoardCenterY, radiusToThirdRing, angle)[1];

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