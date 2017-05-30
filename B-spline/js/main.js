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

require(['Canvas', 'Pixel', 'Point', 'Filter'],
    function (Canvas, Pixel, Point) {
        const ORIGIN_IMAGE_UUID = '103ad3a5-6171-4c4c-8be4-11b3a8defce6';
        const MASK_IMAGE_UUID = 'c84e397f-458c-40f0-9cf4-2334bb79b713';

        let originCanvas = new Canvas(document.getElementById('origin-canvas'), document.getElementById('before-hex'), ORIGIN_IMAGE_UUID);
        let maskCanvas = new Canvas(document.getElementById('mask-canvas'), document.getElementById('after-hex'), MASK_IMAGE_UUID);
        let previewCanvas = new Canvas(document.getElementById('preview-canvas'));

        document.getElementById('before-hex').value = localStorage.getItem('before-hex');
        document.getElementById('after-hex').value = localStorage.getItem('after-hex');
        
        let splineR = new Canvas(document.getElementById('canvas-spline-r'));
        let splineG = new Canvas(document.getElementById('canvas-spline-g'));
        let splineB = new Canvas(document.getElementById('canvas-spline-b'));

        window.lol = originCanvas;

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

        let syncCoefficients = function () {
            if (document.getElementById('sync').checked) {
                document.getElementById('coefficient-before').value = this.value;
                document.getElementById('coefficient-after').value = this.value;
            }

            document.getElementById('before-number').textContent = this.value;
            document.getElementById('after-number').textContent = this.value;
        };

        let filterWorker;
        let applyFilter = function () {
            if (filterWorker) {
                filterWorker.terminate();
            }

            let beforeHEX = document.getElementById('before-hex').value;
            let afterHEX = document.getElementById('after-hex').value;

            let beforeRGBA = Pixel.HEXtoRGBA(beforeHEX);
            let afterRGBA = Pixel.HEXtoRGBA(afterHEX);

            filterWorker = new Worker(`js/workers/filter.js`);
            filterWorker.postMessage({
                coefficientBefore: document.getElementById('coefficient-before').value / 100,
                coefficientAfter: document.getElementById('coefficient-after').value / 100,
                before: beforeRGBA,
                after: afterRGBA,
                imageData: originCanvas.imageData
            });

            filterWorker.onmessage = function (messageEvent) {
                if (messageEvent.data.hasOwnProperty('imageData')) {
                    previewCanvas.imageData = messageEvent.data.imageData;
                } else {
                    splineR.drawCurve(messageEvent.data.splineR.map((value, index) => new Point(index, value)), '#F00');
                    splineG.drawCurve(messageEvent.data.splineG.map((value, index) => new Point(index, value)), '#0F0');
                    splineB.drawCurve(messageEvent.data.splineB.map((value, index) => new Point(index, value)), '#00F');
                }
            }
        };

        document.getElementById('coefficient-before').oninput = syncCoefficients;
        document.getElementById('coefficient-after').oninput = syncCoefficients;

        document.getElementById('coefficient-before').onchange = applyFilter;
        document.getElementById('coefficient-after').onchange = applyFilter;

        document.getElementById('do-magic').onclick = applyFilter;
    }
);
