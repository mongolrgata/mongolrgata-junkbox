define(['helpers'], function (helpers) {
    /**
     * Создать Rule-объект
     * @param {Array|string} left
     * @param {string} right
     * @param {boolean} isEnabled
     * @constructor
     */
    var Rule = function Rule(left, right, isEnabled) {
        if (typeof left === 'string') {
            left = helpers.splitBytes(left);
        }

        this._left = left;
        this._right = right;
        this._isEnabled = isEnabled;
    };

    /**
     * @returns {Array}
     */
    Rule.prototype.getLeft = function getLeft() {
        return this._left;
    };

    /**
     * @returns {string}
     */
    Rule.prototype.getRight = function getRight() {
        return this._right;
    };

    /**
     * @returns {boolean}
     */
    Rule.prototype.isEnabled = function isEnabled() {
        return this._isEnabled;
    };

    return Rule;
});
