(function() { "use strict"; 
            
         
    /***********************************/
  /*Swiper Slider*/
  /**********************************/
    
    var swipers = [];
    var winW = $(window).width();
    var winH  =  $(window).height();
  var xsPoint = 700, smPoint = 991, mdPoint = 1199; 
  var initIterator = 0;
               
    function swiperInit(){
    
      $('.swiper-container').each(function(){                 
      var $th = $(this);                  
      var index = $th.attr('id'); 
        $(this).addClass('swiper-'+index + ' initialized').attr('init-attr', 'swiper-'+index);
        $(this).find('.pagination').addClass('pagination-'+index);
      
        var autoPlayVar = parseInt($th.attr('data-autoplay'),10);
        var slidesPerViewVar = $th.attr('data-slides-per-view');
          var loopVar = parseInt($th.attr('data-loop'),10);
          var mouseVar = parseInt($th.attr('data-mouse'),10);
          var sliderSpeed = parseInt($th.attr('data-speed'),10);
          var touchVar = parseInt($th.attr('data-touch'),10);
          var xsValue, smValue, mdValue, lgValue;
          var slideMode =  $th.attr('data-mode');
          if(slidesPerViewVar == 'responsive'){
           xsValue = parseInt($th.attr('data-xs-slides'),10);
           smValue = parseInt($th.attr('data-sm-slides'),10);
           mdValue = parseInt($th.attr('data-md-slides'),10);
           lgValue = parseInt($th.attr('data-lg-slides'),10);
           slidesPerViewVar = updateSlidesPerView(xsValue, smValue, mdValue, lgValue);
                } else slidesPerViewVar = parseInt(slidesPerViewVar,10);
        
        swipers ['swiper-'+index] = new Swiper('.swiper-'+index,{
          speed: sliderSpeed,
          loop: loopVar,
          mode: slideMode,
          grabCursor: true,
          pagination: '.pagination-'+index,
          paginationClickable: true,
          autoplay: autoPlayVar,
          autoplayDisableOnInteraction: true,
          slidesPerView: slidesPerViewVar,
          keyboardControl: true,
          simulateTouch: touchVar,
          calculateHeight: true,
          mousewheelControl: mouseVar,
          onInit: function(swiper){
          var activeIndex = (loopVar===true)?swiper.activeIndex:swiper.activeLoopIndex;
          if($th.closest('#slider').length) {
                        $('.points').on('click', function(){
                            var eqIndex = $('.points').index(this);
                            $('.points').removeClass('act');
              $('.absolut-point').css({'left': $(this).offset().left -$(this).parent().offset().left});
                            $(this).addClass('act');
                            swiper.swipeTo(eqIndex);
                            swiper.stopAutoplay();
                            return false;
                        });
          } 
          },
          onSlideChangeStart: function(swiper){
          var activeIndex = (loopVar===true)?swiper.activeIndex:swiper.activeLoopIndex;
          if($th.closest('.testi-slider-app').length){
            $th.closest('.client-app').find('.clients-slider .logotype-clients').removeClass('active');
            $th.closest('.client-app').find('.clients-slider .logotype-clients').eq(activeIndex).addClass('active');
          }
            if($th.closest('.menu-slider').length){
              $th.closest('.rest-menu').find('.res-point').removeClass('active');
            $th.closest('.rest-menu').find('.res-point').eq(activeIndex).addClass('active');
          }
            },
          onSlideChangeEnd: function(swiper){
          var activeIndex = (loopVar===true)?swiper.activeIndex:swiper.activeLoopIndex;
          if($th.closest('.career-slider').length){
             $th.closest('.car-home').find('.career-point').removeClass('active');
            $th.closest('.car-home').find('.career-point').eq(activeIndex).addClass('active');
          }
          }
        });
  
      swipers['swiper-'+index].reInit();
        initIterator++;
       
    });
   }
         
   $('.slide-prev').on('click', function(){
     var arIndex = $(this).parent().find('.swiper-container').attr('init-attr');
      swipers[arIndex].swipePrev();
     });

     $('.slide-next').on('click', function(){
     var arIndex = $(this).parent().find('.swiper-container').attr('init-attr');
      swipers[arIndex].swipeNext();
     });
                 
  function updateSlidesPerView(xsValue, smValue, mdValue, lgValue){
         if(winW > mdPoint) return lgValue;
         else if(winW>smPoint) return mdValue;
         else if(winW>xsPoint) return smValue;
         else return xsValue;
    }                      
  
         
  /***********************************/
  /*TABS FAQ*/
  /**********************************/       
         
  var tabFinish = 0;
  $('.nav-tab-item').on('click',  function(){
      var $t = $(this);
      if(tabFinish || $t.hasClass('active')) return false;
      tabFinish = 1;
      $t.closest('.nav-tab').find('.nav-tab-item').removeClass('active');
      $t.addClass('active');
      var index = $t.parent().parent().find('.nav-tab-item').index(this);
      $t.closest('.tab-wrapper').find('.tab-info:visible').fadeOut(500, function(){
          $t.closest('.tab-wrapper').find('.tab-info').eq(index).fadeIn(500, function() {
              tabFinish = 0;
          });
      });
  });      
  
  /***********************************/
  /*MOBILE MENU*/
  /**********************************/
             
  $('.nav-menu-icon a').on('click', function() { 
    if ($('nav').hasClass('slide-menu')){
      $('nav').removeClass('slide-menu'); 
      $(this).removeClass('active');
    }else {
       $('nav').addClass('slide-menu');
      $(this).addClass('active');
    }
    return false;
   });
    
  if ($(window).width()<992){      
    $('.menu > ul > li > a > .fa').on('click', function(){
       if ($(this).parent().parent().find('.dropmenu').hasClass('slidemenu')) {
         $(this).parent().parent().find('.dropmenu').removeClass('slidemenu');
       }else{
         $('.menu > ul > li > a').parent().parent().find('.dropmenu').removeClass('slidemenu');
         $(this).parent().parent().find('.dropmenu').addClass('slidemenu');
       }
      return false;
    });
    
    $('.submenu').on('click', function(){
      if($(this).parent().find('ul').hasClass('slidemenu')){
          $(this).parent().find('ul').removeClass('slidemenu');
      }else{
         $('.submenu').parent().find('ul').removeClass('slidemenu'); 
         $(this).parent().find('ul').addClass('slidemenu');
      }
      return false;
    });
  }
    
         
    $('.intro-scroll-down').on('click', function(){
     $('body, html').animate({'scrollTop':$('.full-width').offset().top});
      
  }); 
         
  /***********************************/
  /*DROPDOWN LIST*/
  /**********************************/       
         
  $('.drop').on( "click", function() {
      if($('.drop-list').hasClass('act')){
        $(this).find('.drop-list').removeClass('act');
        $(this).find('span').slideUp(300);
      }else{
               $('.drop span').slideUp(300);
        $(this).find('.drop-list').addClass('act');
                
        $(this).find('span').slideDown(300);
      }
      return false;
    });
    
    $('.drop span button, .drop span a').on( "click", function() {
      $(this).parent().parent().find('b').text($(this).text());
      $('.drop').find('span').slideUp(300);
    }); 
         
  /***********************************/
  /*BOOTSTRAP SLIDER*/
  /**********************************/
         
  if($('.h-slider').length){       
  $('.h-slider').slider({
    range: true,
    values: [50, 67]
  });
  }
         
  /***********************************/
  /*ACCORDIONS*/
  /**********************************/       
         
   var allPanels = $(".accordion > dd").hide();
        allPanels.first().slideDown("easeOutExpo");
        $(".accordion > dt > a").first().addClass("active");
        
        $(".accordion > dt > a").on('click', function(){
        
            var current = $(this).parent().next("dd");
            $(".accordion > dt > a").removeClass("active");
            $(this).addClass("active");
            allPanels.not(current).slideUp("easeInExpo");
            $(this).parent().next().slideDown("easeOutExpo");
            
            return false;
            
     });
         
  var allToggles = $(".toggle > dd").hide();
        
        $(".toggle > dt > a").on('click', function(){
        
            if ($(this).hasClass("active")) {
            
                $(this).parent().next().slideUp("easeOutExpo");
                $(this).removeClass("active");
                
            }
            else {
                var current = $(this).parent().next("dd");
                $(this).addClass("active");
                $(this).parent().next().slideDown("easeOutExpo");
            }
            
            return false;
    });      
         
  $('.s-icon').on('click', function(){
    if ($('.s-field').hasClass('slide')){
       $('.s-field').removeClass('slide');
    }else{
       $('.s-field').addClass('slide');
    }
    return false;
  });
                     
  /***********************************/
  /*WINDOW SCROLL*/
  /**********************************/       
  
  $(window).scroll(function() {
    
     if ($('.time-line').length) {
     $('.time-line').not('.animated').each(function(){
      if($(window).scrollTop() >= $(this).offset().top-$(window).height()*0.5)
       {$(this).addClass('animated').find('.timer').countTo();}});
    }
    
    if ($('.start-line').length){
      if($(window).scrollTop() >= $('.start-line').offset().top - $('.start-line').height()){
         $('.skill-line div').each(function(){
              var objel = $(this);
              var pb_width = objel.attr('data-width-pb');
              objel.css({'width':pb_width});
            });
        }
     }  
    
    if ($(window).scrollTop() >= 100){
      $('header').addClass('fix');  
    }else {
      $('header').removeClass('fix');
    }
    
    var margRight = ($(window).width()-$('.container').width())/2;
    var margTop =  $('header').height();
    
    if ($(window).width() > 992){
      if ($(window).scrollTop() >= $('.top-baner.half-height').height()){
        $('.fixed-detail-panel').addClass('fix').css({"margin-right": margRight , "margin-top": margTop});
      }else{
        $('.fixed-detail-panel').removeClass('fix').css({"margin-right":"auto","margin-top":"auto"});
      }
    }
    

  });
     
  /***********************************/
  /*WINDOW RESIZE*/
  /**********************************/
         
  function resizeCall() {
    winW = $(window).width();
      winH = $(window).height();
         $('.swiper-container[data-slides-per-view="responsive"]').each(function(){
       var $th = $(this);
       var xsValue = parseInt($th.attr('data-xs-slides'),10);
       var smValue = parseInt($th.attr('data-sm-slides'),10);
       var mdValue = parseInt($th.attr('data-md-slides'),10);
       var lgValue = parseInt($th.attr('data-lg-slides'),10);
       var currentSwiper = swipers[$(this).attr('init-attr')];
       var newSlideNumber = updateSlidesPerView(xsValue, smValue, mdValue, lgValue);
       currentSwiper.params.slidesPerView = newSlideNumber;
             currentSwiper.reInit();
         });
    }

    $(window).resize(function(){
         resizeCall();
    }); 
         
  window.addEventListener("orientationchange", function() {
         resizeCall();
    }, false);  
         
  /***********************************/
  /*MULTI SCROLL PLUGIN*/
  /**********************************/
         
    if ($('.multiscroll').length){       
      $(function(){ 
        $('.multiscroll').multiscroll({
           navigation: true,
           loopBottom: true,
           loopTop: true,
           scrollingSpeed: 700,
           easing: 'easeInQuart'
          });
        
      });
    }
  
         
  /***********************************/
  /*TEXT ROTATOR*/
  /**********************************/
         
  if ($('.rotator').length){       
    $('.rotator').textrotator({
        animation: "dissolve",
        separator: "|",
        speed: 3000
    });
  }
         
  
       
  /***********************************/
  /*WINDOW LOAD*/
  /**********************************/
 
    $(window).load(function() {
    swiperInit();
      if ($('.izotope-container').length) { 
       var $container = $('.izotope-container');
              $container.isotope({
                itemSelector: '.item',
                layoutMode: 'masonry',
                masonry: {
                  columnWidth: '.grid-sizer'
                }
              });
       $('#filters').on('click', '.but', function() {
        $('.izotope-container').each(function(){
           $(this).find('.item').removeClass('animated');
        });
        $('#filters .but').removeClass('activbut');
          $(this).addClass('activbut');
           var filterValue = $(this).attr('data-filter');
            $container.isotope({filter: filterValue});
        });
           }

   });



/***********************************/
  // Text Ticker
  /**********************************/

$(window).load(function(){
        $('.text-rotator').each(function(){
            
            var text_rotator_content = $(this).html();
            $(this).empty();
            $(this).html('<div class="rotator-wrap"></div>')
            var this_item = $(this).children('.rotator-wrap');
            var text_rotator_content_split = text_rotator_content.split(',');
            var item_size = text_rotator_content_split.length;
            nova_text_rotator(text_rotator_content_split, this_item, item_size);
        });
        
        function nova_text_rotator(item_array, this_item, item_size, my_index){
            
            if(my_index == undefined)
                var my_index = -1;

            my_index++

            if(my_index < item_size)
            {

                this_item.fadeOut(800, function(){
                    this_item.html('<span>'+ item_array[my_index] +'</span>');
                    this_item.fadeIn(800);
                    
                });
            }
            else
            {
                my_index = -1;
            }

            setTimeout(function() {
                 nova_text_rotator(item_array, this_item, item_size, my_index);
            }, 2500);
        }
    });  




         
  /***********************************/
  /*ANIMSITION PLUGIN FOR PAGE TRANSITION*/
  /**********************************/
    
    if($(".animsition").length){
       $(".animsition").animsition({
      inClass               :   'fade-in',
      outClass              :   'fade-out',
      inDuration            :    3000,
      outDuration           :    700,
      linkElement           :   '.animsition-link',
         // e.g. linkElement   :   'a:not([target="_blank"]):not([href^=#])'
      loading               :    false,
      loadingParentElement  :   'body', 
      loadingClass          :   'animsition-loading',
      unSupportCss          : [ 'animation-duration',
                    '-webkit-animation-duration',
                    '-o-animation-duration'
                  ]
      });
    }      



  
         
})(jQuery); 