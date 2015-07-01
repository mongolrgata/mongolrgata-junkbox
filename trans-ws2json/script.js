var f_data = null;
var $template = $(
    '<div class="line-row">' +
    '<table>' +
    '   <colgroup>                                                      ' +
    '       <col width="64px">                                          ' +
    '       <col width="100%">                                          ' +
    '   </colgroup>                                                     ' +
    '<tr>' +
    '<td valign="top">' +
    '   <div class="id-code-cell">' +
    '       <div class="id-code">' +
    '       </div>' +
    '       <div class="name">' +
    '       </div>' +
    '       <div class="line-state">' +
    '       </div>' +
    '   </div>' +
    '</td>' +
    '<td>' +
    '   <div class="lines">' +
    '       <div class="en-line">' +
    '       </div>' +
    '       <div class="ru-line">' +
    '           <textarea class="trans"></textarea>' +
    '       </div>' +
    '   </div>' +
    '</td>' +
    '</tr>' +
    '</table>' +
    '</div>'
);

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
 *
 * @param {string} endcodedStr
 * @returns {string}
 */
function decode(endcodedStr) {
    endcodedStr = endcodedStr.toUpperCase();

    var result = '';
    var i = 0;

    m:while (i < endcodedStr.length) {
        for (var k = 0, n = code_table.length; k < n; ++k) {
            var old = Object.keys(code_table[k])[0];
            var nevv = code_table[k][old];

            if (endcodedStr.indexOf(old, i) === i) {
                result += nevv;
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

    $linesBox.empty();

    for (var i = 0, n = f_data.length; i < n; ++i) {
        var $temp = $template.clone();
        var id = f_data[i].id;
        var st = f_data[i].state;
        var en = f_data[i].line.en;
        var ru = f_data[i].line.ru;
        var name = f_data[i].name;

        var $enLine = $temp.find('.en-line').html(decode(en));
        var $ruLine = $temp.find('.ru-line').find('textarea').val(ru);
        var $name = $temp.find('.name').text(decode(name) || '<NONAME>');
        var $idCode = $temp.find('.id-code').text('ID:' + id);
        var $lineSt = $temp.find('.line-state');

        $linesBox.append($temp.data('id', id));
    }
}

$(document).ready(function () {
    $('#file-in').change(function () {
        var f_in = this.files[0];
        var reader = new FileReader();

        reader.onloadend = function (e) {
            var lol = e.currentTarget.result;
            f_data = JSON.parse(lol);

            parseFileData();
        };

        reader.readAsBinaryString(f_in);
    });

    $('#save-file').click(function () {
        var rows = $('.line-row');
        var count = rows.length;
        var test = [];

        function doMyThing() {
            console.log(test);

            var srtRes = JSON.stringify(f_data, null, 4);
            var aFileParts = [srtRes];
            var oMyBlob = new Blob(aFileParts, {type : 'application/json'});

            window.requestFileSystem = window.requestFileSystem || window.webkitRequestFileSystem;

            window.requestFileSystem(
                window.TEMPORARY,
                1024 * 1024,
                function (fs) {
                    fs.root.getFile('test.ws2.json', {create : true}, function (fileEntry) { // test.bin is filename
                        fileEntry.createWriter(function (fileWriter) {
                            fileWriter.addEventListener("writeend", function () {
                                // navigate to file, will download
                                location.href = fileEntry.toURL();
                            }, false);

                            fileWriter.write(oMyBlob);
                        }, function () {
                        });
                    }, function () {
                    });
                },
                function () {
                    // dunno
                }
            );
        }

        rows.each(function (index, element) {
            var line = $(element);
            var id = line.data('id');
            var ru = line.find('textarea').val();

            test.push(ru);

            if (!--count) doMyThing();
        });
    });
});
