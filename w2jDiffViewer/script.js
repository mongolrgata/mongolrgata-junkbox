var $template = $(
    '<div class="row">      ' +
    '  <div class="id-code">' +
    '  </div>               ' +
    '  <div class="line">   ' +
    '  </div>               ' +
    '</div>                 '
);

function setDiffJSON(obj) {
    localStorage.setItem('diff-json', JSON.stringify(obj));
}

function getDiffJSON() {
    return localStorage.getItem('diff-json') || '[]';
}

$(document).ready(function () {
    $('.json-data').val(getDiffJSON());
    $('.inner').click(function () {
        var diffData = $('.json-data').val();
        var list = JSON.parse(diffData);

        setDiffJSON(list);

        for (var i = 0; i < list.length; ++i) {
            var $left = $template.clone();
            var $right = $template.clone();
            var dlt = 5 - Math.min(Math.abs(parseInt(list[i].left.id, 16) - parseInt(list[i].right.id, 16)), 5);

            if (list[i].left.id !== list[i].right.id) {
                $left.css({
                    backgroundColor: 'rgb(255,0,0)',
                    opacity: dlt/5
                });
                $right.css({
                    backgroundColor: 'rgb(255,0,0)',
                    opacity: dlt/5
                });
            }

            $left.find('.id-code').text(list[i].left.id);
            $left.find('.line').html(list[i].left.line.replace(/\\n/g, '<br>'));
            $('.left').append($left);

            $right.find('.id-code').text(list[i].right.id);
            $right.find('.line').html(list[i].right.line.replace(/\\n/g, '<br>'));
            $('.right').append($right);
        }
    });
});
