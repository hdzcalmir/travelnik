# Travelnik - Discover Travnik, Bosnia and Herzegovina's Hidden Gem!

Travelnik is developed in:
1. NextJS
2. NodeJS
3. MySQL

To start application we need to start both, frontend and backend.

To start frontend we need to enter client directory and run command:

`npm run build` to run build

then,

`npm run dev` for starting dev environemnt

`npm start` for starting production environment

To start backend we need to enter server directory and run command:

`npm start`

After that application will run on port `3000`.

Link: `localhost:3000`

After navigating to `localhost:3000`, this will be the screen that we see.

## Demo video
[![Application Demo Video](https://github.com/hdzcalmir/travelnik/assets/70588174/1297805b-670e-4030-8109-f22c5d8cc102)](https://www.youtube.com/watch?v=MmH4ltC2MIo)

It's also important to mention that this application uses two APIs:
1. [Mapbox](https://www.mapbox.com/) - It has been used for maps.
2. [Booking](https://developers.booking.com/api/index.html) - It has been used to fetch apartments available in Travnik from Booking.
3. [OpenAI](https://www.openai.com) - It has been used for interaction with tourists and other app users. (This feature was added as bonus after contest.)

To reestablish functionality for the Mapbox API, all you need to do is add the token.

`travelnik/client/src/common/consts.ts`

[![Screenshot-5.png](https://i.postimg.cc/6pRVtdq0/Screenshot-5.png)](https://postimg.cc/fVzSvSxt)

To restore functionality to the OpenAI API, simply add the required key.

`travelnik/server/.env`

`OPENAI_API_KEY="OPEN AI KEY GOES HERE"`

To restore functionality to the Booking API, all that is required is to add the key.

`travelnik/server/.env`

`BOOKING_API="BOOKING API KEY GOES HERE"`
