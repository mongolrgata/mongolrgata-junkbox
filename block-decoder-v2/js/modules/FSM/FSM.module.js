define(['State', 'helpers'], function (State, helpers) {
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
     * @private
     */
    FSM.prototype._setRule = function _setRule(bytes, string) {
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
    };

    /**
     * @param {number} byte
     * @returns {string}
     * @private
     */
    FSM.prototype._decodeSingle = function (byte) {
        return this._getRootState().getTransition(byte).getValue();
    };

    /**
     * Сбросить FSM-объект
     */
    FSM.prototype.reset = function () {
        this._fsm = new State();

        for (var i = 0; i <= 0xFF; ++i) {
            this._setRule([i], ['[', helpers.hexlify(i), ']'].join(''));
        }
    };

    ///**
    // * @returns {{}}
    // */
    //FSM.prototype.getRules = function () {
    //    return this._rules;
    //};
    //
    ///**
    //* @param {{}} rules
    //*/
    //FSM.prototype.setRules = function (rules) {
    //    this.reset();
    //
    //    for (var left in rules) {
    //        if (rules.hasOwnProperty(left)) {
    //            this.addRule(left, rules[left]);
    //        }
    //    }
    //};
    //
    ///**
    //* Добавить правило
    //* @param {string} left формат: '[XX][XX]..[XX]'
    //* @param {string} right
    //*/
    //FSM.prototype.addRule = function (left, right) {
    //    this._setRule(helpers.splitBytes(left), right);
    //    //this._rules[left] = right;
    //};
    //
    ///**
    // * Удалить правило
    // * @param {string} left формат: '[XX][XX]..[XX]'
    // */
    //FSM.prototype.deleteRule = function (left) {
    //    var rules = this._rules;
    //    delete rules[left];
    //
    //    this.setRules(rules);
    //};

    /**
     * Применить правила
     * @param {Array} bytes
     * @returns {string}
     */
    FSM.prototype.decode = function (bytes) {
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

                if (value === null) {
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
