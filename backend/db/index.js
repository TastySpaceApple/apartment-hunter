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
  date_scraped: Date,
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

let userChoiceScheme = new Schema({
  userId: Number,
  postId: String,
  removed: Boolean,
  saved: Boolean
})

userChoiceScheme.virtual('post', {
 ref: 'Apartment',
 localField: 'postId',
 foreignField: 'postId',
 justOne: true
})

userChoiceScheme.set('toObject', { virtuals: true });
userChoiceScheme.set('toJSON', { virtuals: true });

let Apartment = mongoose.model('Apartment', apartmentSchema)
let UserChoice = mongoose.model('UserChoice', userChoiceScheme)


module.exports = {
  getNextApartment: async function(userId){
    let ids = await this.getAllSeenApartmentsIds(userId);
    return Apartment.findOne(
      {
        postId: {$nin: ids},
        price: {$ne : null},
        pictures: {$ne : []}
      });
  },
  getAllSeenApartmentsIds: function(userId){
    return UserChoice.find({userId}).distinct('postId')
  },
  getSavedApartments: function(userId){
    return UserChoice.find({saved: true}).populate('post')
  },
  saveUserChoice: function(userId, postId, choice){
    return UserChoice.findOneAndUpdate({userId, postId},
      {$set:
        {
          removed: choice === 'removed',
          saved: choice === 'saved'
        }
      }, {upsert: true, setDefaultsOnInsert: true, new:true}
    );
  },
  getAllApartments: function(){
    return Apartment.find({price: {$ne : null } });
  }
};
