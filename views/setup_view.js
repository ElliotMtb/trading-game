var SetupView = (function() {

	var initView = function() {
		
		// renders the full list of todo items calling TodoView for each one.
		
		var initializeTheView = function (kineticLayer, practiceHex) {
			
			//window.localStorage.removeItem('hex-intersection');
			//window.localStorage.removeItem('settlers-of-catan');
			window.localStorage.clear();
			
			this.input = $('#new-player');
			app.playerList.on('add', this.addAll, this);
			app.playerList.on('reset', this.addAll, this);
			app.playerList.fetch(); // Loads list from local storage
			
			app.hexIntersectList.on('showIntersections', this.addAllIntersections, this);

			ViewInitializer.init(kineticLayer, practiceHex);
		};
		
		// renders list of intersections
		app.SetupView = Backbone.View.extend({
			el: '#settlersapp',
			handleSweepCollide: function (idOfCurrentHex, collisionIndex, lastIntersectionInSweep) {
				
			},
			initialize: initializeTheView,
			events: {
				'keypress #new-player': 'createPlayer'
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
						$("#gameBoardContainer").hide();
						$("#player-container").show();
						break;
					case 'begin':
						$("#gameBoardContainer").show();
						$("#player-container").hide();
						break;
					default:
						$("#gameBoardContainer").hide();
						$("#player-container").show();
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

	};
	
	return  { initView: initView };

}());
