var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var journeyModel = require('../models/journey')
var usersModel = require("../models/users")

var city = ["Paris","Marseille","Nantes","Lyon","Rennes","Melun","Bordeaux","Lille"]
var date = ["2018-11-20","2018-11-21","2018-11-22","2018-11-23","2018-11-24"]


router.get('/', function(req, res, next) {
  var title = "Log-in"
  res.render('login', {title});
});
//-----------------------




router.post('/sign-up', async function(req, res, next) {
  var users = await usersModel.findOne(
    { email: req.body.emailFromFront }
  )

 if(users == null){
  var newUser = new usersModel ({
    name: req.body.nameFromFront,
    firstName: req.body.firstNameFromFront,
    email: req.body.emailFromFront,
    password: req.body.passwordFromFront,
  })

  var user = await newUser.save();
  res.redirect('/mainpage');
 } else {
  res.redirect('/');
 }
});
//-----------------------






router.post('/sign-in', async function(req, res, next) {
  var users = await usersModel.findOne(
    {
      email : req.body.emailFromFront,
      password: req.body.passwordFromFront
    }
  )
  if(users){
    res.render('mainpage')
  } else {
    res.redirect('/')
  }
});
//-----------------------








router.post('/trajet', async function(req, res, next) {
  var trajet = await journeyModel.find(
    {
      departure : req.body.departureFromFront,
      arrival: req.body.arrivalFromFront,
      date: new Date(req.body.departureDateFromFront)
    }
  )

  console.log("------req.body-------", req.body)
  console.log("-------trajet------", trajet)



  if(trajet.length == 0){
    res.render('oops')
  } else {
    res.render('trajetDispo')
  }
});
//-----------------------





/* GET Main page. */
router.get('/main', function(req, res, next) {
  res.render('mainpage');
});

/* GET Error page. */
router.get('/error', function(req, res, next) {
  res.render('error');
});




router.get('/save', async function(req, res, next) {
// Remplissage de la base de donnée, une fois suffit
  // How many journeys we want
  var count = 300

  // Save  ---------------------------------------------------
    for(var i = 0; i< count; i++){

    departureCity = city[Math.floor(Math.random() * Math.floor(city.length))]
    arrivalCity = city[Math.floor(Math.random() * Math.floor(city.length))]

    if(departureCity != arrivalCity){

      var newUser = new journeyModel ({
        departure: departureCity , 
        arrival: arrivalCity, 
        date: date[Math.floor(Math.random() * Math.floor(date.length))],
        departureTime: Math.floor(Math.random() * Math.floor(23)) + ":00",
        price: Math.floor(Math.random() * Math.floor(125)) + 25,
      });
       
       await newUser.save();

    }

  }
  res.render('index', { title: 'Express' });
});
//------------------------






router.get('/result',  function(req, res, next) {
// Cette route est juste une verification du Save.
// Vous pouvez choisir de la garder ou la supprimer.

  // Permet de savoir combien de trajets il y a par ville en base
  for(i=0; i<city.length; i++){

  journeyModel.find( { departure: city[i] },  function (err, journey) {

          console.log(`Nombre de trajets au départ de ${journey[0].departure} : `, journey.length);
      }
    )

  }


  res.render('index', { title: 'Express' });
});

module.exports = router;
