define(['Rule', 'State', 'extends'], function (Rule, State) {
    /**
     * Создать FSM-объект
     * @constructor
     */
    var FSM = function FSM() {
        this.reset();
    };

    /**
     * Получить начальное состояние
     * @returns {State}
     * @private
     */
    FSM.prototype._getRootState = function _getRootState() {
        return this._fsm;
    };

    /**
     * Установить правило
     * @param {Rule} rule
     * @private
     */
    FSM.prototype._setRule = function _setRule(rule) {
        var bytes = rule.getLeft();
        var string = rule.getRight();
        var isEnabled = rule.isEnabled();

        var stateCurrent = this._getRootState();

        for (var i = 0, n = bytes.length; i < n; ++i) {
            var byte = bytes[i];
            var stateTo = stateCurrent.getTransition(byte);

            if (stateTo === null) {
                stateTo = new State();
                stateCurrent.setTransition(byte, stateTo);
            }

            stateCurrent = stateTo;
        }

        stateCurrent.setValue(string);
        stateCurrent.setFinite(isEnabled);
    };

    /**
     * @param {number} byte
     * @returns {string}
     * @private
     */
    FSM.prototype._decodeSingle = function _decodeSingle(byte) {
        return this._getRootState().getTransition(byte).getValue();
    };

    /**
     * Сбросить FSM-объект
     */
    FSM.prototype.reset = function reset() {
        this._fsm = new State();
        this._rules = {};

        for (var i = 0; i <= 0xFF; ++i) {
            var hex = ['[', i.toHex(2), ']'].join('');
            this._setRule(new Rule(hex, hex));
        }
    };

    /**
     * Установить правило
     * @param {string} left
     * @param {string} right
     */
    FSM.prototype.setRule = function setRule(left, right) {
        this._setRule(new Rule(left, right));
        this._rules[left] = right;
    };

    /**
     * Установить словарь правил
     * @param {Object} rules
     */
    FSM.prototype.setRules = function setRules(rules) {
        this.reset();

        for (var left in rules) {
            if (rules.hasOwnProperty(left)) {
                this.setRule(left, rules[left]);
            }
        }
    };

    /**
     * Получить словарь правил
     * @returns {Object}
     */
    FSM.prototype.getRules = function () {
        return this._rules;
    };

    /**
     * Применить правила
     * @param {Array} bytes
     * @returns {string}
     */
    FSM.prototype.decode = function decode(bytes) {
        var result = '';
        var buffer = '';
        var tail = '';

        var stateCurrent = this._getRootState();

        for (var i = 0, p = 0, n = bytes.length; i < n;) {
            var byte = bytes[i];
            var stateTo = stateCurrent.getTransition(byte);

            if (stateTo === null) {
                result += buffer;
                stateTo = this._getRootState();
                i = p + 1;
            } else {
                var value = stateTo.getValue();
                var isFinite = stateTo.isFinite();

                if (value === null || !isFinite) {
                    tail += this._decodeSingle(byte);
                } else {
                    buffer = value;
                    tail = '';
                    p = i;
                }

                ++i;
            }

            stateCurrent = stateTo;
        }

        return result + buffer + tail;
    };

    return FSM;
});
