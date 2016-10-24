var app = app || {};

app.Utility = (function() {

	var Distance = function(fromX, fromY, toX, toY) {
		
		var aSqr = Math.pow(fromX - toX, 2);
		var bSqr = Math.pow(fromY - toY, 2);
	
		var c = Math.sqrt(aSqr + bSqr);
	
		return c;
	};
	
	var GetXYatArcEnd = function(c1,c2,radius,angle) {
		
		return [c1+Math.cos(angle)*radius,c2+Math.sin(angle)*radius];
	};

    return {
        Distance : Distance,
        GetXYatArcEnd : GetXYatArcEnd
    }
})();