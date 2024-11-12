const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema({
    catId: String,
    energyLevel: [String],
    communication: [String],
    compatibility: [String],
    furnitureBehavior: [String]
});

module.exports = mongoose.model('Review', reviewSchema);
