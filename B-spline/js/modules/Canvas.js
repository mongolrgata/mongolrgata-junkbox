define([], function () {
    class Canvas {
        constructor(canvas) {
            this._canvas = canvas;
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
