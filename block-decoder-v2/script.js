Object.defineProperty(String.prototype, 'rJust', {
   configurable: true,
   enumerable  : false,
   writable    : true,
   value       : function rJust(width, fillChar) {
      fillChar = (fillChar || ' ').charAt(0);
      return new Array(Math.max(0, width - this.length + 1)).join(fillChar) + this;
   }
});

$(document).ready(function () {
   var hexlify = function hexlify(byte) {
      return ['[', byte.toString(16).toUpperCase().rJust(2, '0'), ']'].join('');
   };

   var addRule = function addRule(FSM, left, right) {
      var stateFrom = 0;

      for (var i = 0, n = left.length; i < n; ++i) {
         var byte = left[i];
         var stateTo = FSM[stateFrom][byte];

         if (!stateTo) {
            stateTo = FSM.push([]) - 1;
            FSM[stateFrom][byte] = stateTo;
         }

         stateFrom = stateTo;
      }

      FSM[stateFrom].value = right;
   };

   var decode = function decode(bytes, FSM) {
      var stateFrom = 0;
      var result = '';

      for (var i = 0, n = bytes.length; i < n; ++i) {
         var byte = bytes[i];
         var stateTo = FSM[stateFrom][byte];

         if (!stateTo) {
            result += FSM[stateFrom].value;
            stateFrom = FSM[0][byte];
         } else {
            stateFrom = FSM[stateFrom][byte];
         }
      }

      return result;
   };

   var FSM = (function dummyFSM() {
      var result = [[]];

      for (var i = 0; i <= 0xFF; ++i) {
         addRule(result, [i], hexlify(i));
      }

      return result;
   })();



   console.log(decode([0,1,2,3],FSM));
});
