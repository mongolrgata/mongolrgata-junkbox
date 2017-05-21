require.config({
    paths: {
        Point: 'modules/Point',
        TridiagonalMatrix: 'modules/TridiagonalMatrix',
        LinearSystem: 'modules/LinearSystem',
        BicubicSpline: 'modules/BicubicSpline',
        Pixel: 'modules/Pixel',
        Filter: 'modules/Filter',
        Canvas: 'modules/Canvas'
    }
});

require(['Pixel', 'Filter', 'Point', 'Canvas'], function (Pixel, Filter, Point, Canvas) {
    let pixel1 = new Pixel(Pixel.HEXtoRGBA('8a294f'));
    let pixel2 = new Pixel(Pixel.HEXtoRGBA('34911a'));
    let filter = new Filter(pixel1, pixel2);
    let canvas = new Canvas(document.getElementById('curve'));

    let points = [];
    for (let x = 0; x <= 255; ++x) {
        points.push(new Point(x, filter._splineR.getY(x)));
    }
    canvas.drawCurve(points, '#F00');
    points = [];
    for (let x = 0; x <= 255; ++x) {
        points.push(new Point(x, filter._splineG.getY(x)));
    }
    canvas.drawCurve(points, '#0F0');
    points = [];
    for (let x = 0; x <= 255; ++x) {
        points.push(new Point(x, filter._splineB.getY(x)));
    }
    canvas.drawCurve(points, '#00F');
});
