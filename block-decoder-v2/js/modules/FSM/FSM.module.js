define(['helpers'], function (helpers) {
   var FSM = function () {
      this._fsm = [[]];

      for (var i = 0; i <= 0xFF; ++i) {
         this.addRule([i], ['[', helpers.hexlify(i), ']'].join(''));
      }
   };

   FSM.prototype.addRule = function (left, right) {
      var stateFrom = 0;

      for (var i = 0, n = left.length; i < n; ++i) {
         var byte = left[i];
         var stateTo = this._fsm[stateFrom][byte];

         if (!stateTo) {
            stateTo = this._fsm.push([]) - 1;
            this._fsm[stateFrom][byte] = stateTo;
         }

         stateFrom = stateTo;
      }

      this._fsm[stateFrom].value = right;
   };

   FSM.prototype.decode = function (bytes) {
      var stateFrom = 0;
      var result = '';
      var buffer = '';

      for (var i = 0, n = bytes.length; i < n; ++i) {
         var byte = bytes[i];
         var stateTo = this._fsm[stateFrom][byte];

         if (!stateTo) {
            result += this._fsm[stateFrom].value;
            stateFrom = this._fsm[0][byte];
         } else {
            stateFrom = this._fsm[stateFrom][byte];
         }
      }

      return result;
   };

   return FSM;
});
