define(['extends'], {
   hexlify: function hexlify(byte) {
      return byte.toString(16).toUpperCase().rJust(2, '0');
   }
});
