var $template = $(
    '<div class="line-row">                                                                          ' +
    '<table style="border-top: 1px solid lightgray;">                                                ' +
    '   <colgroup>                                                                                   ' +
    '       <col width="86px">                                                                       ' +
    '       <col width="100%">                                                                       ' +
    '   </colgroup>                                                                                  ' +
    '<tr>                                                                                            ' +
    '<td class="you-need-me" valign="top">                                                           ' +
    '   <div class="id-code-cell">                                                                   ' +
    '       <div class="id-code">                                                                    ' +
    '       </div>                                                                                   ' +
    '       <div class="name">                                                                       ' +
    '       </div>                                                                                   ' +
    '       <div class="line-state">                                                                 ' +
    '             <label><input class="init" type="radio" value="1">Черновик</label><br>     ' +
    '             <label><input class="cont" type="radio" value="2">На контроле</label><br>' +
    '             <label><input class="best" type="radio" value="3">Итоговый</label><br>     ' +
    '       </div>                                                                                   ' +
    '   </div>                                                                                       ' +
    '</td>                                                                                           ' +
    '<td>                                                                                            ' +
    '   <div class="lines">                                                                          ' +
    '       <div class="en-line">                                                                    ' +
    '       </div>                                                                                   ' +
    '       <div class="ru-line">                                                                    ' +
    '           <textarea class="trans"></textarea>                                                  ' +
    '       </div>                                                                                   ' +
    '   </div>                                                                                       ' +
    '</td>                                                                                           ' +
    '</tr>                                                                                           ' +
    '</table>                                                                                        ' +
    '</div>                                                                                          '
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

var code_table = [
    {"71B9" : "↵<br>"},
    {"05" : "A"},
    {"09" : "B"},
    {"0D" : "C"},
    {"11" : "D"},
    {"15" : "E"},
    {"19" : "F"},
    {"1D" : "G"},
    {"21" : "H"},
    {"25" : "I"},
    {"29" : "J"},
    {"2D" : "K"},
    {"31" : "L"},
    {"35" : "M"},
    {"39" : "N"},
    {"3D" : "O"},
    {"41" : "P"},
    {"45" : "Q"},
    {"49" : "R"},
    {"4D" : "S"},
    {"51" : "T"},
    {"55" : "U"},
    {"59" : "V"},
    {"5D" : "W"},
    {"61" : "X"},
    {"65" : "Y"},
    {"69" : "Z"},
    {"80" : " "},
    {"84" : "!"},
    {"85" : "a"},
    {"89" : "b"},
    {"8D" : "c"},
    {"91" : "d"},
    {"95" : "e"},
    {"99" : "f"},
    {"9C" : "'"},
    {"9D" : "g"},
    {"A0" : "("},
    {"A1" : "h"},
    {"A4" : ")"},
    {"A5" : "i"},
    {"A9" : "j"},
    {"AD" : "k"},
    {"B0" : ","},
    {"B1" : "l"},
    {"B4" : "-"},
    {"B5" : "m"},
    {"B8" : "."},
    {"B9" : "n"},
    {"BD" : "o"},
    {"C0" : "0"},
    {"C1" : "p"},
    {"C4" : "1"},
    {"C5" : "q"},
    {"C8" : "2"},
    {"C9" : "r"},
    {"CC" : "3"},
    {"CD" : "s"},
    {"D0" : "4"},
    {"D1" : "t"},
    {"D4" : "5"},
    {"D5" : "u"},
    {"D8" : "6"},
    {"D9" : "v"},
    {"DC" : "7"},
    {"DD" : "w"},
    {"E0" : "8"},
    {"E1" : "x"},
    {"E4" : "9"},
    {"E5" : "y"},
    {"E8" : ":"},
    {"E9" : "z"},
    {"EC" : ";"},
    {"FC" : "?"}
];

/**
 * @param {string} encodedStr
 * @returns {string}
 */
function decode(encodedStr) {
    encodedStr = encodedStr.toUpperCase();

    var result = '';
    var i = 0;

    m:while (i < encodedStr.length) {
        for (var k = 0, n = code_table.length; k < n; ++k) {
            var old = Object.keys(code_table[k])[0];
            var newie = code_table[k][old];

            if (encodedStr.indexOf(old, i) === i) {
                result += newie;
                i += old.length;
                continue m;
            }
        }

        result += '#';
        i += 2;
    }

    return result;
}

function parseFileData() {
    var $linesBox = $('.lines-box');
    var f_data = getData();

    $linesBox.empty();

    for (var i = 0, n = f_data.length; i < n; ++i) {
        var $temp = $template.clone();
        var id = f_data[i].id;
        //noinspection JSUnresolvedVariable
        var st = f_data[i].line.state || 1;
        //noinspection JSUnresolvedVariable
        var en = f_data[i].line.en;
        //noinspection JSUnresolvedVariable
        var ru = f_data[i].line.ru;
        var name = f_data[i].name;

        var foo = function () {
            var $radio = $(this);
            var $row = $radio.closest('.line-row');
            var oldData = $row.data('linkedObj');
            //noinspection JSUnresolvedVariable
            oldData.line.state = $radio.val();
            $row.data('linkedObj', oldData);
        };

        $temp.find('.en-line').html(decode(en));
        $temp.find('.ru-line').find('textarea').val(ru);
        $temp.find('.name').text(decode(name) || '<NONAME>');
        $temp.find('.id-code').text('ID:' + id);
        $temp.find('.line-state');
        $temp.find('label input').prop('name', id);
        $temp.find('.init').prop('checked', st == 1).change(foo);
        $temp.find('.cont').prop('checked', st == 2).change(foo);
        $temp.find('.best').prop('checked', st == 3).change(foo);

        $linesBox.append($temp.data('linkedObj', f_data[i]));
    }
}

$(document).ready(function () {
    parseFileData();

    $('#file-in').change(function () {
        var f_in = this.files[0];
        var reader = new FileReader();

        setName(f_in.name);

        //noinspection SpellCheckingInspection
        reader.onloadend = function (e) {
            var result = e.currentTarget.result;
            setData(JSON.parse(result));
            parseFileData();
        };

        reader.readAsBinaryString(f_in);
    });

    $('#save-file').click(function () {
        var rows = $('.line-row');
        var count = rows.length;
        var newData = [];

        function doMyThing() {
            setData(newData);

            var srtRes = getDataJSON();
            var aFileParts = [srtRes];
            var oMyBlob = new Blob(aFileParts, {type : 'application/json'});

            //noinspection JSUnresolvedVariable
            window.requestFileSystem = window.requestFileSystem || window.webkitRequestFileSystem;

            //noinspection JSUnresolvedVariable
            window.requestFileSystem(
                window.TEMPORARY,
                1024 * 1024,
                function (fs) {
                    //noinspection JSUnresolvedFunction
                    fs.root.getFile(getName(), {create : true}, function (fileEntry) {
                        //noinspection JSUnresolvedFunction
                        fileEntry.createWriter(function (fileWriter) {
                            fileWriter.addEventListener("writeend", function () {
                                // navigate to file, will download
                                //noinspection JSUnresolvedFunction
                                location.href = fileEntry.toURL();
                            }, false);

                            fileWriter.write(oMyBlob);
                        }, function () {
                            // dunno
                        });
                    }, function () {
                        // dunno
                    });
                }, function () {
                    // dunno
                }
            );
        }

        rows.each(function (index, element) {
            var line = $(element);
            var rec = line.data('linkedObj');
            //noinspection UnnecessaryLocalVariableJS
            var ru = line.find('textarea').val();
            //noinspection JSUnresolvedVariable
            rec.line.ru = ru;
            newData.push(rec);

            if (!--count) doMyThing();
        });
    });
});
