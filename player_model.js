app.Player = Backbone.Model.extend({
	defaults: {
		name: '',
		point: 2
	},
	addPoint: function(){
		var points = this.get('point');
		console.log(this.get('name') + ' has ' + points + ' points!');

		this.save({ 'point': ++points});
	}
});