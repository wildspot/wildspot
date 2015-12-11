if (Meteor.isClient) {
    Template.Spot.events({
        'click #add': function(){
            Spots.insert({time: new Date(), place: Geolocation.latLng()})
        }
    });
}