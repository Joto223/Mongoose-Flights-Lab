var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var destinationSchema = new Schema({
  airport: {
    type: String,
    enum: ['AUS', 'DAL', 'LAX', 'SEA']
  },
  arrival: {type: Date},
});

var flightSchema = new Schema({
  airline: {
    type: String,
    enum: ['American', 'Southwest', 'United']
  },
  flightNo: {
    type: Number,
    min: 10,
    max: 9999,
    required: true
  }, 
  departs: {
  type: Date,
  default:  function () {
    return new Date().getFullYear() + 1;
   }
  },
  airport: {
    type: String,
    enum: ['AUS', 'DAL', 'LAX', 'SEA']
  },
  destinations: [destinationSchema]
}) 
module.exports = mongoose.model('Flight', flightSchema);