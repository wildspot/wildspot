if(Meteor.isClient){
    Template.Layout.events({
        "click .navbar-collapse ul li a": function (event) {
            // Closes navbar on navbar-item click
            $('.navbar-toggle:visible').click();
        }
    });
}