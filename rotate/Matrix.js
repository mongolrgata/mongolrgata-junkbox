/**
 * Created by mongo_000 on 06.06.2016.
 */

var Matrix = {
    Ox: {},
    Oy: {},
    Oz: {}
};

/**
 * @param angle
 * @param type
 * @returns {number[][]}
 */
function generateRotationMatrix(angle, type) {
    angle *= wut;

    var s = Math.sin(angle);
    var c = Math.cos(angle);

    switch (type) {
        case Matrix.Ox:
            return [
                [+1, +0, +0],
                [+0, +c, -s],
                [+0, +s, +c]
            ];
        case Matrix.Oy:
            return [
                [+c, +0, +s],
                [+0, +1, +0],
                [-s, +0, +c]
            ];
        case Matrix.Oz:
            return [
                [+c, -s, +0],
                [+s, +c, +0],
                [+0, +0, +1]
            ];
    }
}

/**
 * @param {number} n
 * @param {number} m
 * @param {*} [value=0]
 * @returns {*[][]}
 */
function createMatrix(n, m, value) {
    if (arguments.length == 2) {
        value = 0;
    }

    var result = [];

    for (var i = 0; i < n; ++i) {
        result[i] = [];
        for (var j = 0; j < m; ++j) {
            result[i].push(value);
        }
    }

    return result;
}

/**
 * @param {*[][]} matrix1
 * @param {*[][]} matrix2
 * @returns {*[][]}
 */
function mul(matrix1, matrix2) {
    var n = matrix1.length;
    var m = matrix1[0].length;
    var p = matrix2[0].length;

    var result = createMatrix(n, p);

    for (var i = 0; i < n; ++i) {
        for (var j = 0; j < p; ++j) {
            for (var k = 0; k < m; ++k) {
                result[i][j] += matrix1[i][k] * matrix2[k][j];
            }
        }
    }

    return result;
}
