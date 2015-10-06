require.config({
    paths: {
        jquery: 'lib/jquery-2.1.4.min',
        FSM: 'modules/FSM/FSM.module',
        Storage: 'modules/Storage/Storage.module'
    }
});

require(['jquery', 'FSM', 'Storage', 'helpers'], function ($, FSM, Storage, helpers) {
    var key = '883dad36-7d5a-48c2-8d1e-e97308486f6d';
    var fsm = Storage.load(key, new FSM());

    $(document).ready(function () {
        var $left = $('#left');
        var $right = $('#right');

        var repaint = function repaint () {

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
                    var view = new Uint8Array(result);

                    $('#text').text(fsm.decode(view));
                };

                reader.readAsArrayBuffer(f_in);
            });

        $('#add-rule')
            .click(function () {
                fsm.addRule(helpers.split($left.val()), $right.val());
                repaint();
            });

        repaint();
    });
});
