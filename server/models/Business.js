export class Business {
    _id;
    _reviewId;
    _locationId;
    _name;
    _description;
    _category;
    _openingTime;
    _closingTime;

    get workingTime() {
        return `${this._openingTime} - ${this._closingTime}`;
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