require.config({
    paths: {
        Pixel: 'modules/Pixel'
    }
});

require(['Pixel'], function (Pixel) {
    console.log(new Pixel(Pixel.HEXtoRGBA('ff0080')));
});
