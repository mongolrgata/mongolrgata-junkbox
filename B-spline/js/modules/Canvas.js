define([], function () {
    const DATABASE_NAME = 'ImageStorage';

    let request = window.indexedDB.open(DATABASE_NAME, 1);
    request.onupgradeneeded = function (event) {
        let db = event.target.result;
        db.createObjectStore('images', {keyPath: 'key'});
    };

    class Canvas {
        /**
         * @param {HTMLCanvasElement} canvas
         * @param {string} [uuid]
         */
        constructor(canvas, input, uuid) {
            let self = this;
            this._canvas = canvas;
            this._context = canvas.getContext('2d');

            if (uuid) {
                this.loadImageData(uuid);
            }

            this._canvas.onclick = function (mouseEvent) {
                let x = mouseEvent.offsetX;
                let y = mouseEvent.offsetY;

                input.value = self.getHEX(x, y);
            };
        }

        getHEX(x, y) {
            let context = this._context;
            let data = context.getImageData(x - 3, y - 3, 7, 7).data;
            let rgb = [0, 0, 0];

            for (let i = 0; i < data.length; i += 4) {
                rgb[0] += data[i];
                rgb[1] += data[i + 1];
                rgb[2] += data[i + 2];
            }

            return rgb.map(value => ('00' + (Math.round(value / 49)).toString(16)).slice(-2)).join('');
        }

        get imageData() {
            return this._context.getImageData(0, 0, this._canvas.width, this._canvas.height);
        }

        set imageData(imageData) {
            let canvas = this._canvas;
            let context = this._context;

            canvas.width = imageData.width;
            canvas.height = imageData.height;
            context.putImageData(imageData, 0, 0);
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

        loadImageData(uuid) {
            let canvas = this._canvas;
            let context = this._context;

            window.indexedDB.open(DATABASE_NAME, 1).onsuccess = function (event) {
                event.target.result.transaction(['images'], 'readonly').objectStore("images").get(uuid).onsuccess = function (event) {
                    if (event.target.result) {
                        let /** @type {ImageData} */ imageData = event.target.result.imageData;

                        canvas.width = imageData.width;
                        canvas.height = imageData.height;
                        context.putImageData(imageData, 0, 0);
                    }
                };
            };
        }

        saveImageData(uuid) {
            let canvas = this._canvas;
            let context = this._context;
            let imageData = context.getImageData(0, 0, canvas.width, canvas.height);

            window.indexedDB.open(DATABASE_NAME, 1).onsuccess = function (event) {
                event.target.result.transaction(['images'], 'readwrite').objectStore("images").put({
                    key: uuid,
                    imageData: imageData
                });
            };
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
