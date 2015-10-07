define(['extends'], {
    hexlify: function hexlify(byte) {
        return byte.toString(16).toUpperCase().rJust(2, '0');
    },
    splitBytes: function splitBytes(string) {
        return string.match(/\[..]/g).map(function (value) {
            return parseInt(value.slice(1, 3), 16);
        });
    }
});
