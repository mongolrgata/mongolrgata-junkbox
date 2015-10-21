define(['helpers'], function (helpers) {
    /**
     * Создать Rule-объект
     * @param {string} left
     * @param {string} right
     * @constructor
     */
    var Rule = function Rule(left, right) {
        if (typeof left === 'string') {
            left = helpers.splitBytes(left);
        }

        this._left = left;
        this._right = right;

        // TODO
        this._isEnabled = true;
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
