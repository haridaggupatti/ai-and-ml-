const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const AccountGrowthSchema = new Schema({
  date: Date,
  value: Number
});

module.exports = mongoose.model('AccountGrowth', AccountGrowthSchema);
