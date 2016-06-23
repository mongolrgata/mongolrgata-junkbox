/**
 * Created by aa.shirkin on 21.06.2016.
 */

class Cauldron extends GameObject {
    /**
     * @param {null|string} json
     */
    constructor(json) {
        super(json);

        this._field = new Field(this._cfg.f);
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

        var $template = this._ctl.applyCfg({});

        this._field.visualize($template.find('.cauldron-field-box'));

        $element.append($template);
    }
}

(function () {
    var defaultCfg = {
        f: '' + new Field(null)
    };

    Cauldron.prototype._defaultJSON = JSON.stringify(defaultCfg);
    Cauldron.prototype._ctl = new CTL('modules/Cauldron/Cauldron.ctl');
})();
