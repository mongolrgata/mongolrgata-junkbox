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

require(['Canvas', 'Pixel', 'Filter'],
    function (Canvas, Pixel, Filter) {
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

        document.getElementById('do-magic').onclick = function () {
            let beforeHEX = document.getElementById('before-hex').value;
            let afterHEX = document.getElementById('after-hex').value;

            let beforeRGBA = Pixel.HEXtoRGBA(beforeHEX);
            let afterRGBA = Pixel.HEXtoRGBA(afterHEX);

            let filter = new Filter(new Pixel(beforeRGBA), new Pixel(afterRGBA));
            let newImageData = filter.apply(document.getElementById('origin-canvas').getContext('2d').getImageData(0, 0, originCanvas._canvas.width, originCanvas._canvas.height));

            document.getElementById('preview-canvas').width = newImageData.width;
            document.getElementById('preview-canvas').height = newImageData.height;
            document.getElementById('preview-canvas').getContext('2d').putImageData(newImageData, 0, 0)
        };
    }
);
