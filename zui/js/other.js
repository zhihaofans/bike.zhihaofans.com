var other_server = 'https://easy-mock.com/mock/594b9f658ac26d795f4387ac/bike/other';
var link_regex = /[a-zA-z]+:\/\/[^\s]*/;
$(document).ready(function () {
    other_init();
});
var other_init = function () {
    $('#other-items').html('');
    $.getJSON(other_server, function (other_data) {
        var others_html = '';
        $.each(other_data, function (i, other_item) {
            var other_html = '';
            if (link_regex.test(other_item['code'])) {
                other_html = '<a href="' + other_item['code'] +
                    '" target="_blank" class="list-group-item">' +
                    '<h4 class="list-group-item-heading">' + other_item['desc'] + '</h4>' +
                    '<p class="list-group-item-text text-muted">This is a link,click to browse</p>';
            } else {
                other_html = '<a data-code="' + encodeURIComponent(other_item['code']) +
                    '" href="javascript:void(0);" target="_blank" ' +
                    'class="list-group-item showCode">' +
                    '<h4 class="list-group-item-heading">' + other_item['desc'] + '</h4>' +
                    '<p class="list-group-item-text text-muted"><strong>' + other_item['code'] +
                    '</strong></p>';
            }
            other_html += '<p class="list-group-item-text text-muted">' + other_item['money'] +
                "&nbsp;|&nbsp;Timeout:" + other_item['time'] + '</p></a>';
            others_html += other_html;
        });
        $('#other-items').html(others_html);
        $('#loading-tip').hide();
        new $.zui.Messager('Finish', {
            time: 1000,
            type: 'success'
        }).show();
        $(".showCode").click(function () {
            other_showCode(decodeURIComponent($(this).attr('data-code')));
        });
    });
};
var other_showCode = function (code) {
    var modal_html = '';
    if (code.length > 0) {
        modal_html = '<textarea class="form-control" rows="3" id="code_input">';
    } else {
        modal_html = '<h1><font color="#FF0000">Web script error (Error code).</font></h1>';
    }
    $('#modal_html').html(modal_html);
    $('#code_input').val(code);
    $('#myModal').modal('show', 'fit');
}