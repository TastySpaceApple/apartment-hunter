const fb = require('./scrapers/fb');
const yad2 = require('./scrapers/yad2');
const db = require('./db');

(async function(){
  // await db.clear();
  await yad2.open();
  let posts = await yad2.scrapeNeighborhood(yad2.neighborhoods.florentin, '2000000')
  posts.forEach((post, i) => {
    db.addOrUpdateApartment(post);
  });
  console.log('yad2 scriping done');
  /*await fb.open();
  await fb.login();
  posts = await fb.scrapeGroup('ApartmentsTelAviv', 2)
  posts.forEach((post, i) => {
    db.addOrUpdateApartment(post);
  });*/

})()
