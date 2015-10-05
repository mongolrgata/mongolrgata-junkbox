define([], {
   save : function save(key, object) {
      localStorage.setItem(key, JSON.stringify(object));
   },
   load : function load(key) {
      return JSON.parse(localStorage.getItem(key));
   },
   clear: function clear() {
      localStorage.clear();
   }
});
