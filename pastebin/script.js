DataTransferItemList.prototype[Symbol.iterator] = Array.prototype[Symbol.iterator];

document.onpaste = function (event) {
    for (var item of event.clipboardData.items) {
        if (item.kind === 'file' && item.type.startsWith('image/')) {
            var blob = item.getAsFile();

            var reader = new FileReader();
            reader.onload = function (event) {
                var canvas = document.createElement('canvas');
                var context = canvas.getContext('2d');

                var image = new Image();
                image.onload = function () {
                    canvas.width = image.width;
                    canvas.height = image.height;
                    context.drawImage(image, 0, 0);
                };
                image.src = event.target.result;

                document.getElementsByTagName('body')[0].appendChild(canvas);
            };
            reader.readAsDataURL(blob);
        }
    }
};

document.addEventListener('DOMContentLoaded', function () {
    var button = document.getElementsByTagName('button')[0];

    class Pixel {
        /**
         * @param {number[]} rgba
         */
        constructor(rgba) {
            this._r = rgba[0];
            this._g = rgba[1];
            this._b = rgba[2];
            this._a = rgba[3];
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

        /**
         * @param {ImageData} imageDataA
         * @param {ImageData} imageDataB
         * @param {number} offsetX смещение imageDataB относительно imageDataA по оси X
         * @param {number} offsetY смещение imageDataB относительно imageDataA по оси Y
         */
        static diff(imageDataA, imageDataB, offsetX, offsetY) {
            // TODO
        }
    }

    button.onclick = function () {
        var canvases = document.getElementsByTagName('canvas');

        for (var i = 1; i < canvases.length; ++i) {
            // TODO
        }
    };
});
