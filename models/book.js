var mongoose = require('mongoose');

var { Schema } = mongoose;

var BookSchema = new Schema({
  title: {type: String, required: true},
  author: {type: Schema.Types.ObjectId, ref: 'Author', required: true},
  summary: {type: String, required: true},
  isbn: {type: String, required: true},
  genre: [{type: Schema.Types.ObjectId, ref: 'Genre'}]
});

// Virtual for the book's URL
BookSchema
  .virtual('url')
  .get(function() {
    return '/catalog/book/' + this.id;
  });

module.exports = mongoose.model('Book', BookSchema);