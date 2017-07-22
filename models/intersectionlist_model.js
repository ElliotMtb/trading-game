var app = app || {};

app.HexIntersectionsList = Backbone.Collection.extend({
    model: app.IntersectionModel,
    localStorage: new Store("hex-intersection")
});