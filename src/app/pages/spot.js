if (Meteor.isClient) {
    Template.Spot.helpers({
        animals: function(){
            return Animals;
        }
    });

    Template.SpotHandmatig.helpers({
        animals: function(){
            return Animals;
        },
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

    Template.Spot.events({
        'submit #spot-automatisch': function(event){
            event.preventDefault();

            var location = Geolocation.currentLocation();
            var place = Geolocation.latLng();

            if(!location || !place){
                alert("Geen locatie bekend..");
            }
            else{
                Spots.insert({
                    time: new Date(),
                    place: place,
                    animal: event.target.animal.value,
                    user: (typeof Meteor.userId === "function") ? Meteor.userId() : "anonymous"
                });

                Router.go('/');
            }
        }
    });

    Template.SpotHandmatig.onCreated(function() {
        GoogleMaps.ready('SpotMap', function(map) {
            console.log(map);
        });
    });
}