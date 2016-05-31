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

//noinspection JSNonASCIINames
Point.prototype.move = function (Δx, Δy, Δz) {
    var oldX = this.getX();
    var oldY = this.getY();
    var oldZ = this.getZ();

    //noinspection JSNonASCIINames
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

    if (z0 <= zh) {
        return new Point(xh, yh, zh);
    }

    var k = zh / (zh - z0);

    var xs = k * (x0 - xh) + xh;
    var ys = k * (y0 - yh) + yh;
    var zs = 0;

    return new Point(xs, ys, zs);
};

Point.prototype.distance = function (p) {
    var vX = Math.abs(this.getX() - p.getX());
    var vY = Math.abs(this.getY() - p.getY());
    var vZ = Math.abs(this.getZ() - p.getZ());

    return Math.sqrt(vX * vX + vY * vY + vZ * vZ);
};

var Line = function (p1, p2) {
    this._x1 = p1.getX();
    this._y1 = p1.getY();
    this._x2 = p2.getX();
    this._y2 = p2.getY();

    this._xV = this._x2 - this._x1;
    this._yV = this._y2 - this._y1;
    this._lenV = Math.sqrt(this._xV * this._xV + this._yV * this._yV);
};

Line.prototype.angle = function (line) {
    var result = this._xV * line._xV + this._yV * line._yV;
    result /= (this._lenV * line._lenV);
    
    result = Math.acos(result) / 0.0174533;
    
    if (result > 90)
        result = 180 - result;

    return result;
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

var notDraw = false;
var noLines = false;
var drawMiddle = false;
var needPrint = false;

function printPoint(point) {
    var x = point.getX();
    var y = point.getY();

    $('#coordinates-list').append($('<p/>').text('x = ' + Math.round(x) + '; y = ' + Math.round(y)));
}

function drawRect(α, β, γ, xh, yh, zh, width, height) {
    var canvas = $('canvas')[0];
    var context = canvas.getContext('2d');
    context.clearRect(0, 0, canvas.width, canvas.height);

    var count = 0;

    function calcPoint(point) {
        var tempPoint = point.calcScreen(xh, yh, zh).move(200, 200);

        if ((++count % 2) && needPrint) {
            printPoint(tempPoint);
        }

        return tempPoint;
    }

    function drawLine(p1, p2) {
        if (notDraw)
            return;

        p1 = calcPoint(p1);
        p2 = calcPoint(p2);

        context.beginPath();
        context.moveTo(p1.getX(), p1.getY());
        context.lineTo(p2.getX(), p2.getY());
        context.stroke();
    }

    function drawCircle(pC, r) {
        if (notDraw)
            return;

        pC = calcPoint(pC);

        context.beginPath();
        context.arc(pC.getX(), pC.getY(), r, 0, 2 * Math.PI, false);
        context.stroke();
    }

    var Mx = generateRotationMatrix(α, 'x');
    var My = generateRotationMatrix(β, 'y');
    var Mz = generateRotationMatrix(γ, 'z');
    var M = mul(mul(Mz, Mx), My);

    var p0 = new Point(0, 0);
    var p1 = new Point(width, 0);
    var p2 = new Point(width, height);
    var p3 = new Point(0, height);

    var $p0 = p0.rotate(M);
    var $p1 = p1.rotate(M);
    var $p2 = p2.rotate(M);
    var $p3 = p3.rotate(M);

    $('#coordinates-list').empty();
    needPrint = true;

    context.beginPath();
    context.strokeStyle = 'black';
    drawLine($p0, $p1);
    drawLine($p1, $p2);
    drawLine($p2, $p3);
    drawLine($p3, $p0);

    needPrint = false;

    if (drawMiddle) {
        var p0m = new Point(0, 0);
        var p1m = new Point(0, height);
        var p2m = new Point(width / 2, height);
        var p3m = new Point(width / 2, 0);

        var $p0m = p0m.rotate(M);
        var $p1m = p1m.rotate(M);
        var $p2m = p2m.rotate(M);
        var $p3m = p3m.rotate(M);

        context.beginPath();
        context.strokeStyle = 'red';
        drawLine($p0m, $p1m);
        drawLine($p1m, $p2m);
        drawLine($p2m, $p3m);
        drawLine($p3m, $p0m);
    }

    if (!noLines) {
        var _O = new Point(0, 0, 0);
        context.lineWidth = 3;
        context.strokeStyle = 'red';
        drawLine(_O.move(-20, 0, 0).rotate(M), _O.move(20, 0, 0).rotate(M));
        context.strokeStyle = 'green';
        drawLine(_O.move(0, -20, 0).rotate(M), _O.move(0, 20, 0).rotate(M));
        context.strokeStyle = 'blue';
        drawLine(_O.move(0, 0, -20).rotate(M), _O.move(0, 0, 20).rotate(M));
        context.lineWidth = 1;

        var _H = new Point(xh, yh, zh);
        context.strokeStyle = 'black';
        drawCircle(_H, 2);
    }

    console.error('DONE');
}

var onChangeAngle = function () {
    var alpha = +$('[name="alpha"]').val();
    var beta = +$('[name="beta"]').val();
    var gamma = +$('[name="gamma"]').val();
    var XH = +$('[name="X"]').val();
    var YH = +$('[name="Y"]').val();
    var ZH = +$('[name="Z"]').val();
    var width = +$('[name="width"]').val();
    var height = +$('[name="height"]').val();

    $('[name="alphaR"]').val(alpha);
    $('[name="betaR"]').val(beta);
    $('[name="gammaR"]').val(gamma);

    drawRect(alpha, beta, gamma, XH, YH, ZH, width, height);
    drawUserPolygon();
};

var onChangeRange = function () {
    var alpha = +$('[name="alphaR"]').val();
    var beta = +$('[name="betaR"]').val();
    var gamma = +$('[name="gammaR"]').val();

    $('[name="alpha"]').val(alpha);
    $('[name="beta"]').val(beta);
    $('[name="gamma"]').val(gamma);

    onChangeAngle();
};

function compareCoordinates(list1, list2) {
    var result = 0;

    for (var i = 0; i < list1.length; ++i) {
        result += list1[i].distance(list2[i]);
    }

    return result;
}

$(document).ready(function () {
    $('#start').click(function () {
        var alpha = +$('[name="alpha"]').val();
        var beta = +$('[name="beta"]').val();
        var gamma = +$('[name="gamma"]').val();

        var id = setInterval(function () {
            if ((gamma += 10) > 360) {
                gamma = 0;
                if ((beta += 10) > 360) {
                    beta = 0;
                    if ((alpha += 10) > 360) {
                        alpha = 0;
                        clearInterval(id);
                        return;
                    }
                }
            }

            $('[name="alpha"]').val(alpha);
            $('[name="beta"]').val(beta);
            $('[name="gamma"]').val(gamma);

            onChangeAngle();
        }, 10);

        $('#stop').click(function () {
            clearInterval(id);
        });
    });

    $('#random').click(function () {
        var alpha = Math.floor(Math.random() * 360);
        var beta = Math.floor(Math.random() * 360);
        var gamma = Math.floor(Math.random() * 360);

        $('[name="alpha"]').val(alpha);
        $('[name="beta"]').val(beta);
        $('[name="gamma"]').val(gamma);

        //noinspection JSUnusedAssignment
        noLines = true;
        onChangeAngle();
        noLines = false;
    });

    $('#reset').click(function () {
        $('[name="alpha"]').val(0);
        $('[name="beta"]').val(0);
        $('[name="gamma"]').val(0);

        onChangeAngle();
    });

    $('#solve').click(function () {
        var alpha, beta, gamma;
        var height, width;
        var xH, yH;

        var angleStep = 1;

        for (gamma = 0; gamma < 360; gamma += angleStep) {
            var Mz = generateRotationMatrix(gamma, 'z');
            for (alpha = 0; alpha < 360; alpha += angleStep) {
                var Mx = generateRotationMatrix(alpha, 'x');
                var M = mul(Mz, Mx);
                for (beta = 0; beta < 360; beta += angleStep) {
                    var My = generateRotationMatrix(beta, 'y');
                    M = mul(M, My);

                    // TODO
                }
            }
        }
    });
});

var userCoordinates = [];

function drawUserPolygon() {
    if (!userCoordinates.length) {
        return;
    }

    if (userCoordinates.length === 4) {
        var dX = -userCoordinates[0].getX();
        var dY = -userCoordinates[0].getY();

        userCoordinates = userCoordinates.map(function (point) {
            return point.move(dX, dY, 0);
        });
    }

    var canvas = $('canvas')[0];
    var context = canvas.getContext('2d');
    var p1, p2;

    context.strokeStyle = 'red';

    p1 = userCoordinates[0];
    context.beginPath();
    context.arc(p1.getX() + 200, p1.getY() + 200, 2, 0, 2 * Math.PI, false);
    context.stroke();

    for (var i = 1; i < userCoordinates.length; ++i) {
        p1 = userCoordinates[i - 1];
        p2 = userCoordinates[i];

        context.beginPath();
        context.moveTo(p1.getX() + 200, p1.getY() + 200);
        context.lineTo(p2.getX() + 200, p2.getY() + 200);
        context.stroke();

        context.beginPath();
        context.arc(p2.getX() + 200, p2.getY() + 200, 2, 0, 2 * Math.PI, false);
        context.stroke();
    }

    if (userCoordinates.length === 4) {
        p1 = userCoordinates[userCoordinates.length - 1];
        p2 = userCoordinates[0];

        context.beginPath();
        context.moveTo(p1.getX() + 200, p1.getY() + 200);
        context.lineTo(p2.getX() + 200, p2.getY() + 200);
        context.stroke();
    }
}

setPoint = function (mouseEvent) {
    var x = mouseEvent.offsetX - 200;
    var y = mouseEvent.offsetY - 200;

    var point = new Point(x, y);

    if (userCoordinates.length === 4) {
        userCoordinates = [];
    }

    userCoordinates.push(point);
    onChangeAngle();
};
