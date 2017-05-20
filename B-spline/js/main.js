require.config({
    paths: {
        Point: 'modules/Point',
        TridiagonalMatrix: 'modules/TridiagonalMatrix',
        LinearSystem: 'modules/LinearSystem',
        BicubicSpline: 'modules/BicubicSpline',
        Canvas: 'modules/Canvas'
    }
});

require(['Point', 'BicubicSpline', 'Canvas'], function (Point, BicubicSpline, Canvas) {
    let spline = new BicubicSpline([
        new Point(0, 0),
        new Point(10, 100),
        new Point(128, 190),
        new Point(134, 226),
        new Point(176, 26),
        new Point(255, 255)
    ]);

    let points = [];
    for (let x = 0; x <= 255; ++x) {
        points.push(new Point(x, Math.max(0, Math.min(spline.getY(x), 255))));
    }

    new Canvas(document.getElementById('curve')).drawCurve(points);
});
