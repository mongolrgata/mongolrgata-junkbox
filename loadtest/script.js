/**
 * Created by aa.shirkin on 14.06.2016.
 */

$(document).ready(function() {
   var worker = new Worker('worker.js');

   worker.onmessage = function(e) {
      if (e.data.done) {
         $('div').detach();
      }
      
      document.getElementsByTagName('div')[0].style.width = e.data.percent;
   };
});
