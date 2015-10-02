require.config({
   paths: {
      jquery: 'lib/jquery-2.1.4.min',
      FSM   : 'modules/FSM/FSM.module'
   }
});

require(['jquery', 'FSM'], function ($, FSM) {
   var fsm = new FSM();

   $(document).ready(function () {
      fsm.addRule([1,2], '[lol]');
      fsm.addRule([1,2,3], '[loli]');
      fsm.addRule([2,3], '[lolicon]');
      console.log(fsm.decode([9,9,9]));
   });
});
