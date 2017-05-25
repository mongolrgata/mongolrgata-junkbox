define(['Point', 'BicubicSpline', 'Pixel'], function (Point, BicubicSpline, Pixel) {
    class Filter {
        /**
         * @param {Pixel} before
         * @param {Pixel} after
         */
        constructor(before, after) {
            let startPoint = new Point(0, 0);
            let endPoint = new Point(255, 255);

            this._splineR = new BicubicSpline([startPoint, new Point(before.r, after.r), endPoint]);
            this._splineG = new BicubicSpline([startPoint, new Point(before.g, after.g), endPoint]);
            this._splineB = new BicubicSpline([startPoint, new Point(before.b, after.b), endPoint]);
        }

        /**
         * @param {ImageData} imageData
         * @returns {ImageData}
         */
        apply(imageData) {
            let result = new ImageData(imageData.width, imageData.height);
            for (let i = 0; i < imageData.data.length; i += 4) {
                let rgb = [
                    this._splineR.getY(imageData.data[i]),
                    this._splineG.getY(imageData.data[i + 1]),
                    this._splineB.getY(imageData.data[i + 2])
                ].map(
                    value => Math.round(Math.max(0, Math.min(value, 255)))
                );

                result.data[i] = rgb[0];
                result.data[i + 1] = rgb[1];
                result.data[i + 2] = rgb[2];
                result.data[i + 3] = imageData.data[i + 3];
            }

            return result;
        }
    }

    return Filter;
});
