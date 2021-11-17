var mongoose = require('mongoose');
const { DateTime } = require('luxon');

var { Schema } = mongoose;

var AuthorSchema = new Schema({
  first_name: {type: String, required: true, maxlength: 100},
  family_name: {type: String, required: true, maxlength: 100},
  date_of_birth: {type: Date},
  date_of_death: {type: Date}
});

// Virtual for author's full name
AuthorSchema
  .virtual('name')
  .get(function() {
    return this.family_name + ', ' + this.first_name;
  });

  // Virtual for author's lifespan
AuthorSchema.virtual('lifespan').get(function() {
  var lifetime_string = '';
  if (this.date_of_birth) {
    lifetime_string = DateTime.fromJSDate(this.date_of_birth).toLocaleString(DateTime.DATE_MED);
  }
  lifetime_string += ' - ';
  if (this.date_of_death) {
    lifetime_string += DateTime.fromJSDate(this.date_of_death).toLocaleString(DateTime.DATE_MED);
  }
  return lifetime_string;
});

// Virtual for author's URL
AuthorSchema
  .virtual('url')
  .get(function() {
    return '/catalog/author/' + this._id;
  });

AuthorSchema
  .virtual('DOB_formatted')
  .get(function() {
    return this.date_of_birth ? DateTime.fromJSDate(this.date_of_birth).setLocale('en-US').toLocaleString(DateTime.DATE_MED) : "";
  });

AuthorSchema
  .virtual('DOD_formatted')
  .get(function() {
    return this.date_of_death ? DateTime.fromJSDate(this.date_of_death).setLocale('en-US').toLocaleString(DateTime.DATE_MED) : "";
  });

AuthorSchema
  .virtual('lifespan')
  .get(function() {
    const DOB = this.date_of_birth ? DateTime.fromJSDate(this.date_of_birth).setLocale('en-US').toLocaleString(DateTime.DATE_MED) : "";
    const DOD = this.date_of_death ? DateTime.fromJSDate(this.date_of_death).setLocale('en-US').toLocaleString(DateTime.DATE_MED) : "";
    return `${DOB} - ${DOD}`;
  })


  // Export model
  module.exports = mongoose.model('Author', AuthorSchema);

