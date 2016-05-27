/**
 * Created by aa.shirkin on 25.05.2016.
 */

var Point = function (x, y, z) {
    this._x = x;
    this._y = y;
    this._z = z || 0;
};

Point.prototype.getX = function () {
    return this._x;
};

Point.prototype.getY = function () {
    return this._y;
};

Point.prototype.move = function (Δx, Δy, Δz) {
    var oldX = this.getX();
    var oldY = this.getY();
    var oldZ = this.getZ();

    return new Point(oldX + Δx, oldY + Δy, oldZ + (Δz || 0))
};

Point.prototype.rotate = function (M) {
    var vector = [[this.getX(), this.getY(), this.getZ() || 0]];
    var sub = mul(vector, M);

    return new Point(sub[0][0], sub[0][1], sub[0][2]);
};

Point.prototype.getZ = function () {
    return this._z;
};

Point.prototype.calcScreen = function (xh, yh, zh) {
    var x0 = this.getX();
    var y0 = this.getY();
    var z0 = this.getZ();

    if (z0 > zh) {
        return new Point(xh, yh, zh);
    }

    // var k = zh / (zh - z0);
    var k = -z0 / zh + 1;

    var xs = k * (x0 - xh) + xh;
    var ys = k * (y0 - yh) + yh;
    var zs = 0;

    return new Point(xs, ys, zs);
};

Point.prototype.isEqual = function (p) {
    var ε = 0.001;

    return (
        Math.abs(this.getX() - p.getX()) < ε &&
        Math.abs(this.getY() - p.getY()) < ε
    );
};

var Line = function (p1, p2) {
    this._x1 = p1.getX();
    this._y1 = p1.getY();
    this._x2 = p2.getX();
    this._y2 = p2.getY();
};

Line.prototype.hasPoint = function (p) {
    var ε = 0.001;

    var x1 = this._x1;
    var y1 = this._y1;
    var x2 = this._x2;
    var y2 = this._y2;

    var x = p.getX();
    var y = p.getY();

    return Math.abs(
            (x - x1) * (y2 - y1) - (y - y1) * (x2 - x1)
        ) < ε;
};

function generateRotationMatrix(ω, type) {
    ω *= 0.0174533;
    var s = Math.sin(ω);
    var c = Math.cos(ω);

    switch (type) {
        case 'x':
            return [
                [+1, +0, +0],
                [+0, +c, -s],
                [+0, +s, +c]
            ];
        case 'y':
            return [
                [+c, +0, +s],
                [+0, +1, +0],
                [-s, +0, +c]
            ];
        case 'z':
            return [
                [+c, -s, +0],
                [+s, +c, +0],
                [+0, +0, +1]
            ];
    }
}

function createMatrix(n, m) {
    var result = [];

    for (var i = 0; i < n; ++i) {
        result[i] = [];
        for (var j = 0; j < m; ++j) {
            result[i].push(0);
        }
    }

    return result;
}

function mul(M1, M2) {
    var n = M1.length;
    var m = M1[0].length;
    var p = M2[0].length;

    var result = createMatrix(n, p);

    for (var i = 0; i < n; ++i) {
        for (var j = 0; j < p; ++j) {
            for (var k = 0; k < m; ++k) {
                result[i][j] += M1[i][k] * M2[k][j];
            }
        }
    }

    return result;
}

$(document).ready(function () {
    var canvas = $('canvas')[0];
    var context = canvas.getContext('2d');

    canvas.width = 512;
    canvas.height = 512;

    context.beginPath();
    context.moveTo(0, 0);
    context.lineTo(0, 100);
    context.stroke();

    context.beginPath();
    context.moveTo(0, 0);
    context.lineTo(100, 0);
    context.stroke();

    onChangeAngle();
});

function drawRect(α, β, γ, xh, yh, zh, width, height) {
    var canvas = $('canvas')[0];
    var context = canvas.getContext('2d');
    context.clearRect(0, 0, canvas.width, canvas.height);
    
    function calcPoint(point) {
        return point.calcScreen(xh, yh, zh).move(200, 200);
    }

    function drawLine(p1, p2) {
        p1 = calcPoint(p1);
        p2 = calcPoint(p2);
        
        context.beginPath();
        context.moveTo(p1.getX(), p1.getY());
        context.lineTo(p2.getX(), p2.getY());
        context.stroke();
    }
    
    function drawCircle(pC, r) {
        pC = calcPoint(pC);
        
        context.arc(pC.getX(), pC.getY(), r, 0, 2 * Math.PI, false);
        context.stroke();
    }

    var Mx = generateRotationMatrix(α, 'x');
    var My = generateRotationMatrix(β, 'y');
    var Mz = generateRotationMatrix(γ, 'z');
    var M = mul(mul(Mx, My), Mz);

    var p0 = new Point(0, 0);
    var p1 = new Point(0, height);
    var p2 = new Point(width, height);
    var p3 = new Point(width, 0);

    var $p0 = p0.rotate(M);
    var $p1 = p1.rotate(M);
    var $p2 = p2.rotate(M);
    var $p3 = p3.rotate(M);

    context.beginPath();
    context.strokeStyle = 'black';
    drawLine($p0, $p1);
    drawLine($p1, $p2);
    drawLine($p2, $p3);
    drawLine($p3, $p0);

    context.beginPath();
    var _O = new Point(0, 0, 0);
    context.strokeStyle = 'red';
    drawLine(_O.move(-10, 0, 0).rotate(M), _O.move(10, 0, 0).rotate(M));
    drawLine(_O.move(0, -10, 0).rotate(M), _O.move(0, 10, 0).rotate(M));
    drawLine(_O.move(0, 0, -10).rotate(M), _O.move(0, 0, 10).rotate(M));

    context.beginPath();
    var _H = new Point(xh, yh, zh);
    context.strokeStyle = 'black';
    drawCircle(_H, 2);

    console.error('DONE');
}

onChangeAngle = function () {
    var alpha = +$('[name="alpha"]').val();
    var beta = +$('[name="beta"]').val();
    var gamma = +$('[name="gamma"]').val();
    var XH = +$('[name="X"]').val();
    var YH = +$('[name="Y"]').val();
    var ZH = +$('[name="Z"]').val();
    var width = +$('[name="width"]').val();
    var height = +$('[name="height"]').val();

    drawRect(alpha, beta, gamma, XH, YH, ZH, width, height);
};
