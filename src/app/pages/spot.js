if (Meteor.isClient) {
    Template.Spot.helpers({
        animals: function(){
            console.log(Animals);
            return Animals;
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
}