define([], function () {
    class Pixel {
        constructor(rgba) {
            [this._r, this._g, this._b, this._a] = rgba;
        }

        get r() {
            return this._r;
        }

        get g() {
            return this._g;
        }

        get b() {
            return this._b;
        }

        get a() {
            return this._a;
        }

        static HEXtoRGBA(hex) {
            return [...hex.match(/.{2}/g).map(x => parseInt(x, 16)), 255];
        }
    }

    return Pixel;
});
