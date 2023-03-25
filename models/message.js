const mongoose = require('mongoose');
const {DateTime} = require('luxon');
const Schema = mongoose.Schema;

const MessageSchema = new Schema({
  username: String,
  text: String,
  date_added: Date
});

MessageSchema.virtual('date_added_formatted').get(function(){
  return DateTime.fromJSDate(this.date_added).toLocaleString(DateTime.DATE_MED)
})

module.exports = mongoose.model('Message', MessageSchema);