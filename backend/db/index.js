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
  location: {
    type: {
      type: String,
      enum: ['Point']
    },
    coordinates: [Number]
  },
  postId: String,
  pictures: [String],
  text:String,
  posterName: String,
  posterId:String,
  link: String
})

apartmentSchema.index( { "location" : "2dsphere" } )

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

const badNeighborhoods = [
  'יד אליהו',
  'שפירא',
  'תל ברוך צפון',
  "תכנית ל', למד",
  "נווה גולן, יפו ג'",
  "צהלון, שיכוני חסכון",
  'צהלה',
  'כפיר, נווה כפיר',
  'התקוה, בית יעקב, נווה צה"ל',
  "יפו ד', גבעת התמרים",
  "נחלת יצחק",
  "יד אליהו",
  "מכללת תל אביב יפו, דקר",
  "קרית שלום",
  "נווה אליעזר, כפר שלם מזרח",
  "ניר אביב",
  "נווה חן",
  "נווה שרת",
  "רמת החייל",
  "רמת הטייסים",
  "גלילות",
  "נווה ברבור, כפר שלם מערב",
  "המשתלה",
  "תל חיים"
]

module.exports = {
  getNextApartment: async function(userId){
    let ids = await this.getAllSeenApartmentsIds(userId);
    return Apartment.findOne(
      {
        postId: {$nin: ids},
        neighborhood: {$nin: badNeighborhoods},
        price: {$ne : null},
        pictures: {$ne : []}
      });
  },
  findApartment: function(query){
    return Apartment.findOne(query);
  },
  getAllSeenApartmentsIds: function(userId){
    return UserChoice.find({userId}).distinct('postId')
  },
  getSavedApartments: function(userId){
    return UserChoice.find({saved: true}).populate('post')
  },
  resetChoices: async function(query){
    let ids = await Apartment.find(query).distinct('postId');
    return UserChoice.remove({postId: {$in: ids}});
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
