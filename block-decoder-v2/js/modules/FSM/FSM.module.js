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

        this.reset();

        for (left in rules) {
            if (rules.hasOwnProperty(left)) {
                this.addRule(left, rules[left]);
            }
        }
    };

    FSM.prototype.decode = function (bytes) {
        var stateFrom = 0;
        var result = '';
        var buffer = '';

        for (var i = 0, n = bytes.length; i < n; ++i) {
            var byte = bytes[i];
            var stateTo = this._fsm[stateFrom][byte];

            if (!stateTo) {
                stateFrom = this._fsm[0][byte];
                result += buffer;
                buffer = this._decodeSingle(byte);
            } else {
                stateFrom = stateTo;
                buffer = this._fsm[stateTo].value || buffer + this._decodeSingle(byte);
            }
        }

        return result + buffer;
    };

    return FSM;
});
