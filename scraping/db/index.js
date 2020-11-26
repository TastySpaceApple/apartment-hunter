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
  date_scraped: Date,
  price: Number,
  square_meters: Number,
  floor: String,
  rooms: Number,
  location: {
    type: {
      type: String,
      default: 'Point'
    },
    coordinates: {
      type: [Number],
      default: undefined
    }
  },
  postId: String,
  pictures: [String],
  text:String,
  posterName: String,
  posterId:String,
  link: String,
  neighborhood: String,
})

apartmentSchema.index( { "location" : "2dsphere" } )

let Apartment = mongoose.model('Apartment', apartmentSchema)

module.exports = {
  addOrUpdateApartment: function(apartment){
    apartment.date_scraped = new Date();
    return new Promise((resolve, reject) => {
      Apartment.findOneAndUpdate({postId: apartment.postId},
        {$set: apartment}, {upsert: true, setDefaultsOnInsert: true, new:true, useFindAndModify:false},
      (err, doc) => {
        if(err) reject(err);
        else resolve(doc)
      });
    });
  },
  clear: function(){
    return Apartment.remove({})
  }
};
