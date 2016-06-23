/**
 * Created by aa.shirkin on 22.06.2016.
 */

$(document).ready(function () {
    const STORAGE_KEY = 'f134e149-3e22-433d-8b61-cea2b9eb6f53';

    var cauldronStorage = new GameStorage(STORAGE_KEY, Cauldron);
    var cauldron = cauldronStorage.getObject();

    var ctl = new CTL('main.ctl');
    var $template = ctl.applyCfg({
        'save-cauldron': {
            click: function () {
                cauldronStorage.saveObject();
            }
        }
    });

    var $body = $('body');

    $body.append($template);
    cauldron.visualize($body.find('.cauldron-box'));
});
