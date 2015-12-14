app.Player = Backbone.Model.extend({
	defaults: {
		name: '',
		point: 2,
		resources: {'brick':0, 'wheat':0, 'rock':0, 'wood':0, 'sheep':0}
	},
	addPoint: function(){
		var points = this.get('point');
		console.log(this.get('name') + ' has ' + points + ' points!');

		this.save({ 'point': ++points});
	},
	addResource: function(type){
		var resources = this.get('resources');
		
		resources[type]++;
		
		this.save(resources);
	}
});