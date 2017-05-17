define([], function () {
    var overlay = function (k1, k2) {
        var k;

        if (k1 < 0.5) {
            k = 2 * k1 * k2;
        } else {
            k = 1 - 2 * (1 - k1) * (1 - k2);
        }

        return Math.max(0, Math.min(k, 1));
    };

    class Pixel {
        constructor(rgba) {
            this._rgb = rgba.slice(1, 3);
            this._a = rgba[3];
        }

        overlay(pixel) {
            var rgb = [0, 1, 2].map(i => overlay(this._rgb[i], pixel._rgb[i], this._l));
            return new Pixel(rgb.concat(this._a));
        }

        static DATAtoRGBA(data) {
            return data.map(x => x / 255);
        }

        static HEXtoRGBA(hex) {
            return hex.match(/.{2}/g).map(x => parseInt(x, 16) / 255).concat(1);
        }
    }

    return Pixel;
});
