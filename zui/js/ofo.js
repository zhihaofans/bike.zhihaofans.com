var ofo_server = 'http://easy-mock.com/mock/594b9f658ac26d795f4387ac/bike/ofo';
var link_regex = /[a-zA-z]+:\/\/[^\s]*/;
$(document).ready(function () {
    ofo_init();
});
var ofo_init = function () {
    $('#ofo-items').html('');
    $.getJSON(ofo_server, function (ofo_data) {
        var ofos_html = '';
        $.each(ofo_data, function (i, ofo_item) {
            var ofo_html = '';
            if (link_regex.test(ofo_item['code'])) {
                ofo_html = '<a href="' + ofo_item['code'] + '" target="_blank" class="list-group-item">' +
                    '<h4 class="list-group-item-heading">' + ofo_item['desc'] + '</h4>' +
                    '<p class="list-group-item-text text-muted">This is a link,click to browse</p>';
            } else {
                ofo_html = '<a data-code="' + encodeURIComponent(ofo_item['code']) +
                    '" href="javascript:void(0);" target="_blank" ' +
                    'class="list-group-item showCode">' +
                    '<h4 class="list-group-item-heading">' + ofo_item['desc'] + '</h4>' +
                    '<p class="list-group-item-text text-muted"><strong>' + ofo_item['code'] +
                    '</strong></p>';
            }
            ofo_html += '<p class="list-group-item-text text-muted">' + ofo_item['money'] +
                "&nbsp;|&nbsp;Timeout:" + ofo_item['time'] + '</p></a>';
            ofos_html += ofo_html;
        });
        $('#ofo-items').html(ofos_html);
        $('#loading-tip').hide();
        new $.zui.Messager('Finish', {
            time: 1000,
            type: 'success'
        }).show();
        $(".showCode").click(function () {
            ofo_showCode(decodeURIComponent($(this).attr('data-code')));
        });
    });
};
var ofo_showCode = function (code) {
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