app.bindIntersectClick = function(intersectionId) {
	
	app.vertices[intersectionId].on('click', function(e){

		var intersectId = this.attrs.id;
		var intersectX = this.attrs.x;
		var intersectY = this.attrs.y;
		
		app.SelectIntersect(intersectId);
		
		var settlement = $("<button>", {
			"class": "settlement-btn",
			"text": "Settlement"
		});
		
		settlement.on("click", function() {
			makeSettlement(intersectX, intersectY, 10, 'red', app.kineticLayer);
			app.kineticLayer.draw();
		});
		
		var city = $("<button>", {
			"class": "city-btn",
			"text": "City"
		});
		
		city.on("click", function() {
			makeCity(intersectX, intersectY, 10, 'red', app.kineticLayer);
			app.kineticLayer.draw();
		});
		
		$("#selectedIntersect").html("Selected Intersection: <br> Id: " + intersectId + "<br>"
		+ "Adjacent Hexes: " + app.intersectToHexesAdjacency[intersectionId] + "<br>"
		+ "Adjacent Intersections: " + app.intersectToIntersectAdjacency[intersectionId] + "<br>");
		
		$("#selectedIntersect").append(settlement, city);
	
	});
};

app.SelectHex = function(id){

	if (app.SelectedHex == id)
	{
		app.toggleSelectedHex(id);

	}
	else
	{
		if (app.SelectedHex != "")
		{
			app.deselectHex(app.SelectedHex);
			app.toggleSelectedHex(id);
		}
		else
		{
			app.toggleSelectedHex(id);
		}
	}
};

app.SelectIntersect = function(id) {
	
	if (app.SelectedIntersection === id)
	{
		app.toggleSelectedIntersection(id);
	}
	else
	{
		if (app.SelectedIntersection !== "")
		{
			app.deselectIntersection(app.SelectedIntersection);
			app.toggleSelectedIntersection(id);
		}
		else
		{
			app.toggleSelectedIntersection(id);
		}
	}
};

app.toggleSelectedHex = function(id){

	if(app.ring[id].getAttr('selected'))
	{
		app.ring[id].setStroke("black");
		app.ring[id].setStrokeWidth("1");
		app.ring[id].setAttr('selected', false);
		app.SelectedHex = "";

	}
	else
	{
		app.ring[id].setStroke("blue");
		app.ring[id].setStrokeWidth("3");
		app.ring[id].setAttr('selected', true);

		app.SelectedHex = id;
	}

	app.kineticLayer.draw();
	app.ring[id].draw();

};

app.toggleSelectedIntersection = function(id) {

	if(app.vertices[id].getAttr('selected'))
	{
		app.vertices[id].setStroke("black");
		app.vertices[id].setStrokeWidth("1");
		app.vertices[id].setAttr('selected', false);
		app.SelectedIntersection = "";

	}
	else
	{
		app.vertices[id].setStroke("blue");
		app.vertices[id].setStrokeWidth("3");
		app.vertices[id].setAttr('selected', true);

		app.SelectedIntersection = id;
	}

	app.kineticLayer.draw();
	app.vertices[id].draw();
};

app.deselectHex = function(id){
	app.ring[id].setStroke("black");
	app.ring[id].setStrokeWidth("1");
	app.ring[id].setAttr('selected', false);
	app.SelectedHex = "";
};

app.deselectIntersection = function(id) {
	app.vertices[id].setStroke("black");
	app.vertices[id].setStrokeWidth("1");
	app.vertices[id].setAttr('selected', false);
	app.SelectedIntersection = "";
};

app.SelectedHex = "";
app.SelectedIntersection = "";