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

    var markers;
    var spots;
    var initializing;
    var observation;

    function resetKaartTemplateVars(){
        markers = [];
        spots = Spots.find({time: {$gt: new Date(new Date() - (60*10*1000))}});
        initializing = true;
    }

    Template.Kaart.onCreated(function() {
        GoogleMaps.ready('SpotsMap', function(map) {

            console.log('[MAPS] Ready');

            resetKaartTemplateVars();

            function markerOptions(spot, animation){
                return {
                    position: new google.maps.LatLng(spot.place.lat, spot.place.lng),
                    animation: animation ? google.maps.Animation.DROP : null,
                    label: Animals[spot.animal],
                    title: Animals[spot.animal],
                    opacity: (0 - new Date() + spot.time.valueOf() + 600000) / 600000
                };
            }

            function infoWindowOptions(spot){
                return {
                    content: "<h1>"+Animals[spot.animal]+"</h1>" +
                    "<p>Gespot om "+spot.time.getHours()+":"+spot.time.getMinutes()+"</p>"
                }
            }

            function addMarker(spot){
                console.log('[MAPS] Spot added:',spot);
                var marker = {
                    spot: spot,
                    marker: new google.maps.Marker(markerOptions(spot, true)),
                    infowindow: new google.maps.InfoWindow(infoWindowOptions(spot))
                };
                marker.marker.setMap(map.instance);
                marker.marker.addListener('click', function(){
                    console.log("[MAP] Click detected on",marker);
                    marker.infowindow.open(map.instance, marker.marker);
                });
                return markers.push(marker);
            }

            spots.forEach(function(spot){
                addMarker(spot);
            });
            observation = spots.observe({
                added: function(spot){
                    if(initializing) return;
                    addMarker(spot);
                },
                changed: function(spot, oldspot){
                    console.log('[MAPS] Spot changed from', oldspot, 'to', spot);
                    for(var i = markers.length - 1; i >= 0; i--) {
                        if(markers[i].spot === oldspot) {
                            markers[i].spot = spot;
                            markers[i].marker.setOptions(markerOptions(spot));
                        }
                    }
                },
                removed: function(oldspot){
                    console.log('[MAPS] Spot removed:', oldspot);
                    for(var i = markers.length - 1; i >= 0; i--) {
                        if(markers[i].spot === oldspot) {
                            markers[i].marker.setMap(null);
                            markers.splice(i, 1);
                        }
                    }
                }
            });
            initializing = false;

            setInterval(function(){
                for(var i = markers.length - 1; i >= 0; i--) {
                    markers[i].marker.setOptions(markerOptions(markers[i].spot));
                }
            },10000);
        });
    });

    Template.Kaart.onDestroyed(function(){
        console.log("[MAPS] Destroyed");
        observation.stop();
    });
}