/**
 * Created by aa.shirkin on 17.06.2016.
 */

var Pattern = function (strings) {
    this._pattern = strings.split('\n');
};

Pattern.prototype.toString = function () {
    return this._pattern.join('\n');
};

Pattern.prototype.rotate = function () {
    var result = [];
    var width = this._pattern[0].length;
    var height = this._pattern.length;

    for (var i = 0; i < height; ++i) {
        for (var j = 0; j < width; ++j) {
            result[j] = this._pattern[i][j] + '' + (result[j] || '');
        }
    }

    this._pattern = result;
};

Pattern.prototype.flipHorizontal = function () {

};

Pattern.prototype.flipVertical = function () {

};

/*
 var pattern = new Pattern('1\n2\n3\n4');
 pattern.rotate();
 '' + pattern;
 */
