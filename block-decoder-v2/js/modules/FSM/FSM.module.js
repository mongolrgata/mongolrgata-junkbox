define(['Rule', 'State', 'helpers'], function (Rule, State, helpers) {
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
     * @param {Array} bytes
     * @param {string} string
     * @param {boolean} isEnabled
     * @private
     */
    FSM.prototype._setRule = function _setRule(bytes, string, isEnabled) {
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
        //this._rules = {};

        for (var i = 0; i <= 0xFF; ++i) {
            this._setRule([i], ['[', helpers.hexlify(i), ']'].join(''), true);
        }
    };

    ///**
    // * @param {Rule} rule
    // */
    //FSM.prototype.setRule = function setRule(rule) {
    //    this._setRule(rule);
    //    this._rules.push(rule);
    //};
    //
    ///**
    // * @param {Array} rules
    // */
    //FSM.prototype.setRules = function setRules(rules) {
    //    this.reset();
    //
    //    for (var i = 0, n = rules.length; i < n; ++i) {
    //        this.setRule(rules[i]);
    //    }
    //};
    //
    ///**
    // * @returns {Array}
    // */
    //FSM.prototype.getRules = function () {
    //    return this._rules;
    //};

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
