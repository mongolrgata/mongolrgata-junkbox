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

require(['Canvas'], function (Canvas) {
    const ORIGIN_IMAGE_UUID = '103ad3a5-6171-4c4c-8be4-11b3a8defce6';
    const MASK_IMAGE_UUID = 'c84e397f-458c-40f0-9cf4-2334bb79b713';

    let originCanvas = new Canvas(document.getElementById('origin-canvas'), ORIGIN_IMAGE_UUID);
    let maskCanvas = new Canvas(document.getElementById('mask-canvas'), MASK_IMAGE_UUID);

    document.getElementById('origin-file').onchange = function () {
        originCanvas.loadFile(this.files[0]);
    };

    document.getElementById('mask-file').onchange = function () {
        maskCanvas.loadFile(this.files[0]);
    };

    document.getElementById('save-origin').onclick = function () {
        originCanvas.saveImageData(ORIGIN_IMAGE_UUID);
    };

    document.getElementById('save-mask').onclick = function () {
        maskCanvas.saveImageData(MASK_IMAGE_UUID);
    };
});
