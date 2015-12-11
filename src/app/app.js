Router.route('/login', function () {
    this.render('Login');
    this.layout("");
});
Router.route('/', function () {
    this.render('Kaart');
});
Router.route('/spot', function () {
    this.render('Spot');
});
Router.route('/informatie', function () {
    this.render('Informatie');
});
Router.route('/kaart', function () {
    this.render('Kaart');
});
Router.route('/over', function () {
    this.render('Over');
});
Router.route('/uitloggen', function () {
    this.render('Uitloggen');
});

Router.configure({
    layoutTemplate: 'Layout'
});

if (Meteor.isClient) {
    Meteor.startup(function() {
        GoogleMaps.load();
    });

    Template.Kaart.helpers({
        exampleMapOptions: function() {
            // Make sure the maps API has loaded
            if (GoogleMaps.loaded()) {
                // Map initialization options
                return {
                    center: new google.maps.LatLng(51.917319, 4.484818),
                    zoom: 16
                };
            }
        }
    });

    Template.Kaart.onCreated(function() {
        // We can use the `ready` callback to interact with the map API once the map is ready.
        GoogleMaps.ready('SpotsMap', function(map) {
            // Add a marker to the map once it's ready
            var marker = new google.maps.Marker({
                position: map.options.center,
                map: map.instance
            });
        });
    });
}

Spots = new Mongo.Collection("spots");
Spots.attachSchema(new SimpleSchema({
    time: {
        type: Date
    },
    place: {
        type: Object
    },
    "place.lat": {
        type: Number,
        decimal: true
    },
    "place.lng": {
        type: Number,
        decimal: true
    }
}));