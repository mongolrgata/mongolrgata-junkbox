define([], {
    save: function save(key, object) {
        localStorage.setItem(key, JSON.stringify(object));
    },
    load: function load(key, defaultValue) {
        return JSON.parse(localStorage.getItem(key)) || defaultValue;
    },
    clear: function clear() {
        localStorage.clear();
    }
});
