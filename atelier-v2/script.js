/**
 * Created by aa.shirkin on 22.06.2016.
 */

$(document).ready(function () {
    const STORAGE_KEY = 'f134e149-3e22-433d-8b61-cea2b9eb6f53';

    var storage = new GameStorage(STORAGE_KEY, Cauldron);
    var cauldron = storage.getObject();
    storage.saveObject();
});
