/**
 * Created by aa.shirkin on 16.06.2016.
 */

var KEY = 'e1b3f8f1-6713-4616-8ccc-2d3375c261df';
var field = null;

var storeValues = function () {
    var data = {
        width: $('[name="width"]').val(),
        height: $('[name="height"]').val(),
        field: '' + field
    };

    data = JSON.stringify(data);

    localStorage.setItem(KEY, data);
};

var restoreValues = function () {
    var data = localStorage.getItem(KEY);

    if (data === null) {
        field = Field.prototype.defaultField();
    } else {
        data = JSON.parse(data);

        $('[name="width"]').val(data.width);
        $('[name="height"]').val(data.height);

        field = new Field(data.field);
    }

    onChangeSettings();
};

var onChangeSettings = function () {
    var width = +$('[name="width"]').val();
    var height = +$('[name="height"]').val();

    $('[name="width-range"]').val(width);
    $('[name="height-range"]').val(height);
    
    field.setWidth(width);
    field.setHeight(height);

    drawField();
    storeValues();
};

var onChangeSettingsRange = function () {
    var width = +$('[name="width-range"]').val();
    var height = +$('[name="height-range"]').val();

    $('[name="width"]').val(width);
    $('[name="height"]').val(height);

    onChangeSettings();
};

var drawField = function () {
    field.visualize($('.field'));
};

$(document).ready(function () {
    restoreValues();
});
