/**
 * Created by aa.shirkin on 16.06.2016.
 */

var Field = function (cfg) {
    if (typeof cfg === 'string') {
        cfg = JSON.parse(cfg);
    }

    this._width = cfg.width;
    this._height = cfg.height;
    this._field = [];

    for (var i = 0, gCount = 0; i < cfg.realHeight; ++i) {
        this._field[i] = [];
        for (var j = 0; j < cfg.realWidth; ++j) {
            var squareCfg = cfg.squares[gCount++];

            if (squareCfg) {
                this._field[i][j] = new Square(squareCfg);
            } else {
                this._field[i][j] = Square.prototype.defaultSquare();
            }
        }
    }

    this._$container = null;
};

Field.prototype.setWidth = function (value) {
    var realHeight = this._field.length;
    var realWidth = this._field[0].length;

    if (value > realWidth) {
        this._flipHorizontal();
        for (var i = 0; i < realHeight; ++i) {
            for (var j = realWidth; j < value; ++j) {
                this._field[i][j] = Square.prototype.defaultSquare();
            }
        }
        this._width = value;
        this._flipHorizontal();
    } else {
        this._flipHorizontal();
        this._flipVertical();
        this._width = value;
        this._flipHorizontal();
        this._flipVertical();
    }
};

Field.prototype.setHeight = function (value) {
    var realHeight = this._getRealHeight();
    var realWidth = this._getRealWidth();

    if (value > realHeight) {
        this._flipVertical();
        for (var i = realHeight; i < value; ++i) {
            this._field[i] = [];
            for (var j = 0; j < realWidth; ++j) {
                this._field[i][j] = Square.prototype.defaultSquare();
            }
        }
        this._height = value;
        this._flipVertical();
    } else {
        this._flipHorizontal();
        this._flipVertical();
        this._height = value;
        this._flipHorizontal();
        this._flipVertical();
    }
};

Field.prototype._getRealWidth = function () {
    return this._field[0].length;
};

Field.prototype._getRealHeight = function () {
    return this._field.length;
};

Field.prototype._flipHorizontal = function () {
    for (var i = 0; i < this._height; ++i) {
        for (var l = 0, r = this._width - 1; l < this._width / 2; ++l, --r) {
            var tmp = this._field[i][l];
            this._field[i][l] = this._field[i][r];
            this._field[i][r] = tmp;
        }
    }
};

Field.prototype._flipVertical = function () {
    for (var t = 0, b = this._height - 1; t < this._height / 2; ++t, --b) {
        var tmp = this._field[t];
        this._field[t] = this._field[b];
        this._field[b] = tmp;
    }
};

Field.prototype.toString = function () {
    var obj = {
        width: this._width,
        height: this._height,
        realWidth: this._getRealWidth(),
        realHeight: this._getRealHeight(),
        squares: []
    };

    for (var i = 0; i < this._getRealHeight(); ++i) {
        for (var j = 0; j < this._getRealWidth(); ++j) {
            obj.squares.push('' + this.getSquare(j, i));
        }
    }

    return JSON.stringify(obj);
};

Field.prototype.defaultField = function () {
    var cfg = {
        width: 4,
        height: 4,
        realWidth: 4,
        realHeight: 4,
        squares: []
    };

    return new Field(cfg);
};

Field.prototype.getSquare = function (x, y) {
    return this._field[y][x];
};

Field.prototype._revisualize = function () {
    if (this._$container === null) {
        return;
    }
    
    this.visualize(this._$container);
};

/**
 * @param {Square} square
 * @returns {jQuery}
 * @private
 */
Field.prototype._visualizeSquare = function (square) {
    var self = this;
    var $result = $('<div class="field-square"/>').css({
        'border-color': square.getColorCSS()
    }).append(
        $('<div class="square-point"/>').css({
            'background-color': square.getColorCSS(),
            'width': square.getSizeCSS(),
            'height': square.getSizeCSS()
        })
    );
    
    $result.click(function (event) {
        if (event.button === 0) {
            square.setNextColor();
            self._revisualize();
        } else if (event.button === 1) {
            square.setNextSize();
            self._revisualize();
        }
    });
    
    return $result;
};

Field.prototype.visualize = function ($container) {
    this._$container = $container;
    $container.empty();

    var self = this;
    var height = this._height;
    var width = this._width;

    for (var i = 0; i < height; ++i) {
        var $row = $('<div class="field-row"/>');

        for (var j = 0; j < width; ++j) {
            var square = this.getSquare(j, i);
            var $square = self._visualizeSquare(square);

            $row.append($square);
        }
        $container.append($row);
    }
};
