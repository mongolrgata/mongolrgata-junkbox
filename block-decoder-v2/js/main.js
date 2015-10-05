require.config({
   paths: {
      jquery : 'lib/jquery-2.1.4.min',
      FSM    : 'modules/FSM/FSM.module',
      Storage: 'modules/Storage/Storage.module'
   }
});

require(['jquery', 'FSM', 'Storage'], function ($, FSM) {
   var fsm = new FSM();
   var view;

   $(document).ready(function () {
      $('#file-in')
         .click(function () {
            this.value = null;
         })
         .change(function () {
            var f_in = this.files[0];
            var reader = new FileReader();

            reader.onloadend = function (e) {
               var result = e.currentTarget.result;
               var view = new Uint8Array(result);

               console.log(fsm.decode(view));
            };

            reader.readAsArrayBuffer(f_in);
         });
   });
});
