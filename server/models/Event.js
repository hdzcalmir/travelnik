export class Event {
    _id;
    _locationId;
    _name;
    _description;
    _category;
    _start_date;
    _end_date;

    get id() {
        return this._id;
    }

    set id(value) {
        this._id = value;
    }

    get locationId() {
        return this._locationId;
    }

    set locationId(value) {
        this._locationId = value;
    }

    get name() {
        return this._name;
    }

    set name(value) {
        this._name = value;
    }

    get description() {
        return this._description;
    }

    set description(value) {
        this._description = value;
    }

    get category() {
        return this._category;
    }

    set category(value) {
        this._category = value;
    }

    get start_date() {
        return this._start_date;
    }

    set start_date(value) {
        this._start_date = value;
    }

    get end_date() {
        return this._end_date;
    }

    set end_date(value) {
        this._end_date = value;
    }
} 