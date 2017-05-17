// https://repl.it/HlEb/13

DataTransferItemList.prototype[Symbol.iterator] = Array.prototype[Symbol.iterator];

// var PAIRS = [
//     {a: '4a5367', r: '58473b'}, // hair
//     // {a: '212639', r: '58473b'}, // hair (dark)
//     {a: '9a9bad', r: 'fee7d7'}, // skin
//     {a: '635a70', r: 'dfab8c'}, // skin (dark)
//     {a: '173a77', r: '0b358d'}, // eye
//     {a: '8d9bb4', r: 'fbf8f7'}  // tooth
// ];

var PAIRS = [
    // {a: '4a5367', r: '58473b'}, // hair
    // {a: '212639', r: '58473b'}, // hair (dark)
    {a: 'd7d7eb', r: 'fee7d7'}, // skin
    // {a: '9c93ac', r: 'dfab8c'}, // skin (dark)
    // {a: '173a77', r: '0b358d'}, // eye
    // {a: 'c8daf3', r: 'fbf8f7'}  // tooth
];

// var test = [
//     'FF0000',
//     '00FF00',
//     '0000FF',
//     'FFFFFF',
//     'FF00FF',
//     '000000'
// ];

document.onpaste = function (event) {
    for (var item of event.clipboardData.items) {
        if (item.kind === 'file' && item.type.startsWith('image/')) {
            var blob = item.getAsFile();

            var reader = new FileReader();
            reader.onload = function (event) {
                var canvas = document.getElementById('origin');
                var context = canvas.getContext('2d');

                var image = new Image();
                image.onload = function () {
                    canvas.width = image.width;
                    canvas.height = image.height;
                    context.drawImage(image, 0, 0);
                };
                image.src = event.target.result;
            };
            reader.readAsDataURL(blob);
        }
    }
};

document.addEventListener('DOMContentLoaded', function () {
    var button = document.getElementById('calc');

    class Pixel {
        /**
         * @param {number[]} rgba
         */
        constructor(rgba) {
            if (Math.max.apply(null, rgba) > 255.0) {
                this.bad = true;
                rgba = rgba.map(x => Math.min(x, 255.0));
            }

            this._r = rgba[0];
            this._g = rgba[1];
            this._b = rgba[2];
            this._a = rgba[3];

            var MAX = Math.max(this._r, this._g, this._b) / 255.0;
            var MIN = Math.min(this._r, this._g, this._b) / 255.0;
            this._l = 0.5 * (MAX + MIN);
        }

        /**
         * @returns {number}
         */
        get r() {
            return this._r;
        }

        /**
         * @returns {number}
         */
        get g() {
            return this._g;
        }

        /**
         * @returns {number}
         */
        get b() {
            return this._b;
        }

        /**
         * @returns {number}
         */
        get a() {
            return this._a;
        }

        get L() {
            return this._l;
        }

        mul(k) {
            this._r *= k;
            this._g *= k;
            this._b *= k;
        }

        /**
         * @param {Pixel} pixelA
         * @param {Pixel} pixelB
         * @returns {number}
         */
        static diff(pixelA, pixelB) {
            var dr = pixelA.r - pixelB.r;
            var dg = pixelA.g - pixelB.g;
            var db = pixelA.b - pixelB.b;

            return Math.sqrt(dr * dr + dg * dg + db * db);
        }

        static overlay(pixelA, pixelB) {
            var L = pixelA.L;
            var f = function (a, b) {
                a /= 255.0;
                b /= 255.0;
                return Math.min((a < 0.5 ? 2 * a * b : 1 - 2 * (1 - a) * (1 - b)), 1.0) * 255.0;
            };

            return new Pixel([
                f(pixelA.r, pixelB.r),
                f(pixelA.g, pixelB.g),
                f(pixelA.b, pixelB.b),
                255
            ]);
        }

        static calcB(pixelA, pixelR) {
            var L = pixelA.L;
            var f = function (a, r) {
                a /= 255.0;
                r /= 255.0;

                return (a < 0.5 ? r / (2.0 * a) : (r - 1) / (2.0 * (1 - a)) + 1) * 255.0;
            };

            return new Pixel([
                f(pixelA.r, pixelR.r),
                f(pixelA.g, pixelR.g),
                f(pixelA.b, pixelR.b),
                255
            ]);
        }
    }

    var pixelFromHEX = function (hex) {
        return new Pixel(hex.match(/(..)(..)(..)/).slice(1, 4).map(x => parseInt(x, 16)).concat(255));
    };

    var findClosestIndex = function (pixel) {
        var MIN = Infinity;
        var result;
        for (let i = 0; i < PAIRS.length; ++i) {
            var currOriginPixel = PAIRS[i].originPixel;
            var curDiff = Pixel.diff(currOriginPixel, pixel);

            if (MIN > curDiff) {
                MIN = curDiff;
                result = i;
            }
        }

        return result;
    };

    var applyOverlays = function (pixel, index) {
        var overlays = PAIRS[index].overlays;
        var result = pixel;

        for (let i = 0; i < 1; ++i) {
            result = Pixel.overlay(result, overlays[i]);
        }

        return result;
    };

    var mergePixels = function (pixels) {
        var rS = 0;
        var gS = 0;
        var bS = 0;
        for (var i = 0; i < pixels.length; ++i) {
            rS += pixels[i].r;
            gS += pixels[i].g;
            bS += pixels[i].b;
        }
        // rS /= pixels.length;
        // gS /= pixels.length;
        // bS /= pixels.length;

        if (rS < 1 && gS < 1 && bS < 1) {
            debugger;
        }

        return new Pixel([rS, gS, bS, 255]);
    };

    var doMagic = function (pixel) {
        var subPixels = [];
        var lengths = [];
        for (let i = 0; i < PAIRS.length; ++i) {
            subPixels.push(applyOverlays(pixel, i));
            lengths.push(Math.max(Pixel.diff(pixel, PAIRS[i].originPixel)));
        }
        var MAXL = Math.max.apply(null, lengths);
        var lengths1 = lengths.map(x => MAXL / x);
        var SL1 = lengths1.reduce((p, x) => p + x);
        var parts = lengths1.map((x, i) => lengths1[i] / SL1);

        for (let i = 0; i < subPixels.length; ++i) {
            subPixels[i].mul(parts[i]);
        }

        return mergePixels(subPixels);
    };

    for (let i = 0; i < PAIRS.length; ++i) {
        var pair = PAIRS[i];
        var pixelA = pixelFromHEX(pair.a);
        var pixelR = pixelFromHEX(pair.r);

        var result = {originPixel: pixelA, overlays: []};

        do {
            var pixelB = Pixel.calcB(pixelA, pixelR);

            result.overlays.push(pixelB);
            pixelA = Pixel.overlay(pixelA, pixelB);
        } while (pixelB.bad);

        PAIRS[i] = result;
    }

    class ImageData {
        /**
         * @param {HTMLCanvasElement} canvas
         */
        constructor(canvas) {
            var context = canvas.getContext('2d');

            this._imageData = context.getImageData(0, 0, canvas.width, canvas.height);
        }

        /**
         * @param {number} x
         * @param {number} y
         * @returns {Pixel}
         */
        getPixel(x, y) {
            var p = (y * this._imageData.width + x) * 4;
            var pixelData = this._imageData.data.slice(p, p + 4);

            return new Pixel(pixelData);
        }
    }

    button.onclick = function () {
        var origin = document.getElementById('origin');
        var originImageData = new ImageData(origin);
        var originWidth = origin.width;
        var originHeight = origin.height;

        var result = document.getElementById('result');
        var resultContext = result.getContext('2d');
        result.width = originWidth;
        result.height = originHeight;
        var id = resultContext.createImageData(1, 1);
        var d = id.data;

        for (let x = 0; x < originWidth; ++x) {
            for (let y = 0; y < originHeight; ++y) {
                var originPixel = originImageData.getPixel(x, y);

                // if (x === 405 && y === 148) {
                //     debugger;
                // }

                // var index = findClosestIndex(originPixel);
                var newPixel = doMagic(originPixel/*, index*/);

                // if (isNaN(newPixel.r + newPixel.g + newPixel.b)) {
                //     debugger;
                // }

                d[0] = newPixel.r;
                d[1] = newPixel.g;
                d[2] = newPixel.b;
                d[3] = 255;
                resultContext.putImageData(id, x, y);
            }
        }

        console.log(123);
    };
});
