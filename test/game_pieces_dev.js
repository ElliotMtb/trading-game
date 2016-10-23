
$(document).ready(function(){
var app = {}; // create namespace for our app

app.colors = ['blue', 'orange', 'green', 'brown', 'yellow', 'red'];

	app.kineticLayer = new Kinetic.Layer();
	app.Stage = new Kinetic.Stage({
		container: 'gameBoardContainer',
		width: 900,
		height: 900
	});
	
	var i;
	
	
	for(i = 0; i < 100; i++)
	{
		var randomX = Math.floor((Math.random() * 500) + 1);
		var randomY = Math.floor((Math.random() * 500) + 1);
		
		var randomColor = Math.floor((Math.random() * 6));
		
		makeCity(randomX,randomY, 20, app.colors[randomColor], app.kineticLayer);
	}
	
	
	var triangle = new Kinetic.RegularPolygon({
        x: 350,
        y: 350,
        sides: 3,
        radius: 100,
        fill: 'cyan',
        //fillPatternImage: theCenter.image,
	    //fillPatternOffset: [-78, 70],
	    //hexType: theCenter.type,
        stroke: 'black',
        strokeWidth: 1,
        //id: centerGuid
      });
	  
	var triangle2 = new Kinetic.Line({
        points: [73, 160, 340, 23, 500, 109,73, 160],
        fill: '#00D2FF',
        stroke: 'black',
        strokeWidth: 5,
        closed: true
      });
	  
	var centerTriX = (73 + 340 + 500)/3;
	var centerTriY = (160 + 23 + 109)/3;
	
	var circle = new Kinetic.Circle({
		x: centerTriX,
		y: centerTriY,
		radius: 3,
		fill: 'black',
        stroke: 'black',
        strokeWidth: 1
	});

	
	var newSettlement = makeSettlement(500,200,20,'red',app.kineticLayer);

	var newCity = makeCity(500,250,20,'blue',app.kineticLayer);

	app.kineticLayer.add(triangle);
	app.kineticLayer.add(triangle2);
	app.kineticLayer.add(circle);
	
	app.Stage.add(app.kineticLayer);
	app.kineticLayer.draw();
});