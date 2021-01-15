const mongoose = require("mongoose");

const publisherSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  country: {
    type: Number,
    required: true
  },
  established: {
    type: Date,
    required: false
  },
  location: {
    address: String,
    coordinates: [Number]
  }
});

const reviewSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  rating: {
    type: Number,
    min: 0,
    max: 5,
    required: true
  },
  review: {
    type: String,
    required: true
  },
  createdOn: {
    type: Date,
    "default": Date.Now
  }
});

const gameSchema = mongoose.Schema({
  name: String,
  price: Number,
  designers: [String],
  players: {
    type: Number,
    min: 1,
    max: 10
  },
  rate: {
    type: Number,
    min: 1,
    max: 5,
    "default": 1
  },
  publisher: publisherSchema,
  reviews: [reviewSchema]
})

mongoose.model("Game", gameSchema, "games");