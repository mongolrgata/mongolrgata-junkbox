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
         * @param {Pixel} pixel
         * @returns {Pixel}
         */
        apply(pixel) {
            let rgb = [
                this._splineR.getY(pixel.r),
                this._splineG.getY(pixel.g),
                this._splineB.getY(pixel.b)
            ].map(
                value => Math.max(0, Math.min(value, 255))
            );

            return new Pixel([...rgb, pixel.a]);
        }
    }

    return Filter;
});
