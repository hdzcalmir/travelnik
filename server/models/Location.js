class Location {
  _longitude;
  _latitude;
  _address;
  _city;
  _country;
  _postalCode;

  constructor() {
    this.latitude = null;
    this.longitude = null;
    this.address = null;
    this.city = null;
    this.country = null;
    this.postalCode = null;
  }

  get latitude() {
    return this._latitude;
  }

  get longitude() {
    return this._longitude;
  }

  get address() {
    return this._address;
  }

  get city() {
    return this._city;
  }

  get country() {
    return this._country;
  }

  get postalCode() {
    return this._postalCode;
  }

  set latitude(latitude) {
    this._latitude = latitude;
  }

  set longitude(longitude) {
    this._longitude = longitude;
  }

  set address(address) {
    this._address = address;
  }

  set city(city) {
    this._city = city;
  }

  set country(country) {
    this._country = country;
  }

  set postalCode(postalCode) {
    this._postalCode = postalCode;
  }
}
module.exports = Location;
