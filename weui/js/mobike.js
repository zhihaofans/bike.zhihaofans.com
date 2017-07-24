// Generated by CoffeeScript 1.12.7
(function() {
  var getItem, link_regex, mobike_init, mobike_server, mobike_showCode;

  mobike_server = 'https://easy-mock.com/mock/594b9f658ac26d795f4387ac/bike/mo';

  link_regex = /[a-zA-z]+:\/\/[^\s]*/;

  $(document).ready(function() {
    $(document.body).pullToRefresh();
    mobike_init();
  });

  $(document.body).on('pull-to-refresh', function() {
    mobike_init();
  });

  mobike_init = function() {
    $('#mobike-items').html('');
    $('#mobike-items').hide();
    $.getJSON(mobike_server, function(mobike_data) {
      var mobikes_html;
      mobikes_html = '';
      $.each(mobike_data, function(i, mobike_item) {
        var mobike_html;
        mobike_html = getItem(mobike_item['desc'], mobike_item['money'], mobike_item['city'], mobike_item['code'], mobike_item['time']);
        mobikes_html += mobike_html;
      });
      $('#mobike-items').html(mobikes_html);
      $('#loading').hide();
      $('#mobike-items').show();
      $.toptip('加载成功', 1000, 'success');
      $(document.body).pullToRefreshDone();
      $('.showCode').click(function() {
        mobike_showCode(decodeURIComponent($(this).attr('code')), $(this).attr('money'), $(this).attr('city'), $(this).attr('timeout'));
      });
    });
  };

  mobike_showCode = function(code, money, city, timeout) {
    if (link_regex.test(code)) {
      $.confirm({
        title: '即将跳转到',
        text: code,
        onOK: function() {
          location.href = code;
        }
      });
    } else {
      $.prompt({
        title: "请复制",
        text: "金额:" + money + "<br>适用地区:" + city + "<br>过期:" + timeout,
        input: "" + code
      });
    }
  };

  getItem = function(title, money, city, code, timeout) {
    var en_code, itemHtml;
    en_code = encodeURIComponent(code);
    itemHtml = '<a class="weui-cell weui-cell_access showCode"' + (" code=\"" + en_code + "\" city=\"" + city + "\"") + (" money=\"" + money + "\" timeout=\"" + timeout + "\" href=\"javascript:void(0);") + ("\"><div class=\"weui-cell__bd\"><p>" + title) + "</p></div><div class=\"weui-cell__ft\"></div></a>";
    return itemHtml;
  };

}).call(this);
