var mongoose = require('mongoose');

var { Schema } = mongoose;

var GenreSchema = new Schema({
  name: {type: String, required: true, minlength: 3, maxlength: 100}
});

// Virtual for the genre URL
GenreSchema
  .virtual('url')
  .get(function() {
    return '/catalog/genre/' + this._id;
  });

module.exports = mongoose.model('Genre', GenreSchema);