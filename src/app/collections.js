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