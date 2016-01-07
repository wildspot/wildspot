if (Meteor.isClient) {
    Meteor.startup(function() {
        GoogleMaps.load();
    });
}

if (Meteor.isServer) {

    Meteor.startup(function() {

        return Meteor.methods({

            removeAllPosts: function() {

                return Spots.remove({});

            }

        });

    });

}