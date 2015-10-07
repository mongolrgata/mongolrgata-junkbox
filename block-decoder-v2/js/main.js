require.config({
    paths: {
        jquery: 'lib/jquery-2.1.4.min',
        FSM: 'modules/FSM/FSM.module',
        Storage: 'modules/Storage/Storage.module'
    }
});

require(['jquery', 'FSM', 'Storage'], function ($, FSM, Storage) {
    var bytesKey = '6f258d60-b1c6-4bc1-9acb-40d4f06598c9';
    var rulesKey = 'fca0e74c-6483-43bb-86b0-746a30650b67';

    var fsm = new FSM();

    $(document).ready(function () {
        var $left = $('#left');
        var $right = $('#right');

        var repaint = function repaint () {
            $('#text').text(fsm.decode(Storage.load(bytesKey, [])));
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

                repaint();
            });

        repaint();
    });
});
