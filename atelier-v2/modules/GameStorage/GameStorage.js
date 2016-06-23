/**
 * Created by aa.shirkin on 22.06.2016.
 */

class GameStorage {
    /**
     * @param {string} key
     * @param {Function} foo
     */
    constructor(key, foo) {
        this._key = key;
        this._linkedObject = new foo(localStorage.getItem(this._key));
    }

    getObject() {
        return this._linkedObject;
    }

    saveObject() {
        localStorage.setItem(this._key, '' + this._linkedObject);
    }
}
