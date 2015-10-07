define(['extends'], {
    hexlify: function hexlify(byte) {
        return byte.toString(16).toUpperCase().rJust(2, '0');
    },
    splitBytes: function splitBytes(string) {
        return string.match(/\[..]/g).map(function (value) {
            return parseInt(value.slice(1, 3), 16);
        });
    },
    codeTable: function charTable() {
        var result = {};

        for (var i = 0x00; i < 0x80; ++i) {
            result[['[', this.hexlify(i.rotl8(2)), ']'].join('')] = String.fromCharCode(i);
        }

        return result;
    }
});
