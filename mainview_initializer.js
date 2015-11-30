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
			radius: 5,
			fill: 'white',
			stroke: 'black',
			strokeWidth: 1,
			intersectionIds: [intersectId1, intersectId2],
			id: roadCenterId,
			angle: theta,
			roadX: roadXCenter,
			roadY: roadYCenter
		});
		
		//var road = makeRoad(roadXCenter, roadYCenter, roadLength, "blue", theta);
		
		//app.roads.push(road);
		
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
	
	var addNewIntersection = function(idOfCurrentHex, vertexX, vertexY, lastIntersectionInSweep) {
		
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
		
		app.verticesText[intersectionId] = new Kinetic.Text({
		x: vertexX + 10,
		y: vertexY,
		text: intersectionId,
		fontSize: 15,
		fontFamily: 'Calibri',
		fill: 'red'
		});
		
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
			var newIntersectionId = addNewIntersection(idOfCurrentHex, vertexX, vertexY, lastIntersectionInSweep);
			
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

		var hexRadius = 45;
		var radiusToFirstRing = hexRadius*Math.sqrt(3);
		var radiusToSecondRing;
		
		var ring1StartX = 300; //+ radiusToFirstRing;
		var ring1StartY = 250;
		
		var ring1EndX = ring1StartX;
		var ring1EndY = ring1StartY;
		
		var i;
		var hexId = 1;
		
		//var firstRing = new Array();
		
		var theCenter = app.nextHexPiece();
		//var centerGuid = app.newGuid();
		var centerGuid = 1;

		app.ring[centerGuid] = new Kinetic.RegularPolygon({
			x: ring1StartX,
			y: ring1StartY,
			sides: 6,
			radius: hexRadius,
			//fill: theCenter.color,
			fillPatternImage: theCenter.image,
			fillPatternOffset: [-78, 70],
			hexType: theCenter.type,
			stroke: 'black',
			strokeWidth: 1,
			id: centerGuid
		});

		var centerText = new Kinetic.Text({
			x: ring1StartX - 7,
			y: ring1StartY - 15,
			text: 1,
			fontSize: 30,
			fontFamily: 'Calibri',
			fill: 'red'
		});
	 
		radialSweep(ring1StartX, ring1StartY, hexRadius, centerGuid);
		
		kineticLayer.add(app.ring[centerGuid]);

		kineticLayer.add(centerText);

		app.ring[centerGuid].on('click', function(e){

			app.SelectHex(this.getAttr('id'));
		});

		for(i=0; i < 6; i++)
		{
			ring1EndX = getXYatArcEnd(ring1StartX, ring1StartY, radiusToFirstRing, -1*i*2*Math.PI/6)[0];
			ring1EndY = getXYatArcEnd(ring1StartX, ring1StartY, radiusToFirstRing, -1*i*2*Math.PI/6)[1];

			console.log("Ring1 Start (x,y): " + ring1StartX + "," + ring1StartY);
			console.log("Ring1 hex " + i + " end (x,y): " + ring1EndX + "," + ring1EndY);

			//var hexGuid = app.newGuid();
			var hexGuid = i + 2;

			var hexPiece = app.nextHexPiece();

			app.ring[hexGuid] = new Kinetic.RegularPolygon({
				x: ring1EndX,
				y: ring1EndY,
				sides: 6,
				radius: hexRadius,
				//fill: hexPiece.color,
				fillPatternImage: hexPiece.image,
				fillPatternOffset: [-78, 70],
				hexType: hexPiece.type,
				stroke: 'black',
				strokeWidth: 1,
				id : hexGuid
			});

			var ring1Text = new Kinetic.Text({
				x: ring1EndX - 7,
				y: ring1EndY - 15,
				text: i + 2,
				fontSize: 30,
				fontFamily: 'Calibri',
				fill: 'red'
			});

			kineticLayer.add(app.ring[hexGuid]);
		
			radialSweep(ring1EndX, ring1EndY, hexRadius, hexGuid);

			kineticLayer.add(ring1Text);

			app.ring[hexGuid].on('click', function(e){

				app.SelectHex(this.getAttr('id'));
			});
		}

		var j;
		
		for(j=0; j < 12; j++)
		{
			if (j % 2 == 1){
				radiusToSecondRing = 3 * hexRadius;
			}
			else
			{
				radiusToSecondRing = 2 * radiusToFirstRing;	
			}
			
			ring1EndX = getXYatArcEnd(ring1StartX, ring1StartY, radiusToSecondRing, -1*j*2*Math.PI/12)[0];
			ring1EndY = getXYatArcEnd(ring1StartX, ring1StartY, radiusToSecondRing, -1*j*2*Math.PI/12)[1];

			console.log("Ring1 Start (x,y): " + ring1StartX + "," + ring1StartY);
			console.log("Ring1 hex " + j + " end (x,y): " + ring1EndX + "," + ring1EndY);

			//var hexGuid = app.newGuid();
			var hexGuid = j + 8;

			var hexPiece = app.nextHexPiece();

			app.ring[hexGuid] = new Kinetic.RegularPolygon({
				x: ring1EndX,
				y: ring1EndY,
				sides: 6,
				radius: hexRadius,
				//fill: hexPiece.color,
				fillPatternImage: hexPiece.image,
				fillPatternOffset: [-78, 70],
				hexType: hexPiece.type,
				stroke: 'black',
				strokeWidth: 1,
				id: hexGuid
			});

			var ring2Text = new Kinetic.Text({
				x: ring1EndX - 7,
				y: ring1EndY - 15,
				text: j + 8,
				fontSize: 30,
				fontFamily: 'Calibri',
				fill: 'red'
			});

			kineticLayer.add(app.ring[hexGuid]);
			
			radialSweep(ring1EndX, ring1EndY, hexRadius, hexGuid);

			kineticLayer.add(ring2Text);

			app.ring[hexGuid].on('click', function(e){

				app.SelectHex(this.getAttr('id'));
			});	
		}

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
				var bLeg = (0+1.5*ringN)*hexRadius;

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
						var bLeg = (0+1.5*m)*hexRadius;
						
						//radiusToThirdRing = Math.sqrt(Math.pow(aLeg, 2) + Math.pow(bLeg,2));
						radiusToThirdRing = radiiList[m];
						//angle = -1*Math.atan(bLeg/aLeg) + primaryPosition;
						angle = angleList[m] + primaryPosition;
					}

					ring1EndX = getXYatArcEnd(ring1StartX, ring1StartY, radiusToThirdRing, angle)[0];
					ring1EndY = getXYatArcEnd(ring1StartX, ring1StartY, radiusToThirdRing, angle)[1];

					var hexGuid = k + 20;

					var hexPiece = app.nextHexPiece();

					app.ring[hexGuid] = new Kinetic.RegularPolygon({
					x: ring1EndX,
					y: ring1EndY,
					sides: 6,
					radius: hexRadius,
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

		for(var x = 1; x <= app.IntersectionMap.length; x++)
		{
			console.log("Intersection " + x + ":");

			for(var index = 0; index < app.IntersectionMap[x-1].length; index++)
			{
				//alert(app.ring[index].getAttr('id'));
				var ringIndex = app.IntersectionMap[x-1][index];
				//alert(app.ring[ringIndex].getAttr('id'));

				console.log("\t" + app.ring[ringIndex].getAttr('hexType'));
			}
		}
	};
	
	return { init: init };
	
}());