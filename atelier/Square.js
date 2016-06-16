/**
 * Created by aa.shirkin on 16.06.2016.
 */

var Square = function (cfg) {
    if (typeof cfg === 'string') {
        cfg = JSON.parse(cfg);
    }

    this._color = cfg.color;
    this._value = cfg.value;
    this._isDamaged = cfg.isDamaged;
};

Square.pallete = 'RGBYW';

Square.prototype.toString = function () {
    var obj = {
        color: this._color,
        value: this._value,
        isDamaged: this._isDamaged
    };

    return JSON.stringify(obj);
};

Square.prototype.defaultSquare = function () {
    return new Square({
        color: 'W',
        value: 0,
        isDamaged: false
    });
};

Square.prototype.getColorCSS = function () {
    var result = null;

    switch (this._color) {
        case 'R':
            result = 'red';
            break;
        case 'G':
            result = 'green';
            break;
        case 'B':
            result = 'blue';
            break;
        case 'Y':
            result = 'yellow';
            break;
        case 'W':
            result = 'white';
            break;
    }

    return result;
};

Square.prototype.setNextColor = function () {
    var currentColor = this._color;
    var index = Square.pallete.indexOf(currentColor);
    index = (index + 1) % Square.pallete.length;
    
    this.setColor(Square.pallete[index]);
};

Square.prototype.setColor = function (color) {
    this._color = color;
};
