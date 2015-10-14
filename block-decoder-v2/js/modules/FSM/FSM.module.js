define(['helpers'], function (helpers) {
    /**
     * FSM-объект
     * @constructor
     */
    var FSM = function () {
        this.reset();
    };

    /**
     * @param {Array} bytes
     * @param {string} string
     * @private
     */
    FSM.prototype._addRule = function (bytes, string) {
        var stateFrom = 0;

        for (var i = 0, n = bytes.length; i < n; ++i) {
            var byte = bytes[i];
            var stateTo = this._fsm[stateFrom][byte];

            if (!stateTo) {
                stateTo = this._fsm.push([]) - 1;
                this._fsm[stateFrom][byte] = stateTo;
            }

            stateFrom = stateTo;
        }

        this._fsm[stateFrom].value = string;
    };

    /**
     * @param {number} stateFrom
     * @param {number} byte
     * @returns {number|null}
     * @private
     */
    FSM.prototype._stateTo = function (stateFrom, byte) {
        return helpers.defined(this._fsm[stateFrom][byte]);
    };

    /**
     * @param {number} state
     * @returns {number|null}
     * @private
     */
    FSM.prototype._stateValue = function (state) {
        return helpers.defined(this._fsm[state].value);
    };

    /**
     * @param {number} byte
     * @returns {string}
     * @private
     */
    FSM.prototype._decodeSingle = function (byte) {
        return this._fsm[this._fsm[0][byte]].value;
    };

    /**
     * Сбросить в начальное состояние
     */
    FSM.prototype.reset = function () {
        this._fsm = [[]];
        this._rules = {};

        for (var i = 0; i <= 0xFF; ++i) {
            this._addRule([i], ['[', helpers.hexlify(i), ']'].join(''));
        }
    };

    /**
     * @returns {{}}
     */
    FSM.prototype.getRules = function () {
        return this._rules;
    };

    /**
     * @param {{}} rules
     */
    FSM.prototype.setRules = function (rules) {
        this.reset();

        for (var left in rules) {
            if (rules.hasOwnProperty(left)) {
                this.addRule(left, rules[left]);
            }
        }
    };

    /**
     * Добавить правило
     * @param {string} left формат: '[XX][XX]..[XX]'
     * @param {string} right
     */
    FSM.prototype.addRule = function (left, right) {
        this._addRule(helpers.splitBytes(left), right);
        this._rules[left] = right;
    };

    /**
     * Удалить правило
     * @param {string} left формат: '[XX][XX]..[XX]'
     */
    FSM.prototype.deleteRule = function (left) {
        var rules = this._rules;
        delete rules[left];

        this.setRules(rules);
    };

    /**
     * Применить правила
     * @param {Array} bytes
     * @returns {string}
     */
    FSM.prototype.decode = function (bytes) {
        var result = '';
        var buffer = '';
        var tail = '';

        var stateFrom = 0;

        for (var i = 0, p = 0, n = bytes.length; i < n;) {
            var byte = bytes[i];
            var stateTo = this._stateTo(stateFrom, byte);

            if (stateTo !== null) {
                var value = this._stateValue(stateTo);

                if (value !== null) {
                    buffer = value;
                    tail = '';
                    p = i;
                } else {
                    tail += this._decodeSingle(byte);
                }

                stateFrom = stateTo;
                ++i;
            } else {
                result += buffer;
                stateFrom = 0;
                i = p + 1;
            }
        }

        return result + buffer + tail;
    };

    return FSM;
});
