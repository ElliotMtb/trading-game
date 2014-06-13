function makeSettlement(x,y,r,color,layer){
	
	var settlement = {};
	
	var frontRadius = r;
	var frontY = y;
	
	settlement.front = makeBlock(x,frontY,frontRadius,color);

	  var roofY = frontY - frontRadius/(Math.sqrt(2));
	  var roofRadius = frontRadius/(Math.sqrt(2));
	  
	  settlement.front.rotateDeg(45);
	  
	  settlement.roof = makeBlock(x,roofY,roofRadius,color);
	  
	  layer.add(settlement.roof);
	  layer.add(settlement.front);
}
function makeCity(x,y,r,color,kineticLayer){
	
	var city = {};
	
	// Center the city in the x direction
	var xOffset = x + r/Math.sqrt(2);
	
	city.center = makeBlock(xOffset,y,r,color);
	
	city.settlement = makeSettlement(xOffset,y-(.5*r),r,color,kineticLayer);

	var sideRadius = r;
	var sideY = y;
	var sideX = xOffset - 2*(r/Math.sqrt(2));
	
	city.side = makeBlock(sideX,sideY,sideRadius,color);
	  
	city.center.rotateDeg(45);
	city.side.rotateDeg(45);
	
	kineticLayer.add(city.center);
	kineticLayer.add(city.side);
}

function makeBlock(x,y,r,color){

	var block = new Kinetic.RegularPolygon({
        x: x,
        y: y,
        sides: 4,
        radius: r,
        fill: color,
        //fillPatternImage: theCenter.image,
	    //fillPatternOffset: [-78, 70],
	    //hexType: theCenter.type,
        stroke: 'black',
        strokeWidth: 1,
        //id: centerGuid
      });
	  
	return block;
}