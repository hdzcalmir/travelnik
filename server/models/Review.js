export class Review {
    _id;
    _text;
    _rate;
    _images;

    get id() {
        return this._id;
    }

    set id(value) {
        this._id = value;
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
}