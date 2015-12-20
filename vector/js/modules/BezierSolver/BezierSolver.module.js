define([], function () {
    /**
     *
     * @param A
     * @param B
     * @param {function} [elementMultiplication]
     * @param {function} [elementAddition]
     * @param {function} [elementZero]
     * @returns {Array}
     */
    function matrixMultiplication(A, B, elementMultiplication, elementAddition, elementZero) {
        var m = A.length,
            n = A[0].length,
            p = B[0].length,
            C = [];

        elementMultiplication = elementMultiplication || (function (a, b) {
                return a * b;
            });

        elementAddition = elementAddition || (function (a, b) {
                return a + b;
            });

        elementZero = elementZero || (function () {
                return 0;
            });

        for (var i = 0; i < m; ++i) {
            C.push([]);

            for (var j = 0; j < p; ++j) {
                C[i].push(elementZero());

                for (var k = 0; k < n; ++k)
                    C[i][j] = elementAddition(C[i][j], elementMultiplication(A[i][k], B[k][j]));
            }
        }

        return C;
    }

    var Point = function (x, y) {
        this.x = x;
        this.y = y;
    };

    var M = [
        [-1, +3, -3, +1],
        [+3, -6, +3, +0],
        [-3, +3, +0, +0],
        [+1, +0, +0, +0]
    ];

    function bezier(t, p0, p1, p2, p3) {
        var T = [
            [Math.pow(t, 3.0), Math.pow(t, 2.0), t, 1]
        ];

        var P = [
            [p0],
            [p1],
            [p2],
            [p3]
        ];

        return matrixMultiplication(
            matrixMultiplication(T, M),
            P,
            function (a, b) {
                return new Point(a * b.x, a * b.y);
            },
            function (a, b) {
                return new Point(a.x + b.x, a.y + b.y);
            },
            function (a, b) {
                return new Point(0, 0);
            }
        )[0][0];
    }

    /**
     * @constructor
     */
    var BezierSolver = function BezierSolver(point1, point2, data, context) {
        this._p0 = new Point(point1[0], point1[1]);
        this._p1 = null;
        this._p2 = null;
        this._p3 = new Point(point2[0], point2[1]);
        this._xMap = {};
        this._yMap = {};

        this.processData(data);
        this.findParams();

        this.context = context;
    };

    BezierSolver.prototype.processData = function (data) {
        for (var i = 0; i < data.length; ++i) {
            var x = data[i][0];
            var y = data[i][1];

            if (this._xMap[x] === undefined) {
                this._xMap[x] = y;
            }
            if (this._yMap[y] === undefined) {
                this._yMap[y] = x;
            }
        }

        //console.log(this._xMap, this._yMap);
    };

    BezierSolver.prototype._findParamsInSquares = function (_p11, _p12, _p21, _p22) {
        var
            p11 = new Point(_p11.x, _p11.y),
            p12 = new Point(_p12.x, _p12.y),
            p21 = new Point(_p21.x, _p21.y),
            p22 = new Point(_p22.x, _p22.y);

        if (p11.x > p12.x) {
            p12.x = [p11.x, p11.x = p12.x][0];
        }
        if (p11.y > p12.y) {
            p12.y = [p11.y, p11.y = p12.y][0];
        }
        if (p21.x > p22.x) {
            p22.x = [p21.x, p21.x = p22.x][0];
        }
        if (p21.y > p22.y) {
            p22.y = [p21.y, p21.y = p22.y][0];
        }

        var width1 = p12.x - p11.x;
        var height1 = p12.y - p11.y;
        var wq1 = width1 / 4.0;
        var hq1 = height1 / 4.0;

        var width2 = p22.x - p21.x;
        var height2 = p22.y - p21.y;
        var wq2 = width2 / 4.0;
        var hq2 = height2 / 4.0;

        var testPoints1 = [
            new Point(p11.x + wq1, p11.y + hq1),
            new Point(p12.x - wq1, p11.y + hq1),
            new Point(p12.x - wq1, p12.y - hq1),
            new Point(p11.x + wq1, p12.y - hq1)
        ];

        var testPoints2 = [
            new Point(p21.x + wq2, p21.y + hq2),
            new Point(p22.x - wq2, p21.y + hq2),
            new Point(p22.x - wq2, p22.y - hq2),
            new Point(p21.x + wq2, p22.y - hq2)
        ];

        var bestRate = +Infinity;
        var bestPoint1 = null;
        var bestPoint2 = null;

        for (var i = 0; i < 4; ++i) {
            for (var j = 0; j < 4; ++j) {
                var rate = this.estimate(testPoints1[i], testPoints2[j]);

                if (bestRate > rate) {
                    bestRate = rate;
                    bestPoint1 = testPoints1[i];
                    bestPoint2 = testPoints2[j];
                }
            }
        }

        return [
            new Point(bestPoint1.x - wq1, bestPoint1.y - hq1),
            new Point(bestPoint1.x + wq1, bestPoint1.y + hq1),
            new Point(bestPoint2.x - wq2, bestPoint2.y - hq2),
            new Point(bestPoint2.x + wq2, bestPoint2.y + hq2)
        ]
    };

    BezierSolver.prototype.estimate = function (p1, p2) {
        var p0 = this._p0;
        var p3 = this._p3;

        var result = 0;
        for (var t = 0.0; t <= 1.0; t += 0.1) {
            var resPoint = bezier(t, p0, p1, p2, p3);
            var resX = resPoint.x;
            var resY = resPoint.y;

            var bestX = this._yMap[Math.round(resY)];
            var bestY = this._xMap[Math.round(resX)];

            result += Math.abs(resX - bestX) + Math.abs(resY - bestY);
        }

        return result;
    };

    BezierSolver.prototype.findParams = function () {
        var p11 = this._p0;
        var p12 = this._p3;

        var p21 = this._p0;
        var p22 = this._p3;

        for (var i = 0; i < 10; ++i) {
            var newEdges = this._findParamsInSquares(p11, p12, p21, p22);

            p11 = newEdges[0];
            p12 = newEdges[1];

            p21 = newEdges[2];
            p22 = newEdges[3];
        }

        //this._p1 = this._p0;
        //this._p2 = this._p3;
        this._p1 = p11;
        this._p2 = p21;
    };

    BezierSolver.prototype.drawCurve = function () {
        var oldStyle = this.context.strokeStyle;

        this.context.strokeStyle = 'blue';
        this.context.moveTo(this._p0.x, this._p0.y);
        this.context.bezierCurveTo(this._p1.x, this._p1.y, this._p2.x, this._p2.y, this._p3.x, this._p3.y);
        this.context.stroke();
        this.context.strokeStyle = oldStyle;
    };

    return BezierSolver;
});
