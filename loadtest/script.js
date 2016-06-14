/**
 * Created by aa.shirkin on 14.06.2016.
 */

document.addEventListener('DOMContentLoaded', function () {
   var worker = new Worker('worker.js');

   worker.onmessage = function(e) {
      if (e.data.done) {
         document.getElementsByTagName('body')[0].innerHTML = 'DONE';
         return;
      }
      
      document.getElementsByTagName('div')[0].style.width = e.data.percent;
   };

   worker.onerror = function(e) {
      console.log(e);
   };
});
