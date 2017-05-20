define([], function () {
    class LinearSystem {
        constructor() {
            throw Error();
        }

        static solve(tridiagonalMatrix, terms) {
            let A = tridiagonalMatrix.under;
            let B = tridiagonalMatrix.major;
            let C = tridiagonalMatrix.above;
            let D = [, ...terms];
            let n = tridiagonalMatrix.n;

            let P = [0];
            let Q = [0];

            for (let i = 1; i <= n - 1; ++i) {
                let d = B[i] + A[i] * P[i - 1];

                P[i] = -C[i] / d;
                Q[i] = (D[i] - A[i] * Q[i - 1]) / d;
            }

            let X = [];
            X[n] = (D[n] - A[n] * Q[n - 1]) / (B[n] + A[n] * P[n - 1]);

            for (let i = n - 1; i >= 1; --i) {
                X[i] = P[i] * X[i + 1] + Q[i];
            }

            return X.slice(1);
        }
    }

    return LinearSystem;
});
