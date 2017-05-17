define([], function () {
    class TridiagonalMatrix {
        constructor(under, major, above) {
            this._a = [, 0, ...under];
            this._b = [, ...major];
            this._c = [, ...above, 0];

            this._n = major.length;
        }

        get under() {
            return this._a;
        }

        get major() {
            return this._b;
        }

        get above() {
            return this._c;
        }

        get n() {
            return this._n;
        }
    }

    return TridiagonalMatrix;
});
