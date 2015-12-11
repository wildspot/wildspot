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
        mapOptions: function() {
            // Make sure the maps API has loaded
            var location = Geolocation.latLng();
            if (GoogleMaps.loaded() && location) {
                // Map initialization options

                return {
                    center: new google.maps.LatLng(location.lat, location.lng),
                    zoom: 16
                };
            }
        }
    });

    Template.Kaart.onCreated(function() {
        // We can use the `ready` callback to interact with the map API once the map is ready.
        GoogleMaps.ready('SpotsMap', function(map) {
            Spots.find().forEach(function(spot){
                var marker = new google.maps.Marker({
                    position: new google.maps.LatLng(spot.place.lat, spot.place.lng),
                    map: map.instance
                });
            });
            // Add a marker to the map once it's ready
            var marker = new google.maps.Marker({
                position: new google.maps.LatLng(51.917319, 4.484818),
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