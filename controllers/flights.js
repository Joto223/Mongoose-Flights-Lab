var Flight = require('../models/flight');
var Ticket = require('../models/ticket');

module.exports = {
  index,
  show,
  new: newFlight,
  create,
  newTicket
}


function index(req, res) {
  Flight.find({}, function(err, flights) {
    if(err){
      console.log(err)
    } else {
      console.log('this is all the flights')
      res.render('flights/index', { title: 'All Flights', flights: flights });
    }
    
  });
}

function show(req, res) {
  console.log('show function');
  Flight.findById(req.params.id, function(err, flightFound) {
    Ticket.find({flight: flightFound._id}, function(err, ticketsFound) {
      res.render('flights/show', { title: 'Flight Detail', flight: flightFound, tickets: ticketsFound });
    })  
  });
}


function newFlight(req, res) {
  res.render('flights/new')
}

function newTicket(req, res) {
  // console.log(req.body, 'DON');
  req.body.flight = req.params.don;
  let ticket = new Ticket(req.body);
  ticket.save(function(err) {
    console.log(ticket, 'DON');
    res.redirect('/flights/' + req.params.don);
  })
}

function create(req, res) {
  var flight = new Flight(req.body);
  console.log(req.body);
  flight.save(function(err) {
    // one way to handle errors
    if (err) return res.render('flights/new');
    console.log(flight);
    // for now, redirect right back to new.ejs
    res.redirect('/flights');
  });
}
