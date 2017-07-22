var app = app || {};

app.PlayerList = Backbone.Collection.extend({
    model: app.Player,
    localStorage: new Store("settlers-of-catan"),
    playersWith2Points: function(){
        return this.filter(function(player) {

            var playerName = player.get('name');
        
            if (player.get('point') == 2)
            {
                console.log(playerName + ' has EXACTLY 2 points');
                return true;
            }

            console.log(playerName + ' has more than 2 points');

            return false;
        });
    }
});