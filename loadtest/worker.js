/**
 * Created by aa.shirkin on 14.06.2016.
 */

const MAX_I = 5;
const MAX_J = 2;
const MAX_K = 3;

var i = 0, j = 0, k = 0;
var id = setInterval(function() {
   self.postMessage({'percent': (Math.round((i * MAX_J * MAX_K + j * MAX_K + k) / (MAX_I * MAX_J * MAX_K) * 100)) + '%', 'done': false});

   if (i === MAX_I) {
      self.postMessage({'done': true});
      clearInterval(id);
      return;
   }

   if (j === MAX_J) {
      ++i;
      j = 0;

      return;
   }

   if (k === MAX_K) {
      ++j;
      k = 0;
      return;
   }

   // do something
   ++k;
}, 10);
