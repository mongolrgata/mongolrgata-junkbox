var $template = $(
    '<div class="line-row">                                                                      ' +
    '<table class="atbop">                                                                       ' +
    '   <colgroup>                                                                               ' +
    '       <col width="86px">                                                                   ' +
    '       <col width="100%">                                                                   ' +
    '   </colgroup>                                                                              ' +
    '<tr class="color-full">                                                                     ' +
    '   <td class="you-need-me" valign="top" tabindex="-1">                                      ' +
    '      <div class="color-line">                                                              ' +
    '         <div class="id-code-cell">                                                         ' +
    '             <div class="id-code">                                                          ' +
    '             </div>                                                                         ' +
    '             <div class="line-state">                                                       ' +
    '                   <label><input class="null" type="radio" value="0">Пустой</label><br>     ' +
    '                   <label><input class="init" type="radio" value="1">Черновик</label><br>   ' +
    '                   <label><input class="cont" type="radio" value="2">Вычитка</label><br>    ' +
    '                   <label><input class="best" type="radio" value="3">Итоговый</label><br>   ' +
    '             </div>                                                                         ' +
    '             <button class="quote">alt+q</button>                                           ' +
    '         </div>                                                                             ' +
    '      </div>                                                                                ' +
    '      <button class="add-comm"> </button>                                                   ' +
    '   </td>                                                                                    ' +
    '   <td>                                                                                     ' +
    '      <div class="lines">                                                                   ' +
    '          <div class="en-line">                                                             ' +
    '          </div>                                                                            ' +
    '          <div class="jp-line">                                                             ' +
    '          </div>                                                                            ' +
    '          <div class="ru-line">                                                             ' +
    '              <textarea class="trans" tabindex="1"></textarea>                              ' +
    '          </div>                                                                            ' +
    '      </div>                                                                                ' +
    '   </td>                                                                                    ' +
    '</tr>                                                                                       ' +
    '</table>                                                                                    ' +
    '</div>                                                                                      '
);

var $nameTemplate = $(
    '<tr class="name-var">              ' +
    '   <td>                            ' +
    '       <div class="en-name"></div> ' +
    '   </td>                           ' +
    '   <td>                            ' +
    '       <div class="jp-name"></div> ' +
    '   </td>                           ' +
    '   <td>                            ' +
    '       <div class="ru-name">       ' +
    '           <input type="text">     ' +
    '       </div>                      ' +
    '   </td>                           ' +
    '</tr>                              '
);

function updateNames() {
    var $names = $('.en-line .ru-trans-name');
    var data = getData();

    $names.each(function () {
        var id = $(this).data('id');
        var curName = data[id].data.ru.name;

        $(this).text(curName);
    });
}

function getSelectionCoords(win) {
    win = win || window;
    var doc = win.document;
    var sel = doc.selection, range, rects, rect;
    var x = 0, y = 0;
    if (sel) {
        if (sel.type != "Control") {
            range = sel.createRange();
            range.collapse(true);
            x = range.boundingLeft;
            y = range.boundingTop;
        }
    } else if (win.getSelection) {
        sel = win.getSelection();
        if (sel.rangeCount) {
            range = sel.getRangeAt(0).cloneRange();
            if (range.getClientRects) {
                range.collapse(true);
                rects = range.getClientRects();
                if (rects.length > 0) {
                    rect = rects[0];
                }
                x = rect.left;
                y = rect.top;
            }
            // Fall back to inserting a temporary element
            if (x == 0 && y == 0) {
                var span = doc.createElement("span");
                if (span.getClientRects) {
                    // Ensure span has dimensions and position by
                    // adding a zero-width space character
                    span.appendChild(doc.createTextNode("\u200b"));
                    range.insertNode(span);
                    rect = span.getClientRects()[0];
                    x = rect.left;
                    y = rect.top;
                    var spanParent = span.parentNode;
                    spanParent.removeChild(span);

                    // Glue any broken text nodes back together
                    spanParent.normalize();
                }
            }
        }
    }
    return {x: x, y: y};
}
function getData() {
    return JSON.parse(localStorage.getItem('f_data_v2') || '[]');
}
function getDataJSON() {
    return localStorage.getItem('f_data_v2') || '[]';
}
function setData(val) {
    localStorage.setItem('f_data_v2', JSON.stringify(val, null, 4));
}
function getName() {
    return localStorage.getItem('f_name_v2') || '';
}
function setName(val) {
    localStorage.setItem('f_name_v2', val);
}
function getSaveMode() {
    return localStorage.getItem('save_mode_v2') || 'manual';
}
function setSaveMode(val) {
    localStorage.setItem('save_mode_v2', val);
}

var globalColorScheme = ['white', 'black', '#fc3', '#06c'];

function parseFileData() {
    var $linesBox = $('.lines-box');
    var f_data_v2 = getData();

    $linesBox.empty();

    for (var id in f_data_v2) {
        if (!f_data_v2.hasOwnProperty(id))
            continue;

        var $temp = $template.clone();
        var item = f_data_v2[id];

        var comms = item.comments || [];
        var data = item.data;
        var st = item.state || 0;
        var jp_name = data && data['jp'] && (data['jp'].name || '&lt;NONAME&gt;');
        var en_name = data && data['en'] && (data['en'].name || '&lt;NONAME&gt;');
        var ru_name = data && data.ru && data.ru.name;

        var jp = '<span class="name">' + jp_name + ':</span><br>' + (data && data['jp'] && data['jp'].line && data['jp'].line.replace(/\\n/g, '<br>'));
        var en = ['<span class="name">', en_name, ' [<span class="ru-trans-name">', ru_name, '</span>]', ':</span><br>'].join('') + (data && data['en'] && data['en'].line && data['en'].line.replace(/\\n/g, '<br>'));
        var ru = (data && data.ru && data.ru.line || '').replace(/\\n/g, '\n');

        function recount() {
            var len = Object.keys(f_data_v2).length;
            var cntArr = [
                Math.round($('.null:checked').length * 10000 / len) / 100 + '%',
                Math.round($('.init:checked').length * 10000 / len) / 100 + '%',
                Math.round($('.cont:checked').length * 10000 / len) / 100 + '%',
                Math.round($('.best:checked').length * 10000 / len) / 100 + '%'
            ];

            $('.more-stats').text('( ' + cntArr.join(' | ') + ' )');
        }

        function colorMe(me, noRepaintScroll) {
            me.closest('.color-line').css({
                backgroundColor: globalColorScheme[me.val()]
            });
            if (!noRepaintScroll) {
                colorScroll();

                if ($('#silent-save').prop('checked')) {
                    silentSave();
                }
            }
        }

        function changeState() {
            var $radio = $(this);
            var $row = $radio.closest('.line-row');
            var oldData = $row.data('linkedObj');

            oldData.state = +$radio.val();

            $row.data('linkedObj', oldData);

            colorMe($radio);

            recount();
        }

        function addComm(val) {
            var $commBox = $('<div class="comm-box"/>').append(
                $('<input type="text" class="comm">').val(val instanceof Object ? '' : val).change(function () {
                    if ($('#silent-save').prop('checked')) {
                        silentSave();
                    }
                })
            );

            $commBox.append(
                $('<button class="del-comm"/>').text('удлт').click((function () {
                    this.detach();

                    if ($('#silent-save').prop('checked')) {
                        silentSave();
                    }
                }).bind($commBox))
            );

            this.find('.lines').append($commBox);
        }

        $temp.find('.en-line').html(en).find('.ru-trans-name').data('id', id);
        $temp.find('.jp-line').html(jp);
        $temp.find('.id-code').text('ID:' + id);
        $temp.find('.line-state');
        $temp.find('label input').prop('name', id);
        $temp.find('.null').prop('checked', st == 0).change(changeState);
        var $init = $temp.find('.init').prop('checked', st == 1).change(changeState);
        var $text = $temp.find('.ru-line').find('textarea').val(ru).change((function () {
            this.prop('checked', true);
            changeState.call(this);
        }).bind($init));
        $temp.find('.cont').prop('checked', st == 2).change(changeState);
        $temp.find('.best').prop('checked', st == 3).change(changeState);
        $temp.find('.quote').click((function () {
            this.val('«' + this.val() + '»');
            this.focus();
            this[0].setSelectionRange(this.val().length - 1, this.val().length - 1);
        }).bind($text));
        $temp.find('.add-comm').click(addComm.bind($temp));

        for (var j = 0, len = comms.length; j < len; ++j) {
            addComm.call($temp, comms[j]);
        }

        $linesBox.append($temp.data('linkedObj', item).data('idObj', id));

        colorMe($temp.find(':checked'), true);
    }

    colorScroll();
    recount();

    $('.stats').text('Всего строк: ' + Object.keys(f_data_v2).length);
}

function dummyFoo() {
}

function colorScroll() {
    var $cs = $('.color-scroll');
    var $rows = $('[type="radio"]:checked:visible');

    $cs.empty();

    for (var i = 0, n = $rows.length; i < n; ++i) {
        var $div = $('<div/>').css({
            backgroundColor: globalColorScheme[$($rows[i]).val()],
            position: 'absolute',
            left: 0,
            right: 0,
            top: ((100 / n) * i) + '%',
            bottom: ((100 / n) * (n - i - 1)) + '%'
        });

        $div.appendTo($cs);
    }
}

function bigSave(doMyThing) {
    var rows = $('.line-row');
    var count = rows.length;
    var newData = {};
    var oldData = getData();

    rows.each(function (index, element) {
        var line = $(element);
        var id = line.data('idObj');
        var rec = line.data('linkedObj');
        var comms = line.find('.comm');

        rec.data.ru.line = line.find('textarea').val().replace(/\n/g, '\\n');
        rec.data.ru.name = oldData[id].data.ru.name;
        rec.comments = [];
        if (comms.length > 0) {
            for (var i = 0, n = comms.length; i < n; ++i) {
                rec.comments.push($(comms[i]).val());
            }
        }

        newData[id] = rec;

        if (!--count) doMyThing(newData);
    });
}

function silentSave() {
    bigSave(function doMyThing(newData) {
        setData(newData);
    });
}

$(document).ready(function () {
    parseFileData();

    function loadByUrl(filename) {
        $('.repo-list').hide();

        $.get(
            filename,
            {},
            function (result) {
                appendRecentFiles(filename);

                $('.hover').hide();
                setData(JSON.parse(result));
                parseFileData();
            }
        );
    }

    $('#file-in').change(function () {
        var f_in = this.files[0];
        var reader = new FileReader();

        setName(f_in.name);

        reader.onloadend = function (e) {
            var result = e.currentTarget.result;
            setData(JSON.parse(result));
            parseFileData();
        };

        reader.readAsText(f_in);
    });
    $('#silent-save').prop('checked', getSaveMode() === 'silent').change(function () {
        setSaveMode($(this).prop('checked') ? 'silent' : 'manual');
    });
    $('#just-save').click(function () {
        bigSave(function doMyThing(newData) {
            setData(newData);
            alert('saved');
        });
    });
    $('.null-check').change(function () {
        $('.null:checked').closest('.line-row').toggle($(this).prop('checked'));
        colorScroll()
    });
    $('.init-check').change(function () {
        $('.init:checked').closest('.line-row').toggle($(this).prop('checked'));
        colorScroll()
    });
    $('.cont-check').change(function () {
        $('.cont:checked').closest('.line-row').toggle($(this).prop('checked'));
        colorScroll()
    });
    $('.best-check').change(function () {
        $('.best:checked').closest('.line-row').toggle($(this).prop('checked'));
        colorScroll()
    });
    $('#save-file').click(function () {
        bigSave(function doMyThing(newData) {
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
        });
    });
    $('.load-raw-file').click(function () {
        loadByUrl([
            'https://raw.githubusercontent.com/PSDGames/cool-beauty-translate',
            $('.branches-list option:selected').text(),
            $('.branch-files-list option:selected').text()
        ].join('/'));
    });
    $('#open-repo').click(function () {
        var $select = $('.branches-list');
        var $selectFile = $('.branch-files-list');
        var $recentFiles = $('.recent-files');
        var recentList = getRecentFiles();

        $select.empty();
        $select.unbind();
        $select.append($('<option/>'));

        $selectFile.empty();
        $selectFile.unbind();
        $selectFile.append($('<option/>'));

        $recentFiles.empty();

        for (var i = 0, n = recentList.length; i < n; ++i) {
            var filename = recentList[i];
            $recentFiles.prepend(
                $('<p class="recent-filename"/>')
                    .text('...' + filename.substr(filename.length - 64, 64))
                    .attr('full_link', filename)
                    .click(function () {
                        loadByUrl($(this).attr('full_link'));
                    })
            );
        }

        getAllBranches(function (result) {
            for (var i = 0, n = result.length; i < n; ++i) {
                var item = result[i];

                $select.append($('<option/>').text(item['branch-name']).prop('value', item['branch-sha']));
            }

            $select.change(function () {
                var sha = $(this).val();

                $selectFile.empty();
                $selectFile.unbind();
                $selectFile.append($('<option/>'));

                getAllBranchFiles(sha, function (result) {
                    for (var i = 0, n = result.length; i < n; ++i) {
                        var item = result[i];
                        $selectFile.append($('<option/>').text(item['file-name']));
                    }
                });
            });
        });

        $('.repo-list').show();
        $('.hover').show();
    });
    $('#prepare-print').click(function () {
        var $ta = $('.print-text ');

        $('.print-version').show();
        $ta.val(getDataJSON());
        $ta.focus();
        $ta[0].setSelectionRange(0, $ta.val().length);
    });
    $('#name-map').click(function () {
        var cont = $('.name-list');
        var data = getData();
        var name_map = {};

        cont.empty();

        for (var key in data) {
            if (!data.hasOwnProperty(key))
                continue;

            var en_name = data[key].data['en'].name || '<NONAME>';
            var jp_name = data[key].data['jp'].name;
            var ru_name = data[key].data.ru.name;

            if (!name_map[en_name])
                name_map[en_name] = {
                    'jp_arr': [],
                    'ru_trans': ''
                };

            if (name_map[en_name].jp_arr.indexOf(jp_name) === -1) {
                name_map[en_name].jp_arr.push(jp_name);
            }

            if (!name_map[en_name].ru_trans) {
                name_map[en_name].ru_trans = ru_name;
            }
        }

        for (var name in name_map) {
            if (!name_map.hasOwnProperty(name))
                continue;

            var $tr = $nameTemplate.clone();
            var jp_arr = name_map[name].jp_arr;
            var ru_trans = name_map[name].ru_trans;

            $tr.find('.en-name').text(name);
            $tr.find('.jp-name').text(jp_arr.join(' | '));
            $tr.find('input').val(ru_trans);

            cont.append($tr);
        }

        $('.all-names').show();
        $('.hover').show();
    });
    $('#goto-prev-mode').click(function () {
        $('body').addClass('prev-mode');
    });
    $('#use-names').click(function () {
        var data = getData();
        var $names = $('.name-var');
        var dict = {};

        for (var i = 0; i < $names.length; ++i) {
            var nameRow = $($names[i]);
            var enName = nameRow.find('.en-name').text();
            dict[enName] = nameRow.find('input').val();
        }

        for (var key in data) {
            if (!data.hasOwnProperty(key))
                continue;

            var originName = data[key].data['en'].name;
            data[key].data.ru.name = dict[originName] || '';
        }

        setData(data);
        updateNames();
        $('.all-names').hide();
        $('.hover').hide();
    });
}).keyup(function (e) {
    if (e.keyCode == 27) {
        $('body').removeClass('prev-mode');
        $('.print-version').hide();
        $('.all-names').hide();
        $('.repo-list').hide();
        $('.hover').hide();
    }
}).keydown(function (event) {
    if (event.which === 81 && event.altKey) {
        var $text = $(':focus').closest('.ru-line').find('textarea');

        if (!event.shiftKey) {
            (function () {
                this.val('«' + this.val() + '»');
                this.focus();
                this[0].setSelectionRange(this.val().length - 1, this.val().length - 1);
            }).call($text);
        } else {
            if (!event.ctrlKey) {
                (function () {
                    this.val(this.val() + '«»');
                    this.focus();
                    this[0].setSelectionRange(this.val().length - 1, this.val().length - 1);
                }).call($text);
            }
            else {
                (function () {
                    this.val(this.val() + '„“');
                    this.focus();
                    this[0].setSelectionRange(this.val().length - 1, this.val().length - 1);
                }).call($text);
            }
        }
    }
    if (event.which === 84 && event.altKey) {
        function getSelectionText() {
            var text = "";
            if (window.getSelection) {
                text = window.getSelection().toString();
            }
            return text;
        }

        var text = getSelectionText();
        var coor = getSelectionCoords();
        var bScroll = $($('body')[0]).scrollTop();
        var x = coor.x;
        var y = coor.y + bScroll - 22;

        $.get(
            'https://translate.yandex.net/api/v1.5/tr.json/translate',
            {
                key: 'trnsl.1.1.20150723T181540Z.cfda1cc4fccb8bb0.372eb61d5cb01dde22bfc3a3cd8c468fd2dd8e66',
                text: text,
                lang: 'en-ru',
                format: 'html'
            },
            function (result) {

                $('<div class="tr-popup"/>').text(result.text.join(' | ')).css({
                    top: y,
                    left: x
                }).click(function () {
                    this.remove();
                }).appendTo('body');
            }
        );
    }
    if (event.which === '1'.charCodeAt(0) && event.altKey) {
        if (!event.shiftKey) {
            //noinspection CssInvalidPseudoSelector
            $('body').animate({
                scrollTop: $($($(".line-row:visible:in-viewport").last()).nextAll().find('.null:checked')[0]).offset().top - 256
            }, 500);
        } else {
            //noinspection CssInvalidPseudoSelector
            $('body').animate({
                scrollTop: $($($(".line-row:visible:in-viewport")[0]).prevAll().find('.null:checked').last()).offset().top - 256
            }, 500);
        }
    }
    if (event.which === '2'.charCodeAt(0) && event.altKey) {
        if (!event.shiftKey) {
            //noinspection CssInvalidPseudoSelector
            $('body').animate({
                scrollTop: $($($(".line-row:visible:in-viewport").last()).nextAll().find('.init:checked')[0]).offset().top - 256
            }, 500);
        } else {
            //noinspection CssInvalidPseudoSelector
            $('body').animate({
                scrollTop: $($($(".line-row:visible:in-viewport")[0]).prevAll().find('.init:checked').last()).offset().top - 256
            }, 500);
        }
    }
    if (event.which === '3'.charCodeAt(0) && event.altKey) {
        if (!event.shiftKey) {
            //noinspection CssInvalidPseudoSelector
            $('body').animate({
                scrollTop: $($($(".line-row:visible:in-viewport").last()).nextAll().find('.cont:checked')[0]).offset().top - 256
            }, 500);
        } else {
            //noinspection CssInvalidPseudoSelector
            $('body').animate({
                scrollTop: $($($(".line-row:visible:in-viewport")[0]).prevAll().find('.cont:checked').last()).offset().top - 256
            }, 500);
        }
    }
    if (event.which === '4'.charCodeAt(0) && event.altKey) {
        if (!event.shiftKey) {
            //noinspection CssInvalidPseudoSelector
            $('body').animate({
                scrollTop: $($($(".line-row:visible:in-viewport").last()).nextAll().find('.best:checked')[0]).offset().top - 256
            }, 500);
        } else {
            //noinspection CssInvalidPseudoSelector
            $('body').animate({
                scrollTop: $($($(".line-row:visible:in-viewport")[0]).prevAll().find('.best:checked').last()).offset().top - 256
            }, 500);
        }
    }
});

function testAllBranches() {
    getAllBranches(function (result) {
        console.log(result);
    });
}

function getAllBranches(callback) {
    $.get(
        'https://api.github.com/repos/PSDGames/cool-beauty-translate/branches',
        {},
        function (result) {
            var newResult = [];

            for (var key in result) {
                newResult.push({
                    'branch-name': result[key].name,
                    'branch-sha': result[key].commit.sha
                });
            }

            callback(newResult);
        }
    );
}

function getAllBranchFiles(sha, callback) {
    $.get(
        'https://api.github.com/repos/PSDGames/cool-beauty-translate/git/trees/' + sha,
        {
            recursive: 1
        },
        function (result) {
            var newResult = [];

            for (var i = 0, n = result.tree.length; i < n; ++i) {
                var item = result.tree[i];

                if (item.type === 'blob') {
                    newResult.push({
                        'file-name': item.path
                    });
                }
            }

            callback(newResult);
        }
    );
}

function getRecentFiles() {
    return JSON.parse(localStorage.getItem('recent-files') || '[]');
}

function appendRecentFiles(filename) {
    var oldlist = getRecentFiles();
    oldlist.push(filename);
    oldlist.reverse();
    $.unique(oldlist);
    oldlist.reverse();

    localStorage.setItem('recent-files', JSON.stringify(oldlist));
}
