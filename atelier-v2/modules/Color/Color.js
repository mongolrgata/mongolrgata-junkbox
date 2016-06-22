/**
 * Created by aa.shirkin on 21.06.2016.
 */

class Color extends GameObject {
    /**
     * @param {null|string} json
     */
    constructor(json) {
        super(json);

        this._color = this._getColorByChar(this._cfg.c);
    }

    /**
     * @returns {string} JSON-представление объекта класса Color
     */
    toString() {
        var object = {
            c: this._color.char
        };

        return JSON.stringify(object);
    }

    /**
     * @param {string} char
     * @returns {null|{c: {char}}}
     * @private
     */
    _getColorByChar(char) {
        var color = null;

        for (var colorKey in Color.prototype.PALETTE) {
            if (Color.prototype.PALETTE.hasOwnProperty(colorKey) && Color.prototype.PALETTE[colorKey].char === char) {
                color = Color.prototype.PALETTE[colorKey];
                break;
            }
        }

        return color;
    }
    
    toCSS() {
        return this._color.css;
    }
}

(function () {
    Color.prototype.PALETTE = {
        RED: {char: 'R', css: 'red'},
        GREEN: {char: 'G', css: 'green'},
        BLUE: {char: 'B', css: 'blue'},
        YELLOW: {char: 'Y', css: 'yellow'},
        WHITE: {char: 'W', css: 'white'}
    };

    var defaultCfg = {
        c: Color.prototype.PALETTE.RED.char
    };

    Color.prototype._defaultJSON = JSON.stringify(defaultCfg);
})();
