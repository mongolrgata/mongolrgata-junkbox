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

        var self = this;
        var colorCSS = this._color.toCSS();
        var sizeCSS = (this._value * 25) + '%';

        var $template = this._ctl.applyCfg({
            square: {
                css: {
                    borderColor: colorCSS
                },
                click: function (event) {
                    if (!event.ctrlKey) {
                        self._setNextColor();
                    } else {
                        self._setNextValue();
                    }
                    
                    self.revisualize();
                }
            },
            point: {
                css: {
                    width: sizeCSS,
                    height: sizeCSS,
                    backgroundColor: colorCSS
                }
            }
        });

        $element.append($template);
    }

    _setNextColor() {
        this._color.setNextColor();
    }

    _setNextValue() {
        ++this._value;
        this._value %= 4;
    }
}

(function () {
    var defaultCfg = {
        c: '' + new Color(null),
        v: 1
    };

    Square.prototype._defaultJSON = JSON.stringify(defaultCfg);
    Square.prototype._ctl = new CTL('modules/Square/Square.ctl');
})();
