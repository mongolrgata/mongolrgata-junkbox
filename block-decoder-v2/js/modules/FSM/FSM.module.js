define(['helpers'], function (helpers) {
    var FSM = function (rules) {
        this.reset(rules || {});
    };

    FSM.prototype._decodeSingle = function (byte) {
        return this._fsm[this._fsm[0][byte]].value;
    };

    FSM.prototype.reset = function (rules) {
        this._fsm = [[]];
        this._rules = {};

        for (var i = 0; i <= 0xFF; ++i) {
            var hexI = ['[', helpers.hexlify(i), ']'].join('');
            this.addRule(hexI, hexI);
        }

        for (var left in rules) {
            if (rules.hasOwnProperty(left)) {
                this.addRule(left, rules.left);
            }
        }
    };

    FSM.prototype.addRule = function (left, right) {
        var stateFrom = 0;

        for (var i = 0, n = helpers.split(left).length; i < n; ++i) {
            var byte = left[i];
            var stateTo = this._fsm[stateFrom][byte];

            if (!stateTo) {
                stateTo = this._fsm.push([]) - 1;
                this._fsm[stateFrom][byte] = stateTo;
            }

            stateFrom = stateTo;
        }

        this._fsm[stateFrom].value = right;
        this._rules[left] = right;
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
