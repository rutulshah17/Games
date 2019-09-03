// get mongoose

var mongoose = require ('mongoose');

var gameSchema = new mongoose.Schema ({

    title: {
      type: String,
      required: 'Game title is required'
    },
    developer: {
      type: String,
      required: 'Game publisher is required'
    },
    genre: {
      type: String
    },
    year: {
      type: Number,
      required: 'Game Published year is required',
      min: 1970
    }

});

//make the Schema public
module.exports = mongoose.model('Game', gameSchema);
