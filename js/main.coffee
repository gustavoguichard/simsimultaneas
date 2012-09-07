$ ->
   document = $(window.document)
   $services_area = $('#services')
   $about_area = $('#about')
   $why_area = $('#why')
   $contact_area = $('#contact')
   $mainHeader = $('#main-header')

   $(document).scroll ->
      sTop = document.scrollTop()
      marginTop = 150
      if(sTop >= $services_area.offset().top - marginTop && sTop <= $about_area.offset().top - marginTop)
         $mainHeader.removeAttr('class').addClass('highlight services-area')
      else if(sTop >= $about_area.offset().top - marginTop && sTop <= $why_area.offset().top - marginTop)
         $mainHeader.removeAttr('class').addClass('highlight about-area')
      else if(sTop >= $why_area.offset().top - marginTop && sTop <= $contact_area.offset().top - marginTop)
         $mainHeader.removeAttr('class').addClass('highlight why-area')
      else
         $mainHeader.removeAttr('class')

   $(".main-menu-item a", $mainHeader).click (e) ->
      e.preventDefault()
      $('html,body').animate({scrollTop:$(@hash).offset().top}, 500)

   $('.description', '.team-member').addClass('excerpt')
   $('a.more-content', '.team-member').click (e) ->
      e.preventDefault()
      $(@).closest('.team-member').find('.description').toggleClass('excerpt')