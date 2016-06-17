/**
 * Created by aa.shirkin on 16.06.2016.
 */

var Square = function (cfg) {
    if (typeof cfg === 'string') {
        cfg = JSON.parse(cfg);
    }

    this._color = cfg.color || 'W';
    this._value = cfg.value || 0;
    this._isDamaged = cfg.isDamaged || false;
    this._size = cfg.size || 0;

    this._$container = null;
};

Square.pallete = 'RGBYWD';

Square.prototype.toString = function () {
    var obj = {
        color: this._color,
        value: this._value,
        isDamaged: this._isDamaged,
        size: this._size
    };

    return JSON.stringify(obj);
};

Square.prototype.defaultSquare = function () {
    return new Square({
        color: 'W',
        value: 0,
        isDamaged: false,
        size: 0
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
        case 'D':
            result = 'transparent';
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
    this._isDamaged = color == 'D';
};

Square.prototype.setNextSize = function () {
    var currentSize = this._size;
    this.setSize((++currentSize) % 4);
};

Square.prototype.setSize = function (size) {
    this._size = size;
};

Square.prototype.getSizeCSS = function () {
    var result = null;
    
    switch (this._size) {
        case 0:
            result = '0';
            break;
        case 1:
            result = '20%';
            break;
        case 2:
            result = '40%';
            break;
        case 3:
            result = '60%';
            break;
    }
    
    return result;
};
