/*页面载入完成后，创建复制按钮*/
  !function (e, t, a) { 
    /* code */
    var initCopyCode = function(){
      var copyHtml = '';
      copyHtml += '<button class="btn-copy" data-clipboard-snippet="">';
      copyHtml += '  <i class="fa fa-clipboard"></i><span>copy</span>';
      copyHtml += '</button>';
      $(".highlight .code pre").before(copyHtml);
      //下面是我加上的，为了使复制按钮不随滚动条左移
      $(".highlight").wrap("<div class='highlight-wrap'></div>");
      new ClipboardJS('.btn-copy', {
          target: function(trigger) {
              return trigger.nextElementSibling;
          }
      });
    }
    initCopyCode();
  }(window, document);