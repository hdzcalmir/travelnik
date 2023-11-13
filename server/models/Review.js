export class Review {
  _id;
  _name;
  _date;
  _text;
  _rate;
  _images;
  _approved;
  _entityId;
  _entityType;

  get id() {
    return this._id;
  }

  set id(value) {
    this._id = value;
  }

  get name() {
    return this._name;
  }

  set name(value) {
    this._name = value;
  }

  get date() {
    return this._date;
  }

  set date(value) {
    this._date = value;
  }

  get text() {
    return this._text;
  }

  set text(value) {
    this._text = value;
  }

  get rate() {
    return this._rate;
  }

  set rate(value) {
    this._rate = value;
  }

  get images() {
    return this._images;
  }

  set images(value) {
    this._images = value;
  }

  get approved() {
    return this._approved;
  }

  set approved(value) {
    this._approved = value;
  }

  get entityId() {
    return this._entityId;
  }

  set entityId(value) {
    this._entityId = value;
  }

  get entityType() {
    return this._entityType;
  }

  set entityType(value) {
    this._entityType = value;
  }
}
