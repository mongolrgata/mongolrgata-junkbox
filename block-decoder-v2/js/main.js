require.config({
    paths: {
        jquery: 'lib/jquery-2.1.4.min',
        doT: 'lib/doT.min',
        FSM: 'modules/FSM/FSM.module',
        Storage: 'modules/Storage/Storage.module'
    }
});

require(['jquery', 'doT', 'FSM', 'Storage', 'helpers', 'text!../templates/rule.html'], function ($, doT, FSM, Storage, helpers, ruleT) {
    var bytesKey = '6f258d60-b1c6-4bc1-9acb-40d4f06598c9';
    var rulesKey = 'fca0e74c-6483-43bb-86b0-746a30650b67';

    var fsm = new FSM();
    fsm.setRules(Storage.load(rulesKey, helpers.defaultRules));

    $(document).ready(function () {
        var $text = $('#text');
        var $rules = $('#rules');
        var $left = $('#left');
        var $right = $('#right');
        var $rulesJSON = $('#rules-json');

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

        $('#get-rules')
            .click(function () {
                $rulesJSON.val(JSON.stringify(fsm.getRules(), null, 4));
            });

        $('#set-rules')
            .click(function () {
                fsm.setRules(JSON.parse($rulesJSON.val()));
                Storage.save(rulesKey, fsm.getRules());

                repaint();
            });

        $('#reset-rules')
            .click(function () {
                fsm.setRules(helpers.defaultRules);
                Storage.save(rulesKey, fsm.getRules());

                repaint();
            });

        repaint();
    });
});
