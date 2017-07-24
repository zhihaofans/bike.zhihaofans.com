other_server = 'https://easy-mock.com/mock/594b9f658ac26d795f4387ac/bike/other'
link_regex = /[a-zA-z]+:\/\/[^\s]*/
$(document).ready ->
  $(document.body).pullToRefresh()
  other_init()
  return
  
$(document.body).on 'pull-to-refresh', ->
  other_init()
  return

other_init = ->
  $('#other-items').html ''
  $('#other-items').hide()
  $.getJSON other_server, (other_data) ->
    others_html = ''
    $.each other_data, (i, other_item) ->
      other_html = getItem other_item['desc'], other_item['money'],
          other_item['city'], other_item['code'], other_item['time']
      others_html += other_html
      return
    $('#other-items').html others_html
    $('#loading').hide()
    $('#other-items').show()
    $.toptip '加载成功', 1000, 'success'
    $(document.body).pullToRefreshDone()
    $('.showCode').click ->
      other_showCode decodeURIComponent($(this).attr('code')),
        $(this).attr('money'), $(this).attr('city'), $(this).attr('timeout')
      return
    return
  return

other_showCode = (code, money, city, timeout) ->
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