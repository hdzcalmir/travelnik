# Travelnik - Enjoy in what Travnik offers

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

After going to `localhost:3000` this will be screen that we see.

[![Screenshot-3.png](https://i.postimg.cc/BvY826wy/Screenshot-3.png)](https://postimg.cc/R3tVBMmQ)
[![Screenshot-2.png](https://i.postimg.cc/FHXHScF1/Screenshot-2.png)](https://postimg.cc/PPKHsCwk)

It's also important to mention that this application uses two APIs:
1. [Mapbox](https://www.mapbox.com/) - It has been used for maps.
2. [Booking](https://www.mapbox.com/) - It has been used to fetch apartments available in Travnik from Booking.
3. [OpenAI](https://www.openai.com) - It has been used for interaction with tourists and other app users. (This feature was added as bonus after contest.)

To make work Mapbox API work again everything that needs to be done is to add token.

`travelnik/client/src/common/consts.ts`

[![Screenshot-5.png](https://i.postimg.cc/6pRVtdq0/Screenshot-5.png)](https://postimg.cc/fVzSvSxt)

To make work OpenAI API work again everything that needs to be done is to add token.

`travelnik/server/.env`

`OPENAI_API_KEY="OPEN AI KEY GOES HERE"`

To make work OpenAI API work again everything that needs to be done is to add token.

`travelnik/server/.env`

`BOOKING_API="BOOKING API KEY GOES HERE"`
