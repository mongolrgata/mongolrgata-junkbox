/**
 * Created by aa.shirkin on 21.06.2016.
 */

class Field extends GameObject {
    /**
     * @param {null|string} json
     */
    constructor(json) {
        super(json);

        this._currentWidth = this._cfg.cW;
        this._currentHeight = this._cfg.cH;

        this._realWidth = this._cfg.rW;
        this._realHeight = this._cfg.rH;

        this._squares = [];

        for (var i = 0; i < this._realHeight; ++i) {
            this._squares.push([]);

            for (var j = 0; j < this._realWidth; ++j) {
                this._squares[i].push(new Square(this._cfg.s[i][j]));
            }
        }
    }

    /**
     * @returns {string} JSON-представление объекта класса Field
     */
    toString() {
        var object = {
            cW: this._currentWidth,
            cH: this._currentHeight,
            rW: this._realWidth,
            rH: this._realHeight,
            s: []
        };

        for (var i = 0; i < this._realHeight; ++i) {
            object.s.push([]);

            for (var j = 0; j < this._realWidth; ++j) {
                object.s[i].push('' + this._squares[i][j]);
            }
        }

        return JSON.stringify(object);
    }

    /**
     * @param {jQuery} $element
     */
    visualize($element) {
        super.visualize($element);

        for (var i = 0; i < this._currentHeight; ++i) {
            var $row = $('<div/>');
            var $clear = $('<div class="clear"/>');

            for (var j = 0; j < this._currentWidth; ++j) {
                var $div = $('<div class="field-square-box"/>');

                this._getSquare(i, j).visualize($div);
                $row.append($div);
            }

            $row.append($clear);
            $element.append($row);
        }
    }

    /**
     * @param {number} i
     * @param {number} j
     * @returns {Square}
     * @private
     */
    _getSquare(i, j) {
        return this._squares[i][j];
    }

    _swap(i1, j1, i2, j2) {
        var tmp = this._squares[i1][j1];
        this._squares[i1][j1] = this._squares[i2][j2];
        this._squares[i2][j2] = tmp;
    }

    _flipHorizontal() {
        var width = this._currentWidth;
        var height = this._currentHeight;

        for (var i = 0; i < height; ++i) {
            for (var l = 0, r = width - 1; l < width / 2; ++l, --r) {
                this._swap(i, l, i, r);
            }
        }
    }

    _flipVertical() {
        var width = this._currentWidth;
        var height = this._currentHeight;

        for (var i = 0; i < width; ++i) {
            for (var t = 0, b = height - 1; t < height / 2; ++t, --b) {
                this._swap(t, i, b, i);
            }
        }
    }

    _rotate180() {
        this._flipHorizontal();
        this._flipVertical();
    }

    _addColumn() {
        var height = this._realHeight;

        for (var i = 0; i < height; ++i) {
            this._squares[i].push(new Square(null));
        }
    }

    _addRow() {
        var width = this._realWidth;
        var row = [];

        for (var i = 0; i < width; ++i) {
            row.push(new Square(null));
        }

        this._squares.push(row);
    }

    /**
     * @param {number} width
     */
    setWidth(width) {
        this._rotate180();

        for (var i = this._realWidth; i < width; ++i) {
            this._addColumn();
        }
        this._currentWidth = width;

        this._rotate180();
    }

    /**
     * @param {number} height
     */
    setHeight(height) {
        this._rotate180();

        for (var i = this._realHeight; i < height; ++i) {
            this._addRow();
        }
        this._currentHeight = height;

        this._rotate180();
    }
}

(function () {
    const DEFAULT_WIDTH = 4;
    const DEFAULT_HEIGHT = 4;

    var squares = [];
    for (var i = 0; i < DEFAULT_HEIGHT; ++i) {
        squares.push([]);

        for (var j = 0; j < DEFAULT_WIDTH; ++j) {
            squares[i].push('' + new Square(null));
        }
    }

    var defaultCfg = {
        cW: DEFAULT_WIDTH,
        cH: DEFAULT_HEIGHT,
        rW: DEFAULT_WIDTH,
        rH: DEFAULT_HEIGHT,
        s: squares
    };

    Field.prototype._defaultJSON = JSON.stringify(defaultCfg);
})();
