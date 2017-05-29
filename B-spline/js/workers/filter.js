importScripts('../lib/require.js');

onmessage = function (messageEvent) {
    requirejs({baseUrl: "../modules"}, ['Pixel', 'Filter'], function (Pixel, Filter) {
        let message = messageEvent.data;
        let filter = new Filter(new Pixel(message.before).mul(message.coefficientBefore), new Pixel(message.after).mul(message.coefficientAfter));
        let imageData = filter.apply(message.imageData);

        postMessage(imageData);
    });
};
