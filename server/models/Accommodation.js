class Accommodation {
    constructor(
        source,
        image,
        title,
        rating,
        price,
        distance_from_center,
        reviews,
        status,
        longitude,
        latitude,
        check_in_time,
        check_out_time,
        address
    ) {
        this._source = source;
        this._image = image;
        this._title = title;
        this._rating = rating;
        this._price = price;
        this._distance_from_center = distance_from_center;
        this._reviews = reviews;
        this._status = status;
        this._longitude = longitude;
        this._latitude = latitude;
        this._check_in_time = check_in_time;
        this._check_out_time = check_out_time;
        this._address = address;
    }

    get id() {
        return this._id;
    }

    set id(value) {
        this._id = value;
    }

    get source() {
        return this._source;
    }

    set source(value) {
        this._source = value;
    }

    get image() {
        return this._image;
    }

    set image(value) {
        this._image = value;
    }

    get title() {
        return this._title;
    }

    set title(value) {
        this._title = value;
    }

    get rating() {
        return this._rating || 0;
    }

    set rating(value) {
        this._rating = value || 0;
    }

    get price() {
        return this._price;
    }

    set price(value) {
        this._price = value;
    }

    get distance_from_center() {
        return this._distance_from_center;
    }

    set distance_from_center(value) {
        this._distance_from_center = value;
    }

    get reviews() {
        return this._reviews || 0;
    }

    set reviews(value) {
        this._reviews = value || 0;
    }

    get status() {
        return this._status;
    }

    set status(value) {
        this._status = value;
    }

    get longitude() {
        return this._longitude;
    }

    set longitude(value) {
        this._longitude = value;
    }

    get latitude() {
        return this._latitude;
    }

    set latitude(value) {
        this._latitude = value;
    }

    get check_in_time() {
        return this._check_in_time;
    }

    set check_in_time(value) {
        this._check_in_time = value;
    }

    get check_out_time() {
        return this._check_out_time;
    }

    set check_out_time(value) {
        this._check_out_time = value;
    }

    get address() {
        return this._address;
    }

    set address(value) {
        this._address = value;
    }
}

module.exports = Accommodation;