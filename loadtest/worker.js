/**
 * Created by aa.shirkin on 14.06.2016.
 */

const MAX_I = 100;
const MAX_J = 100;
const MAX_K = 1000;

// var i = 0, j = 0, k = 0;
// var id = setInterval(function() {
//    self.postMessage({'percent': (Math.round((i * MAX_J * MAX_K + j * MAX_K + k) / (MAX_I * MAX_J * MAX_K) * 100)) + '%', 'done': false});
//
//    if (i === MAX_I) {
//       self.postMessage({'done': true});
//       clearInterval(id);
//       return;
//    }
//
//    if (j === MAX_J) {
//       ++i;
//       j = 0;
//
//       return;
//    }
//
//    if (k === MAX_K) {
//       ++j;
//       k = 0;
//       return;
//    }
//
//    // do something
//    ++k;
// }, 10);

var percent = 0;
for (var i = 0; i < MAX_I; ++i) {
   self.postMessage({'percent': percent});
   for (var j = 0; j < MAX_J; ++j) {
      for (var k = 0; k < MAX_K; ++k) {
         percent = (Math.round((i * MAX_J * MAX_K + j * MAX_K + k) / (MAX_I * MAX_J * MAX_K) * 100)) + '%';
      }
   }
}

self.postMessage({'done': true});
close();
