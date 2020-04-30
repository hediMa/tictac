var mongoose = require('mongoose');

// useNewUrlParser ;)
var options = {
    connectTimeoutMS: 5000,
    useNewUrlParser: true,
    useUnifiedTopology: true
   };
  
  // --------------------- BDD -----------------------------------------------------
  mongoose.connect('mongodb+srv://adminWA:azerqsdf@cluster0-p80ml.mongodb.net/ticketac?retryWrites=true&w=majority',
     options,
     function(err) {
      if (err) {
        console.log(`error, failed to connect to the database because --> ${err}`);
      } else {
        console.info('---------Connexion DB OK----------');
      }
     }
  );