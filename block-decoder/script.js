/**
 * DONE
 * @returns {string}
 */
function getEncodedText() {
    return localStorage.getItem('encoded-text') || '';
}

/**
 * DONE
 * @param text
 */
function setEncodedText(text) {
    localStorage.setItem('encoded-text', text);
    decodeText();
}

/**
 * DONE
 */
function getRules() {
    return JSON.parse(localStorage.getItem('rules') || '[]');
}

/**
 * DONE
 * @param rules
 */
function setRules(rules) {
    localStorage.setItem('rules', JSON.stringify(rules));
    refresh();
}

function updateRules() {
    var
        $rules     = $('#rules'),
        rulesArray = getRules(),
        $head      = $(
            '<table>                                                            ' +
            '   <colgroup>                                                      ' +
            '       <col width="32px">                                          ' +
            '       <col width="100%">                                          ' +
            '   </colgroup>                                                     ' +
            '   <tr>                                                            ' +
            '       <td><input class="toggle-all" type="checkbox" checked></td> ' +
            '       <td></td>                                                   ' +
            '   </tr>                                                           ' +
            '</table>                                                           '
        ),
        $template  = $(
            '<table>                                                            ' +
            '   <colgroup>                                                      ' +
            '       <col width="32px">                                          ' +
            '       <col width="50%">                                           ' +
            '       <col width="50%">                                           ' +
            '       <col width="64px">                                          ' +
            '       <col width="64px">                                          ' +
            '       <col width="64px">                                          ' +
            '       <col width="128px">                                         ' +
            '   </colgroup>                                                     ' +
            '   <tr>                                                            ' +
            '       <td><input class="active" type="checkbox"></td>             ' +
            '       <td class="code"><span class="search-value"></span></td>    ' +
            '       <td class="code"><span class="replace-value"></span></td>   ' +
            '       <td><button class="move-up">Выше</button></td>          ' +
            '       <td><button class="move-down">Ниже</button></td>        ' +
            '       <td><button class="move-top">В топ</button></td>        ' +
            '       <td><button class="delete-rule">Удалить</button></td>' +
            '   </tr>                                                           ' +
            '</table>                                                           '
        );

    $rules.empty().append(
        $head.find('.toggle-all').change(function () {
            toggleAllRules();
        })
    );

    for (var i = 0, n = rulesArray.length; i < n; ++i) {
        var
            rule         = rulesArray[i],
            active       = rule['active'],
            searchValue  = rule['searchValue'],
            replaceValue = rule['replaceValue'],
            $rule        = $template.clone();

        $rule.find('.active').prop('checked', active).change((function (index) {
            return function () {
                var $checkbox = $(this);

                toggleRule(index, $checkbox.prop('checked'));
            };
        })(i));
        $rule.find('.search-value').text(searchValue);
        $rule.find('.replace-value').text(replaceValue);
        $rule.find('.move-up').click((function (index) {
            return function () {
                moveUp(index);
            };
        })(i));
        $rule.find('.move-down').click((function (index) {
            return function () {
                moveDown(index);
            };
        })(i));
        $rule.find('.move-top').click((function (index) {
            return function () {
                moveTop(index);
            };
        })(i));
        $rule.find('.delete-rule').click((function (index) {
            return function () {
                deleteRule(index);
            };
        })(i));

        $rules.append($rule);
    }
}

/**
 * CONFLICT WAS HERE
 * @param searchValue
 * @param replaceValue
 */
function addRule(searchValue, replaceValue) {
    var rules = getRules();

    rules.push({
        active       : true,
        searchValue  : searchValue,
        replaceValue : replaceValue
    });

    setRules(rules);
}

/**
 * DONE
 * @param index
 */
function deleteRule(index) {
    var rules = getRules();

    rules.splice(index, 1);

    setRules(rules);
}

/**
 * DONE
 * @param index
 */
function moveUp(index) {
    var rules = getRules();

    if (index == 0) {
        return;
    }

    rules[index] = [rules[index - 1], rules[index - 1] = rules[index]][0];

    setRules(rules);
}

/**
 * DONE
 * @param index
 */
function moveDown(index) {
    var rules = getRules();

    if (index == rules.length - 1) {
        return;
    }

    rules[index] = [rules[index + 1], rules[index + 1] = rules[index]][0];

    setRules(rules);
}

/**
 * DONE
 * @param index
 */
function moveTop(index) {
    var
        rules = getRules(),
        rule  = rules.splice(index, 1);

    rules.unshift(rule[0]);

    setRules(rules);
}

/**
 * DONE
 * @param index
 * @param value
 */
function toggleRule(index, value) {
    var rules = getRules();

    rules[index]['active'] = value;

    setRules(rules);
}

/**
 * DONE
 */
function toggleAllRules() {
    var
        rules = getRules(),
        value = !rules[0]['active'];

    for (var i = 0, n = rules.length; i < n; ++i) {
        rules[i]['active'] = value;
    }

    setRules(rules);
}

function isCapital(char) {
    return char === char.toUpperCase();
}

/**
 * DONE
 */
function decodeText() {
    var
        encodedText = getEncodedText(),
        decodedText = '',
        rules = getRules();
    
    var cnt = {};

    for (var i = 0; i < encodedText.length; ++i) {
        var encodedChar = encodedText[i];

        decodedText += encodedChar;
        cnt[encodedChar.toUpperCase()] = (cnt[encodedChar.toUpperCase()] || 0) + 1;

        for (var j = 0; j < rules.length; ++j) {
            var rule = rules[j];

            if (!rule['active'])
                continue;
            
            var searchCharO = rule['searchValue'];
            var replaceCharO = rule['replaceValue'];

            var searchChar = searchCharO.toUpperCase();
            var replaceChar = isCapital(encodedChar) ? replaceCharO.toUpperCase() : replaceCharO.toLowerCase();

            if (encodedChar.toUpperCase() === searchChar) {
                decodedText = decodedText.slice(0, -1) + '<span style="color: black;">' + replaceChar + '</span>';
                cnt[encodedChar.toUpperCase()] -= 1;
                break;
            }
        }
    }
    
    var arr = [];
    for (var key in cnt) {
        arr[cnt[key]] = key + ' - ' + cnt[key];
    }
    arr = arr.filter(function (value) {
        return value
    }).reverse();
    
    console.log(arr);

    // for (var i = 0, n = rules.length; i < n; ++i) {
    //     var
    //         rule         = rules[i],
    //         re           = new RegExp(rule['searchValue'], 'g'),
    //         replaceValue = rule['replaceValue'];
    //
    //     if (!rule['active'])
    //         continue;
    //
    //     decodedText = decodedText.replace(re, '<span style="color: black;">' + replaceValue + '</span>');
    // }

    $('#decoded-text').html(decodedText);
}

/**
 * DONE
 */
function refresh() {
    updateRules();
    decodeText();
}

$(document).ready(function () {
    $('#load-encoded-text').click(function () {
        var $encodedText = $('#encoded-text');

        setEncodedText($encodedText.val());
        $encodedText.val('');
    });

    $('#load-rules').click(function () {
        var
            searchValue  = $('#search-value').val(),
            replaceValue = $('#replace-value').val();

        addRule(searchValue, replaceValue);
    });

    $('#stringify-rules').click(function () {
        $('#text-rules').val(JSON.stringify(getRules()));
    });

    $('#parse-rules').click(function () {
        setRules(JSON.parse($('#text-rules').val()));
    });

    $('#to-object-rules').click(function () {
        var
            rules       = getRules(),
            rulesObject = {};

        for (var i = 0, n = rules.length; i < n; ++i) {
            var rule = rules[i];

            rulesObject[rule['searchValue']] = rule['replaceValue'];
        }

        $('#text-rules').val(JSON.stringify(rulesObject));
    });

    refresh();
});
