define(['helpers'], function (helpers) {
    /**
     * Создать Rule-объект
     * @param {string} left
     * @param {Array} right
     * @constructor
     */
    var Rule = function Rule(left, right) {
        this._origin = {};
        this._origin[left] = right;

        this._left = helpers.splitBytes(left);
        this._right = right[0];
        this._isEnabled = right[1];
    };

    /**
     * @returns {string}
     */
    Rule.prototype.getOrigin = function getOrigin() {
        return this._origin;
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
