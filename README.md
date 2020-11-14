
# Apartment Hunter


## Running

#### Client
the client is located at `client`. run:
```
cd client
npm start // for dev
npm run build // to build the client to the server
```

#### Backend
the backend is located at `backend`. run:
```
cd backend
npm start
```

#### Scraping
scraping scripts are in the `scraping` folder. there are two scrapers - one for Facebook, the other for Yad2. they both use puppeteer and open a window (not headerless).
run: `npm start`
```
cd scraping
npm start
```

## Config
the database configuration should be changed in the `config` folder.
