var mongoose = require('mongoose');

mongoose.connect(process.env.DATABASE_URL, { 
  useNewUrlParser: true,
  useUnifiedTopology: true
 });

// database connection event
mongoose.connection.on('connected', function () {});

module.exports = mongoose;