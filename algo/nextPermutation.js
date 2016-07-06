/**
 * Created by aa.shirkin on 01.07.2016.
 */

Array.prototype.swap = function (i, j) {
    this[j] = [this[i], this[i] = this[j]][0];
};

Array.prototype.nextPermutation = function (compare) {
    for (var i = this.length - 1; i > 0 && this[i - 1] >= this[i]; --i);
    if (i === 0) return false;
    for (var j = this.length - 1; this[i - 1] >= this[j]; --j);
    this.swap(i - 1, j);
    for (j = this.length - 1; i < j; ++i, --j) this.swap(i, j);
    return true;
};
