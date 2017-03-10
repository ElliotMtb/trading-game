var app = app || {};

app.ControlPanelController = (function() {

    function Controller() {}

    function Controller_OnActivePlayerChange(player) {

        var playerLabel = $("<span>", {
            style: "color:blue;",
            html: "Active Player: " + player.data.name
        });

        var resourceLabel = $("<label>", {html: "Purchased Units: "});

        var propertiesDiv = $("#active-player-properties");

        propertiesDiv.empty();

        propertiesDiv.append(playerLabel);
        propertiesDiv.append("<br>");
        propertiesDiv.append(resourceLabel);
        propertiesDiv.append("<br>");

        var startingUnits = player.data.startingUnits;

        for (var r in startingUnits) {

            propertiesDiv.append("<span>" + startingUnits[r] + "</span><br>");
        }

    }

    Controller.prototype.OnActivePlayerChange = Controller_OnActivePlayerChange;
    
    return {
		Controller : Controller
	};

})();