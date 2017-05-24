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
        constructor(canvas, uuid) {
            this._canvas = canvas;
            this._context = canvas.getContext('2d');

            if (uuid) {
                this.loadImageData(uuid);
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
