require.config({
    paths: {
        jquery: 'lib/jquery-2.1.4.min',
        doT: 'lib/doT.min',
        FSM: 'modules/FSM/FSM.module',
        Storage: 'modules/Storage/Storage.module'
    }
});

require(['jquery', 'doT', 'FSM', 'Storage', 'text!../templates/rule.html'], function ($, doT, FSM, Storage, ruleT) {
    var bytesKey = '6f258d60-b1c6-4bc1-9acb-40d4f06598c9';
    var rulesKey = 'fca0e74c-6483-43bb-86b0-746a30650b67';

    var fsm = new FSM();
    fsm.setRules(Storage.load(rulesKey, {
        //"[00]": "[NUL]",
        //"[04]": "[SOH]",
        //"[08]": "[STX]",
        //"[0C]": "[ETX]",
        //"[10]": "[EOT]",
        //"[14]": "[ENQ]",
        //"[18]": "[ACK]",
        //"[1C]": "[BEL]",
        //"[20]": "[BS]",
        //"[24]": "[HT]",
        //"[28]": "[LF]",
        //"[2C]": "[VT]",
        //"[30]": "[FF]",
        //"[34]": "[CR]",
        //"[38]": "[SO]",
        //"[3C]": "[SI]",
        //"[40]": "[DLE]",
        //"[44]": "[DC1]",
        //"[48]": "[DC2]",
        //"[4C]": "[DC3]",
        //"[50]": "[DC4]",
        //"[54]": "[NAK]",
        //"[58]": "[SYN]",
        //"[5C]": "[ETB]",
        //"[60]": "[CAN]",
        //"[64]": "[EM]",
        //"[68]": "[SUB]",
        //"[6C]": "[ESC]",
        //"[70]": "[FS]",
        //"[74]": "[GS]",
        //"[78]": "[RS]",
        //"[7C]": "[US]",
        "[80]": " ",
        "[84]": "!",
        "[88]": "\"",
        "[8C]": "#",
        "[90]": "$",
        "[94]": "%",
        "[98]": "&",
        "[9C]": "'",
        "[A0]": "(",
        "[A4]": ")",
        "[A8]": "*",
        "[AC]": "+",
        "[B0]": ",",
        "[B4]": "-",
        "[B8]": ".",
        "[BC]": "/",
        "[C0]": "0",
        "[C4]": "1",
        "[C8]": "2",
        "[CC]": "3",
        "[D0]": "4",
        "[D4]": "5",
        "[D8]": "6",
        "[DC]": "7",
        "[E0]": "8",
        "[E4]": "9",
        "[E8]": ":",
        "[EC]": ";",
        "[F0]": "<",
        "[F4]": "=",
        "[F8]": ">",
        "[FC]": "?",
        "[01]": "@",
        "[05]": "A",
        "[09]": "B",
        "[0D]": "C",
        "[11]": "D",
        "[15]": "E",
        "[19]": "F",
        "[1D]": "G",
        "[21]": "H",
        "[25]": "I",
        "[29]": "J",
        "[2D]": "K",
        "[31]": "L",
        "[35]": "M",
        "[39]": "N",
        "[3D]": "O",
        "[41]": "P",
        "[45]": "Q",
        "[49]": "R",
        "[4D]": "S",
        "[51]": "T",
        "[55]": "U",
        "[59]": "V",
        "[5D]": "W",
        "[61]": "X",
        "[65]": "Y",
        "[69]": "Z",
        "[6D]": "[",
        "[71]": "\\",
        "[75]": "]",
        "[79]": "^",
        "[7D]": "_",
        "[81]": "`",
        "[85]": "a",
        "[89]": "b",
        "[8D]": "c",
        "[91]": "d",
        "[95]": "e",
        "[99]": "f",
        "[9D]": "g",
        "[A1]": "h",
        "[A5]": "i",
        "[A9]": "j",
        "[AD]": "k",
        "[B1]": "l",
        "[B5]": "m",
        "[B9]": "n",
        "[BD]": "o",
        "[C1]": "p",
        "[C5]": "q",
        "[C9]": "r",
        "[CD]": "s",
        "[D1]": "t",
        "[D5]": "u",
        "[D9]": "v",
        "[DD]": "w",
        "[E1]": "x",
        "[E5]": "y",
        "[E9]": "z",
        "[ED]": "{",
        "[F1]": "|",
        "[F5]": "}",
        "[F9]": "~",
        //"[FD]": "[DEL]"
        "[71][B9]": "\n"
    }));

    $(document).ready(function () {
        var $text = $('#text');
        var $rules = $('#rules');
        var $left = $('#left');
        var $right = $('#right');

        var ruleFn = doT.template(ruleT);

        var repaint = function repaint () {
            $text.text(fsm.decode(Storage.load(bytesKey, [])));
            $rules.empty();

            var rules = fsm.getRules();
            for (var left in rules) {
                if (rules.hasOwnProperty(left)) {
                    $rules.append(
                        ruleFn({
                            left: left,
                            right: rules[left]
                        })
                    );
                }
            }
        };

        $('#file-in')
            .click(function () {
                this.value = null;
            })
            .change(function () {
                var f_in = this.files[0];
                var reader = new FileReader();

                reader.onloadend = function (e) {
                    var result = e.currentTarget.result;
                    Storage.save(bytesKey, Array.from(new Uint8Array(result)));

                    repaint();
                };

                reader.readAsArrayBuffer(f_in);
            });

        $('#add-rule')
            .click(function () {
                fsm.addRule($left.val(), $right.val());
                Storage.save(rulesKey, fsm.getRules());

                repaint();
            });

        repaint();
    });
});
