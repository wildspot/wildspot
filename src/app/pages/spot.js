if (Meteor.isClient) {
    Template.Spot.helpers({
        animals: function(){
            console.log(Animals);
            return Animals;
        }
    });

    Template.Spot.events({
        'click #add': function(){
            Spots.insert({time: new Date(), place: Geolocation.latLng()})
        }
    });
}