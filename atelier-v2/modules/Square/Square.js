/**
 * Created by aa.shirkin on 21.06.2016.
 */

class Square extends GameObject {
    /**
     * @param {null|string} json
     */
    constructor(json) {
        super(json);

        this._color = new Color(this._cfg.c);
        this._value = this._cfg.v;
    }

    /**
     * @returns {string} JSON-представление объекта класса Square
     */
    toString() {
        var object = {
            c: '' + this._color,
            v: this._value
        };

        return JSON.stringify(object);
    }

    /**
     * @param {jQuery} $element
     */
    visualize($element) {
        super.visualize($element);

        var colorCSS = this._color.toCSS();
        var sizeCSS = (this._value * 25) + '%';

        $element.css({
            borderColor: colorCSS
        });
        
        var $point = $('<div class="point"/>');

        $point.css({
            width: sizeCSS,
            height: sizeCSS,
            backgroundColor: colorCSS
        });

        $element.append($point);
    }
}

(function () {
    var defaultCfg = {
        c: '' + new Color(null),
        v: 1
    };

    Square.prototype._defaultJSON = JSON.stringify(defaultCfg);
})();
