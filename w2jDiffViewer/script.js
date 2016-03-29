var $template = $(
    '<div class="row">                   ' +
    '  <div class="id-code">             ' +
    '  </div>                            ' +
    '  <div class="line">                ' +
    '    <span class="text"></span>      ' +
    '  </div>                            ' +
    '  <button class="shift">+</button>  ' +
    '  <button class="unshift">-</button>' +
    '</div>                              '
);

function setDiffJSON(obj) {
    localStorage.setItem('diff-json', JSON.stringify(obj));
}

function getDiffJSON() {
    return localStorage.getItem('diff-json') || '[]';
}

function getAllBranches(callback) {
    $.get(
        'https://api.github.com/repos/mongolrgata/mongolrgata-junkbox/branches',
        {},
        function (result) {
            var newResult = [];

            for (var key in result) {
                if (result[key].name === 'gh-pages') {
                    newResult.push({
                        'branch-name': result[key].name,
                        'branch-sha': result[key].commit.sha
                    });
                }
            }

            callback(newResult);
        }
    );
}

function getAllBranchFiles(sha, callback) {
    $.get(
        'https://api.github.com/repos/mongolrgata/mongolrgata-junkbox/git/trees/' + sha,
        {
            recursive: 1
        },
        function (result) {
            var newResult = [];

            for (var i = 0, n = result.tree.length; i < n; ++i) {
                var item = result.tree[i];

                if (item.type === 'blob' && item.path.indexOf('moeDiffs/') !== -1) {
                    newResult.push({
                        'file-name': item.path
                    });
                }
            }

            callback(newResult);
        }
    );
}

function loadByUrl(filename) {
    $.get(
        filename,
        {},
        function (result) {
            $('.json-data').val(result);
            $('.inner').click();
        }
    );
}

$(document).ready(function () {
    var $select = $('.branches-list');
    var $selectFile = $('.branch-files-list');

    $select.empty();
    $select.unbind();
    $select.append($('<option/>'));

    $selectFile.empty();
    $selectFile.unbind();
    $selectFile.append($('<option/>'));

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

    $('.load-raw-file').click(function () {
        loadByUrl([
            'https://raw.githubusercontent.com/mongolrgata/mongolrgata-junkbox',
            $('.branches-list option:selected').text(),
            $('.branch-files-list option:selected').text()
        ].join('/'));
    });

    $('.json-data').val(getDiffJSON());
    $('.inner').click(function () {
        var diffData = $('.json-data').val();
        $('.json-data').val('');

        var list = JSON.parse(diffData);
        var dummy = {
            id: "",
            line: ""
        };

        setDiffJSON(list);

        $('.left').empty();
        $('.right').empty();

        for (var i = 0; i < list.length; ++i) {
            var $left = $template.clone();
            var $right = $template.clone();
            var dlt = Math.min(Math.abs(parseInt(list[i].left.id, 16) - parseInt(list[i].right.id, 16)), 5);
            var tooBig = Math.abs(parseInt(list[i].left.id, 16) - parseInt(list[i].right.id, 16)) >= 10;

            $left.css({
                backgroundColor: tooBig ? 'rgb(103, 54, 54)' : 'rgba(255,0,0,' + ('' + dlt / 5) + ')'
            }).find('.shift').data('index', i).click(function () {
                var index = $(this).data('index');
                var list = JSON.parse(getDiffJSON());

                for (var i = index; i < list.length; ++i) {
                    var oldId = list[i].left.id;
                    if (oldId === "") {
                        continue;
                    }

                    oldId = parseInt(oldId, 16) + 1;

                    list[i].left.id = (+oldId).toString(16).rJust(4, '0');
                }

                $('.json-data').val(JSON.stringify(list));
                $('.inner').click();
            });
            $left.find('.unshift').data('index', i).click(function () {
                var index = $(this).data('index');
                var list = JSON.parse(getDiffJSON());

                for (var i = index; i < list.length; ++i) {
                    var oldId = list[i].left.id;
                    if (oldId === "") {
                        continue;
                    }

                    oldId = parseInt(oldId, 16) - 1;

                    list[i].left.id = (+oldId).toString(16).rJust(4, '0');
                }

                $('.json-data').val(JSON.stringify(list));
                $('.inner').click();
            });
            $right.css({
                backgroundColor: tooBig ? 'rgb(103, 54, 54)' : 'rgba(255,0,0,' + ('' + dlt / 5) + ')'
            }).find('.shift').data('index', i).click(function () {
                var index = $(this).data('index');
                var list = JSON.parse(getDiffJSON());

                for (var i = index; i < list.length; ++i) {
                    var oldId = list[i].right.id;
                    if (oldId === "") {
                        continue;
                    }

                    oldId = parseInt(oldId, 16) + 1;

                    list[i].right.id = (+oldId).toString(16).rJust(4, '0');
                }

                $('.json-data').val(JSON.stringify(list));
                $('.inner').click();
            });
            $right.find('.unshift').data('index', i).click(function () {
                var index = $(this).data('index');
                var list = JSON.parse(getDiffJSON());

                for (var i = index; i < list.length; ++i) {
                    var oldId = list[i].right.id;
                    if (oldId === "") {
                        continue;
                    }

                    oldId = parseInt(oldId, 16) - 1;

                    list[i].right.id = (+oldId).toString(16).rJust(4, '0');
                }

                $('.json-data').val(JSON.stringify(list));
                $('.inner').click();
            });

            if (list[i].left.id === "") {
                $left.css({
                    backgroundColor: 'rgb(127,127,127)'
                });
            }

            if (list[i].right.id === "") {
                $right.css({
                    backgroundColor: 'rgb(127,127,127)'
                });
            }

            if (list[i].left.line !== list[i].right.line) {
                var compLeft = list[i].left.line.replace(/\\n/g, '').replace(/[^a-zA-Z]/gm, '').toLocaleLowerCase();
                var compRight = list[i].right.line.replace(/\\n/g, '').replace(/[^a-zA-Z]/gm, '').toLocaleLowerCase();

                if (compLeft !== compRight) {
                    $left.find('.text').css({
                        backgroundColor: 'black',
                        color: 'white'
                    });
                    $right.find('.text').css({
                        backgroundColor: 'black',
                        color: 'white'
                    });
                }
                else {
                    $left.find('.text').css({
                        backgroundColor: 'lightgray'
                    });
                    $right.find('.text').css({
                        backgroundColor: 'lightgray'
                    });
                }
            }

            $left.find('.id-code').text(list[i].left.id);
            $left.find('.text').html(list[i].left.line.replace(/\\n/g, '<br>'));
            $('.left').append($left);

            $right.find('.id-code').text(list[i].right.id);
            $right.find('.text').html(list[i].right.line.replace(/\\n/g, '<br>'));
            $('.right').append($right);
        }
    });
    $('.sort-left').click(function () {
        var list = JSON.parse(getDiffJSON());

        list.sort(function (a, b) {
            var idA = a.left.id;
            var idB = b.left.id;

            if (idA === "") {
                return 1;
            }
            if (idB === "") {
                return -1;
            }

            idA = parseInt(idA, 16);
            idB = parseInt(idB, 16);

            return (idA - idB);
        });

        $('.json-data').val(JSON.stringify(list));
        $('.inner').click();
    });
    $('.sort-right').click(function () {
        var list = JSON.parse(getDiffJSON());

        list.sort(function (a, b) {
            var idA = a.right.id;
            var idB = b.right.id;

            if (idA === "") {
                return 1;
            }
            if (idB === "") {
                return -1;
            }

            idA = parseInt(idA, 16);
            idB = parseInt(idB, 16);

            return (idA - idB);
        });

        $('.json-data').val(JSON.stringify(list));
        $('.inner').click();
    });
});

/**
 * Выравнивание строки по правому краю
 * @param {number} width целевая ширина строки
 * @param {string} [fillChar] символ-заполнитель
 * @returns {string}
 */
String.prototype.rJust = function rJust(width, fillChar) {
    fillChar = (fillChar || ' ').charAt(0);
    return new Array(Math.max(0, width - this.length + 1)).join(fillChar) + this;
};