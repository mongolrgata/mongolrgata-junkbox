define(['LinearSystem', 'TridiagonalMatrix'], function (LinearSystem, TridiagonalMatrix) {
    let calcX = function () {
        return this._points.map(point => point.x);
    };

    let calcH = function () {
        let h = [,];

        let x = this._x;

        for (let i = 1; i <= this._n; ++i) {
            h[i] = x[i] - x[i - 1];
        }

        return h;
    };

    let calcF = function () {
        return this._points.map(point => point.y);
    };

    let calcC = function () {
        let under = [];
        let major = [];
        let above = [];
        let terms = [];

        let h = this._h;
        let f = this._f;

        for (let i = 1; i <= this._n - 1; ++i) {
            under.push(h[i]);
            major.push(2 * (h[i] + h[i + 1]));
            above.push(h[i + 1]);
            terms.push(
                (
                    6
                ) * (
                    (f[i + 1] - f[i]) / h[i + 1]
                    -
                    (f[i] - f[i - 1]) / h[i]
                )
            );
        }

        under.shift();
        above.pop();

        return [0, ...LinearSystem.solve(new TridiagonalMatrix(under, major, above), terms), 0];
    };

    let calcD = function () {
        let d = [,];

        let c = this._c;
        let h = this._h;

        for (let i = 1; i <= this._n; ++i) {
            d[i] = (c[i] - c[i - 1]) / h[i];
        }

        return d;
    };

    let calcB = function () {
        let b = [,];

        let f = this._f;
        let c = this._c;
        let h = this._h;

        for (let i = 1; i <= this._n; ++i) {
            b[i] =
                (f[i] - f[i - 1]) / h[i]
                +
                (c[i - 1] + 2 * c[i]) * h[i] / 6;
        }

        return b;
    };

    let calcA = function () {
        let a = [,];

        let f = this._f;

        for (let i = 1; i <= this._n; ++i) {
            a[i] = f[i];
        }

        return a;
    };

    class BicubicSpline {
        /**
         * @param {Point[]} points
         */
        constructor(points) {
            this._points = points;
            this._n = points.length - 1; /* число сплайнов */

            this._x = calcX.call(this);
            this._h = calcH.call(this);
            this._f = calcF.call(this);
            this._c = calcC.call(this);
            this._d = calcD.call(this);
            this._b = calcB.call(this);
            this._a = calcA.call(this);
        }

        getY(x) {
            let i = 1;
            while (x > this._x[i]) {
                ++i;
            }

            let h = x - this._x[i];

            return [this._d[i] / 6, this._c[i] / 2, this._b[i], this._a[i]].reduce((value, k) => value * h + k);
        }
    }

    return BicubicSpline;
});
