var $template = $(
    '<div class="line-row">                                                                      ' +
    '<table style="border-top: 1px solid lightgray;">                                            ' +
    '   <colgroup>                                                                               ' +
    '       <col width="86px">                                                                   ' +
    '       <col width="100%">                                                                   ' +
    '   </colgroup>                                                                              ' +
    '<tr class="color-full">                                                                     ' +
    '   <td class="you-need-me" valign="top">                                                    ' +
    '      <div class="color-line">                                                              ' +
    '         <div class="id-code-cell">                                                         ' +
    '             <div class="id-code">                                                          ' +
    '             </div>                                                                         ' +
    '             <div class="name">                                                             ' +
    '             </div>                                                                         ' +
    '             <div class="line-state">                                                       ' +
    '                   <label><input class="null" type="radio" value="0">TODO</label><br>       ' +
    '                   <label><input class="init" type="radio" value="1">Черновик</label><br>   ' +
    '                   <label><input class="cont" type="radio" value="2">На контроле</label><br>' +
    '                   <label><input class="best" type="radio" value="3">Итоговый</label><br>   ' +
    '             </div>                                                                         ' +
    '             <button class="quote">quote</button>                                           ' +
    '         </div>                                                                             ' +
    '      </div>                                                                                ' +
    '   </td>                                                                                    ' +
    '   <td>                                                                                     ' +
    '      <div class="lines">                                                                   ' +
    '          <div class="en-line">                                                             ' +
    '          </div>                                                                            ' +
    '          <div class="ru-line">                                                             ' +
    '              <textarea class="trans"></textarea>                                           ' +
    '          </div>                                                                            ' +
    '      </div>                                                                                ' +
    '   </td>                                                                                    ' +
    '</tr>                                                                                       ' +
    '</table>                                                                                    ' +
    '</div>                                                                                      '
);

function getData() {
    return JSON.parse(localStorage.getItem('f_data') || '[]');
}

function getDataJSON() {
    return localStorage.getItem('f_data') || '[]';
}

function setData(val) {
    localStorage.setItem('f_data', JSON.stringify(val, null, 4));
}

function getName() {
    return localStorage.getItem('f_name') || '';
}

function setName(val) {
    localStorage.setItem('f_name', val);
}

function parseFileData() {
    var $linesBox = $('.lines-box');
    var f_data = getData();

    $linesBox.empty();

    for (var i = 0, n = f_data.length; i < n; ++i) {
        var $temp = $template.clone();
        var id = f_data[i].id;
        var st = f_data[i].line.state || 0;
        var en = f_data[i].line.en.replace(/\\n/g, '<br>');
        var ru = f_data[i].line.ru || '';
        var name = f_data[i].name;

        function recount() {
            var cntArr = [
                Math.round($('.null:checked').length * 10000 / f_data.length) / 100 + '%',
                Math.round($('.init:checked').length * 10000 / f_data.length) / 100 + '%',
                Math.round($('.cont:checked').length * 10000 / f_data.length) / 100 + '%',
                Math.round($('.best:checked').length * 10000 / f_data.length) / 100 + '%'
            ];

            $('.more-stats').text('( ' + cntArr.join(' | ') + ' )');
        }

        function colorMe(me) {
            me.closest('.color-line').css({
                backgroundColor: ['transparent', 'black', '#fc3', '#06c'][me.val()]
            });
        }

        var foo = function () {
            var $radio = $(this);
            var $row = $radio.closest('.line-row');
            var oldData = $row.data('linkedObj');

            oldData.line.state = $radio.val();

            $row.data('linkedObj', oldData);

            colorMe($radio);

            recount();
        };

        $temp.find('.en-line').html(en);
        $temp.find('.name').text(name || '<NONAME>');
        $temp.find('.id-code').text('ID:' + id);
        $temp.find('.line-state');
        $temp.find('label input').prop('name', id);
        $temp.find('.null').prop('checked', st == 0).change(foo);
        var $init = $temp.find('.init').prop('checked', st == 1).change(foo);
        var $text = $temp.find('.ru-line').find('textarea').val(ru).change((function () {
            this.prop('checked', true);
            foo.call(this);
            if ($('#silent-save').prop('checked')) {
                silentSave();
            }
        }).bind($init));
        $temp.find('.cont').prop('checked', st == 2).change(foo);
        $temp.find('.best').prop('checked', st == 3).change(foo);
        $temp.find('.quote').click((function () {
            this.val('«' + this.val() + '»');
            this.focus();
            this[0].setSelectionRange(this.val().length - 1, this.val().length - 1);
        }).bind($text));

        $linesBox.append($temp.data('linkedObj', f_data[i]));

        colorMe($temp.find(':checked'));
    }

    recount();

    $('.stats').text('Всего строк: ' + f_data.length);
}

var dummyFoo = function () {
};

function silentSave() {
    var rows = $('.line-row');
    var count = rows.length;
    var newData = [];

    function doMyThing() {
        setData(newData);
    }

    rows.each(function (index, element) {
        var line = $(element);
        var rec = line.data('linkedObj');

        rec.line.ru = line.find('textarea').val();
        newData.push(rec);

        if (!--count) doMyThing();
    });
}

$(document).ready(function () {
    parseFileData();

    $('#file-in').change(function () {
        var f_in = this.files[0];
        var reader = new FileReader();

        setName(f_in.name);

        reader.onloadend = function (e) {
            var result = e.currentTarget.result;
            setData(JSON.parse(result));
            parseFileData();
        };

        reader.readAsBinaryString(f_in);
    });

    $('#just-save').click(function () {
        var rows = $('.line-row');
        var count = rows.length;
        var newData = [];

        function doMyThing() {
            setData(newData);
            alert('saved');
        }

        rows.each(function (index, element) {
            var line = $(element);
            var rec = line.data('linkedObj');

            rec.line.ru = line.find('textarea').val();
            newData.push(rec);

            if (!--count) doMyThing();
        });
    });

    $('#save-file').click(function () {
        var rows = $('.line-row');
        var count = rows.length;
        var newData = [];

        function doMyThing() {
            setData(newData);

            var srtRes = getDataJSON();
            var aFileParts = [srtRes];
            var oMyBlob = new Blob(aFileParts, {type: 'application/json'});

            window.requestFileSystem = window.requestFileSystem || window.webkitRequestFileSystem;

            window.requestFileSystem(
                window.TEMPORARY,
                1024 * 1024,
                function (fs) {
                    fs.root.getFile(getName() + '.bin', {create: true}, function (fileEntry) {
                        fileEntry.createWriter(function (fileWriter) {
                            fileWriter.addEventListener("writeend", function () {
                                location.href = fileEntry.toURL();
                            }, false);

                            fileWriter.write(oMyBlob);
                        }, dummyFoo);
                    }, dummyFoo);
                }, dummyFoo
            );
        }

        rows.each(function (index, element) {
            var line = $(element);
            var rec = line.data('linkedObj');

            rec.line.ru = line.find('textarea').val();
            newData.push(rec);

            if (!--count) doMyThing();
        });
    });
});
