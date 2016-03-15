document.onpaste = function (event) {
    var items = event.clipboardData.items;

    if (items) {
        var item = items[0];

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
