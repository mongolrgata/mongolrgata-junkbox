/**
 * Created by aa.shirkin on 21.06.2016.
 */

class Cauldron extends GameObject {
    /**
     * @param {null|string} json
     */
    constructor(json) {
        super(json);

        this._field = this._cfg.f;
    }

    /**
     * @returns {string} JSON-представление объекта класса Cauldron
     */
    toString() {
        var object = {
            f: '' + this._field
        };

        return JSON.stringify(object);
    }

    /**
     * @param {jQuery} $element
     */
    visualize($element) {
        super.visualize($element);

        // TODO
    }
}

(function () {
    var defaultCfg = {
        f: '' + new Field(null)
    };

    Cauldron.prototype._defaultJSON = JSON.stringify(defaultCfg);
})();
