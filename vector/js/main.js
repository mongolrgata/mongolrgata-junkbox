/**
 * Created by mongolrgata
 */

require.config({
    paths: {
        jquery: 'lib/jquery-2.1.4.min',
        doT: 'lib/doT.min',
        BWImage: 'modules/BWImage/BWImage.module',
        BezierSolver: 'modules/BezierSolver/BezierSolver.module'
    }
});

require(['jquery', 'doT', 'BWImage'], function ($, doT, BWImage) {
    $(document).ready(function () {
        $('button').click(function () {
            var image = new BWImage();
            image.loadTest($('body'));

            $(this).hide();
        });
    });
});
