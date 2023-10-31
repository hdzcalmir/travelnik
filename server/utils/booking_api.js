const dotenv = require('dotenv');
dotenv.config();

const bookingApiOptions = (arrivalDate, departureDate) => {
  return {
    method: "GET",
    url: "https://apidojo-booking-v1.p.rapidapi.com/properties/list",
    params: {
      offset: "0",
      arrival_date: arrivalDate,
      departure_date: departureDate,
      guest_qty: "1",
      dest_ids: "-98524",
      room_qty: "1",
      search_type: "city",
      children_age: "5,7",
      search_id: "none",
      price_filter_currencycode: "USD",
      order_by: "popularity",
      languagecode: "en-us",
      travel_purpose: "leisure",
    },
    headers: {
      "X-RapidAPI-Key": process.env.BOOKING_API,
      "X-RapidAPI-Host": "apidojo-booking-v1.p.rapidapi.com",
    },
  };
};

module.exports = bookingApiOptions;