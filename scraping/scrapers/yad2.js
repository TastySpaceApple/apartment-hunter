var puppeteer = require('puppeteer');

let browser, page;

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

module.exports = {
  open: async function(){
    this.browser = await puppeteer.launch({headless:false, args: [ "--disable-notifications" ]});
  },
  scrapeCity: async function(maxPrice){
    let url = `https://www.yad2.co.il/realestate/forsale/map?city=5000&price=-1-${maxPrice}`;

    page = await this.browser.newPage();
    let json = null;

    await page.goto(url);
    await sleep(2000);
    //let fetchUrl = `https://www.yad2.co.il/api/feed/get?cat=2&subcat=1&city=5000&neighborhood=${neighborhoodId}&price=-1-${maxPrice}&z=15&polygonMethod=square,32.06256492733179,34.77057872915793,32.05242460309729,34.78585498751232&isMapView=1&page=1`
    let fetchUrl = `https://www.yad2.co.il/api/feed/get?cat=2&subcat=1&price=-1-${maxPrice}&city=5000&z=11&isMapView=1&page=`;
    let items = await page.evaluate(fetchUrl => {

      async function fetchAllPages(){

        let page = 1;
        let lastPage = 1;

        function sleep(ms) {
          return new Promise(resolve => setTimeout(resolve, ms));
        }

        async function fetchData(){
          let response = await fetch(fetchUrl + page);
          let data = await response.json();
          if(data.paginator && data.paginator.last_page)
            lastPage = data.paginator.last_page
          return data.feed.feed_items;
        }

        let items = []
        let fetched = [];
        while(page <= lastPage){
          fetched = await fetchData();
          items = [...items, ...fetched];
          console.log(items.length);
          page++;
          await sleep(2000);
        }
        return items;
      }
      return fetchAllPages();
      //return fetchData();
    }, fetchUrl)

    await page.close();
    await this.browser.close();

    return items//data.feed.feed_items
          .filter( item => !!item.date)
          .map(item => {
      let pictures = []
      for(let imageNum in item.images)
        pictures.push(item.images[imageNum].src);

      let row4 = {}
      item.row_4.forEach(data => {
        row4[data.key] = data.value;
      });

      return {
              date_added: item.date_added,
              floor: row4.floor,
              rooms: row4.rooms,
              text: item.title1,
              pictures,
              location: (!item.coordinates.latitude ? undefined : {
                type: 'Point',
                coordinates: [item.coordinates.latitude, item.coordinates.longitude]
              }),
              price: item.price.replace(/\D/g, ''),
              square_meters: item.square_meters,
              postId: item.record_id,
              posterName: item.contact_name,
              posterId: item.customer_id,
              date: new Date(item.date || item.date_added),
              link: `https://www.yad2.co.il/s/c/${item.link_token}`,
              neighborhood : item.neighborhood
            }
    });
  }
}
