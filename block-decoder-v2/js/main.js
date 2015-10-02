require.config({
   paths: {
      jquery: 'lib/jquery-2.1.4.min',
      FSM   : 'modules/FSM/FSM.module'
   }
});

require(['FSM', 'jquery'], function (FSM, $) {
   var fsm = new FSM();

   $(document).ready(function () {
   });
});
