(function($){
  var incCounter = function(data){
    var nextSlide = data.nextSlide,
        prevSlide = data.prevSlide,
        totalSlides = data.totalSlides;

    nextSlide = nextSlide + 1;
    prevSlide = prevSlide + 1;

    if(nextSlide >= totalSlides) nextSlide = 0;
    if(prevSlide >= totalSlides) prevSlide = 0;
    data.nextSlide = nextSlide;
    data.prevSlide = prevSlide;

    return data;
  }

  var decCounter = function(data){
    var nextSlide = data.nextSlide,
        prevSlide = data.prevSlide,
        totalSlides = data.totalSlides;

    nextSlide = nextSlide - 1;
    prevSlide = prevSlide - 1;

    if(nextSlide < 0) nextSlide = totalSlides - 1;
    if(prevSlide < 0 ) prevSlide = totalSlides - 1;
    data.nextSlide = nextSlide;
    data.prevSlide = prevSlide;

    return data;
  }

  var methods = {
    init: function(opts){
      return this.each(function(){
        var $this = $(this),
            data = $this.data('carousel'),
            settings = {
              'slideshow'         : false,
              'slides'            : 2,
              'onBeforeSlide'     : function(){},
              'onAfterSlide'      : function(){}
            };

        if(!data){
          $.extend(settings, opts);

          var $slides = $this.find('.slide'),
              height = $slides.first().outerHeight(),
              width = $slides.first().outerWidth();

          $slides.detach();

          $this.css({
            height: height,
            width: width * settings.slides
          });

          var $wrapper = $('<div class="sliderWrapper">').css({overflow: 'hidden'});

          $this.append($wrapper);

          $this.data('carousel', {
            settings: settings,
            slides: $slides,
            totalSlides: $slides.size(),
            nextSlide: settings.slides,
            prevSlide: $slides.size() - 1,
            width: width,
            wrapper: $wrapper
          });

          for(var i=0, l = settings.slides ;  i < l; i++){
            var $slide = $($slides[i]);
            $wrapper.append($slide.clone());
          }

          $this.carousel('start');
        }
      });
    },

    next: function(){
      var $this = $(this),
          data = $this.data('carousel'),
          settings = data.settings,
          wrapper = data.wrapper,
          width = data.width,
          nextSlide = data.nextSlide,
          prevSlide = data.prevSlide;

      if(settings.slides >= data.totalSlides) return;
      var $slide = $(data.slides[nextSlide]).clone()

      wrapper
        .css({ width: width * (settings.slides + 1) })
        .append($slide);

      if(settings.onBeforeSlide) settings.onBeforeSlide(data);
      wrapper.animate({
        marginLeft: -width
      }, function(){
        if(settings.onAfterSlide) settings.onAfterSlide(data);
        wrapper.css({
          width: width * settings.slides,
          marginLeft: 0
        })
        wrapper.find('.slide:first').remove();
      })

      $this.data('carousel', incCounter(data));
    },

    prev: function(){
      var $this = $(this),
          data = $this.data('carousel'),
          settings = data.settings,
          width = data.width,
          wrapper = data.wrapper,
          nextSlide = data.nextSlide,
          prevSlide = data.prevSlide;
      if(settings.slides >= data.totalSlides) return;

      var $slide = $(data.slides[prevSlide]).clone();

      wrapper
        .css({
          width: width * (settings.slides + 1),
          marginLeft: -width
        })
        .prepend($slide);

      if(settings.onBeforeSlide) settings.onBeforeSlide(data);
      wrapper
        .animate({
          marginLeft: 0
        }, function(){
          if(settings.onAfterSlide) settings.onAfterSlide(data);
          wrapper.find('.slide:last').remove();
        });


      $this.data('carousel', decCounter(data));
    },

    start: function(){
      var $this = $(this),
          data = $this.data('carousel'),
          width = data.width,
          settings = data.settings;

      if(settings.slideshow){
        clearInterval(data.timer);
        data.timer = setInterval(function(){
          $this.carousel('next');
        }, settings.slideshow);
      }
    },

    stop: function(){
      var $this = $(this),
          data = $this.data('carousel');

      clearInterval(data.timer);
    }
  };

  $.fn.carousel = function(method){
    // Method calling logic
    if(methods[method]){
      return methods[method].apply(this, Array.prototype.slice.call(arguments, 1));
    }else if (typeof method === 'object' || !method){
      return methods.init.apply(this, arguments);
    }else{
      $.error('Method ' + method + ' does not exist on jQuery.tooltip');
    }
  }
})(jQuery);
