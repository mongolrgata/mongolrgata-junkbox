define(['helpers'], function (helpers) {
    /**
     * Создать State-объект
     * @constructor
     */
    var State = function State() {
        this._value = null;
        this._isFinite = false;
        this._transitions = new Array(255);
    };

    /**
     * Установить значение состояния
     * @param {null|string} value
     */
    State.prototype.setValue = function setValue(value) {
        this._value = value;
    };

    /**
     * Получить значение состояния
     * @returns {null|string} null, если значение не определено
     */
    State.prototype.getValue = function getValue() {
        return this._value;
    };

    /**
     * @param {boolean} isFinite
     */
    State.prototype.setFinite = function setFinite(isFinite) {
        this._isFinite = isFinite;
    };

    /**
     * @returns {boolean}
     */
    State.prototype.isFinite = function isFinite() {
        return this._isFinite;
    };

    /**
     * Установить состояние по переходу
     * @param {number} byte
     * @param {State} state
     */
    State.prototype.setTransition = function setTransition(byte, state) {
        this._transitions[byte] = state;
    };

    /**
     * Получить состояние по переходу
     * @param {number} byte
     * @returns {null|State} null, если нет перехода
     */
    State.prototype.getTransition = function getTransition(byte) {
        return helpers.defined(this._transitions[byte]);
    };

    return State;
});
