$ ->
   # VARS
   document = $(window.document)
   $services_area = $('#services')
   $about_area = $('#about')
   $why_area = $('#why')
   $contact_area = $('#contact')
   $mainHeader = $('#main-header')
   marginTop = 250
   contact_state = 'contact'
   current_area = '#home'

   # FUNCAO THAT SETS THE HEADER BAR STATE
   setHeaderBarState = (area) ->
      $mainHeader.removeAttr('class')
      $('li', $mainHeader).removeClass('current')
      current_area = area
      switch area
         when '#services'
            $mainHeader.addClass('highlight services-area')
            $('#services-item').addClass('current')
         when '#about'
            $mainHeader.addClass('highlight about-area')
            $('#about-item').addClass('current')
         when '#why'
            $mainHeader.addClass('highlight why-area')
            $('#why-item').addClass('current')
         when '#home', '#sim'
            $('#home-item').addClass('current')
         else
            switch contact_state
               when 'orcamento'
                  $('#orcamento-item').addClass('current')
               when 'join'
                  $('#join-item').addClass('current')
               else
                  $('#contact-item').addClass('current')

   scrollToNewArea = (area) ->
      if area != current_area
         # window.location.hash = area
         setHeaderBarState area

   # HEADER BAR COLOR CHANGE
   $(document).scroll ->
      sTop = document.scrollTop()
      if(sTop <= $services_area.offset().top- marginTop )
         scrollToNewArea('#home')
      else if(sTop >= $services_area.offset().top - marginTop && sTop <= $about_area.offset().top - marginTop)
         scrollToNewArea('#services')
      else if(sTop >= $about_area.offset().top - marginTop && sTop <= $why_area.offset().top - marginTop)
         scrollToNewArea('#about')
      else if(sTop >= $why_area.offset().top - marginTop && sTop <= $contact_area.offset().top - marginTop)
         scrollToNewArea('#why')
      else
         scrollToNewArea('#contact')

   # SMOOTH SCROLL
   $("a[href^=#][href!=#]").click (e) ->
      hash = @hash
      $('html,body', document).animate({scrollTop:$(@hash).offset().top}, 500, ->
         setHeaderBarState(hash)
      )

   # EXPAND TEAM-MEMBER CONTENT
   $('.team-member').addClass('excerpt')
   $('a.more-content', '.team-member').click (e) ->
      e.preventDefault()
      $parent = $(@).closest('.team-member')
      $parent.toggleClass('excerpt')
      if $parent.hasClass('excerpt')
         $scrollToThis = $parent
      else
         $scrollToThis = $parent.find('.description').first()
      $('html,body', document).animate({scrollTop:$scrollToThis.offset().top - 120}, 500)

   # CHANGE CONTACT SCREEN
   changeForm = ->
      $('.form-section').hide()
      $('#form-'+contact_state).fadeIn()

   # CHANGE CONTACT CLICK
   $('.contact-menu-link').click ->
      new_data = String($(@).data('form'))
      if contact_state != new_data
         contact_state = new_data
         setHeaderBarState('#contact')
         changeForm()

   # ORCAMENTO SCRIPTS
   $('#form-orcamento').foundationCustomForms()

   $('.servico-options').hide()
   $('#servico-choice').on "change", ->
      $('.servico-options').hide()
      if $("input:checked", @).val() == "simultânea/consecutiva"
         $('#tags-for-simultanea').fadeIn()
      else if $("input:checked", @).val() == "juramentada"
         $('#tags-for-juramentada').fadeIn()
      else
         $('#tags-for-escrita').fadeIn()
