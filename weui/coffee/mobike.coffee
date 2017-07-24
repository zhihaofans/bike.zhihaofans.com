mobike_server = 'https://easy-mock.com/mock/594b9f658ac26d795f4387ac/bike/mo'
link_regex = /[a-zA-z]+:\/\/[^\s]*/
$(document).ready ->
  $(document.body).pullToRefresh()
  mobike_init()
  return
  
$(document.body).on 'pull-to-refresh', ->
  mobike_init()
  return

mobike_init = ->
  $('#mobike-items').html ''
  $('#mobike-items').hide()
  $.getJSON mobike_server, (mobike_data) ->
    mobikes_html = ''
    $.each mobike_data, (i, mobike_item) ->
      mobike_html = getItem mobike_item['desc'], mobike_item['money'],
          mobike_item['city'], mobike_item['code'], mobike_item['time']
      mobikes_html += mobike_html
      return
    $('#mobike-items').html mobikes_html
    $('#loading').hide()
    $('#mobike-items').show()
    $.toptip '加载成功', 1000, 'success'
    $(document.body).pullToRefreshDone()
    $('.showCode').click ->
      mobike_showCode decodeURIComponent($(this).attr('code')),
        $(this).attr('money'), $(this).attr('city'), $(this).attr('timeout')
      return
    return
  return

mobike_showCode = (code, money, city, timeout) ->
  if link_regex.test code
    $.confirm
      title: '即将跳转到'
      text: code
      onOK: ->
        #点击确认
        location.href = code
        return
  else
    $.prompt
      title: "请复制"
      text: "金额:#{money}<br>适用地区:#{city}<br>过期:#{timeout}"
      input: "#{code}"
  return

getItem = (title, money, city, code, timeout) ->
  en_code = encodeURIComponent code
  itemHtml = '<a class="weui-cell weui-cell_access showCode"' +
    " code=\"#{en_code}\" city=\"#{city}\"" +
    " money=\"#{money}\" timeout=\"#{timeout}\" href=\"javascript:void(0);" +
    "\"><div class=\"weui-cell__bd\"><p>#{title}" +
    "</p></div><div class=\"weui-cell__ft\"></div></a>"
  return itemHtml