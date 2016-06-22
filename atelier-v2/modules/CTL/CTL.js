/**
 * Created by aa.shirkin on 22.06.2016.
 */

class CTL {
    /**
     * @param {string} path
     */
    constructor(path) {
        var self = this;
        this._template = null;

        $.ajax({
            url: path,
            success: function (data) {
                self._template = data;
            },
            async: false
        });
    }

    /**
     * @param {object} cfg
     * @returns {jQuery}
     */
    applyCfg(cfg) {
        var $result = $(this._template);

        for (var className in cfg) {
            if (cfg.hasOwnProperty(className)) {
                var handlers = cfg[className];

                for (var event in handlers) {
                    if (handlers.hasOwnProperty(event)) {
                        var handler = handlers[event];

                        $result.find('.' + className).on(event, handler);
                    }
                }
            }
        }

        return $result;
    }
}
