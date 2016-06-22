/**
 * Created by aa.shirkin on 21.06.2016.
 */

class GameObject {
    /**
     * @param {null|string} json
     */
    constructor(json) {
        this._cfg = JSON.parse(json === null ? this._defaultJSON : json);
        this._$element = null;
    }

    /**
     * @returns {string} JSON-представление объекта
     */
    toString() {
        throw TypeError();
    }

    /**
     * @param {jQuery} $element
     */
    visualize($element) {
        this._$element = $element;
        this._$element.empty();
    }

    revisualize() {
        if (this._$element !== null) {
            this.visualize(this._$element);
        }
    }
}
