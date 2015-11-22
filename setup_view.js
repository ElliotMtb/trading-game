// renders the full list of todo items calling TodoView for each one.

// renders list of intersections
app.IntersectionView = Backbone.View.extend({
	tagName: 'li',
	template: _.template($('#intersect-template').html()),
	render: function(){
		this.$el.html(this.template(this.model.toJSON()));
		return this; // enable chained calls
	},
	initialize: function(){
		this.model.on('change', this.render, this);
	},
	events: {
		'click .highlight': 'highlight'
	},
	highlight: function(e){
	this.model.highlightOnBoard();
	this.model.alertAdjacencies();
	}
});

app.SetupView = Backbone.View.extend({
	el: '#settlersapp',
	hexVerticesRadialSweep: function(centerX, centerY, hexRadius, idOfCurrentHex){
	
		var vertexX;
		var vertexY;
		var i;
	
		var lastIntersectionInSweep;
		
		// Forward sweep
		for (i= 0; i < 7; i++)
		{
			vertexX = this.getXYatArcEnd(centerX, centerY, hexRadius, (-1*i*2*Math.PI/6) - (-1*2*Math.PI/12))[0];
			vertexY = this.getXYatArcEnd(centerX, centerY, hexRadius, (-1*i*2*Math.PI/6) - (-1*2*Math.PI/12))[1];
		
			lastIntersectionInSweep = this.updateAdjacencies(idOfCurrentHex, vertexX, vertexY, lastIntersectionInSweep);
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
			vertexX = this.getXYatArcEnd(centerX, centerY, hexRadius, (-1*i*2*Math.PI/6) - (-1*2*Math.PI/12))[0];
			vertexY = this.getXYatArcEnd(centerX, centerY, hexRadius, (-1*i*2*Math.PI/6) - (-1*2*Math.PI/12))[1];
			
			lastIntersectionInSweep = this.updateAdjacencies(idOfCurrentHex, vertexX, vertexY, lastIntersectionInSweep);
		}
	},
	updateAdjacencies: function(idOfCurrentHex, vertexX, vertexY, lastIntersectionInSweep) {
	
		var collisionIndex = this.checkForCollision(vertexX,vertexY);

		if (collisionIndex === -1)
		{
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
			
			this.createIntersection(intersectionId, vertexX, vertexY);
			
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
				var roadX = vertexX - (vertexX - app.vertices[lastIntersectionInSweep].attrs.x)/2;
				var roadY = vertexY - (vertexY - app.vertices[lastIntersectionInSweep].attrs.y)/2;
				app.roads.push(new Kinetic.Circle({
				x: roadX,
				y: roadY,
				radius: 5,
				fill: 'white',
				stroke: 'black',
				strokeWidth: 1
				}));

				// Add previous to intersection-intersection adjacency table
				if (app.intersectToIntersectAdjacency[intersectionId].indexOf(lastIntersectionInSweep) === -1)
				{
					app.intersectToIntersectAdjacency[intersectionId].push(lastIntersectionInSweep);
				}
			}
			
			lastIntersectionInSweep = intersectionId;

			app.bindIntersectClick(intersectionId);
		}
		else
		{
			//this.handleSweepCollide(idOfCurrentHex, collisionIndex, lastIntersectionInSweep);
		
			// Don't create a new intersection
			// ...rather, update adjacent hexes list for existing intersection.
			var currentHexType = app.ring[idOfCurrentHex];
			
			if (app.intersectToHexesAdjacency[collisionIndex].indexOf(idOfCurrentHex) === -1)
			{
				app.intersectToHexesAdjacency[collisionIndex].push(idOfCurrentHex);
			}
			
			if (lastIntersectionInSweep !== undefined)
			{
				var roadX = vertexX - (vertexX - app.vertices[lastIntersectionInSweep].attrs.x)/2;
				var roadY = vertexY - (vertexY - app.vertices[lastIntersectionInSweep].attrs.y)/2;
				
				app.roads.push(new Kinetic.Circle({
					x: roadX,
					y: roadY,
					radius: 5,
					fill: 'white',
					stroke: 'black',
					strokeWidth: 1
				}));
				
				if (app.intersectToIntersectAdjacency[collisionIndex].indexOf(lastIntersectionInSweep) === -1)
				{
					app.intersectToIntersectAdjacency[collisionIndex].push(lastIntersectionInSweep);
				}
			}
				
			lastIntersectionInSweep = collisionIndex;
		}
		
		return lastIntersectionInSweep;
	},
	checkForCollision: function (x,y){
	
		for (var i = 0; i < app.vertices.length; i++)
		{
			var intersectionPosition = app.vertices[i].getPosition();
			
			if (this.distance(intersectionPosition.x, intersectionPosition.y, x, y) < 2)
			{
				console.log("Collision detected!");
				return i;
			}
		}
	
		return -1;
	},
	handleSweepCollide: function (idOfCurrentHex, collisionIndex, lastIntersectionInSweep) {
		
	},
	distance: function(fromX, fromY, toX, toY) {
		var aSqr = Math.pow(fromX - toX, 2);
		var bSqr = Math.pow(fromY - toY, 2);
	
		var c = Math.sqrt(aSqr + bSqr);
	
		return c;
	},
	initialize: function (kineticLayer, practiceHex) {
  
		//window.localStorage.removeItem('hex-intersection');
		//window.localStorage.removeItem('settlers-of-catan');
		window.localStorage.clear();
		
		this.input = this.$('#new-player');
		app.playerList.on('add', this.addAll, this);
		app.playerList.on('reset', this.addAll, this);
		app.playerList.fetch(); // Loads list from local storage
		
		app.hexIntersectList.on('showIntersections', this.addAllIntersections, this);
		

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
	 
		this.hexVerticesRadialSweep(ring1StartX, ring1StartY, hexRadius, centerGuid);
		
		kineticLayer.add(app.ring[centerGuid]);

		kineticLayer.add(centerText);

		app.ring[centerGuid].on('click', function(e){

			app.SelectHex(this.getAttr('id'));
		});

		for(i=0; i < 6; i++)
		{
			ring1EndX =this.getXYatArcEnd(ring1StartX, ring1StartY, radiusToFirstRing, -1*i*2*Math.PI/6)[0];
			ring1EndY =this.getXYatArcEnd(ring1StartX, ring1StartY, radiusToFirstRing, -1*i*2*Math.PI/6)[1];

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
		
			this.hexVerticesRadialSweep(ring1EndX, ring1EndY, hexRadius, hexGuid);

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
			
			ring1EndX = this.getXYatArcEnd(ring1StartX, ring1StartY, radiusToSecondRing, -1*j*2*Math.PI/12)[0];
			ring1EndY = this.getXYatArcEnd(ring1StartX, ring1StartY, radiusToSecondRing, -1*j*2*Math.PI/12)[1];

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
			
			this.hexVerticesRadialSweep(ring1EndX, ring1EndY, hexRadius, hexGuid);

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

					ring1EndX = this.getXYatArcEnd(ring1StartX, ring1StartY, radiusToThirdRing, angle)[0];
					ring1EndY = this.getXYatArcEnd(ring1StartX, ring1StartY, radiusToThirdRing, angle)[1];

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
	},
	getXYatArcEnd: function(c1,c2,radius,angle){
		return [c1+Math.cos(angle)*radius,c2+Math.sin(angle)*radius];
	},
	events: {
		'keypress #new-player': 'createPlayer'
	},
	createIntersection: function(id, x, y){
		app.hexIntersectList.create({'id':id,'x':x,'y':y});
	},
	createPlayer: function(e){
		if ( e.which !== 13 || !this.input.val().trim() )
		{ // ENTER_KEY = 13
			return;
		}
		
		app.playerList.create(this.newAttributes());
		this.input.val(''); // clean input box
	},
	addOne: function(player){
		var view = new app.PlayerView({model: player});
		$('#players-list').append(view.render().el);
	},
	addAll: function(){
		var theList = this.$('#players-list');
		theList.html(''); // clean the todo list
		switch(window.filter){

			case 'playersWith2Points':
				_.each(app.playerList.playersWith2Points(), this.addOne);
				break;
			case 'begin':
				break;		
			default:
				app.playerList.each(this.addOne, this);
				break;
		}
	},
	addAllIntersections: function(){
		var theList = this.$('#intersections-list');
		theList.html('');
		app.hexIntersectList.each(this.addOneIntersection, this);
	},
	addOneIntersection: function(intersection){
		var view = new app.IntersectionView({model: intersection});
		$('#intersections-list').append(view.render().el);
	},
	newAttributes: function(){
		return {
			name: this.input.val().trim()
		}
	}
});
