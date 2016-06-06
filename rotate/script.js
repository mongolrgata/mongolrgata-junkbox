/**
 * Created by aa.shirkin on 25.05.2016.
 */

$(document).ready(function () {
    var canvas = $('canvas')[0];
    canvas.width = 512;
    canvas.height = 512;

    onChangeAngle();
});

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
        $('[name="alpha"]').val(Math.floor(Math.random() * 360));
        $('[name="beta"]').val(Math.floor(Math.random() * 360));
        $('[name="gamma"]').val(Math.floor(Math.random() * 360));
        $('[name="X"]').val(Math.floor(Math.random() * 400) - 200);
        $('[name="Y"]').val(Math.floor(Math.random() * 400) - 200);
        $('[name="width"]').val(Math.floor(Math.random() * 300));
        $('[name="height"]').val(Math.floor(Math.random() * 300));

        onChangeAngle();
    });

    $('#reset').click(function () {
        $('[name="alpha"]').val(0);
        $('[name="beta"]').val(0);
        $('[name="gamma"]').val(0);
        $('[name="X"]').val(0);
        $('[name="Y"]').val(0);
        $('[name="width"]').val(100);
        $('[name="height"]').val(100);

        onChangeAngle();
    });

    $('#solve').click(function () {
        var alpha, beta, gamma;
        var height, width;
        var xH, yH, zH = +$('[name="Z"]').val();

        var angleStep = 10;
        var hStep = 20;

        var diff = Infinity;

        var defaultPoint0 = new Point(0, 0);
        var defaultPoint1 = new Point(100, 0);
        var defaultPoint2 = new Point(100, 100);
        var defaultPoint3 = new Point(0, 100);

        for (gamma = 0; gamma < 360; gamma += angleStep) {
            var Mz = generateRotationMatrix(gamma, Matrix.Oz);
            for (alpha = 0; alpha < 360; alpha += angleStep) {
                var Mx = generateRotationMatrix(alpha, Matrix.Ox);
                var M_ = mul(Mz, Mx);
                for (beta = 0; beta < 360; beta += angleStep) {
                    var My = generateRotationMatrix(beta, Matrix.Oy);
                    var M = mul(M_, My);

                    var p0 = defaultPoint0.rotate(M, centerPoint);
                    var p1 = defaultPoint1.rotate(M, centerPoint);
                    var p3 = defaultPoint3.rotate(M, centerPoint);

                    for (xH = -200; xH <= 200; xH += hStep) {
                        for (yH = -200; yH <= 200; yH += hStep) {
                            var hPnt = new Point(
                                xH,
                                yH,
                                zH
                            );

                            var $p0 = p0.calcScreen(hPnt);
                            var $p1 = p1.calcScreen(hPnt);
                            var $p3 = p3.calcScreen(hPnt);

                            var line01_ = new Line($p0, $p1);
                            var line03_ = new Line($p0, $p3);

                            var diff_ =
                                Math.abs(line01_.getAngle() - line01.getAngle()) +
                                Math.abs(line03_.getAngle() - line03.getAngle()) +
                                Math.abs(line01_.getLength() - line01.getLength()) +
                                Math.abs(line03_.getLength() - line03.getLength());

                            if (diff > diff_) {
                                diff = diff_;
                                $('[name="alpha"]').val(alpha);
                                $('[name="beta"]').val(beta);
                                $('[name="gamma"]').val(gamma);
                                $('[name="X"]').val(xH);
                                $('[name="Y"]').val(yH);
                            }
                        }
                    }
                }
            }
        }

        onChangeAngle();
    });
});

var centerPoint = new Point(0, 0);
var horizonPoint = new Point(0, 0, 311);

var onChangeAngle = function () {
    var alpha = +$('[name="alpha"]').val();
    var beta = +$('[name="beta"]').val();
    var gamma = +$('[name="gamma"]').val();
    var width = +$('[name="width"]').val();
    var height = +$('[name="height"]').val();

    centerPoint = new Point(
        +$('[name="cX"]').val(),
        +$('[name="cY"]').val()
    );

    horizonPoint = new Point(
        +$('[name="X"]').val(),
        +$('[name="Y"]').val(),
        +$('[name="Z"]').val()
    );

    $('[name="alphaR"]').val(alpha);
    $('[name="betaR"]').val(beta);
    $('[name="gammaR"]').val(gamma);
    $('[name="widthR"]').val(width);
    $('[name="heightR"]').val(height);
    $('[name="xR"]').val(horizonPoint.getX());
    $('[name="yR"]').val(horizonPoint.getY());

    drawRect(alpha, beta, gamma, width, height);
    drawUserPolygon();
};

var onChangeRange = function () {
    var alpha = +$('[name="alphaR"]').val();
    var beta = +$('[name="betaR"]').val();
    var gamma = +$('[name="gammaR"]').val();
    var width = +$('[name="widthR"]').val();
    var height = +$('[name="heightR"]').val();
    var x = +$('[name="xR"]').val();
    var y = +$('[name="yR"]').val();

    $('[name="alpha"]').val(alpha);
    $('[name="beta"]').val(beta);
    $('[name="gamma"]').val(gamma);
    $('[name="width"]').val(width);
    $('[name="height"]').val(height);
    $('[name="X"]').val(x);
    $('[name="Y"]').val(y);

    onChangeAngle();
};

function drawRect(α, β, γ, width, height) {
    var canvas = $('canvas')[0];
    var context = canvas.getContext('2d');
    context.clearRect(0, 0, canvas.width, canvas.height);

    var needPrint;
    var count = 0;

    function calcPoint(point) {
        function printPoint(point) {
            var x = point.getX();
            var y = point.getY();

            $('#coordinates-list').append($('<p/>').text('x = ' + Math.round(x) + '; y = ' + Math.round(y)));
        }

        var tempPoint = point.calcScreen(horizonPoint).move(200, 200);

        if ((++count % 2) && needPrint) {
            printPoint(tempPoint);
        }

        return tempPoint;
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

        context.beginPath();
        context.arc(pC.getX(), pC.getY(), r, 0, 2 * Math.PI, false);
        context.stroke();
    }

    var Mx = generateRotationMatrix(α, Matrix.Ox);
    var My = generateRotationMatrix(β, Matrix.Oy);
    var Mz = generateRotationMatrix(γ, Matrix.Oz);
    var M = mul(mul(Mz, Mx), My);

    var p0 = new Point(0, 0);
    var p1 = new Point(width, 0);
    var p2 = new Point(width, height);
    var p3 = new Point(0, height);

    var $p0 = p0.rotate(M, centerPoint);
    var $p1 = p1.rotate(M, centerPoint);
    var $p2 = p2.rotate(M, centerPoint);
    var $p3 = p3.rotate(M, centerPoint);

    $('#coordinates-list').empty();
    needPrint = true;
    context.beginPath();
    context.strokeStyle = 'black';
    drawLine($p0, $p1);
    drawLine($p1, $p2);
    drawLine($p2, $p3);
    drawLine($p3, $p0);
    needPrint = false;

    var _O = new Point(0, 0, 0);
    context.lineWidth = 3;
    context.strokeStyle = 'red';
    drawLine(_O.move(-20, 0, 0).rotate(M, centerPoint), _O.move(20, 0, 0).rotate(M, centerPoint));
    context.strokeStyle = 'green';
    drawLine(_O.move(0, -20, 0).rotate(M, centerPoint), _O.move(0, 20, 0).rotate(M, centerPoint));
    context.strokeStyle = 'blue';
    drawLine(_O.move(0, 0, -20).rotate(M, centerPoint), _O.move(0, 0, 20).rotate(M, centerPoint));
    context.lineWidth = 1;

    context.strokeStyle = 'black';
    drawCircle(centerPoint, 2);
}

var userCoordinates = [
    new Point(0, 0),
    new Point(88, 56),
    new Point(59, 203),
    new Point(-67, 114)
];
var line01, line03;

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

        line01 = new Line(userCoordinates[0], userCoordinates[1]);
        line03 = new Line(userCoordinates[0], userCoordinates[3]);
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
