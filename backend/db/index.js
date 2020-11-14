const mongoose = require('mongoose');

const connection_string = process.env.DATABASE_CONNECTION_STRING || require('./config.js').DATABASE_CONNECTION_STRING;

mongoose.connect(connection_string,
  err => {
    if (err) throw err;
    console.log("connected")
  }
);
var Schema = mongoose.Schema;

let apartmentSchema = new Schema({
    date: Date,
	date_added: Date,
    price: Number,
    square_meters: Number,
	floor: Number,
	rooms: Number,
    coordinates: {},
    postId: String,
    pictures: [String],
    text:String,
    posterName: String,
    posterId:String,
    link: String
})

let Apartment = mongoose.model('Apartment', apartmentSchema)

module.exports = {
  getNextApartment: function(date){
    if(!date)
      return Apartment.findOne().sort({date:-1})
    else {

    }
  },
  getAllApartments: function(){
    return Apartment.find({});
  }
};
