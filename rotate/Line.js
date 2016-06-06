/**
 * Created by mongo_000 on 06.06.2016.
 */

/**
 * @param {Point} p1
 * @param {Point} p2
 * @constructor
 */
var Line = function Line(p1, p2) {
    this._x1 = p1.getX();
    this._y1 = p1.getY();
    this._x2 = p2.getX();
    this._y2 = p2.getY();

    this._vx = this._x2 - this._x1;
    this._vy = this._y2 - this._y1;

    this._angle = null;
    this._length = null;
};

/**
 * @returns {number}
 */
Line.prototype.getAngle = function () {
    if (this._angle === null) {
        if (this._vx === 0 && this._vy === 0) {
            // nothing to do here
        } else if (this._vx > 0 && this._vy === 0) {
            this._angle = 0;
        } else if (this._vx > 0 && this._vy > 0) {
            this._angle = Math.atan(this._vy / this._vx) / wut;
        } else if (this._vx === 0 && this._vy > 0) {
            this._angle = 90;
        } else if (this._vx < 0 && this._vy > 0) {
            this._angle = 180 + Math.atan(this._vy / this._vx) / wut;
        } else if (this._vx < 0 && this._vy === 0) {
            this._angle = 180;
        } else if (this._vx < 0 && this._vy < 0) {
            this._angle = Math.atan(this._vy / this._vx) / wut + 180;
        } else if (this._vx === 0 && this._vy < 0) {
            this._angle = 270;
        } else if (this._vx > 0 && this._vy < 0) {
            this._angle = 360 + Math.atan(this._vy / this._vx) / wut;
        }
    }

    return this._angle;
};

/**
 * @returns {number}
 */
Line.prototype.getLength = function () {
    if (this._length === null) {
        this._length = Math.sqrt((this._vx * this._vx) + (this._vy * this._vy));
    }

    return this._length;
};

var angleTest = function () {
    var i, x, y, line;

    for (i = 100; i >= -100; --i) {
        x = i / 100;
        y = Math.sqrt(1 - (x * x));

        line = new Line(
            new Point(0, 0),
            new Point(x, y)
        );

        console.log(line.getAngle());
    }

    for (i = -100; i <= 100; ++i) {
        x = i / 100;
        y = -Math.sqrt(1 - (x * x));

        line = new Line(
            new Point(0, 0),
            new Point(x, y)
        );

        console.log(line.getAngle());
    }
};
