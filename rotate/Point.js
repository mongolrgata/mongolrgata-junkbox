/**
 * Created by mongo_000 on 06.06.2016.
 */

/**
 * @param {number} x
 * @param {number} y
 * @param {number} [z=0]
 * @constructor
 */
var Point = function Point(x, y, z) {
    this._x = +x;
    this._y = +y;
    this._z = +z || 0;
};

/**
 * @returns {number}
 */
Point.prototype.getX = function () {
    return this._x;
};

/**
 * @returns {number}
 */
Point.prototype.getY = function () {
    return this._y;
};

/**
 * @returns {number}
 */
Point.prototype.getZ = function () {
    return this._z;
};

/**
 * @param {number} dx
 * @param {number} dy
 * @param {number} [dz=0]
 * @returns {Point}
 */
Point.prototype.move = function (dx, dy, dz) {
    return new Point(
        this.getX() + (+dx),
        this.getY() + (+dy),
        this.getZ() + (+dz || 0)
    );
};

/**
 * @param rotationMatrix
 * @param {Point} [cPnt]
 * @returns {Point}
 */
Point.prototype.rotate = function (rotationMatrix, cPnt) {
    var xc = cPnt ? cPnt.getX() : 0;
    var yc = cPnt ? cPnt.getY() : 0;

    var vector = [
        this.getX() - xc,
        this.getY() - yc,
        this.getZ()
    ];

    vector = mul([vector], rotationMatrix)[0];

    return new Point(
        vector[0] + xc,
        vector[1] + yc,
        vector[2]
    );
};

/**
 * @param {Point} hPnt
 * @returns {Point}
 */
Point.prototype.calcScreen = function (hPnt) {
    var x0 = this.getX(), y0 = this.getY(), z0 = this.getZ();
    var xh = hPnt.getX(), yh = hPnt.getY(), zh = hPnt.getZ();

    if (z0 <= zh) {
        return new Point(0, 0);
    }

    var k = zh / (zh - z0);

    return new Point(
        k * (x0 - xh) + xh,
        k * (y0 - yh) + yh
    );
};

/**
 * @param {Point} tPnt
 * @returns {number}
 */
Point.prototype.distance = function (tPnt) {
    var vx = tPnt.getX() - this.getX();
    var vy = tPnt.getY() - this.getY();
    var vz = tPnt.getZ() - this.getZ();

    return Math.sqrt((vx * vx) + (vy * vy) + (vz * vz));
};
