if(Meteor.isClient){
    Template.Kaart.helpers({
        mapOptions: function() {
            // Make sure the maps API has loaded
            var location = Geolocation.latLng();
            if (GoogleMaps.loaded() && location) {
                return {
                    center: new google.maps.LatLng(location.lat, location.lng),
                    zoom: 16,
                    streetViewControl: false
                };
            }
        }
    });

    Template.Kaart.onCreated(function() {
        GoogleMaps.ready('SpotsMap', function(map) {

            var markers = [];
            var spots = Spots.find();
            spots.forEach(function(spot){
                markers.push(new google.maps.Marker({
                    position: new google.maps.LatLng(spot.place.lat, spot.place.lng),
                    map: map.instance
                }));
            });
            Spots.find().observe(function(a,b,c){
                console.log(a,b,c);
            })
        });
    });
}