class Location {
  _longitude;
  _latitude;

  constructor() {
    this.latitude = null;
    this.longitude = null;
  }

  get latitude() {
    return this._latitude;
  }

  get longitude() {
    return this._longitude;
  }

  set latitude(latitude) {
    this._latitude = latitude;
  }

  set longitude(longitude) {
    this._longitude = longitude;
  }
}
module.exports = Location;
