/**
 * Created by aa.shirkin on 25.05.2016.
 */

DataTransferItemList.prototype[Symbol.iterator] = Array.prototype[Symbol.iterator];

var solveOffsetX = 10;
var solveOffsetY = 100;
var gImage = null;

document.onpaste = function (event) {
    for (var item of event.clipboardData.items) {
        if (item.kind === 'file' && item.type.startsWith('image/')) {
            var blob = item.getAsFile();

            var reader = new FileReader();
            reader.onload = function (event) {

                var image = new Image();
                image.onload = function () {
                    gImage = image;
                    onChangeAngle();
                };
                image.src = event.target.result;

                // document.getElementsByTagName('body')[0].appendChild(canvas);
            };
            reader.readAsDataURL(blob);
        }
    }
};

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

        const MAX_DIFF = 1;
        const MAX_TRY = 20;

        var defaultPoint0 = new Point(0, 0);
        var defaultPoint1 = new Point(100, 0);
        var defaultPoint3 = new Point(0, 100);

        var best = Infinity;

        for (gamma = 0; gamma < 360; gamma += angleStep) {
            var Mz = generateRotationMatrix(gamma, Matrix.Oz);
            for (alpha = 0; alpha < 360; alpha += angleStep) {
                var Mx = generateRotationMatrix(alpha, Matrix.Ox);
                var M_ = mul(Mz, Mx);
                for (beta = 0; beta < 360; beta += angleStep) {
                    var My = generateRotationMatrix(beta, Matrix.Oy);
                    var M = mul(M_, My);

                    for (xH = -200; xH <= 200; xH += hStep) {
                        for (yH = -200; yH <= 200; yH += hStep) {
                            var hPnt = new Point(xH, yH, zH);

                            var $p0 = defaultPoint0.rotate(M, hPnt).calcScreen(hPnt);
                            var $p1 = defaultPoint1.rotate(M, hPnt).calcScreen(hPnt);
                            var $p3 = defaultPoint3.rotate(M, hPnt).calcScreen(hPnt);

                            var
                                dx = -$p0.getX(),
                                dy = -$p0.getY();

                            $p0.move(dx, dy);
                            $p1.move(dx, dy);
                            $p3.move(dx, dy);

                            var line01_ = new Line($p0, $p1);
                            var line03_ = new Line($p0, $p3);

                            var diff =
                                Math.abs(line01_.getAngle() - line01.getAngle()) +
                                Math.abs(line03_.getAngle() - line03.getAngle());

                            if (diff < MAX_DIFF) {
                                var originWidth = 100;
                                var originHeight = 100;

                                for (var i = 0; i < MAX_TRY; ++i) {
                                    var dW = line01_.getLength() / line01.getLength();
                                    var dH = line03_.getLength() / line03.getLength();

                                    originWidth /= dW;
                                    originHeight /= dH;

                                    var dP0 = new Point(0, 0).rotate(M, hPnt).calcScreen(hPnt);
                                    var dP1 = new Point(originWidth, 0).rotate(M, hPnt).calcScreen(hPnt);
                                    var dP3 = new Point(0, originHeight).rotate(M, hPnt).calcScreen(hPnt);

                                    var
                                        ddx = -dP0.getX(),
                                        ddy = -dP0.getY();

                                    dP0.move(ddx, ddy);
                                    dP1.move(ddx, ddy);
                                    dP3.move(ddx, ddy);

                                    line01_ = new Line(dP0, dP1);
                                    line03_ = new Line(dP0, dP3);
                                }

                                originWidth = Math.round(originWidth);
                                originHeight = Math.round(originHeight);

                                var dP2 = new Point(originWidth, originHeight).rotate(M, hPnt).calcScreen(hPnt).move(ddx, ddy);

                                var $p2 = userCoordinates[2];
                                var dist = dP2.distance($p2);

                                if (best > dist) {
                                    best = dist;

                                    $('[name="alpha"]').val(alpha);
                                    $('[name="beta"]').val(beta);
                                    $('[name="gamma"]').val(gamma);
                                    $('[name="X"]').val(xH);
                                    $('[name="Y"]').val(yH);
                                    $('[name="width"]').val(originWidth);
                                    $('[name="height"]').val(originHeight);
                                }

                            }
                        }
                    }
                }
            }
        }

        onChangeAngle();
    });

    $('#resolve').click(function () {
        var alpha, beta, gamma;
        var height, width;
        var xH, yH, zH = +$('[name="Z"]').val();

        var alpha0 = +$('[name="alpha"]').val();
        var beta0 = +$('[name="beta"]').val();
        var gamma0 = +$('[name="gamma"]').val();
        var xh0 = +$('[name="X"]').val();
        var yh0 = +$('[name="Y"]').val();
        var width0 = +$('[name="width"]').val();
        var height0 = +$('[name="height"]').val();

        var angleStep = 1;
        var hStep = 2;

        const MAX_DIFF = 1;
        const MAX_TRY = 100;

        var defaultPoint0 = new Point(0, 0);
        var defaultPoint1 = new Point(width0, 0);
        var defaultPoint3 = new Point(0, height0);

        var best = Infinity;

        for (gamma = gamma0 - 10; gamma <= gamma0 + 10; gamma += angleStep) {
            console.log(gamma);
            var Mz = generateRotationMatrix(gamma, Matrix.Oz);
            for (alpha = alpha0 - 10; alpha <= alpha0 + 10; alpha += angleStep) {
                var Mx = generateRotationMatrix(alpha, Matrix.Ox);
                var M_ = mul(Mz, Mx);
                for (beta = beta0 - 10; beta <= beta0 + 10; beta += angleStep) {
                    var My = generateRotationMatrix(beta, Matrix.Oy);
                    var M = mul(M_, My);

                    for (xH = xh0 - 20; xH <= xh0 + 20; xH += hStep) {
                        for (yH = yh0 - 20; yH <= yh0 + 20; yH += hStep) {
                            var hPnt = new Point(xH, yH, zH);

                            var $p0 = defaultPoint0.rotate(M, hPnt).calcScreen(hPnt);
                            var $p1 = defaultPoint1.rotate(M, hPnt).calcScreen(hPnt);
                            var $p3 = defaultPoint3.rotate(M, hPnt).calcScreen(hPnt);

                            var
                                dx = -$p0.getX(),
                                dy = -$p0.getY();

                            $p0.move(dx, dy);
                            $p1.move(dx, dy);
                            $p3.move(dx, dy);

                            var line01_ = new Line($p0, $p1);
                            var line03_ = new Line($p0, $p3);

                            var diff =
                                Math.abs(line01_.getAngle() - line01.getAngle()) +
                                Math.abs(line03_.getAngle() - line03.getAngle());

                            if (diff < MAX_DIFF) {
                                var originWidth = width0;
                                var originHeight = height0;

                                for (var i = 0; i < MAX_TRY; ++i) {
                                    if (line01_.getLength() < line01.getLength()) {
                                        originWidth += 1;
                                    } else {
                                        originWidth -= 1;
                                    }

                                    if (line03_.getLength() < line03.getLength()) {
                                        originHeight += 1;
                                    } else {
                                        originHeight -= 1;
                                    }

                                    var dP0 = new Point(0, 0).rotate(M, hPnt).calcScreen(hPnt);
                                    var dP1 = new Point(originWidth, 0).rotate(M, hPnt).calcScreen(hPnt);
                                    var dP3 = new Point(0, originHeight).rotate(M, hPnt).calcScreen(hPnt);

                                    var
                                        ddx = -dP0.getX(),
                                        ddy = -dP0.getY();

                                    dP0.move(ddx, ddy);
                                    dP1.move(ddx, ddy);
                                    dP3.move(ddx, ddy);

                                    line01_ = new Line(dP0, dP1);
                                    line03_ = new Line(dP0, dP3);
                                }

                                var dP2 = new Point(originWidth, originHeight).rotate(M, hPnt).calcScreen(hPnt).move(ddx, ddy);

                                var $p2 = userCoordinates[2];
                                var dist = dP2.distance($p2);

                                if (best > dist) {
                                    best = dist;

                                    $('[name="alpha"]').val(alpha);
                                    $('[name="beta"]').val(beta);
                                    $('[name="gamma"]').val(gamma);
                                    $('[name="X"]').val(xH);
                                    $('[name="Y"]').val(yH);
                                    $('[name="width"]').val(originWidth);
                                    $('[name="height"]').val(originHeight);
                                }

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
    var hX = +$('[name="X"]').val();
    var hY = +$('[name="Y"]').val();

    $('[name="cX"]').val(hX);
    $('[name="cY"]').val(hY);
    centerPoint = new Point(
        hX,
        hY
    );

    horizonPoint = new Point(
        hX,
        hY,
        +$('[name="Z"]').val()
    );

    $('[name="alphaR"]').val(alpha);
    $('[name="betaR"]').val(beta);
    $('[name="gammaR"]').val(gamma);
    $('[name="widthR"]').val(width);
    $('[name="heightR"]').val(height);
    $('[name="xR"]').val(hX);
    $('[name="yR"]').val(hY);

    var canvas = $('canvas')[0];
    var context = canvas.getContext('2d');
    context.clearRect(0, 0, canvas.width, canvas.height);

    if (gImage) {
        canvas.width = gImage.width;
        canvas.height = gImage.height;
        $(canvas).css({
            width: gImage.width,
            height: gImage.height
        });
        context.drawImage(gImage, 0, 0);

        var imageData = context.getImageData(0, 0, canvas.width, canvas.height);
        for (var i = 0; i < imageData.data.length; ++i) {
            if ((i + 1) % 4) {
                imageData.data[i] += (255 - imageData.data[i]) / 2;
            }
        }
        context.putImageData(imageData, 0, 0);
    }

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

    var needPrint;
    var count = 0;

    function calcPoint(point) {
        function printPoint(point) {
            var x = point.getX();
            var y = point.getY();

            $('#coordinates-list').append($('<p/>').text('x = ' + Math.round(x) + '; y = ' + Math.round(y)));
        }

        var tempPoint = point.calcScreen(horizonPoint).move(solveOffsetX, solveOffsetY).move(dx, dy);

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

    var tmpPoint = $p0.calcScreen(horizonPoint);
    var dx = -Math.round(tmpPoint.getX());
    var dy = -Math.round(tmpPoint.getY());

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

    var posX = solveOffsetX + dx;
    var posY = solveOffsetY + dy;
    var alpha = α;
    var beta = β;
    var gamma = γ;
    var hX = solveOffsetX + horizonPoint.getX() + dx;
    var hY = solveOffsetY + horizonPoint.getY() + dy;
    //noinspection JSAnnotator
    var line = `{\\p1\\pos(${posX},${posY})\\frx${alpha}\\fry${beta}\\frz${gamma}\\org(${hX},${hY})}m 0 0 l 0 ${height} ${width} ${height} ${width} 0{\\p0}`;

    $('#coordinates-list').append($('<p class="result-line"/>').text(line));
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
    context.arc(p1.getX() + solveOffsetX, p1.getY() + solveOffsetY, 2, 0, 2 * Math.PI, false);
    context.stroke();

    for (var i = 1; i < userCoordinates.length; ++i) {
        p1 = userCoordinates[i - 1];
        p2 = userCoordinates[i];

        context.beginPath();
        context.moveTo(p1.getX() + solveOffsetX, p1.getY() + solveOffsetY);
        context.lineTo(p2.getX() + solveOffsetX, p2.getY() + solveOffsetY);
        context.stroke();

        context.beginPath();
        context.arc(p2.getX() + solveOffsetX, p2.getY() + solveOffsetY, 2, 0, 2 * Math.PI, false);
        context.stroke();
    }

    if (userCoordinates.length === 4) {
        p1 = userCoordinates[userCoordinates.length - 1];
        p2 = userCoordinates[0];

        context.beginPath();
        context.moveTo(p1.getX() + solveOffsetX, p1.getY() + solveOffsetY);
        context.lineTo(p2.getX() + solveOffsetX, p2.getY() + solveOffsetY);
        context.stroke();
    }
}

setPoint = function (mouseEvent) {
    if (userCoordinates.length === 4) {
        userCoordinates = [];

        solveOffsetX = mouseEvent.offsetX;
        solveOffsetY = mouseEvent.offsetY;
    }

    var x = mouseEvent.offsetX - solveOffsetX;
    var y = mouseEvent.offsetY - solveOffsetY;

    var point = new Point(x, y);

    userCoordinates.push(point);
    onChangeAngle();
};

// tryGrabPoint = function(mouseEvent) {
//     var x = mouseEvent.offsetX - solveOffsetX;
//     var y = mouseEvent.offsetY - solveOffsetY;
//
//     var point = new Point(x, y);
//
//     for (var i = 0; i < userCoordinates.length; ++i) {
//         var dist = point.distance(userCoordinates[i]);
//
//         if (dist < 5) {
//             console.error('grabbed');
//         }
//     }
// };
//
// testMouseUp = function() {
//     console.error('mouseup');
// };
//
// testMouseClick = function() {
//     console.error('mouseclick');
// };
//
//     testMouseMove = function() {
//     console.error('mousemove');
// };