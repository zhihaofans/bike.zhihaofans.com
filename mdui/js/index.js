var $$ = mdui.JQ;
var bike_server = {
    "ofo": 'https://easy-mock.com/mock/594b9f658ac26d795f4387ac/bike/ofo',
    "mobike": 'https://easy-mock.com/mock/594b9f658ac26d795f4387ac/bike/mo',
    "other": 'https://easy-mock.com/mock/594b9f658ac26d795f4387ac/bike/other'
};
var bike_data = {
    "ofo": [],
    "mobike": [],
    "other": []
};
var link_regex = /[a-zA-z]+:\/\/[^\s]*/;
$$(function () {
    console.log('DOM Loaded');
    //loadData();
})
var loadData = function () {
    $$.each(bike_server, function (i, value) {
        console.log(i + ':' + value);
        $.getJSON(value, function (bike_data) {
            var bikes_html = '';
            $$.each(bike_data, function (i, bike_item) {
                var bike_html = '<div class="mdui-card mdui-m-t-1 mdui-m-x-1 mdui-p-a-2">' +
                    '<h5>' ++'</h5>'+
                        '</div>';
                bikes_html += bike_html;
            });
            $('#bike-items').html(bikes_html);
            $('#loading-tip').hide();
            new $.zui.Messager('Finish', {
                time: 1000,
                type: 'success'
            }).show();
            $(".showCode").click(function () {
                //bike_showCode(decodeURIComponent($(this).attr('data-code')));
            });
        });
    })
}
var getCard = function () {
    var cardHtml = '<div class="mdui-card" ><div class="mdui-card-primary">' +
        '<div class="mdui-card-primary-title">Title</div>
        '<div class="mdui-card-primary-subtitle">Subtitle</div>
            '</div >
    '<div class="mdui-card-content"></div> <div class="mdui-card-actions">
        '<button class="mdui-btn mdui-ripple">action 1</button>
    </div>
    </div >
    
}