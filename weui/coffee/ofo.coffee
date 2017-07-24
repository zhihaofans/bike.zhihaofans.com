ofo_server = 'https://easy-mock.com/mock/594b9f658ac26d795f4387ac/bike/ofo'
link_regex = /[a-zA-z]+:\/\/[^\s]*/
$(document).ready ->
  $(document.body).pullToRefresh()
  ofo_init()
  return
  
$(document.body).on 'pull-to-refresh', ->
  ofo_init()
  return

ofo_init = ->
  $('#ofo-items').html ''
  $('#ofo-items').hide()
  $.getJSON ofo_server, (ofo_data) ->
    ofos_html = ''
    $.each ofo_data, (i, ofo_item) ->
      ofo_html = getItem ofo_item['desc'], ofo_item['money'],
          ofo_item['city'], ofo_item['code'], ofo_item['time']
      ofos_html += ofo_html
      return
    $('#ofo-items').html ofos_html
    $('#loading').hide()
    $('#ofo-items').show()
    $.toptip '加载成功', 1000, 'success'
    $(document.body).pullToRefreshDone()
    $('.showCode').click ->
      ofo_showCode decodeURIComponent($(this).attr('code')),
        $(this).attr('money'), $(this).attr('city'), $(this).attr('timeout')
      return
    return
  return

ofo_showCode = (code, money, city, timeout) ->
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