export class Activity {
    _id;
    _reviewId;
    _locationId;
    _name;
    _description;
    _category;
    _duration;
    _difficulty;

    get difficulty() {
        return this._difficulty;
    }

    get duration() {
        return this._duration;
    }

    get category() {
        return this._category;
    }

    get description() {
        return this._description;
    }

    get name() {
        return this._name;
    }

    get id() {
        return this._id;
    }
}


