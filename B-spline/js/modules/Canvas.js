define([], function () {
    class Canvas {
        /**
         * @param canvas
         * @param {string} [key]
         */
        constructor(canvas, key) {
            this._canvas = canvas;
            this._context = canvas.getContext('2d');

            if (key) {
                this.loadLocalStorage(key);
            }
        }

        loadFile(file) {
            let canvas = this._canvas;
            let context = this._context;
            let fileReader = new FileReader();

            fileReader.onload = function (event) {
                let image = new Image();
                image.onload = function () {
                    canvas.width = image.width;
                    canvas.height = image.height;
                    context.drawImage(image, 0, 0);
                };
                image.src = event.target.result;
            };

            fileReader.readAsDataURL(file);
        }

        loadLocalStorage(key) {
            try {
                let canvas = this._canvas;
                let context = this._context;
                let options = JSON.parse(localStorage.getItem(key));
                let imageData = new ImageData(options.width, options.height);

                options.data.forEach((value, index) => imageData.data[index] = value);

                canvas.width = options.width;
                canvas.height = options.height;
                context.putImageData(imageData, 0, 0);
            } catch (e) {
                console.error(e);
            }
        }

        saveLocalStorage(key) {
            let canvas = this._canvas;
            let context = this._context;
            let imageData = context.getImageData(0, 0, canvas.width, canvas.height);
            let options = {
                width: canvas.width,
                height: canvas.height,
                data: Array.prototype.map.call(imageData.data, value => value)
            };

            localStorage.setItem(key, JSON.stringify(options));
        }

        /**
         * @param {Point[]} points
         * @param {string} [color]
         */
        drawCurve(points, color) {
            let context = this._canvas.getContext('2d');

            context.beginPath();
            context.strokeStyle = color || '#000';

            for (let i = 0; i < points.length; ++i) {
                let point = points[i];
                let x = point.x;
                let y = point.y;

                context.lineTo(x, y);
                context.moveTo(x, y);
            }

            context.stroke();
        }
    }

    return Canvas;
});
