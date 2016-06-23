/**
 * Created by aa.shirkin on 22.06.2016.
 */

$(document).ready(function () {
    const STORAGE_KEY = 'f134e149-3e22-433d-8b61-cea2b9eb6f53';

    var loading = function() {
        var cauldronStorage = new GameStorage(STORAGE_KEY, Cauldron);
        var cauldron = cauldronStorage.getObject();

        var ctl = new CTL('main.ctl');
        var $template = ctl.applyCfg({
            'save-cauldron': {
                click: function () {
                    cauldronStorage.saveObject();
                }
            },
            'reset-cauldron': {
                click: function () {
                    localStorage.clear();
                    loading();
                }
            }
        });

        var $body = $('body');
        $body.empty().append($template);
        cauldron.visualize($body.find('.cauldron-box'));
    };

    loading();
});
