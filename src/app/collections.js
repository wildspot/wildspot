Animals = [
    "Ree",
    "Hert",
    "Wild zwijn"
];

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
    },
    "animal": {
        type: Number
    },
    "user": {
        type: String
    }
}));