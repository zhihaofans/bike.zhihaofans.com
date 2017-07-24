mobike_server = 'https://easy-mock.com/mock/594b9f658ac26d795f4387ac/bike/mo'
link_regex = /[a-zA-z]+:\/\/[^\s]*/
$(document).ready ->
  mobike_init()
  return

mobike_init = ->
  $('#mobike-items').html ''
  $.getJSON mobike_server, (mobike_data) ->
    mobikes_html = ''
    $.each mobike_data, (i, mobike_item) ->
      mobike_html = ''
      if link_regex.test(mobike_item['code'])
        mobike_html = '<a href="' + mobike_item['code'] + '" target="_blank" class="list-group-item">' + '<h4 class="list-group-item-heading">' + mobike_item['desc'] + '</h4>' + '<p class="list-group-item-text text-muted">This is a link,click to browse</p>'
      else
        mobike_html = '<a data-code="' + encodeURIComponent(mobike_item['code']) + '" href="javascript:void(0);" target="_blank" ' + 'class="list-group-item showCode">' + '<h4 class="list-group-item-heading">' + mobike_item['desc'] + '</h4>' + '<p class="list-group-item-text text-muted"><strong>' + mobike_item['code'] + '</strong></p>'
      mobike_html += '<p class="list-group-item-text text-muted">Money:' + mobike_item['money'] + '&nbsp;|&nbsp;Timeout:' + mobike_item['time'] + '</p></a>'
      mobikes_html += mobike_html
      return
    $('#mobike-items').html mobikes_html
    $('#loading-tip').hide()
    new ($.zui.Messager)('Finish',
      time: 1000
      type: 'success').show()
    $('.showCode').click ->
      mobike_showCode decodeURIComponent($(this).attr('data-code'))
      return
    return
  return

mobike_showCode = (code) ->
  modal_html = ''
  if code.length > 0
    modal_html = '<textarea class="form-control" rows="3" id="code_input">'
  else
    modal_html = '<h1><font color="#FF0000">Web script error (Error code).</font></h1>'
  $('#modal_html').html modal_html
  $('#code_input').val code
  $('#myModal').modal 'show', 'fit'
  return
