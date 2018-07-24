const mongoose = require('mongoose');
const collectorSchema = require('../schema/collectorSchema');

module.exports = mongoose.model('collector', collectorSchema);