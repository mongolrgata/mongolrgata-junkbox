DataTransferItemList.prototype[Symbol.iterator] = Array.prototype[Symbol.iterator];

document.onpaste = function (event) {
    for (var item of event.clipboardData.items) {
        if (item.kind === 'file' && item.type.startsWith('image/')) {
            var blob = item.getAsFile();

            var reader = new FileReader();
            reader.onload = function (event) {
                var img = document.createElement('img');
                img.setAttribute('src', event.target.result);

                document.getElementsByTagName('body')[0].appendChild(img);
            };
            reader.readAsDataURL(blob);
        }
    }
};
