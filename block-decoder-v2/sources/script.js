Object.defineProperty(String.prototype, 'rJust', {
   configurable: true,
   enumerable  : false,
   writable    : true,
   value       : function rJust(width, fillChar) {
      fillChar = (fillChar || ' ').charAt(0);
      return new Array(Math.max(0, width - this.length + 1)).join(fillChar) + this;
   }
});

require(['sources/FSM.module.js'], function() {
   //var hexlify = function hexlify(byte) {
   //   return byte.toString(16).toUpperCase().rJust(2, '0');
   //};

   var fsm = new FSM();

   //console.log(fsm.decode([0, 1, 2, 3]));
});

